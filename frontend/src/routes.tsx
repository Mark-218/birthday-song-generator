import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Register from './pages/Register'
import OTP from './pages/OTP'
import Details1 from './pages/Details1'
import Details2 from './pages/Details2'
import FinalLyrics from './pages/FinalLyrics'
import Layout from './components/Layout'
import { AppProvider } from './context/AppContext'

export default function RoutesView(){
  return (
    <AppProvider>
      <Layout>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/otp' element={<OTP/>} />
          <Route path='/details-1' element={<Details1/>} />
          <Route path='/details-2' element={<Details2/>} />
          <Route path='/final' element={<FinalLyrics/>} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Layout>
    </AppProvider>
  )
}
