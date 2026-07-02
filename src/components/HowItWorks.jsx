const STEPS = [
  {
    num:'01', label:'Signal Detection', color:'#ff6b35',
    head:'KAVACH detects a tension spike',
    body:'Natural language processing scans thousands of social media posts, news articles, and encrypted messaging metadata per minute across 14 regional languages — flagging coordinated narratives and anomalous sentiment shifts.',
    source:'Inspired by: GDELT Project, Social Observatory for Communal Harmony (SOCH)',
  },
  {
    num:'02', label:'Truth Verification', color:'#00d084',
    head:'SACHCHI cross-checks the claim',
    body:'Suspected misinformation is run against verified news databases, official government records, and metadata analysis. Deepfake detection algorithms verify authenticity of viral images and videos within minutes.',
    source:'Methodology: AltNews verification framework, MIT Media Lab deepfake research',
  },
  {
    num:'03', label:'Community Bridge', color:'#a78bfa',
    head:'SANGAM opens a dialogue channel',
    body:'Trained community mediators and AI-moderated dialogue circles are activated. Local leaders, administrators, and citizens are brought together to address the narrative before it spreads further.',
    source:'Model: Centre for Dialogue & Reconciliation (CDR) India methodology',
  },
]

const WHO = [
  { title:'District Administrators', color:'#ff6b35', body:'Access KAVACH command dashboards to monitor their jurisdiction and pre-position resources before tension escalates.' },
  { title:'Journalists & Fact-Checkers', color:'#00d084', body:'Use SACHCHI\'s deepfake lab and source verification tools to produce faster, more credible reporting.' },
  { title:'Citizens', color:'#a78bfa', body:'Verify WhatsApp forwards instantly, participate in SANGAM dialogue circles, and contribute to DASTAAN archives.' },
  { title:'NGOs & Relief Workers', color:'#38bdf8', body:'Manage PANAH relief operations, register displaced persons, and coordinate family reunification across districts.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding:0, background:'#000', overflow:'hidden' }}>

      <div className="fade-in section-bar">
        <div className="section-bar-line" />
        <span className="section-bar-index">04 — How It Works</span>
        <div className="section-bar-rule" />
        <span className="section-bar-sub">DETECT · VERIFY · BRIDGE</span>
      </div>

      {/* 3-step flow */}
      {STEPS.map((s, i) => (
        <div key={s.num} style={{ display:'grid', gridTemplateColumns:'80px 1fr 1fr', gap:'1px', background:'#0d0d0d', borderBottom:'1px solid #0d0d0d' }}>
          <div className="fade-in" style={{ background:'#030303', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'20px 0' }}>
            <span style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'28px',color:s.color,lineHeight:1 }}>{s.num}</span>
          </div>
          <div className="fade-in" style={{ background:'#060606', padding:'40px 44px', borderLeft:`3px solid ${s.color}` }}>
            <div style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:s.color,letterSpacing:'0.2em',textTransform:'uppercase',marginBottom:'12px' }}>{s.label}</div>
            <h3 style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(1.4rem,2vw,2rem)',color:'#e8e6e3',lineHeight:1.1,letterSpacing:'-0.02em',margin:'0 0 20px 0' }}>{s.head}</h3>
            <p className="glow-text" style={{ color:'#666',fontSize:'14px',lineHeight:1.85,margin:0 }}>{s.body}</p>
          </div>
          <div className="fade-in" style={{ background:'#040404', padding:'40px 44px', display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
            <div style={{ borderLeft:'2px solid #1c1c1c', paddingLeft:'16px' }}>
              <div style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'8px',color:'#333',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'6px' }}>Informed by</div>
              <p className="glow-text" style={{ color:'#2a2a2a',fontSize:'11px',lineHeight:1.7,margin:0,fontStyle:'italic' }}>{s.source}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Who it's for */}
      <div className="fade-in section-bar" style={{ marginTop:'1px' }}>
        <div className="section-bar-line" />
        <span className="section-bar-index">05 — Who It's For</span>
        <div className="section-bar-rule" />
        <span className="section-bar-sub">STAKEHOLDERS · USER GROUPS</span>
      </div>

      <div className="fade-in stagger-reveal" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'#0d0d0d' }}>
        {WHO.map(w => (
          <div key={w.title} className="principle-card" style={{ background:'#050505', padding:'36px 32px', borderLeftColor:`${w.color}25` }}>
            <span style={{ width:'6px',height:'6px',background:w.color,display:'inline-block',marginBottom:'16px' }} />
            <div style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'16px',color:'#e8e6e3',marginBottom:'14px',lineHeight:1.2 }}>{w.title}</div>
            <p className="glow-text" style={{ color:'#444',fontSize:'13px',lineHeight:1.75,margin:0 }}>{w.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
