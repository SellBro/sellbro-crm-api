import { createConnection, Connection } from 'typeorm';

import * as entities from 'entities';

const createDbConnection = (): Promise<Connection> =>
  createConnection({
    type: 'postgres',
    url: process.env.DB_URL,

    entities: Object.values(entities),
    //synchronize: true,
    ssl: {
      rejectUnauthorized: false,
    },
  });

export default createDbConnection;
