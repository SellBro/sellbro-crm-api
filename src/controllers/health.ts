import { catchErrors } from 'errors/errorsCustom';

export const testConnection = catchErrors(async (_req, res) => {
  res.send({ message: 'Server is working' });
});
