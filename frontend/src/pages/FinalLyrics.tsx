import { useApp } from '../context/AppContext';
import api from '../lib/axios';
import { useState } from 'react';

export default function FinalLyrics() {
  const { lyrics, voice } = useApp(); // ✅ voice added from context
  const [playing, setPlaying] = useState(false);

  // ✅ Fallback: Browser Speech API if TTS API fails
  const playWithBrowserSpeech = async () => {
    const utter = new SpeechSynthesisUtterance(lyrics || 'No lyrics');
    utter.voice = speechSynthesis.getVoices().find(v =>
      voice?.toLowerCase() === 'female' ? v.name.includes('Female') : v.name.includes('Male')
    ) || null; // Pick female/male if available
    utter.onend = () => setPlaying(false);
    setPlaying(true);
    speechSynthesis.speak(utter);
  };

  // ✅ Play using backend-generated TTS
  const play = async () => {
    try {
      setPlaying(true);

      // Send text + voice selection to backend
      const { data } = await api.post(
        '/tts',
        { text: lyrics, voice: voice || 'Female' }, // ✅ Send voice dynamically
        { responseType: 'blob' }
      );

      // Convert blob to audio URL and play
      const audioURL = URL.createObjectURL(data);
      const audio = new Audio(audioURL);
      audio.onended = () => setPlaying(false);
      await audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
      await playWithBrowserSpeech();
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center text-center px-4 py-8 font-gibson"
      style={{
        backgroundImage: "url('/assets/images/bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
      }}
    >
      {/* Progress Bar */}
      <div className="mb-6">
        <img
          src="/assets/images/progress-bar2.png"
          alt="Progress"
          className="mx-auto w-60 md:w-80"
        />
      </div>

      {/* Title */}
      <h2 className="text-white text-2xl md:text-3xl font-semibold mb-6 drop-shadow-md">
        Your song's lyrics are ready!
      </h2>

      {/* Lyrics Box */}
      <div
        className="bg-white text-left rounded-3xl p-5 w-full max-w-md shadow-lg relative mx-4"
        style={{
          height: '350px',
          overflowY: 'auto',
        }}
      >
        <pre
          className="whitespace-pre-wrap text-[16px] leading-7 font-medium"
          style={{
            color: '#330072',
            fontFamily: 'Gibson, sans-serif',
            fontWeight: 500,
          }}
        >
          {lyrics}
        </pre>
      </div>

      {/* Play Button */}
      <button
        className="mt-6 w-full max-w-md px-12 py-3 bg-[#e9bb72] text-purple-900 font-semibold rounded-xl shadow-lg hover:bg-yellow-300 transition mx-4 disabled:opacity-70 disabled:cursor-not-allowed"
        onClick={play}
        disabled={playing}
      >
        {playing ? 'Playing...' : 'Play Song'}
      </button>

      {/* Custom Scrollbar */}
      <style>{`
        div[style*='overflow-y']::-webkit-scrollbar {
          width: 6px;
        }
        div[style*='overflow-y']::-webkit-scrollbar-thumb {
          background-color: #FFD700;
          border-radius: 10px;
        }
        div[style*='overflow-y']::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}
