import axios from "axios";

export async function generateAudioFromText(text: string, voiceId: string): Promise<Buffer> {
    try {
        const apiKey = process.env.ELEVENLABS_API_KEY;
        const ttsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

        const response = await axios.post(
            ttsUrl,
            {
                text: text,
                model_id: "eleven_monolingual_v1", // Model
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75
                }
            },
            {
                headers: {
                    "Accept": "audio/mpeg",
                    "Content-Type": "application/json",
                    "xi-api-key": apiKey || ""
                },
                responseType: "arraybuffer"
            }
        );

        return Buffer.from(response.data);
    } catch (error) {
        console.error("Error generating TTS audio:", error);
        throw new Error("TTS generation failed");
    }
}
