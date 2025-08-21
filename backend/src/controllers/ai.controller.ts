import { Request, Response } from 'express';
import { generateLyrics } from '../services/openai.service.js';

export const createLyrics = async (req: Request, res: Response) => {
  try {
    const { receiver_name, gender, genre, mood, voice } = req.body as {
      receiver_name: string;
      gender: 'male' | 'female';
      genre: string;
      mood: string;
      voice: string;
    };

    if (!receiver_name || !gender || !genre || !mood || !voice) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const lyrics = await generateLyrics({ receiver_name, gender, genre, mood, voice });
    return res.json({ lyrics });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Lyrics generation failed' });
  }
};
