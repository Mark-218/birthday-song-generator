import { Router } from 'express';
import { tts } from '../controllers/tts.controller.js';
const router = Router();

router.post('/tts', tts);

export default router;
