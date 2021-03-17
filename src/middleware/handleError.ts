import { ErrorRequestHandler } from 'express';
import { pick } from 'lodash';

import { CustomError, Status, ErrorCode, ErrorData } from 'errors/errorsCustom';

type Error = {
  message: string;
  code: ErrorCode;
  status: Status;
  data?: ErrorData;
};

const handleError: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);

  const isErrorSafe = error instanceof CustomError;

  const serverError: Error = isErrorSafe
    ? pick(error, ['message', 'code', 'status', 'data'])
    : {
        message: 'Something went wrong',
        code: 'Internal Server Error',
        status: Status.INTERNAL_ERROR,
        data: {},
      };

  res.status(serverError.status).send({ error: serverError });
};

export default handleError;
