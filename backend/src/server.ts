import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';
import prefRoutes from './routes/preferences.routes.js';
import aiRoutes from './routes/ai.routes.js';
import ttsRoutes from './routes/tts.routes.js';
import { pool } from './db.js'; // your MySQL pool connection
import healthRoutes from './routes/health.routes.js'; // optional if you want separate file

const app = express();
const PORT = Number(process.env.PORT || 4000);
const ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// ----------------------
// CORS setup
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
// Root route
// ----------------------
app.get('/', (_, res) => {
  res.json({
    status: 'ok',
    service: 'birthday-song-backend',
    environment: process.env.NODE_ENV || 'development',
    port: PORT
  });
});

// ----------------------
// Health route (optional separate file)
// ----------------------
app.use('/health', healthRoutes); // accessible at /health

// ----------------------
// API routes
// ----------------------
app.use('/api', authRoutes);
app.use('/api', prefRoutes);
app.use('/api', aiRoutes);
app.use('/api/tts', ttsRoutes);

// ----------------------
// 404 handler
// ----------------------
app.use((_, res) => res.status(404).json({ message: 'Not Found' }));

// ----------------------
// Start server & check DB connection
// ----------------------
(async () => {
  try {
    await pool.getConnection();
    console.log('✅ Database connected successfully');
    app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  }
})();
