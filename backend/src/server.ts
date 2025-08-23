import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';
import prefRoutes from './routes/preferences.routes.js';
import aiRoutes from './routes/ai.routes.js';
import ttsRoutes from './routes/tts.routes.js';

const app = express();

// ✅ Use Railway-provided port or fallback for local
const PORT = Number(process.env.PORT || 4000);

// ✅ Allow both production + local frontend
const ORIGIN = process.env.CLIENT_ORIGIN || [
  'http://localhost:5173',
  'https://birthday-song-generator-production.up.railway.app'
];

console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('PORT:', PORT);
console.log('CLIENT_ORIGIN:', ORIGIN);

// ✅ CORS setup
app.use(cors({
  origin: ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// ✅ Handle OPTIONS preflight
app.options('*', cors({
  origin: ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// ✅ Middleware
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// ✅ Root route (for Railway health check)
app.get('/', (_, res) => res.json({ 
  ok: true, 
  service: 'birthday-song-backend', 
  environment: process.env.NODE_ENV || 'development' 
}));

// ✅ API routes
app.use('/api', authRoutes);
app.use('/api', prefRoutes);
app.use('/api', aiRoutes);
app.use('/api/tts', ttsRoutes);

// ✅ 404 handler
app.use((_, res) => res.status(404).json({ message: 'Not Found' }));

// ✅ Start server on 0.0.0.0 (important for Railway)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend listening on port ${PORT}`);
});
