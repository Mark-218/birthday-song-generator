import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ChevronDown } from "lucide-react";

// 🔹 Reusable ModernDropdown Component
function ModernDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="w-full mb-5 font-gibson last:mb-3">
      <label className="text-white font-semibold mb-2 block text-center text-base">
        {label}
      </label>
      <div className="relative">
        {/* Box */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full h-12 px-5 bg-white text-black rounded-full shadow-md cursor-pointer select-none hover:shadow-lg transition"
        >
          <span className="truncate text-[#32006e] font-semibold text-[15px]">
            {value}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-purple-800 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-44 overflow-y-auto animate-fadeIn">
            {options.map((opt, i) => (
              <div
                key={i}
                onClick={() => handleSelect(opt)}
                className="px-5 py-2.5 text-sm text-black hover:bg-gray-100 cursor-pointer transition"
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Scrollbar */}
      <style>{`
        .max-h-44::-webkit-scrollbar {
          width: 6px;
        }
        .max-h-44::-webkit-scrollbar-track {
          background: transparent;
        }
        .max-h-44::-webkit-scrollbar-thumb {
          background: #b38cd9;
          border-radius: 9999px;
        }
        .max-h-44::-webkit-scrollbar-thumb:hover {
          background: #8e5cc5;
        }
      `}</style>
    </div>
  );
}

export default function Details1() {
  const { setState } = useApp();
  const nav = useNavigate();

  const [receiver_name, setReceiver] = useState("");
  const [error, setError] = useState("");
  const [age, setAge] = useState<number>(23); // ✅ Store age as number
  const [gender, setGender] = useState<"Male" | "Female">("Male");

  const submit = (e: any) => {
    e.preventDefault();

    if (!receiver_name.trim()) {
      setError("Please enter their name");
      return;
    }

    setError("");
    setState((s: any) => ({ ...s, receiver_name, age, gender })); // ✅ age is number
    nav("/details-2");
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
      {/* Decorative Floating Icons */}
      <img
        src="/assets/images/balloon.png"
        alt="Balloon"
        className="absolute top-1/4 right-4 w-12 md:w-16 animate-bounce-slow"
      />
      <img
        src="/assets/images/confetti.png"
        alt="Confetti"
        className="absolute top-[35%] left-6 w-10 md:w-14 animate-spin-slow"
      />
      <img
        src="/assets/images/musicnote.png"
        alt="Music Note"
        className="absolute bottom-6 left-10 w-7 md:w-12 animate-float"
      />

      {/* Progress Bar */}
      <div className="mt-6 mb-6">
        <img
          src="/assets/images/progress-bar1.png"
          alt="Progress"
          className="mx-auto w-60 md:w-80"
        />
      </div>

      {/* Heading */}
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-6">
        Tell us about your loved one…
      </h2>

      {/* Gift + Party Hat Image */}
      <div className="mb-6">
        <img
          src="/assets/images/Cap&Gift.png"
          alt="Celebration"
          className="mx-auto object-contain w-60 md:w-72 drop-shadow-lg"
        />
      </div>

      {/* Form */}
      <form
        onSubmit={submit}
        className="flex flex-col items-center px-6 mb-10 w-full max-w-md mx-auto text-left"
      >
        {/* Name Field */}
        <label className="text-white font-gibson font-semibold mb-2 block text-center text-base">
          Their name
        </label>
        <input
          type="text"
          value={receiver_name}
          onChange={(e) => setReceiver(e.target.value)}
          className="w-full h-12 px-5 mb-3 rounded-full outline-none text-black placeholder-gray-400 font-gibson font-semibold text-[15px] tracking-wide border border-gray-300 focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/30 transition"
          placeholder="XXXXXXXXXXXX"
        />
        {error && (
          <p className="text-red-500 text-sm mt-2 mb-3 text-center">{error}</p>
        )}

        {/* Age Field */}
        <ModernDropdown
          label="How old they'll be this birthday"
          value={`${age} Years`} // ✅ Show with "Years"
          options={Array.from({ length: 80 }, (_, i) => `${i + 1}`)} // ✅ Numeric options
          onChange={(val) => setAge(Number(val))} // ✅ Convert string to number
        />

        {/* Gender Field */}
        <ModernDropdown
          label="Gender"
          value={gender}
          options={["Male", "Female"]}
          onChange={(val) => setGender(val as "Male" | "Female")}
        />

        {/* Proceed Button */}
        <button
          type="submit"
          className="mt-3 px-12 py-3 bg-[#e9bb72] text-purple-900 font-semibold rounded-xl shadow-lg hover:bg-yellow-300 transition"
        >
          Proceed
        </button>
      </form>

      {/* Animations */}
      <style>{`
        .animate-bounce-slow {
          animation: bounce 4s infinite;
        }
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
}
