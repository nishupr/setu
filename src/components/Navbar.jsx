import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const NAV_LINKS = [
  ['Problem',    '#problem'     ],
  ['Pillars',    '#pillars'     ],
  ['How It Works','#how-it-works'],
  ['Philosophy', '#philosophy'  ],
]

export default function Navbar() {
  const [active,   setActive]   = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [user,     setUser]     = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive:true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['problem','pillars','how-it-works','philosophy','early-access']
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold:0.35 }
    )
    ids.forEach(id => { const el=document.getElementById(id); if(el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  // Auth state listener
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null))
    const { data:{ subscription } } = supabase.auth.onAuthStateChange((_,session) => {
      setUser(session?.user || null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:1000,
      height:'52px',
      background: scrolled ? 'rgba(0,0,0,0.96)' : 'rgba(0,0,0,0.88)',
      borderBottom:'1px solid #1c1e1c',
      backdropFilter:'blur(12px)',
      display:'flex', alignItems:'center',
      padding:'0 32px', justifyContent:'space-between',
      transition:'background 0.3s',
    }}>
      {/* Logo */}
      <Link to="/" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none' }}>
        <div style={{ width:'28px',height:'28px',background:'#00d4aa',display:'flex',alignItems:'center',justifyContent:'center' }}>
          <span style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'13px',color:'#000',letterSpacing:'-0.02em' }}>S</span>
        </div>
        <span style={{ fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'15px',color:'#e8e6e3',letterSpacing:'-0.01em' }}>SETU</span>
        <span style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'#2a2a2a',letterSpacing:'0.15em',marginLeft:'4px' }}>PEACE · INTELLIGENCE</span>
      </Link>

      {/* Nav links */}
      <div style={{ display:'flex', alignItems:'center', gap:'28px' }}>
        {NAV_LINKS.map(([label,href]) => {
          const id = href.slice(1)
          const isActive = active === id
          return (
            <a key={label} href={href}
              className={isActive ? 'nav-active' : ''}
              style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'10px',letterSpacing:'0.1em',textTransform:'uppercase',color:isActive?'#00d4aa':'#444',textDecoration:'none',transition:'color 0.2s' }}
              onMouseEnter={e=>(e.target.style.color='#e8e6e3')}
              onMouseLeave={e=>(e.target.style.color=isActive?'#00d4aa':'#444')}
            >{label}</a>
          )
        })}

        {user ? (
          // Logged in state
          <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <div style={{ width:'24px',height:'24px',borderRadius:'50%',background:'#00d4aa',display:'flex',alignItems:'center',justifyContent:'center' }}>
                <span style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'10px',color:'#000' }}>
                  {(user.user_metadata?.full_name||user.email||'U')[0].toUpperCase()}
                </span>
              </div>
              <span style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'#555',letterSpacing:'0.08em' }}>
                {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </span>
            </div>
            <button onClick={handleLogout} className="btn-outline" style={{ padding:'6px 14px',fontSize:'10px' }}>
              Sign Out
            </button>
          </div>
        ) : (
          // Logged out state
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <Link to="/login" style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'10px',letterSpacing:'0.1em',textTransform:'uppercase',color:'#444',textDecoration:'none',padding:'6px 12px',transition:'color 0.2s' }}
              onMouseEnter={e=>e.target.style.color='#e8e6e3'}
              onMouseLeave={e=>e.target.style.color='#444'}
            >Login</Link>
            <Link to="/signup" className="btn-primary" style={{ padding:'6px 14px',fontSize:'10px' }}>
              Get Access
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
