import express from 'express';
import { env } from '@config/env';
import { dbConnection } from '@shared/infra/database'

import { router } from '@shared/infra/http/routes';

const app = express();
dbConnection();

app.use(express.json());
app.use(router);

app.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server started on port ${env.PORT}!`);
});
