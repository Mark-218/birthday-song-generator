import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { pool } from './db.js'; // MySQL pool connection
import authRoutes from './routes/auth.routes.js';
import prefRoutes from './routes/preferences.routes.js';
import aiRoutes from './routes/ai.routes.js';
import ttsRoutes from './routes/tts.routes.js';
import healthRoutes from './routes/health.routes.js'; // optional

// ----------------------
// Environment Variables
// ----------------------
const PORT: number = parseInt(process.env.PORT ?? '4000', 10);
const ORIGIN: string = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173';

// ----------------------
// Initialize Express
// ----------------------
const app = express();

// ----------------------
// CORS Setup
// ----------------------
app.use(cors({
  origin: ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
app.options('*', cors());

// ----------------------
// Middleware
// ----------------------
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// ----------------------
// Root Route
// ----------------------
app.get('/', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'birthday-song-backend',
    environment: process.env.NODE_ENV ?? 'development',
    port: PORT
  });
});

// ----------------------
// Health Route
// ----------------------
app.use('/health', healthRoutes); // accessible at /health

// ----------------------
// API Routes
// ----------------------
app.use('/api', authRoutes);
app.use('/api', prefRoutes);
app.use('/api', aiRoutes);
app.use('/api/tts', ttsRoutes);

// ----------------------
// 404 Handler
// ----------------------
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

// ----------------------
// Start Server & Check DB Connection
// ----------------------
(async () => {
  try {
    await pool.getConnection();
    console.log('✅ Database connected successfully');

    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  }
})();
