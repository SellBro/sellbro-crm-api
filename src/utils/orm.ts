import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

import { generateErrors } from 'utils/validations';
import { BadRequestError, EntityNotFoundError } from 'errors';
import { FieldName, FieldValue, TableName, User } from 'entities';

type EntityConstructor = typeof FieldName | typeof FieldValue | typeof TableName | typeof User;
type EntityInstance = FieldName | FieldValue | TableName | User;

const entities: { [key: string]: EntityConstructor } = { FieldName, FieldValue, TableName, User };

export const findEntityOrThrow = async <T extends EntityConstructor>(
  Constructor: T,
  id: number | string,
  options?: FindOneOptions,
): Promise<InstanceType<T>> => {
  const instance = await Constructor.findOne(id, options);
  if (!instance) {
    throw new EntityNotFoundError(Constructor.name);
  }
  return instance;
};

export const validateAndSaveEntity = async <T extends EntityInstance>(instance: T): Promise<T> => {
  const Constructor = entities[instance.constructor.name];

  if ('validations' in Constructor) {
    const errorFields = generateErrors(instance, Constructor.validations);

    if (Object.keys(errorFields).length > 0) {
      throw new BadRequestError({ fields: errorFields });
    }
  }
  return instance.save() as Promise<T>;
};

export const createEntity = async <T extends EntityConstructor>(
  Constructor: T,
  input: Partial<InstanceType<T>>,
): Promise<InstanceType<T>> => {
  const instance = Constructor.create(input);
  return validateAndSaveEntity(instance as InstanceType<T>);
};

export const updateEntitySafe = async <T extends EntityConstructor>(
  Constructor: T,
  owner: number,
  id: number | string,
  input: Partial<InstanceType<T>>,
): Promise<InstanceType<T>> => {
  const instance = await findEntityOrThrow(Constructor, id);

  if (instance instanceof TableName && !(instance.userId === owner)) {
    throw new EntityNotFoundError(Constructor.name);
  }

  Object.assign(instance, input);
  return validateAndSaveEntity(instance);
};

export const deleteEntity = async <T extends EntityConstructor>(
  Constructor: T,
  id: number | string,
): Promise<InstanceType<T>> => {
  const instance = await findEntityOrThrow(Constructor, id);
  await instance.remove();
  return instance;
};
