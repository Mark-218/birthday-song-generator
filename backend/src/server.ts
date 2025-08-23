import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { createPool } from 'mysql2/promise';

import authRoutes from './routes/auth.routes.js';
import prefRoutes from './routes/preferences.routes.js';
import aiRoutes from './routes/ai.routes.js';
import ttsRoutes from './routes/tts.routes.js';

// ----------------------
// Hardcoded "env" values
// ----------------------
const PORT = 4000; // or Railway's default
const ORIGIN = 'http://localhost:5173'; // frontend URL

const DB_HOST = 'shinkansen.proxy.rlwy.net';
const DB_PORT = 16151;
const DB_USER = 'root';
const DB_PASSWORD = 'unlpVVVOctpkRibRJLdLUmdebbepMTJr';
const DB_NAME = 'railway';

// Optional for testing AI/TTS
const OPENAI_API_KEY = 'sk-your-key';
const TTS_PROVIDER = 'elevenlabs';
const ELEVENLABS_API_KEY = 'sk-your-key';
const ELEVENLABS_VOICE_ID_DEFAULT = 'jYMoRsZQbrEVBccBz1fa';
const ELEVENLABS_VOICE_ID_MALE = 'jYMoRsZQbrEVBccBz1fa';
const ELEVENLABS_VOICE_ID_FEMALE = 'WzsP0bfiCpSDfNgLrUuN';

// ----------------------
// MySQL Pool
// ----------------------
export const pool = createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: 10
});

// ----------------------
// Express App
// ----------------------
const app = express();

app.use(cors({ origin: ORIGIN, methods: ['GET','POST','PUT','DELETE','OPTIONS'], credentials: true }));
app.options('*', cors());

app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok', service: 'birthday-song-backend', port: PORT }));

// API routes
app.use('/api', authRoutes);
app.use('/api', prefRoutes);
app.use('/api', aiRoutes);
app.use('/api/tts', ttsRoutes);

// 404 handler
app.use((_, res) => res.status(404).json({ message: 'Not Found' }));

// Start server
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
