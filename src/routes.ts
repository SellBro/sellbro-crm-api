import { Application } from 'express';

import * as health from 'controllers/health';
import * as auth from 'controllers/auth';
import * as tables from 'controllers/tables';
import * as user from 'controllers/user';

export const attachPublicRoutes = (app: Application): void => {
  app.get('/health', health.testConnection);
  app.get('/reset', health.resetDatabase);

  app.post('/register', auth.register);
  app.post('/login', auth.login);
};

export const attachPrivateRoutes = (app: Application): void => {
  app.get('/tables', tables.getTables);
  app.post('/tables', tables.create);
  app.put('/tables/:tableNameId', tables.update);

  app.get('/me', user.getMe);
};
