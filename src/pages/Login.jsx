import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const PILLARS = [
  { label:'KAVACH',  color:'#ff6b35' },
  { label:'SACHCHI', color:'#00d084' },
  { label:'SANGAM',  color:'#a78bfa' },
  { label:'DASTAAN', color:'#f59e0b' },
  { label:'PANAH',   color:'#38bdf8' },
]

function BrandPanel() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha:false })
    let animId, t=0, dpr=Math.min(window.devicePixelRatio||1,2)
    const resize = () => {
      dpr=Math.min(window.devicePixelRatio||1,2)
      canvas.width=canvas.offsetWidth*dpr; canvas.height=canvas.offsetHeight*dpr
      ctx.setTransform(dpr,0,0,dpr,0,0)
    }
    resize(); window.addEventListener('resize', resize)
    const packets = PILLARS.map((_,i)=>PILLARS.map((_,j)=>({progress:(i*0.3+j*0.15)%1})))
    const draw = () => {
      t+=0.005
      const W=canvas.offsetWidth, H=canvas.offsetHeight
      ctx.fillStyle='#000'; ctx.fillRect(0,0,W,H)
      const cx=W*0.5, cy=H*0.48, R=Math.min(W,H)*0.28
      ctx.fillStyle='rgba(0,212,170,0.01)'
      for(let x=0;x<W;x+=44) for(let y=0;y<H;y+=44) ctx.fillRect(x,y,1,1)
      ;[R*0.4,R*0.7,R,R*1.3].forEach(r=>{
        ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2)
        ctx.strokeStyle='rgba(0,212,170,0.04)';ctx.lineWidth=0.5;ctx.stroke()
      })
      const nodes=PILLARS.map((p,i)=>{
        const angle=(i/5)*Math.PI*2-Math.PI/2+t*0.05
        return{x:cx+Math.cos(angle)*R,y:cy+Math.sin(angle)*R,...p}
      })
      for(let a=0;a<nodes.length;a++) for(let b=a+1;b<nodes.length;b++){
        const nA=nodes[a],nB=nodes[b]
        ctx.beginPath();ctx.moveTo(nA.x,nA.y);ctx.lineTo(nB.x,nB.y)
        ctx.strokeStyle='rgba(0,212,170,0.05)';ctx.lineWidth=0.5;ctx.stroke()
        packets[a][b].progress=(packets[a][b].progress+0.003)%1
        const prog=packets[a][b].progress
        const px=nA.x+(nB.x-nA.x)*prog,py=nA.y+(nB.y-nA.y)*prog
        ctx.beginPath();ctx.arc(px,py,1.4,0,Math.PI*2);ctx.fillStyle='rgba(0,212,170,0.5)';ctx.fill()
      }
      nodes.forEach((n,i)=>{
        const pulse=1+Math.sin(t*2.2+i*1.2)*0.1
        const g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,20*pulse)
        g.addColorStop(0,'rgba(0,212,170,0.25)');g.addColorStop(1,'rgba(0,212,170,0)')
        ctx.beginPath();ctx.arc(n.x,n.y,20*pulse,0,Math.PI*2);ctx.fillStyle=g;ctx.fill()
        ctx.beginPath();ctx.arc(n.x,n.y,3.5,0,Math.PI*2);ctx.fillStyle=n.color;ctx.fill()
      })
      ctx.beginPath();ctx.arc(cx,cy,3,0,Math.PI*2);ctx.fillStyle='#00d4aa';ctx.fill()
      animId=requestAnimationFrame(draw)
    }
    draw()
    return ()=>{cancelAnimationFrame(animId);window.removeEventListener('resize',resize)}
  },[])

  return (
    <div style={{ position:'relative', height:'100%', display:'flex', flexDirection:'column' }}>
      <canvas ref={canvasRef} style={{ position:'absolute',inset:0,width:'100%',height:'100%' }} />
      <div style={{ position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 100%)',pointerEvents:'none' }} />
      <div style={{ position:'relative',zIndex:1,padding:'48px',display:'flex',flexDirection:'column',height:'100%' }}>
        <Link to="/" style={{ display:'flex',alignItems:'center',gap:'10px',textDecoration:'none',marginBottom:'auto' }}>
          <div style={{ width:'28px',height:'28px',background:'#00d4aa',display:'flex',alignItems:'center',justifyContent:'center' }}>
            <span style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'14px',color:'#000' }}>S</span>
          </div>
          <span style={{ fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'16px',color:'#e8e6e3' }}>SETU</span>
        </Link>
        <div style={{ marginBottom:'auto' }}>
          <h1 style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(2.5rem,4vw,4.5rem)',lineHeight:0.88,letterSpacing:'-0.035em',color:'#e8e6e3',margin:'0 0 20px 0' }}>
            BRIDGE.<br /><span style={{ color:'#00d4aa' }}>DON'T</span><br />DIVIDE.
          </h1>
          <p style={{ fontFamily:'Space Grotesk,sans-serif',fontWeight:300,fontSize:'14px',color:'#555',lineHeight:1.75,margin:'0 0 32px 0',maxWidth:'320px' }}>
            India's first Peace Intelligence Platform. Detect tension. Debunk lies. Bridge communities.
          </p>
          <div style={{ display:'flex',flexDirection:'column',gap:'8px' }}>
            {PILLARS.map(p=>(
              <div key={p.label} style={{ display:'flex',alignItems:'center',gap:'8px' }}>
                <span style={{ width:'4px',height:'4px',background:p.color,display:'inline-block' }} />
                <span style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:p.color,letterSpacing:'0.12em' }}>{p.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'8px',color:'#1a1a1a',letterSpacing:'0.15em' }}>
          PEACE INTELLIGENCE UNIT · 2026
        </div>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink:0 }}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

export default function Login() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [gLoading, setGLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setError(error.message)
    else navigate('/')
  }

  const handleGoogle = async () => {
    setGLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider:'google',
      options:{ redirectTo: window.location.origin }
    })
    if (error) { setError(error.message); setGLoading(false) }
  }

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'100vh', background:'#000' }}>
      {/* Left brand panel */}
      <div style={{ borderRight:'1px solid #1c1c1c' }}>
        <BrandPanel />
      </div>

      {/* Right form panel */}
      <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', padding:'80px 72px', background:'#050505' }}>
        <div style={{ maxWidth:'400px', width:'100%' }}>
          {/* Header */}
          <div style={{ marginBottom:'40px' }}>
            <div style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'rgba(0,212,170,0.5)',letterSpacing:'0.25em',textTransform:'uppercase',marginBottom:'16px' }}>
              Welcome back
            </div>
            <h2 style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(1.8rem,3vw,2.8rem)',lineHeight:0.92,letterSpacing:'-0.03em',color:'#e8e6e3',margin:0 }}>
              Sign in to<br /><span style={{ color:'#00d4aa' }}>SETU</span>
            </h2>
          </div>

          {/* Google OAuth */}
          <button onClick={handleGoogle} disabled={gLoading} style={{
            width:'100%', padding:'13px 20px', background:'transparent',
            border:'1px solid #2a2a2a', color:'#e8e6e3', cursor:'pointer',
            fontFamily:'Space Grotesk,sans-serif', fontSize:'13px', fontWeight:500,
            display:'flex', alignItems:'center', justifyContent:'center', gap:'10px',
            marginBottom:'24px', transition:'border-color 0.2s, background 0.2s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='#555'; e.currentTarget.style.background='#0a0a0a'}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='#2a2a2a'; e.currentTarget.style.background='transparent'}}
          >
            <GoogleIcon />
            {gLoading ? 'Redirecting…' : 'Continue with Google'}
          </button>

          {/* Divider */}
          <div style={{ display:'flex',alignItems:'center',gap:'16px',marginBottom:'24px' }}>
            <div style={{ flex:1,height:'1px',background:'#1c1c1c' }} />
            <span style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'#333',letterSpacing:'0.15em' }}>OR</span>
            <div style={{ flex:1,height:'1px',background:'#1c1c1c' }} />
          </div>

          {/* Email/Password form */}
          <form onSubmit={handleLogin} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
            <div>
              <label style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'#555',letterSpacing:'0.15em',textTransform:'uppercase',display:'block',marginBottom:'8px' }}>Email</label>
              <input
                type="email" value={email} onChange={e=>setEmail(e.target.value)} required
                placeholder="you@example.com"
                style={{ width:'100%',padding:'12px 16px',background:'#0a0a0a',border:'1px solid #1c1c1c',color:'#e8e6e3',fontFamily:'Space Grotesk,sans-serif',fontSize:'14px',outline:'none',transition:'border-color 0.2s',boxSizing:'border-box' }}
                onFocus={e=>e.target.style.borderColor='rgba(0,212,170,0.4)'}
                onBlur={e=>e.target.style.borderColor='#1c1c1c'}
              />
            </div>
            <div>
              <label style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'#555',letterSpacing:'0.15em',textTransform:'uppercase',display:'block',marginBottom:'8px' }}>Password</label>
              <input
                type="password" value={password} onChange={e=>setPassword(e.target.value)} required
                placeholder="••••••••"
                style={{ width:'100%',padding:'12px 16px',background:'#0a0a0a',border:'1px solid #1c1c1c',color:'#e8e6e3',fontFamily:'Space Grotesk,sans-serif',fontSize:'14px',outline:'none',transition:'border-color 0.2s',boxSizing:'border-box' }}
                onFocus={e=>e.target.style.borderColor='rgba(0,212,170,0.4)'}
                onBlur={e=>e.target.style.borderColor='#1c1c1c'}
              />
            </div>

            {error && (
              <div style={{ padding:'10px 14px',background:'rgba(255,107,53,0.08)',border:'1px solid rgba(255,107,53,0.2)',fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:'#ff6b35',lineHeight:1.5 }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary" style={{ width:'100%',justifyContent:'center',padding:'14px',fontSize:'11px',marginTop:'4px',opacity:loading?0.6:1 }}>
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>

          {/* Footer links */}
          <div style={{ marginTop:'28px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <Link to="/signup" style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'#555',letterSpacing:'0.1em',textDecoration:'none',transition:'color 0.2s' }}
              onMouseEnter={e=>e.target.style.color='#00d4aa'}
              onMouseLeave={e=>e.target.style.color='#555'}
            >
              No account? Sign up →
            </Link>
            <Link to="/" style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'#333',letterSpacing:'0.1em',textDecoration:'none' }}>
              ← Back to site
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
