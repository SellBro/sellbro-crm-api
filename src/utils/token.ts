import jwt, { SignOptions } from 'jsonwebtoken';

import { isPlainObject } from 'lodash';

import { AuthorizationError, CustomError } from 'errors';

export const signToken = (payload: object, options?: SignOptions): string => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.NODE_ENV === 'production' ? '7 days' : '180 days',
    ...options,
  });
};

export const validateToken = (token: string): { [key: string]: any } => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (isPlainObject(payload)) {
      return payload as { [key: string]: any };
    }

    throw new CustomError();
  } catch (e) {
    throw new AuthorizationError();
  }
};
