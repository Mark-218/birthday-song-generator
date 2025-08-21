import type { Request, Response } from 'express';
import { handleTTS } from '../services/tts.service.js';

export const tts = async (req: Request, res: Response) => {
  return handleTTS(req, res);
};
