import { Link } from 'react-router-dom'

export default function Footer() {
  const PILLARS = [
    { name:'KAVACH',  color:'#ff6b35', href:'#pillars',  desc:'Early Warning' },
    { name:'SACHCHI', color:'#00d084', href:'#pillars',  desc:'Fact-Check' },
    { name:'SANGAM',  color:'#a78bfa', href:'#pillars',  desc:'Dialogue' },
    { name:'DASTAAN', color:'#f59e0b', href:'#pillars',  desc:'Archive' },
    { name:'PANAH',   color:'#38bdf8', href:'#pillars',  desc:'Displaced Aid' },
  ]

  return (
    <footer style={{ background:'#000', borderTop:'1px solid #161616' }}>
      {/* Top grid — 3 columns */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'1px', background:'#0d0d0d' }}>
        {/* Brand */}
        <div style={{ background:'#030303', padding:'40px 44px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
            <div style={{ width:'28px', height:'28px', background:'#00d4aa', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'14px', color:'#000' }}>S</span>
            </div>
            <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'16px', color:'#e8e6e3' }}>SETU</span>
          </div>
          <p className="glow-text" style={{ color:'#333', fontSize:'12px', lineHeight:1.7, marginBottom:'16px' }}>
            Bridging communities through AI-powered early warning, fact-checking, and dialogue. Ek platform jo todta nahi, jodta hai.
          </p>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#1a1a1a', letterSpacing:'0.15em' }}>
            PEACE INTELLIGENCE UNIT · 2026
          </div>
        </div>

        {/* Pillars */}
        <div style={{ background:'#030303', padding:'40px 44px' }}>
          <div className="label-mono" style={{ marginBottom:'16px' }}>Five Pillars</div>
          <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
            {PILLARS.map(p => (
              <a key={p.name} href={p.href} className="row-item" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none', padding:'4px 0' }}>
                <span style={{ width:'5px', height:'5px', background:p.color, display:'inline-block', flexShrink:0 }} />
                <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'11px', color:p.color, letterSpacing:'0.1em' }}>{p.name}</span>
                <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#222' }}>— {p.desc}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Connect */}
        <div style={{ background:'#030303', padding:'40px 44px' }}>
          <div className="label-mono" style={{ marginBottom:'16px' }}>Connect</div>
          <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
            {[['Submit a Tip','#sachchi'],['Record Dastaan','#dastaan'],['Join a Circle','#sangam'],['Register P-ID','#panah'],['Operator Access','#kavach']].map(([label,href]) => (
              <a key={label} href={href} className="glow-text" style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'11px', color:'#333', letterSpacing:'0.08em', textDecoration:'none' }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ padding:'20px 44px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid #111' }}>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#1a1a1a', letterSpacing:'0.12em' }}>
          © 2026 SETU — PEACE INTELLIGENCE UNIT
        </span>
        <div style={{ display:'flex', gap:'16px' }}>
          {['Privacy','Terms','Ethics Charter','Open Audit'].map(l => (
            <span key={l} className="glow-text" style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#1a1a1a', letterSpacing:'0.1em', cursor:'pointer' }}>{l}</span>
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
          <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#00d4aa', display:'inline-block', animation:'breathePulse 2s ease-in-out infinite' }} />
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'rgba(0,212,170,0.4)', letterSpacing:'0.15em' }}>SYSTEMS ONLINE</span>
        </div>
      </div>
    </footer>
  )
}
