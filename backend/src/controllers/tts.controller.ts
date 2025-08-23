import { Request, Response } from "express";
import { generateAudioFromText } from "../services/tts.service.js";

export async function generateTTS(req: Request, res: Response) {
    try {
        const { text, voice } = req.body;

        console.log("📥 Received TTS Request:", { textLength: text?.length, voice });

        if (!text) {
            console.warn("⚠️ TTS Error: Missing text in request body");
            return res.status(400).json({ error: "Text is required" });
        }

        // Select voice ID based on gender or voice type
        let voiceId = process.env.ELEVENLABS_VOICE_ID_DEFAULT || "";

        if (voice && voice.toLowerCase() === "male") {
            voiceId = process.env.ELEVENLABS_VOICE_ID_MALE || voiceId;
        } else if (voice && voice.toLowerCase() === "female") {
            voiceId = process.env.ELEVENLABS_VOICE_ID_FEMALE || voiceId;
        }

        console.log("🎤 Voice param received:", voice);
        console.log("🔑 Voice ID being used:", voiceId);
        console.log("🔐 API key prefix:", process.env.ELEVENLABS_API_KEY?.substring(0, 6));

        // Generate audio
        console.log("🚀 Sending request to ElevenLabs...");
        const audioBuffer = await generateAudioFromText(text, voiceId);

        console.log("✅ Audio generated successfully. Size:", audioBuffer.length, "bytes");

        res.set({
            "Content-Type": "audio/mpeg",
            "Content-Disposition": "inline; filename=tts.mp3"
        });

        res.send(audioBuffer);

    } catch (error: any) {
        console.error("❌ TTS Error (raw):", error);

        if (error.response) {
            console.error("❌ ElevenLabs API Response:", {
                status: error.response.status,
                data: error.response.data
            });

            return res.status(error.response.status).json({
                error: "TTS API error",
                status: error.response.status,
                details: error.response.data
            });
        }

        if (error.request) {
            console.error("❌ No response received from ElevenLabs:", error.request);
            return res.status(500).json({
                error: "No response from ElevenLabs"
            });
        }

        console.error("❌ Unknown TTS error:", error.message);
        res.status(500).json({ error: error.message || "Failed to generate TTS audio" });
    }
}
