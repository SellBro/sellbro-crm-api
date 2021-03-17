import * as health from 'controllers/health';
import { Application } from 'express';

export const attachPublicRoutes = (app: Application): void => {
  app.get('/health', health.testConnection);
};
