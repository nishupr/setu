import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Layout
import MobileBlock      from './components/MobileBlock'
import Navbar           from './components/Navbar'
import SplineBackground from './components/SplineBackground'
import Splash           from './components/Splash'
import Footer           from './components/Footer'

// Landing page sections
import Hero        from './components/Hero'
import Problem     from './components/Problem'
import Pillars     from './components/Pillars'
import HowItWorks  from './components/HowItWorks'
import Philosophy  from './components/Philosophy'
import EarlyAccess from './components/EarlyAccess'

// Auth pages
import Login  from './pages/Login'
import Signup from './pages/Signup'

function LandingPage({ splashDone }) {
  const dotRef      = useRef(null)
  const ringRef     = useRef(null)
  const progressRef = useRef(null)
  const _mouse = useRef({ x:-100, y:-100 })
  const _ring  = useRef({ x:-100, y:-100 })

  // fade-in observer
  useEffect(() => {
    if (!splashDone) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold:0.08, rootMargin:'0px 0px -40px 0px' }
    )
    setTimeout(() => {
      document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    }, 100)
    return () => observer.disconnect()
  }, [splashDone])

  // cursor + scroll progress
  useEffect(() => {
    document.body.classList.add('has-cursor')
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      if (progressRef.current)
        progressRef.current.style.width = (scrollTop/(scrollHeight-clientHeight))*100+'%'
    }
    window.addEventListener('scroll', onScroll, { passive:true })
    const onMove = (e) => {
      _mouse.current = { x:e.clientX, y:e.clientY }
      if (dotRef.current) { dotRef.current.style.left=e.clientX+'px'; dotRef.current.style.top=e.clientY+'px' }
      const isHover = e.target.tagName==='A'||e.target.tagName==='BUTTON'||!!e.target.closest('a,button')
      ringRef.current?.classList.toggle('hover', isHover)
    }
    window.addEventListener('mousemove', onMove)
    let raf
    const animRing = () => {
      _ring.current.x += (_mouse.current.x-_ring.current.x)*0.15
      _ring.current.y += (_mouse.current.y-_ring.current.y)*0.15
      if (ringRef.current) { ringRef.current.style.left=_ring.current.x+'px'; ringRef.current.style.top=_ring.current.y+'px' }
      raf = requestAnimationFrame(animRing)
    }
    raf = requestAnimationFrame(animRing)
    return () => {
      document.body.classList.remove('has-cursor')
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}      className="cursor-dot"      style={{ left:'-100px',top:'-100px' }} />
      <div ref={ringRef}     className="cursor-ring"     style={{ left:'-100px',top:'-100px' }} />
      <div ref={progressRef} className="scroll-progress" style={{ width:'0%' }} />

      <div style={{ background:'transparent', minHeight:'100vh', position:'relative' }}>
        <SplineBackground />
        <div style={{ position:'relative', zIndex:1 }}>
          <Navbar />
          <Hero />
          <Problem />
          <Pillars />
          <HowItWorks />
          <Philosophy />
          <EarlyAccess />
          <Footer />
        </div>
      </div>
    </>
  )
}

function App() {
  const [splashDone, setSplashDone] = useState(false)
  const [isMobile,   setIsMobile]   = useState(() => window.innerWidth < 1024)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) return <MobileBlock />

  return (
    <BrowserRouter>
      {!splashDone && (
        <Splash onDone={() => {
          window.scrollTo({ top:0, behavior:'instant' })
          setSplashDone(true)
        }} />
      )}
      <Routes>
        <Route path="/"       element={<LandingPage splashDone={splashDone} />} />
        <Route path="/login"  element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
