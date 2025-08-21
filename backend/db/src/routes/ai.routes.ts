import { Router } from 'express';
import { createLyrics } from '../controllers/ai.controller.js';
const router = Router();

router.post('/generate-lyrics', createLyrics);

export default router;
