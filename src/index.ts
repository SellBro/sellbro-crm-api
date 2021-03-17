import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import createDbConnectionn from 'db/createDbConnection';

import { attachPublicRoutes } from 'routes';

import authorizeUser from 'middleware/authorization';
import handleError from 'middleware/handleError';

const initExpress = (): void => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  attachPublicRoutes(app);
  app.use('/', authorizeUser);

  app.use((_req, res) => res.status(404).send({ error: 'Route not found' }));
  app.use(handleError);

  app.listen(process.env.PORT || 8000);
  console.log(`App started at url: ${process.env.BASE_URL}`);
};

const establishDbConnection = async (): Promise<void> => {
  try {
    await createDbConnectionn();
  } catch (e) {
    console.error(e);
  }
};

const initApp = async (): Promise<void> => {
  await establishDbConnection();
  initExpress();
};

initApp();
