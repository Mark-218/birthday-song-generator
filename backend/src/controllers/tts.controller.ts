import { Request, Response } from "express";
import { generateAudioFromText } from "../services/tts.service.js";

export async function generateTTS(req: Request, res: Response) {
    try {
        const { text, voice } = req.body;

        console.log("Received TTS Request:", { text, voice }); // Debug incoming request

        if (!text) {
            console.warn("TTS Error: Missing text in request body");
            return res.status(400).json({ error: "Text is required" });
        }

        // Select voice ID based on gender or voice type
        let voiceId = process.env.ELEVENLABS_VOICE_ID_DEFAULT || "";

        if (voice && voice.toLowerCase() === "male") {
            voiceId = process.env.ELEVENLABS_VOICE_ID_MALE || voiceId;
        } else if (voice && voice.toLowerCase() === "female") {
            voiceId = process.env.ELEVENLABS_VOICE_ID_FEMALE || voiceId;
        }

        console.log("Voice param received:", voice);
        console.log("Voice ID being used:", voiceId);

        // Generate audio
        console.log("Generating audio from text...");
        const audioBuffer = await generateAudioFromText(text, voiceId);
        console.log("Audio generated successfully. Size:", audioBuffer.length, "bytes");

        res.set({
            "Content-Type": "audio/mpeg",
            "Content-Disposition": "inline; filename=tts.mp3"
        });

        res.send(audioBuffer);
    } catch (error) {
        console.error("TTS Error:", error);
        res.status(500).json({ error: "Failed to generate TTS audio" });
    }
}
