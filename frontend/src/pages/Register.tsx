import { useState, useRef } from "react";
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const emailRx = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const phoneRx = /^\d{10}$/;
const nameRx = /^[A-Za-z][A-Za-z\s'.-]{1,49}$/;

export default function Register() {
  const nav = useNavigate();
  const { setState } = useApp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    acceptTerms: false,
    acceptPromo: false,
  });
  const [err, setErr] = useState<{ [k: string]: string }>({});
  const [showOTP, setShowOTP] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [otpErr, setOtpErr] = useState("");

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const submit = async (e: any) => {
    e.preventDefault();
    const ne: any = {};
    if (!nameRx.test(form.name)) ne.name = "Enter a valid name";
    if (!emailRx.test(form.email)) ne.email = "Enter a valid email";
    if (!phoneRx.test(form.phone)) ne.phone = "Phone must be 10 digits";
    if (!form.acceptTerms) ne.terms = "You must accept terms";
    setErr(ne);
    if (Object.keys(ne).length) return;

    const { data } = await api.post("/register", form);
    setState((s: any) => ({ ...s, ...form, userId: data.id }));
    setShowOTP(true);
  };

  const handleOtpChange = (val: string, index: number) => {
    if (/^\d?$/.test(val)) {
      const newOtp = [...otpValues];
      newOtp[index] = val;
      setOtpValues(newOtp);
      // auto move forward
      if (val && index < 3) inputsRef.current[index + 1]?.focus();
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otp = otpValues.join("");
    if (otp.length !== 4) {
      setOtpErr("Please enter a valid 4-digit OTP");
      return;
    }
    try {
      const { data } = await api.post("/verify-otp", { otp });
      if (data.ok) {
        setShowOTP(false);
        nav("/details-1");
      } else {
        setOtpErr("Invalid OTP, please try again.");
      }
    } catch {
      setOtpErr("Invalid OTP, please try again.");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center text-center text-white"
      style={{
        backgroundImage: "url('/assets/images/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Progress Bar */}
      <div className="mt-4">
        <img
          src="/assets/images/progress-bar.png"
          alt="Progress"
          className="mx-auto w-60 md:w-80"
        />
      </div>

      {/* Celebration Image */}
      <div className="mt-2 mb-2">
        <img
          src="/assets/images/celebrations-boxnotxt.png"
          alt="Cadbury Celebrations"
          className="mx-auto object-contain w-80 h-auto md:w-100 md:h-auto drop-shadow-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Form */}
      <form
        onSubmit={submit}
        className="flex flex-col items-center px-6 mb-8 w-full max-w-md mx-auto"
      >
        <h2 className="text-white text-lg md:text-xl font-semibold mb-3">
          Register to create
        </h2>

        {/* Phone */}
        <input
          type="text"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full px-4 py-3 mb-2 rounded-full outline-none text-black"
        />
        {err.phone && <p className="text-red-400 text-sm mb-1">{err.phone}</p>}

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 mb-2 rounded-full outline-none text-black"
        />
        {err.name && <p className="text-red-400 text-sm mb-1">{err.name}</p>}

        {/* Email */}
        <input
          type="email"
          placeholder="Email ID"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 mb-2 rounded-full outline-none text-black"
        />
        {err.email && <p className="text-red-400 text-sm mb-1">{err.email}</p>}

        {/* Terms */}
        <div className="grid grid-cols-[auto_1fr] gap-3 mt-3 w-full items-start">
          <input
            type="checkbox"
            checked={form.acceptTerms}
            onChange={(e) => setForm({ ...form, acceptTerms: e.target.checked })}
            className="w-5 mt-2 h-5 appearance-none rounded-full border-2 border-white checked:bg-[#d4a85f] checked:border-white-800 cursor-pointer"
          />
          <label className="text-white text-sm leading-snug text-left">
            I accept Terms & Conditions and Privacy Policy of Mondelez (Cadbury)
          </label>
        </div>
        {err.terms && <p className="text-red-400 text-sm">{err.terms}</p>}

        {/* Promo */}
        <div className="grid grid-cols-[auto_1fr] gap-3 mt-2 w-full items-start">
          <input
            type="checkbox"
            checked={form.acceptPromo}
            onChange={(e) => setForm({ ...form, acceptPromo: e.target.checked })}
            className="w-5 mt-3 h-5 appearance-none rounded-full border-2 border-white checked:bg-[#d4a85f] checked:border-white-800 cursor-pointer"
          />
          <label className="text-white text-sm leading-snug text-left">
            I would like to receive promotional communication from Mondelez
            (Cadbury) about its products and offers.
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-5 px-10 bg-[#e9bb72] text-purple-900 font-semibold py-3 rounded-xl shadow-lg hover:bg-yellow-300 transition"
        >
          Submit
        </button>
      </form>

      {/* OTP Popup */}
      {showOTP && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-75 text-center">
            <h2 className="text-3xl font-semibold font-gibson text-[#31006f] mb-3">
              Enter OTP
            </h2>

            <form onSubmit={handleOTPSubmit} className="flex flex-col gap-4">
              {/* OTP 4 Boxes */}
              <div className="flex justify-center gap-3 ">
                {otpValues.map((val, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputsRef.current[i] = el)}
                    type="text"
                    maxLength={1}
                    value={val}
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    className="w-12 h-12 text-center text-2xl font-bold 
                               rounded-md border-2 border-purple-700 
                               bg-[#31006f] text-[#e9bb72] 
                               focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                ))}
              </div>
              {otpErr && <p className="text-red-500 text-sm">{otpErr}</p>}

              {/* Resend OTP */}
        <button
  type="button"
  className="block ml-auto font-gibson text-sm font-semibold text-[#31006f] underline"
  onClick={() => console.log("Resend OTP clicked")}
>
  Resend OTP
</button>


              {/* Submit OTP */}
              <button
                type="submit"
                className="mx-auto px-12 bg-[#e9bb72] font-gibson text-[#31006f] font-semibold 
                           font-bold py-3 rounded-xl 
                           hover:bg-yellow-300 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
