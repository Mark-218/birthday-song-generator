import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { pool } from './db.js'; // your MySQL pool connection
import authRoutes from './routes/auth.routes.js';
import prefRoutes from './routes/preferences.routes.js';
import aiRoutes from './routes/ai.routes.js';
import ttsRoutes from './routes/tts.routes.js';

const app = express();
const PORT = Number(process.env.PORT || 4000);
const ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// ✅ CORS setup
app.use(cors({
  origin: ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// ✅ Handle OPTIONS preflight requests explicitly
app.options('*', cors({
  origin: ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// ✅ Middleware
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// ✅ Health check route
app.get('/health', (_, res) => res.json({ status: 'ok', service: 'birthday-song-backend' }));

// ✅ API routes
app.use('/api', authRoutes);
app.use('/api', prefRoutes);
app.use('/api', aiRoutes);
app.use('/api/tts', ttsRoutes);

// ✅ 404 handler
app.use((_, res) => res.status(404).json({ message: 'Not Found' }));

// ✅ Database connection check before starting server
(async () => {
  try {
    await pool.getConnection();
    console.log('✅ Database connected successfully');

    // ✅ Start server
    app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1); // exit if DB fails
  }
})();
