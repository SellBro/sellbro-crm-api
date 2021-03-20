import { FieldValue } from 'entities';
import { catchErrors } from 'errors';
import { createEntity } from 'utils/orm';

export const create = catchErrors(async (req, res) => {
  const { fieldNameId } = req.params;
  const { id: userId } = req.user;

  const fieldValue = await createEntity(FieldValue, {
    ...req.body,
    fieldNameId,
    userId,
  });

  res.respond({ fieldValue });
});
