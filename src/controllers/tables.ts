import { createEntity, findEntityOrThrow, updateEntitySafe } from 'utils/orm';
import { catchErrors } from 'errors';
import { TableName } from 'entities';

export const getTables = catchErrors(async (req, res) => {
  const { id } = req.user;

  const tables = await TableName.createQueryBuilder('table_name')
    .select()
    .where('table_name.userId = :id', { id })
    .getMany();

  res.respond({ tables });
});

export const getTableDetails = catchErrors(async (req, res) => {
  const { tableNameId } = req.params;

  const table = await findEntityOrThrow(TableName, tableNameId, {
    relations: ['fieldNames', 'fieldNames.fieldValues'],
  });

  res.respond({ table });
});

export const create = catchErrors(async (req, res) => {
  const table = await createEntity(TableName, { userId: req.user.id, ...req.body });

  res.respond({ table }, 'Table created');
});

export const update = catchErrors(async (req, res) => {
  const { tableNameId } = req.params;
  const table = await updateEntitySafe(TableName, req.user.id, tableNameId, { ...req.body });

  res.respond({ table }, 'Table updated');
});
