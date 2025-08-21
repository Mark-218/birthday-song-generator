import { useRef } from 'react';

export default function OTPInput({ onSubmit }:{ onSubmit: (otp: string)=>void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSubmit(ref.current?.value || '')}} className="card">
      <h2 className="text-xl font-semibold mb-2">Enter OTP</h2>
      <p className="text-sm text-gray-600 mb-4">Use the mock OTP: <b>1234</b></p>
      <input ref={ref} maxLength={4} placeholder="1234" className="input text-center text-2xl tracking-widest" />
      <button className="btn w-full mt-4">Verify</button>
    </form>
  )
}
