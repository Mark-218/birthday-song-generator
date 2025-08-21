import Header from './Header'
import Container from './Container'

export default function Layout({ children }: { children: React.ReactNode }){
  return (
    <div className="min-h-screen bg-[#420096]">
      <Header/>
      <Container>
        <div className="max-w-xl mx-auto">{children}</div>
      </Container>
    </div>
  )
}