import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Routes
import authRoutes from './routes/auth.routes.js';
import prefRoutes from './routes/preferences.routes.js';
import aiRoutes from './routes/ai.routes.js';
import ttsRoutes from './routes/tts.routes.js';

const app = express();

// ✅ Use Railway-provided PORT (default 4000 locally)
const PORT = Number(process.env.PORT) || 4000;

// ✅ Normalize ORIGIN into array for CORS
let ORIGIN: string[] = [];
if (process.env.CLIENT_ORIGIN) {
  ORIGIN = process.env.CLIENT_ORIGIN.split(',').map(o => o.trim());
} else {
  ORIGIN = [
    'http://localhost:5173',
    'https://birthday-song-generator-production.up.railway.app',
  ];
}

console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('PORT:', PORT);
console.log('CLIENT_ORIGIN:', ORIGIN);

// ✅ CORS setup
app.use(
  cors({
    origin: ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

// ✅ Handle OPTIONS preflight
app.options('*', cors({ origin: ORIGIN }));

// ✅ Middleware
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// ✅ Root route (Railway health check)
app.get('/', (_, res) => {
  res.json({
    ok: true,
    service: 'birthday-song-backend',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// ✅ API routes
app.use('/api', authRoutes);
app.use('/api', prefRoutes);
app.use('/api', aiRoutes);
app.use('/api/tts', ttsRoutes);

// ✅ 404 handler
app.use((_, res) => res.status(404).json({ message: 'Not Found' }));

// ✅ Ensure process stays alive (important for Railway)
process.on('SIGTERM', () => {
  console.log('⚠️ Received SIGTERM. Shutting down gracefully...');
  process.exit(0);
});

// ✅ Start server on 0.0.0.0 (Railway requires this)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend listening on http://0.0.0.0:${PORT}`);
});
