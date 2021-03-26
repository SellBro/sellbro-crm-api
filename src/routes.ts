import { Application } from 'express';

import * as health from 'controllers/health';
import * as auth from 'controllers/auth';
import * as fieldNames from 'controllers/fieldNames';
import * as fieldValues from 'controllers/fieldValues';
import * as tables from 'controllers/tables';
import * as user from 'controllers/user';

export const attachPublicRoutes = (app: Application): void => {
  if (process.env.NODE_ENV === 'development') {
    app.get('/reset', health.resetDatabase);
  }

  app.get('/health', health.testConnection);

  app.post('/register', auth.register);
  app.post('/login', auth.login);
};

export const attachPrivateRoutes = (app: Application): void => {
  app.get('/tables', tables.getTables);
  app.get('/tables/:tableNameId', tables.getTableDetails);
  app.post('/tables', tables.create);
  app.put('/tables/:tableNameId', tables.update);

  app.get('/fieldNames/:tableNameId', fieldNames.getFieldNames);
  app.post('/fieldNames/:tableNameId', fieldNames.create);
  app.put('/fieldNames/:fieldNameId', fieldNames.update);

  app.post('/fieldValues/:fieldNameId', fieldValues.create);

  app.get('/me', user.getMe);
  app.get('/validate', auth.validateToken);
};
