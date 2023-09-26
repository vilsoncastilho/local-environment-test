import sql from 'mssql';
import { env } from '@config/env';

const config = {
  server: env.DB_SERVER,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  options: {
    trustServerCertificate: true,
  },
};

export const dbConnection = () => {
  sql.connect(config, (err) => {
    if (err) throw err;
    console.log("⚡️ Database connected!");
  });
}
