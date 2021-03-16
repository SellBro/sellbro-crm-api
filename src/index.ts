import 'module-alias/register';
import 'dotenv/config';
import express from 'express';

const initExpress = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.listen(process.env.PORT || 8000);
  console.log(`App started at url: ${process.env.BASE_URL}`);
};

initExpress();
