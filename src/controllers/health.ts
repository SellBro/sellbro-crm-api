import resetDb from 'db/resetDb';
import { catchErrors } from 'errors/errorsCustom';

export const testConnection = catchErrors(async (_req, res) => {
  res.respond({}, 'Server is working');
});

export const resetDatabase = catchErrors(async (_req, res) => {
  await resetDb();
  res.respond({}, 'Db reset');
});
