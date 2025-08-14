import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import { groupRouter } from './routes/group.routes';
dotenv.config();

export const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/groups', groupRouter);

const port = process.env.PORT ?? '5432';

app.listen(port, () => {
  console.log(`${port} 포트에서 서버 시작`);
});
