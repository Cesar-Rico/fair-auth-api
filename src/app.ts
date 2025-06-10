import express, { Request, Response } from 'express';
import userRoutes from './routes/authRoute';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.send('OK');
});

app.use('/users', userRoutes);

export default app;
