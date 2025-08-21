import { Request, Response } from 'express';
import { pool } from '../db.js';
import type { Gender } from '../types.js';

export const savePreferences = async (req: Request, res: Response) => {
  try {
    const {
      user_id,
      receiver_name,
      gender,
      genre,
      mood,
      voice
    } = req.body as {
      user_id: number;
      receiver_name: string;
      gender: Gender;
      genre: string;
      mood?: string;
      voice?: string;
    };

    // ✅ Validate required fields
    if (!user_id || !receiver_name || !gender || !genre) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    // ✅ Insert into database
    const [result] = await pool.execute(
      `INSERT INTO preferences (user_id, receiver_name, gender, genre, mood, voice)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        receiver_name.trim(),
        gender,
        genre,
        mood?.trim() || 'Happy',
        voice?.trim() || 'Neutral'
      ]
    );

    // @ts-ignore
    const id = result.insertId as number;

    return res.json({
      id,
      user_id,
      receiver_name,
      gender,
      genre,
      mood: mood || 'Happy',
      voice: voice || 'Neutral'
    });
  } catch (e) {
    console.error('Error saving preferences:', e);
    return res.status(500).json({ message: 'Server error', details: (e as Error).message });
  }
};
