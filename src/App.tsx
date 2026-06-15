import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Overview from './pages/Overview'
import Curriculum from './pages/Curriculum'
import SessionDetail from './pages/SessionDetail'
import Outcomes from './pages/Outcomes'
import Tools from './pages/Tools'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/curriculum/:no" element={<SessionDetail />} />
          <Route path="/outcomes" element={<Outcomes />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
