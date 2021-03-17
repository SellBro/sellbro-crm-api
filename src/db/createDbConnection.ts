import { createConnection, Connection } from 'typeorm';

const createDbConnection = (): Promise<Connection> =>
  createConnection({
    type: 'postgres',
    url: process.env.DB_URL,

    entities: [],
  });

export default createDbConnection;
