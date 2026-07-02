const QUOTES = [
  { text:'"I found that our fears are often identical, even if our histories are different."', tag:'Youth Dialogue Circle' },
  { text:'"This space let me speak without being judged for where I come from."', tag:'Shared Heritage Circle' },
  { text:'"We disagreed on so much — but on wanting peace for our children, we were one."', tag:'Inter-faith Town Hall' },
]

const CIRCLES = [
  { name:'Youth Perspective: Future Peace',  members:84,  newT:12, color:'#a78bfa' },
  { name:'Shared Heritage: Local Traditions', members:61,  newT:7,  color:'#00d4aa' },
  { name:'Economic Concerns — Rural Voice',  members:113, newT:23, color:'#f59e0b' },
  { name:'Women in Conflict Resolution',     members:47,  newT:5,  color:'#38bdf8' },
]

const HALLS = [
  { title:'Inter-faith Dialogue',             date:'Jul 08', seats:240, status:'OPEN',    color:'#a78bfa' },
  { title:'Digital Empathy in the Info Age',   date:'Jul 12', seats:180, status:'OPEN',    color:'#a78bfa' },
  { title:'Youth Perspective: Future Peace',   date:'Jul 15', seats:90,  status:'FILLING', color:'#f59e0b' },
  { title:'Local Governance & Community Trust', date:'Jul 20', seats:320, status:'OPEN',    color:'#a78bfa' },
]

export default function Sangam() {
  return (
    <section id="sangam" style={{ padding:0, background:'#000', overflow:'hidden' }}>

      <div className="fade-in section-bar">
        <div className="section-bar-line" style={{ background:'linear-gradient(90deg,transparent 0%,#a78bfa 50%,transparent 100%)' }} />
        <span className="section-bar-index" style={{ color:'rgba(167,139,250,0.6)', textShadow:'0 0 12px rgba(167,139,250,0.4)' }}>05 — Sangam</span>
        <div className="section-bar-rule" style={{ background:'linear-gradient(90deg,rgba(167,139,250,0.18),transparent)' }} />
        <span className="section-bar-sub">COMMUNITY DIALOGUE · CONFLUENCE · संगम</span>
      </div>

      {/* ── Headline + description split ── */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'#0d0d0d', marginBottom:'1px' }}>
        <div className="fade-in" style={{ background:'#060606', padding:'52px 44px' }}>
          <h2 style={{
            fontFamily:'Syne,sans-serif', fontWeight:800,
            fontSize:'clamp(3.5rem,5.5vw,6.5rem)',
            lineHeight:0.88, letterSpacing:'-0.035em',
            color:'#e8e6e3', margin:'0 0 36px 0',
          }}>
            COMM<span style={{ color:'#a78bfa' }}>UNI</span><br />TY
          </h2>
          <p className="glow-text" style={{
            fontFamily:'JetBrains Mono,monospace', fontSize:'11px',
            color:'#3a3a3a', lineHeight:1.8,
            borderLeft:'2px solid #a78bfa', paddingLeft:'18px', margin:0,
          }}>
            Conflict thrives in silence and segregation. SANGAM is the platform's mediated communication layer, designed to foster empathy, cross-community interaction, and structured conflict resolution.
          </p>
        </div>
        <div className="fade-in" style={{ background:'#040404', padding:'36px 36px', display:'flex', flexDirection:'column', justifyContent:'center', gap:'16px' }}>
          {QUOTES.map((q,i) => (
            <div key={i} className="row-item" style={{ borderLeft:'2px solid rgba(167,139,250,0.2)', padding:'12px 16px', background:'rgba(0,0,0,0.4)' }}>
              <p className="glow-text" style={{ color:'#777', fontSize:'13px', lineHeight:1.65, fontStyle:'italic', margin:'0 0 6px 0' }}>{q.text}</p>
              <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'8px', color:'rgba(167,139,250,0.5)', letterSpacing:'0.1em' }}>{q.tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Active circles + Town halls side by side ── */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'#0d0d0d' }}>
        {/* Left — Circles */}
        <div className="fade-in" style={{ background:'#050505' }}>
          <div style={{ padding:'16px 24px', borderBottom:'1px solid #111', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#555', letterSpacing:'0.25em', textTransform:'uppercase' }}>Active Dialogue Circles</span>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'8px', color:'#a78bfa', letterSpacing:'0.15em' }}>ANONYMOUS · MODERATED</span>
          </div>
          {CIRCLES.map(c => (
            <div key={c.name} className="row-item" style={{ padding:'14px 24px', borderBottom:'1px solid #0c0c0c', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:c.color, display:'inline-block', flexShrink:0 }} />
                <span className="glow-text" style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:'13px', color:'#e8e6e3' }}>{c.name}</span>
              </div>
              <div style={{ display:'flex', gap:'12px', alignItems:'center' }}>
                <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#444' }}>{c.members}</span>
                <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:c.color }}>+{c.newT}</span>
              </div>
            </div>
          ))}
          <div style={{ padding:'14px 24px', display:'flex', gap:'8px' }}>
            <div className="btn-primary" style={{ fontSize:'10px', padding:'8px 16px' }}>Join a Circle</div>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#333', display:'flex', alignItems:'center', letterSpacing:'0.1em' }}>AI MODERATION ACTIVE</span>
          </div>
        </div>

        {/* Right — Town Halls */}
        <div className="fade-in" style={{ background:'#050505' }}>
          <div style={{ padding:'16px 24px', borderBottom:'1px solid #111' }}>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#555', letterSpacing:'0.25em', textTransform:'uppercase' }}>Virtual Town Halls — Upcoming</span>
          </div>
          {HALLS.map(th => (
            <div key={th.title} className="row-item" style={{ padding:'14px 24px', borderBottom:'1px solid #0c0c0c', display:'grid', gridTemplateColumns:'1fr 60px 50px 60px', gap:'12px', alignItems:'center' }}>
              <span className="glow-text" style={{ fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:'13px', color:'#e8e6e3' }}>{th.title}</span>
              <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#444' }}>{th.date}</span>
              <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#333' }}>{th.seats} seats</span>
              <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:th.color, border:`1px solid ${th.color}40`, padding:'2px 6px', textAlign:'center' }}>{th.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
