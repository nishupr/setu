const PILLARS = [
  {
    num:'01', name:'KAVACH', hindi:'कवच', color:'#ff6b35',
    tagline:'Early Warning Radar',
    desc:'An AI-powered monitoring layer that scans social media, news, and messaging platforms across 14 regional languages — detecting tension spikes before they become violence.',
    tags:['Sentiment Analysis','Bot Detection','Regional Heatmap','72-Hour Alerts'],
  },
  {
    num:'02', name:'SACHCHI', hindi:'सच्ची', color:'#00d084',
    tagline:'Misinformation Killer',
    desc:'A public fact-checking engine that lets citizens verify viral claims in seconds. AI deepfake detection, source verification, and a real-time database of debunked content.',
    tags:['Deepfake Lab','Source Check','14 Languages','Verified Archive'],
  },
  {
    num:'03', name:'SANGAM', hindi:'संगम', color:'#a78bfa',
    tagline:'Community Dialogue Space',
    desc:'Mediated, anonymous dialogue circles that bring people from opposing communities together. AI moderation ensures safety while preserving authentic conversation.',
    tags:['Anonymous Circles','AI Moderation','Virtual Town Halls','Cross-community'],
  },
  {
    num:'04', name:'DASTAAN', hindi:'दास्तान', color:'#f59e0b',
    tagline:'Memory & Story Archive',
    desc:'A living archive of first-person testimonies, oral histories, and reconciliation stories from conflict zones across India — preserving human truth as an antidote to hatred.',
    tags:['Oral History','Geolocation','22 Languages','Open Access'],
  },
  {
    num:'05', name:'PANAH', hindi:'पनाह', color:'#38bdf8',
    tagline:'Displaced Person Support',
    desc:'A humanitarian logistics platform for those displaced by conflict. Digital identity tokens, camp locators, scheme access, and AI-powered family reunification.',
    tags:['Digital P-ID','Camp Locator','Family Reunion','Scheme Access'],
  },
]

export default function Pillars() {
  return (
    <section id="pillars" style={{ padding:0, background:'#000', overflow:'hidden' }}>

      <div className="fade-in section-bar">
        <div className="section-bar-line" />
        <span className="section-bar-index">03 — Five Pillars</span>
        <div className="section-bar-rule" />
        <span className="section-bar-sub">WHAT SETU DOES · THE FIVE MODULES</span>
      </div>

      {/* Intro */}
      <div className="fade-in" style={{ background:'#060606', padding:'44px 80px', borderBottom:'1px solid #111' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center' }}>
          <h2 style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(2.5rem,4vw,5rem)',lineHeight:0.9,letterSpacing:'-0.03em',color:'#e8e6e3',margin:0 }}>
            ONE PLATFORM.<br /><span style={{ color:'#00d4aa' }}>FIVE PILLARS.</span><br />ZERO DIVISION.
          </h2>
          <p className="glow-text" style={{ color:'#555',fontSize:'15px',lineHeight:1.85,margin:0 }}>
            Each pillar of SETU addresses a distinct phase of the conflict lifecycle — from early detection to long-term healing. Together they form a complete peace infrastructure.
          </p>
        </div>
      </div>

      {/* Pillars — full-width rows */}
      {PILLARS.map((p, i) => (
        <div key={p.name} className="fade-in row-item" style={{ display:'grid', gridTemplateColumns:'80px 220px 1fr auto', gap:'1px', background:'#0d0d0d', borderBottom:'1px solid #0d0d0d', alignItems:'stretch' }}>
          {/* Number */}
          <div style={{ background:'#030303', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:p.color,letterSpacing:'0.15em',opacity:0.5 }}>{p.num}</span>
          </div>
          {/* Name */}
          <div style={{ background:'#050505', padding:'28px 28px', display:'flex', flexDirection:'column', justifyContent:'center', borderLeft:`3px solid ${p.color}` }}>
            <div style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'22px',color:p.color,marginBottom:'4px' }}>{p.name}</div>
            <div style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'#333',letterSpacing:'0.12em' }}>{p.hindi} · {p.tagline}</div>
          </div>
          {/* Description */}
          <div style={{ background:'#040404', padding:'28px 36px', display:'flex', alignItems:'center' }}>
            <p className="glow-text" style={{ color:'#555',fontSize:'13px',lineHeight:1.75,margin:0 }}>{p.desc}</p>
          </div>
          {/* Tags */}
          <div style={{ background:'#030303', padding:'20px 24px', display:'flex', flexDirection:'column', gap:'6px', justifyContent:'center', minWidth:'160px' }}>
            {p.tags.map(tag => (
              <span key={tag} style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:`${p.color}70`,border:`1px solid ${p.color}25`,padding:'3px 8px',letterSpacing:'0.08em',whiteSpace:'nowrap' }}>{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
