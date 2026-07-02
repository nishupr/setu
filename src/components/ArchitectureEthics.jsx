const ETHICS = [
  { title:'Opt-In Architecture', body:'Participation in SANGAM, DASTAAN, and PANAH is voluntary and consent-driven. No covert surveillance.', color:'#00d4aa' },
  { title:'Algorithmic Fairness', body:'Continuous auditing of AI models to ensure they do not disproportionately flag specific linguistic groups or minorities.', color:'#a78bfa' },
  { title:'Ephemeral Data — PANAH', body:'P-ID data is auto-purged once crisis resolves. No permanent vulnerability databases.', color:'#38bdf8' },
  { title:'Data Sovereignty', body:'All data encrypted at rest and in transit. Strict national data localization. Data never leaves the country.', color:'#f59e0b' },
]

const TECH_STACK = [
  { layer:'NLP Engines',        detail:'Custom models for code-switching, regional dialects, and context-dependent slurs.', mono:'14 langs · 220M params' },
  { layer:'Computer Vision',    detail:'Deepfake detection analyzing facial muscles, respiratory patterns, and lighting anomalies.', mono:'96.4% accuracy' },
  { layer:'Real-Time Pipelines',detail:'Apache Kafka-based streaming with millisecond latency for KAVACH command dashboard.', mono:'< 50ms latency' },
  { layer:'Anonymization',      detail:'Robust cryptographic hashing for SANGAM dialogue circles. Absolute privacy guarantee.', mono:'SHA-256 + salt' },
  { layer:'Frontend',           detail:'Responsive framework optimized for readability across all 22 supported scripts.', mono:'React + Vite' },
]

const formula = `// SETU Intelligence Stack
{
  "data_layer": {
    "ingestion":  "Apache Kafka (real-time)",
    "storage":    "AES-256 encryption at rest",
    "localization":"National servers only",
    "retention":  "Ephemeral for PANAH P-ID"
  },
  "ai_layer": {
    "nlp":        "14 lang NLP + Hinglish",
    "vision":     "Deepfake detection CNN",
    "sentiment":  "Regional heatmap scoring",
    "moderation": "SANGAM AI guard"
  },
  "security": {
    "transit":    "TLS 1.3 + end-to-end",
    "identity":   "SHA-256 cryptographic hash",
    "audit":      "Continuous fairness audit"
  }
}`

export default function ArchitectureEthics() {
  return (
    <section id="architecture" style={{ padding:0, background:'#000', overflow:'hidden' }}>

      <div className="fade-in section-bar">
        <div className="section-bar-line" />
        <span className="section-bar-index">09 — Architecture</span>
        <div className="section-bar-rule" />
        <span className="section-bar-sub">TECHNICAL STACK · ETHICAL FRAMEWORK</span>
      </div>

      {/* ── Formula left / Description+Ethics right ── */}
      <div style={{ display:'grid', gridTemplateColumns:'420px 1fr', gap:'1px', background:'#0d0d0d', marginBottom:'1px' }}>

        {/* LEFT: heading + code */}
        <div style={{ background:'#020202', display:'flex', flexDirection:'column' }}>
          <div style={{ padding:'40px 44px 32px', borderBottom:'1px solid #0d0d0d' }}>
            <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(1.8rem,2.2vw,2.6rem)', lineHeight:0.92, letterSpacing:'-0.03em', color:'#e8e6e3', margin:'0 0 14px 0' }}>
              SECURE<br /><span style={{ color:'#00d4aa' }}>BY DESIGN</span>
            </h2>
            <p className="glow-text" style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#2a2a2a', lineHeight:1.7, margin:0 }}>
              Intelligence infrastructure must be as trustworthy as it is powerful. Every layer is built with privacy, fairness, and sovereignty as hard constraints.
            </p>
          </div>
          <div className="fade-in" style={{ padding:'24px 44px', flex:1 }}>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#00d4aa', letterSpacing:'0.25em', marginBottom:'14px', opacity:0.5 }}>INTELLIGENCE STACK</div>
            <pre style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', lineHeight:1.8, margin:0, whiteSpace:'pre' }}>
              {formula.split('\n').map((line,i) => {
                const isKey = /ingestion|storage|nlp|vision|transit|identity|audit/.test(line)
                return (
                  <span key={i} className="formula-line" style={{ display:'block', color:isKey?'#00d4aa':'#2a2a2a', animationDelay:`${i*42}ms` }}>
                    {line}
                  </span>
                )
              })}
            </pre>
          </div>
        </div>

        {/* RIGHT: descriptions + ethics grid */}
        <div style={{ background:'#040404', display:'flex', flexDirection:'column' }}>
          <div className="fade-in" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'#0d0d0d', borderBottom:'1px solid #0d0d0d' }}>
            {TECH_STACK.slice(0,2).map(row => (
              <div key={row.layer} style={{ background:'#060606', padding:'28px 32px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px' }}>
                  <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#00d4aa', letterSpacing:'0.15em', opacity:0.6 }}>{row.mono}</span>
                </div>
                <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'13px', color:'#c8c6c3', display:'block', marginBottom:'8px' }}>{row.layer}</span>
                <p className="glow-text" style={{ fontSize:'12px', color:'#444', lineHeight:1.7, margin:0 }}>{row.detail}</p>
              </div>
            ))}
          </div>
          {/* Ethics 2×2 */}
          <div className="fade-in stagger-reveal" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'#0d0d0d', flex:1 }}>
            {ETHICS.map(e => (
              <div key={e.title} className="principle-card" style={{ background:'#050505', padding:'28px 32px', borderLeftColor:`${e.color}25` }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}>
                  <span style={{ width:'5px', height:'5px', background:e.color, display:'inline-block', flexShrink:0 }} />
                  <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'13px', color:'#c8c6c3' }}>{e.title}</span>
                </div>
                <p className="glow-text" style={{ fontSize:'12px', color:'#444', lineHeight:1.7, margin:0 }}>{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tech stack table ── */}
      <div className="fade-in" style={{ borderTop:'1px solid #0d0d0d' }}>
        <div style={{ padding:'10px 24px', borderBottom:'1px solid #111', display:'grid', gridTemplateColumns:'140px 1fr 140px', gap:'8px' }}>
          {['Layer','Details','Spec'].map(h => (
            <span key={h} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#2a2a2a', letterSpacing:'0.2em', textTransform:'uppercase' }}>{h}</span>
          ))}
        </div>
        {TECH_STACK.map(row => (
          <div key={row.layer} className="row-item" style={{
            padding:'12px 24px', borderBottom:'1px solid #0c0c0c',
            display:'grid', gridTemplateColumns:'140px 1fr 140px', alignItems:'center', gap:'8px',
          }}>
            <span className="tech-name" style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'11px', color:'#00d4aa' }}>{row.layer}</span>
            <span className="glow-text" style={{ color:'#555', fontSize:'12px', lineHeight:1.6 }}>{row.detail}</span>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#333' }}>{row.mono}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
