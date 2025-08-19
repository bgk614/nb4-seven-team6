// src/index.ts
import swaggerUi from 'swagger-ui-express';
import SwaggerParser from '@apidevtools/swagger-parser';
import path from 'path';
import app from './app';

(async () => {
  try {
    const swaggerPath = path.join(process.cwd(), 'src/swagger/swagger.yaml');
    const api = await SwaggerParser.dereference(swaggerPath);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(api));

    if (process.env.NODE_ENV !== 'test') {
      const port = Number(process.env.PORT) || 3000;
      app.listen(port, () => {
        console.log(`서버 실행됨: http://localhost:${port}`);
        console.log(`스웨거 문서: http://localhost:${port}/api-docs`);
      });
    }
  } catch (err) {
    console.error('Swagger load error:', err);
  }
})();

export default app;
