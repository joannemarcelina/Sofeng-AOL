import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/', authRoutes); // apply route

app.listen(3001, () => {
  console.log('[DONE] Server running on http://localhost:3001');
});
