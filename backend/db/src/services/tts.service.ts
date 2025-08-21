import type { Request, Response } from 'express';

// Mock TTS handler: returns 501 unless provider is set to elevenlabs with keys.
// Frontend can fall back to browser SpeechSynthesis.
export async function handleTTS(req: Request, res: Response) {
  const provider = (process.env.TTS_PROVIDER || 'mock').toLowerCase();
  if (provider !== 'elevenlabs') {
    return res.status(501).json({ message: 'TTS provider not configured. Frontend will use browser speech.' });
  }

  // Placeholder for ElevenLabs integration
  // You can implement an actual fetch to ElevenLabs API here and stream audio/mpeg back.
  return res.status(501).json({ message: 'ElevenLabs integration not implemented in starter.' });
}
