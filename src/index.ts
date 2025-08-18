// src/index.ts

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import timerRoutes from './routes/timer.routes';
import recordRoutes from './routes/record.routes';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.send('ok'));

app.use('/api/timer', timerRoutes);
app.use('/api', recordRoutes);

app.use(errorMiddleware);

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`API listening on :${port}`));
