import { catchErrors } from 'errors';

export const getMe = catchErrors(async (req, res) => {
  res.respond({ user: req.user });
});
