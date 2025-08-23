import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';
import prefRoutes from './routes/preferences.routes.js';
import aiRoutes from './routes/ai.routes.js';
import ttsRoutes from './routes/tts.routes.js';

const app = express();
const PORT = Number(process.env.PORT || 4000);
const ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// CORS setup
app.use(cors({
  origin: ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Handle preflight OPTIONS for all routes
app.options('*', cors());

// JSON parser & logging
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// Test route
app.get('/', (_, res) => res.json({ ok: true, service: 'birthday-song-backend' }));

// API routes
app.use('/api', authRoutes);
app.use('/api', prefRoutes);
app.use('/api', aiRoutes);
app.use('/api/tts', ttsRoutes);

// 404 handler
app.use((_, res) => res.status(404).json({ message: 'Not Found' }));

// Start server
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
