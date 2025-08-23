import { Request, Response } from "express";
import { generateAudioFromText } from "../services/tts.service";

export async function generateTTS(req: Request, res: Response) {
    try {
        const { text, voice } = req.body;

        console.log("Received TTS Request:", { text, voice });

        if (!text) {
            console.warn("TTS Error: Missing text in request body");
            return res.status(400).json({ error: "Text is required" });
        }

        // --- Voice Selection ---
        // Default to male
        let voiceId = process.env.ELEVENLABS_VOICE_ID_MALE || process.env.ELEVENLABS_VOICE_ID_DEFAULT || "";

        if (voice) {
            const v = voice.toLowerCase();
            if (v === "female") {
                voiceId = process.env.ELEVENLABS_VOICE_ID_FEMALE || voiceId;
            } else if (v === "male") {
                voiceId = process.env.ELEVENLABS_VOICE_ID_MALE || voiceId;
            }
            // any other value keeps default male
        }

        console.log("Voice param received:", voice);
        console.log("Using Voice ID:", voiceId);

        // --- Generate audio ---
        const audioBuffer = await generateAudioFromText(text, voiceId);

        res.set({
            "Content-Type": "audio/mpeg",
            "Content-Disposition": "inline; filename=tts.mp3"
        });

        res.send(audioBuffer);
        console.log("Audio sent successfully. Size:", audioBuffer.length, "bytes");
    } catch (error) {
        console.error("TTS Error:", error);

        res.status(500).json({ error: "Failed to generate TTS audio" });
    }
}
