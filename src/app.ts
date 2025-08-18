import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import SwaggerParser from '@apidevtools/swagger-parser';
import path from 'path';
import { fileURLToPath } from 'url'; 
import { groupRouter } from './routes/group.routes';
import { uploadRouter } from './routes/upload.route';
import { errorMiddleware } from './middleware/error.middleware';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/groups', groupRouter);
app.use('/uploads', uploadRouter);

app.use(errorMiddleware);

(async () => {
  try {
    const swaggerPath = path.join(__dirname, 'swagger', 'swagger.yaml');

    const api = await SwaggerParser.dereference(swaggerPath);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(api));

    const port = process.env.PORT ?? '6123';
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/api-docs`);
    });
  } catch (err) {
    console.error('Swagger load error:', err);
  }
})();
