import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import matchRoutes from './routes/match.js';
import discoverRoutes from './routes/discover.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/', authRoutes);
app.use('/profile', profileRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/match', matchRoutes);
app.use('/discover', discoverRoutes);


app.listen(3001, () => {
  console.log('[DONE] Server running on http://localhost:3001');
});
