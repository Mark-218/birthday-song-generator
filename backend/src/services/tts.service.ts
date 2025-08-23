import axios from "axios";

/**
 * Generate TTS audio from text using ElevenLabs API
 * @param text Text to convert to speech
 * @param voiceId Voice ID from your ElevenLabs account
 * @returns Promise<Buffer> containing audio data
 */
export async function generateAudioFromText(text: string, voiceId: string): Promise<Buffer> {
    // ✅ Ensure API key is set
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
        throw new Error("ELEVENLABS_API_KEY is not set in environment variables");
    }

    const ttsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

    try {
        console.log("Sending TTS request to:", ttsUrl);

        const response = await axios.post(
            ttsUrl,
            {
                text: text,
                model_id: "eleven_monolingual_v1", // confirm this model is correct for your voice
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75
                }
            },
            {
                headers: {
                    "Accept": "audio/mpeg",
                    "Content-Type": "application/json",
                    "xi-api-key": apiKey
                },
                responseType: "arraybuffer", // ensures audio is returned as binary
                timeout: 10000 // optional: set a 10s timeout
            }
        );

        // ✅ Check status code
        if (response.status !== 200) {
            console.error("Unexpected TTS response:", response.status, response.statusText);
            throw new Error("TTS generation failed");
        }

        return Buffer.from(response.data);
    } catch (error: any) {
        // Better error logging for debugging
        if (error.response) {
            console.error("TTS API responded with error:", {
                status: error.response.status,
                data: error.response.data
            });
        } else {
            console.error("TTS request failed:", error.message);
        }
        throw new Error("TTS generation failed");
    }
}
