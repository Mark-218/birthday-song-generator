import { Request, Response } from 'express';
import { pool } from '../db.js';
import { isValidEmail, isValidName, isValidPhone } from '../utils/validators.js';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body as { name: string; email: string; phone: string };
    if (!isValidName(name) || !isValidEmail(email) || !isValidPhone(phone)) {
      return res.status(400).json({ message: 'Invalid input' });
    }
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)',
      [name.trim(), email.toLowerCase(), phone]
    );
    // @ts-ignore
    const id = result.insertId as number;
    return res.json({ id, name, email, phone });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { otp } = req.body as { otp: string };
  if (otp === '1234') return res.json({ ok: true });
  return res.status(400).json({ ok: false, message: 'Invalid OTP' });
};
