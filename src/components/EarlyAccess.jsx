import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function EarlyAccess() {
  const [email, setEmail] = useState('')
  const [done,  setDone]  = useState(false)
  const navigate = useNavigate()

  return (
    <section id="early-access" style={{ padding:0, background:'#000', overflow:'hidden' }}>

      <div className="fade-in section-bar">
        <div className="section-bar-line" />
        <span className="section-bar-index">07 — Early Access</span>
        <div className="section-bar-rule" />
        <span className="section-bar-sub">JOIN THE WAITLIST · BE PART OF BUILDING PEACE</span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'#0d0d0d' }}>
        {/* Left — CTA text */}
        <div className="fade-in" style={{ background:'#060606', padding:'64px 64px' }}>
          <div style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'rgba(0,212,170,0.5)',letterSpacing:'0.25em',textTransform:'uppercase',marginBottom:'24px' }}>
            ▸ Currently in development
          </div>
          <h2 style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(2.5rem,4.5vw,5rem)',lineHeight:0.88,letterSpacing:'-0.03em',color:'#e8e6e3',margin:'0 0 28px 0' }}>
            HELP US<br />BUILD<br /><span style={{ color:'#00d4aa' }}>PEACE</span><br />INFRA.
          </h2>
          <p className="glow-text" style={{ color:'#555',fontSize:'14px',lineHeight:1.85,margin:'0 0 32px 0',maxWidth:'360px' }}>
            SETU is an idea backed by research and conviction. We are building the core team, seeking pilot partnerships with district administrations, and looking for NGO collaborators.
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
            {['Early pilot partner access','Research collaboration','District admin demos','Open-source contributor'].map(item => (
              <div key={item} style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                <span style={{ width:'5px',height:'5px',background:'#00d4aa',display:'inline-block',flexShrink:0 }} />
                <span className="glow-text" style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:'#555',letterSpacing:'0.08em' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — sign up form */}
        <div className="fade-in" style={{ background:'#040404', padding:'64px 64px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          {done ? (
            <div style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'48px',color:'#00d4aa',marginBottom:'16px',lineHeight:1 }}>✓</div>
              <div style={{ fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'20px',color:'#e8e6e3',marginBottom:'8px' }}>You're on the list.</div>
              <p style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:'#555',letterSpacing:'0.1em' }}>We'll reach out as development progresses.</p>
            </div>
          ) : (
            <>
              <div style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:'#555',letterSpacing:'0.2em',textTransform:'uppercase',marginBottom:'28px' }}>
                Create an account to get updates
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'20px' }}>
                <button
                  onClick={() => navigate('/signup')}
                  className="btn-primary"
                  style={{ fontSize:'11px',padding:'14px 28px',width:'100%',justifyContent:'center' }}
                >
                  Create Account → Get Early Access
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="btn-outline"
                  style={{ fontSize:'11px',padding:'14px 28px',width:'100%',justifyContent:'center' }}
                >
                  Already have an account? Log In
                </button>
              </div>
              <p style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'#2a2a2a',letterSpacing:'0.1em',textAlign:'center',lineHeight:1.6 }}>
                No spam. No tracking. Just updates on SETU's development.<br />You can delete your account at any time.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
