const STAKEHOLDERS = [
  { num:'01', title:'Local Administration & Law Enforcement', pillar:'KAVACH', color:'#ff6b35',
    body:'District Magistrates, SPs, and local intelligence units monitor jurisdictions, preempt violence, and deploy resources efficiently.',
    tags:['KAVACH','Intelligence','Administration'] },
  { num:'02', title:'The General Public', pillar:'SACHCHI + SANGAM + DASTAAN', color:'#00d084',
    body:'Citizens verify WhatsApp news, participate in community dialogues, and educate themselves on historical contexts through accessible interfaces.',
    tags:['SACHCHI','SANGAM','DASTAAN'] },
  { num:'03', title:'Journalists & Fact-Checkers', pillar:'SACHCHI + KAVACH', color:'#a78bfa',
    body:'Media professionals utilize the Deepfake Lab, archive tools, and KAVACH feeds to verify sources and combat organized disinformation.',
    tags:['SACHCHI','Deepfake Lab','KAVACH'] },
  { num:'04', title:'NGOs & Relief Workers', pillar:'PANAH', color:'#38bdf8',
    body:'Humanitarian organizations manage relief camps, register displaced persons via P-ID, and facilitate family reunifications.',
    tags:['PANAH','Humanitarian','P-ID'] },
  { num:'05', title:'Historians & Academics', pillar:'DASTAAN', color:'#f59e0b',
    body:'Researchers utilize DASTAAN archives to study the sociological impact of conflict and mechanisms of reconciliation across 22 languages.',
    tags:['DASTAAN','Research','Archives'] },
]

export default function Ecosystem() {
  return (
    <section id="ecosystem" style={{ padding:0, background:'#000', overflow:'hidden' }}>

      <div className="fade-in section-bar">
        <div className="section-bar-line" />
        <span className="section-bar-index">08 — Ecosystem</span>
        <div className="section-bar-rule" />
        <span className="section-bar-sub">WHO USES SETU · STAKEHOLDER MAP</span>
      </div>

      {/* ── Headline split ── */}
      <div style={{ display:'grid', gridTemplateColumns:'420px 1fr', gap:'1px', background:'#0d0d0d', marginBottom:'1px' }}>
        <div className="fade-in" style={{ background:'#060606', padding:'52px 44px' }}>
          <h2 style={{
            fontFamily:'Syne,sans-serif', fontWeight:800,
            fontSize:'clamp(2.2rem,3.5vw,4rem)',
            lineHeight:0.88, letterSpacing:'-0.03em',
            color:'#e8e6e3', margin:'0 0 20px 0',
          }}>
            WHO<br />USES<br /><span style={{ color:'#00d4aa' }}>SETU?</span>
          </h2>
          <p className="glow-text" style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#2a2a2a', lineHeight:1.7, margin:0 }}>
            The success of SETU relies on a diverse ecosystem of users — each interacting with specific pillars for distinct but complementary purposes.
          </p>
        </div>
        {/* Right — 2 description blocks */}
        <div className="fade-in" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'#0d0d0d' }}>
          <div style={{ background:'#060606', padding:'36px 36px' }}>
            <p className="glow-text" style={{ color:'#666', lineHeight:1.85, fontSize:'14px', margin:0 }}>
              From district administrators running KAVACH command centers to citizens verifying WhatsApp forwards through SACHCHI — every stakeholder finds their tools within SETU's five pillars.
            </p>
          </div>
          <div style={{ background:'#050505', padding:'36px 36px' }}>
            <p className="glow-text" style={{ color:'#444', lineHeight:1.85, fontSize:'14px', margin:0 }}>
              The platform is designed for interoperability — a journalist's fact-check feeds into KAVACH intelligence, a DASTAAN story informs SANGAM dialogue, and PANAH data enriches the national Harmony Index.
            </p>
          </div>
        </div>
      </div>

      {/* ── Stakeholder table ── */}
      <div className="fade-in" style={{ borderTop:'1px solid #0d0d0d' }}>
        <div style={{ padding:'12px 24px', borderBottom:'1px solid #111', display:'grid', gridTemplateColumns:'40px 200px 1fr auto', gap:'12px' }}>
          {['#','Stakeholder','Role','Pillars'].map(h => (
            <span key={h} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#2a2a2a', letterSpacing:'0.2em', textTransform:'uppercase' }}>{h}</span>
          ))}
        </div>
        {STAKEHOLDERS.map((s,i) => (
          <div key={s.num} className="row-item" style={{
            padding:'20px 24px', borderBottom:'1px solid #0c0c0c',
            display:'grid', gridTemplateColumns:'40px 200px 1fr auto', alignItems:'center', gap:'12px',
          }}>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:s.color, letterSpacing:'0.15em' }}>{s.num}</span>
            <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'14px', color:'#e8e6e3', lineHeight:1.3 }}>{s.title}</span>
            <p className="glow-text" style={{ color:'#555', fontSize:'13px', lineHeight:1.65, margin:0 }}>{s.body}</p>
            <div style={{ display:'flex', gap:'4px', flexWrap:'wrap', justifyContent:'flex-end' }}>
              {s.tags.map(tag => (
                <span key={tag} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:s.color, border:`1px solid ${s.color}35`, padding:'2px 8px', letterSpacing:'0.08em', whiteSpace:'nowrap' }}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
