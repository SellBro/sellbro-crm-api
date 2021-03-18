import { getConnection } from 'typeorm';

const resetDb = async (): Promise<void> => {
  const connection = getConnection();
  await connection.dropDatabase();
  await connection.synchronize();
};

export default resetDb;
