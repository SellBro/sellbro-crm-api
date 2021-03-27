import { BadRequestError, catchErrors, EntityNotFoundError } from 'errors';
import { validateAndSaveEntity } from 'utils/orm';
import { User } from 'entities';
import { signToken } from 'utils/token';

export const register = catchErrors(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new BadRequestError({ email }, 'Account with same email already exists');
  }

  let newUser = new User();

  newUser.email = email;
  newUser.password = password;
  newUser.hashPassword();

  const user = await validateAndSaveEntity(newUser);
  res.respond({ user }, 'User created successfully');
});

export const login = catchErrors(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user?.checkIfPasswordMatch(password)) {
    throw new EntityNotFoundError('User');
  }

  const authToken = signToken({ sub: user!.id });

  res.respond({ authToken });
});

export const validateToken = catchErrors(async (_req, res) => {
  res.respond({}, 'Token is valid');
});
