import { Request, Response } from 'express';
import { pool } from '../db.js';
import type { Gender } from '../types.js';

export const savePreferences = async (req: Request, res: Response) => {
  try {
    const { user_id, receiver_name, gender, genre, mood, voice } = req.body as {
      user_id: number;
      receiver_name: string;
      gender: Gender;
      genre: string;
      mood: string;
      voice: string;
    };

    // Validate required fields
    if (!user_id || !receiver_name || !gender) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Default values for optional fields
    const finalGenre = genre || null;
    const finalMood = mood || 'Happy';
    const finalVoice = voice || 'neutral';

    // Insert into preferences table
    const [result] = await pool.execute(
      `INSERT INTO preferences (user_id, receiver_name, gender, genre, mood, voice)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, receiver_name, gender, finalGenre, finalMood, finalVoice]
    );

    // @ts-ignore
    const id = result.insertId as number;

    return res.json({
      id,
      user_id,
      receiver_name,
      gender,
      genre: finalGenre,
      mood: finalMood,
      voice: finalVoice
    });
  } catch (e) {
    console.error('Error saving preferences:', e);
    return res.status(500).json({ message: 'Server error' });
  }
};
