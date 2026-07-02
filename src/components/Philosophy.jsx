const VALUES = [
  { num:'01', title:'Proactivity over Reactivity', color:'#00d4aa',
    body:'Traditional systems respond after violence erupts. SETU is designed to intervene before a spark becomes a fire — shifting the paradigm from crisis management to crisis prevention.' },
  { num:'02', title:'Empathy over Algorithms', color:'#a78bfa',
    body:'Every data point in SETU represents a human story. The platform is designed to humanize rather than categorize — ensuring that technology serves dignity, not surveillance.' },
  { num:'03', title:'Truth over Virality', color:'#00d084',
    body:'In a world where lies travel faster than facts, SETU commits to building systems that make truth more accessible, more shareable, and more actionable than misinformation.' },
  { num:'04', title:'Dignity in Crisis', color:'#38bdf8',
    body:'When prevention fails, SETU\'s humanitarian layer ensures that displaced and affected communities are met with coordinated support — not bureaucratic silence.' },
]

export default function Philosophy() {
  return (
    <section id="philosophy" style={{ padding:0, background:'#000', overflow:'hidden' }}>

      <div className="fade-in section-bar">
        <div className="section-bar-line" />
        <span className="section-bar-index">06 — Philosophy</span>
        <div className="section-bar-rule" />
        <span className="section-bar-sub">GUIDING PRINCIPLES · WHY WE BUILD THIS WAY</span>
      </div>

      {/* Central quote */}
      <div className="fade-in" style={{ background:'#060606', padding:'52px 80px', borderBottom:'1px solid #111' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center' }}>
          <div>
            <h2 style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(3rem,5vw,5.5rem)',lineHeight:0.88,letterSpacing:'-0.035em',color:'#e8e6e3',margin:'0 0 24px 0' }}>
              BUILT ON<br /><span style={{ color:'#00d4aa' }}>PRINCIPLE,</span><br />NOT PROFIT.
            </h2>
            <div style={{ borderLeft:'3px solid #00d4aa', paddingLeft:'20px' }}>
              <div style={{ fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'20px',color:'#00d4aa',marginBottom:'8px' }}>
                अहिंसा परमो धर्म
              </div>
              <p className="glow-text" style={{ color:'#444',fontSize:'13px',lineHeight:1.75,margin:0 }}>
                "Non-violence is the highest duty." — Mahabharata, 13.115.1<br />
                SETU is not a commercial product. It is a civic technology concept — built for communities, funded by conviction.
              </p>
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'1px', background:'#111' }}>
            {VALUES.slice(0,2).map(v => (
              <div key={v.num} style={{ background:'#050505', padding:'24px 28px', borderLeft:`2px solid ${v.color}` }}>
                <div style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'8px',color:v.color,letterSpacing:'0.15em',marginBottom:'6px' }}>{v.num}</div>
                <div style={{ fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'14px',color:'#e8e6e3',marginBottom:'8px' }}>{v.title}</div>
                <p className="glow-text" style={{ color:'#444',fontSize:'12px',lineHeight:1.7,margin:0 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom 4-col principles */}
      <div className="fade-in stagger-reveal" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'#0d0d0d' }}>
        {VALUES.map(v => (
          <div key={v.num} className="principle-card" style={{ background:'#050505', padding:'32px 28px', borderLeftColor:`${v.color}25` }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
              <span style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:v.color,letterSpacing:'0.15em',opacity:0.6 }}>{v.num}</span>
              <span style={{ width:'4px',height:'4px',background:v.color,display:'inline-block' }} />
            </div>
            <div style={{ fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'14px',color:'#e8e6e3',marginBottom:'12px',lineHeight:1.2 }}>{v.title}</div>
            <p className="glow-text" style={{ fontSize:'12px',color:'#444',lineHeight:1.7,margin:0 }}>{v.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
