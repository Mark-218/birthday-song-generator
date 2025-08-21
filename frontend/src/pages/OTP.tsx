import OTPInput from '../components/OTPInput'
import api from '../lib/axios'
import { useNavigate } from 'react-router-dom'

export default function OTP(){
  const nav = useNavigate()
  return <OTPInput onSubmit={async (otp)=>{
    try {
      const { data } = await api.post('/verify-otp', { otp })
      if (data.ok) nav('/details-1')
    } catch {
      alert('Invalid OTP')
    }
  }}/>
}
