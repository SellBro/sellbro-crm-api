import { AuthorizationError, catchErrors } from './../errors/errorsCustom';
import { Request } from 'express';
import { validateToken } from 'utils/token';
import { User } from 'entities';

const authorizeUser = catchErrors(async (req, _res, next) => {
  const token = extractTokenFromRequest(req);

  if (!token) {
    throw new AuthorizationError('Authorization token not found');
  }

  const userId = validateToken(token).sub;

  if (!userId) {
    throw new AuthorizationError();
  }

  const user = await User.findOne(userId);

  if (!user) {
    throw new AuthorizationError('Authorization token is valid, but User not found');
  }

  req.user = user;
  next();
});

const extractTokenFromRequest = (req: Request): string | undefined => {
  const token = req.get('Authorization') || '';
  return token ? token : undefined;
};

export default authorizeUser;
