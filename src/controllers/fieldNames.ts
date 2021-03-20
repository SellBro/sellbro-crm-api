import { FieldName } from 'entities';
import { catchErrors } from 'errors';
import { createEntity, updateEntitySafe } from 'utils/orm';

export const getFieldNames = catchErrors(async (req, res) => {
  const { id } = req.user;
  const { tableNameId } = req.params;

  const fieldNames = await FieldName.createQueryBuilder('field_name')
    .select()
    .where('field_name.userId = :id AND field_name.tableNameId = :tableNameId', { id, tableNameId })
    .getMany();

  res.respond({ fieldNames });
});

export const create = catchErrors(async (req, res) => {
  const { tableNameId } = req.params;
  const { id: userId } = req.user;

  const fieldName = await createEntity(FieldName, { ...req.body, userId, tableNameId });

  res.respond({ fieldName });
});

export const update = catchErrors(async (req, res) => {
  const { fieldNameId } = req.params;
  const fieldName = await updateEntitySafe(FieldName, req.user.id, fieldNameId, { ...req.body });

  res.respond({ fieldName });
});
