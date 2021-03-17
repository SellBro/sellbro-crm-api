import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';

import createDbConnectionn from 'db/createDbConnection';

const initExpress = (): void => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

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
