import express from 'express';
import groupRoutes from './routes/group.routes.js';

const app = express();

app.use(express.json());

app.use('/groups', groupRoutes);

export default app;