import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import api from "../lib/axios";

// 🔹 Mood options with icon paths
const MOODS = [
  { label: "Happy", icon: "/assets/icons/Happy.png" },
  { label: "Romantic", icon: "/assets/icons/Romantic.png" },
  { label: "Funny", icon: "/assets/icons/Funny.png" },
  { label: "Motivational", icon: "/assets/icons/Motivational.png" },
  { label: "Calm", icon: "/assets/icons/Calm.png" },
];

// 🔹 Genre options with icon paths
const GENRES = [
  { label: "Rap", icon: "/assets/icons/Rap.png" },
  { label: "Rock", icon: "/assets/icons/Rock.png" },
  { label: "Pop", icon: "/assets/icons/Pop.png" },
  { label: "Desi", icon: "/assets/icons/Desi.png" },
  { label: "EDM", icon: "/assets/icons/EDM.png" },
];

// 🔹 Singer’s Voice options
const VOICES = [
  { label: "Male", icon: "/assets/icons/Male.png" },
  { label: "Female", icon: "/assets/icons/Female.png" },
];

export default function Details2() {
  const { userId, receiver_name, gender, setState } = useApp();
  const nav = useNavigate();
  const [mood, setMood] = useState(MOODS[0].label);
  const [genre, setGenre] = useState(GENRES[0].label);
  const [voice, setVoice] = useState(VOICES[0].label);
  const [loading, setLoading] = useState(false);

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/preferences", {
        user_id: userId,
        receiver_name,
        gender,
        genre,
        mood,
        voice,
      });
      const { data } = await api.post("/generate-lyrics", {
        receiver_name,
        gender,
        genre,
        mood,
        voice,
      });
      setState((s: any) => ({ ...s, genre, mood, voice, lyrics: data.lyrics }));
      nav("/final");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center text-center text-white font-gibson overflow-hidden"
      style={{
        backgroundImage: "url('/assets/images/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Floating Decorative Icons */}
      <img
        src="/assets/images/balloon2.png"
        alt="Balloon"
        className="absolute top-[20%] right-4 w-12 md:w-16 animate-bounce-slow"
      />

            <img
        src="/assets/images/musictonesm.png"
        alt="Confetti"
        className="absolute top-[28%] left-6 w-12 md:w-16 animate-float"
      />

      <img
        src="/assets/images/confetti.png"
        alt="Music Note"
        className="absolute bottom-12 right-6 w-10 md:w-14 animate-spin-slow"
      />

      {/* Progress bar */}
      <div className="mt-6 mb-6">
        <img
          src="/assets/images/progress-bar2.png"
          alt="Progress"
          className="mx-auto w-60 md:w-80"
        />
      </div>

      {/* Heading */}
      <h2 className="text-white text-xl md:text-2xl mx-3 font-semibold mb-6">
        What would you like their song’s vibe to be?
      </h2>

      <div>
        <img
          src="/assets/images/Headphone.png"
          alt="Cadbury Celebrations"
          className="mx-auto object-contain w-60 h-auto md:w-80 drop-shadow-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Mood Section */}
      <div className="mb-8 w-full max-w-3xl px-4">
        <div className="bg-[#e9bb72] text-purple-900 font-semibold rounded-t-xl py-2 text-lg">
          Mood
        </div>
        <div className=" border-2 border-[#e9bb72] rounded-b-xl flex justify-between px-4 py-4">
          {MOODS.map((m) => (
            <div
              key={m.label}
              onClick={() => setMood(m.label)}
              className="flex flex-col items-center cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition ${
                  mood === m.label
                    ? "bg-[#e9bb72] border-yellow-400"
                    : "bg-white border-transparent"
                }`}
              >
                <img src={m.icon} alt={m.label} className="w-7 h-7" />
              </div>
              <span className="mt-2 text-xs md:text-sm font-medium">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Genre Section */}
      <div className="mb-8 w-full max-w-3xl px-4">
        <div className="bg-[#e9bb72] text-purple-900 font-semibold rounded-t-xl py-2 text-lg">
          Genre
        </div>
        <div className="border-2 border-[#e9bb72] rounded-b-xl flex justify-between px-4 py-4">
          {GENRES.map((g) => (
            <div
              key={g.label}
              onClick={() => setGenre(g.label)}
              className="flex flex-col items-center cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition ${
                  genre === g.label
                    ? "bg-[#e9bb72] border-yellow-400"
                    : "bg-white border-transparent"
                }`}
              >
                <img src={g.icon} alt={g.label} className="w-7 h-auto" />
              </div>
              <span className="mt-2 text-xs md:text-sm font-medium">
                {g.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Singer's Voice Section */}
   {/* Singer's Voice Section */}
{/* Singer's Voice Section */}
<div className="mb-8 w-full max-w-3xl px-4">
  {/* Header */}
  <div className="bg-[#e9bb72] text-purple-900 font-semibold rounded-t-xl py-3 text-lg text-center">
    Singer’s Voice
  </div>
  
  {/* Options */}
  <div className=" border-2 border-[#e9bb72] rounded-b-xl flex justify-center gap-6 px-6 py-6">
    {VOICES.map((v) => (
      <div
        key={v.label}
        onClick={() => setVoice(v.label)}
        className={`flex flex-col items-center cursor-pointer`}
      >
        {/* Card */}
        <div
          className={`w-28 h-auto rounded-lg flex items-center justify-center border-2 transition ${
            voice === v.label
              ? "bg-[#e9bb72] border-yellow-400"
              : "bg-white border-transparent"
          }`}
        >
          <img src={v.icon} alt={v.label} className="w-11 h-auto" style={{marginTop:'-10px'}} />
        </div>
        {/* Label */}
        <span className="mt-2 text-sm  text-white">
          {v.label}
        </span>
      </div>
    ))}
  </div>
</div>



      {/* Proceed Button */}
      <button
        onClick={submit}
        disabled={loading}
        className="mt-4 mb-10 px-12 py-3 bg-[#e9bb72] text-purple-900 font-semibold rounded-xl shadow-lg hover:bg-yellow-300 transition"
      >
        {loading ? "Generating..." : "Proceed"}
      </button>

      {/* Animations */}
      <style>{`
        .animate-bounce-slow {
          animation: bounce 4s infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
