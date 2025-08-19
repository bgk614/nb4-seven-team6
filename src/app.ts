// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import { groupRouter } from './routes/group.routes';
import { uploadRouter } from './routes/upload.route';
import { errorMiddleware } from './middleware/error.middleware';
import timerRoutes from './routes/timer.routes';
import recordRoutes from './routes/record.routes';

dotenv.config();

export const app = express();

app.use(express.json());

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));
app.use('/uploads', uploadRouter);
app.use('/groups', groupRouter);
app.get('/health', (_req, res) => res.send('ok'));
app.use('/api/timer', timerRoutes);
app.use('/api', recordRoutes);

app.use(errorMiddleware);

export default app;
