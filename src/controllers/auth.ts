import { catchErrors } from 'errors';
import { createEntity, findEntityOrThrow } from 'utils/orm';
import { User } from 'entities';
import { signToken } from 'utils/token';

export const register = catchErrors(async (req, res) => {
  const user = await createEntity(User, req.body);
  res.respond({ user }, 'User created successfully');
});

export const login = catchErrors(async (req, res) => {
  const user = await findEntityOrThrow(User, req.body);
  const authToken = signToken({ sub: user.id });

  res.respond({ authToken });
});
