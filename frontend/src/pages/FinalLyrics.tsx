import { useApp } from '../context/AppContext';
import api from '../lib/axios';
import { useState } from 'react';

export default function FinalLyrics() {
  const { lyrics } = useApp();
  const [playing, setPlaying] = useState(false);

  const playWithBrowserSpeech = async () => {
    const utter = new SpeechSynthesisUtterance(lyrics || 'No lyrics');
    utter.onend = () => setPlaying(false);
    setPlaying(true);
    speechSynthesis.speak(utter);
  };

  const play = async () => {
    try {
      const { data } = await api.post('/tts', { text: lyrics, voice: 'default' });
      if (data && data.url) {
        const audio = new Audio(data.url);
        setPlaying(true);
        audio.onended = () => setPlaying(false);
        audio.play();
        return;
      }
      await playWithBrowserSpeech();
    } catch {
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
  fontWeight: 500 
}}

        >
          {lyrics}
        </pre>
      </div>

      {/* Play Button */}
<button
  className="mt-6 w-full max-w-md px-12 py-3 bg-[#e9bb72] text-purple-900 font-semibold rounded-xl shadow-lg hover:bg-yellow-300 transition mx-4"
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
