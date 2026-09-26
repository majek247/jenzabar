import React, { useId, useState, useEffect } from 'react';

/* Replace your current App component with this file. React is the only dependency.
   All CSS is scoped to .jz-site. Official logos are embedded below.
   Interface data is illustrative; photography is remotely hosted.
   Demo buttons lead to Jenzabar's real demo page. */
const ASSETS = [
  { name: "Jenzabar", url: "/images/jenzabar-logo.png", src: "/images/jenzabar-logo.png" },
  { name: "Parker University", url: "/images/parkerlogo.png", src: "/images/parkerlogo.png" },
  { name: "Charleston Southern University", url: "/images/charleston-transparent.png", src: "/images/charleston-transparent.png" },
  { name: "Gordon College", url: "/images/gordon.png", src: "/images/gordon.png" },
  { name: "Grove City College", url: "/images/grove.png", src: "/images/grove.png" }
];

const BASE = 'https://www.jenzabar.com';
const DEMO = `${BASE}/request-a-demo`;
const photo = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const PORTRAIT = photo('photo-1580489944761-15a19d654956', 160);
const CAMPUS = photo('photo-1498243691581-b145c3f54a5a', 1200);


const PRODUCTS = [
  { name: 'Student', icon: 'cap', kind: 'student', title: 'A clearer view of every student.',
    overview: 'Campus overview', chart: 'Enrollment trends',
    stats: ['4,892', '86%', '312'], labels: ['Total students', 'Retention rate', 'Active courses'],
    points: [2800, 3150, 3410, 3520, 4100, 4470, 4892],
    bullets: ['Connect records and registration', 'Simplify everyday campus tasks', 'Give students more control'],
    rows: [['Alex Morgan', 'Enrolled'], ['Jordan Taylor', 'Registered'], ['Sam Mitchell', 'Advising'], ['Casey Patel', 'Enrolled']] },
  { name: 'Recruitment', icon: 'user', kind: 'funnel', title: 'Build relationships before day one.',
    overview: 'Recruitment overview',
    stats: ['2,418', '684', '92%'], labels: ['Applications', 'Offers accepted', 'Follow-up rate'],
    bullets: ['Bring applicant information together', 'Coordinate admissions communications', 'Follow each applicant’s progress'],
    funnel: [{ label: 'Inquiries', value: 5240 }, { label: 'Applications', value: 2418 }, { label: 'Admitted', value: 1340 }, { label: 'Enrolled', value: 684 }],
    rows: [['Alex Morgan', 'Accepted'], ['Jordan Taylor', 'Review'], ['Sam Mitchell', 'Applied'], ['Casey Patel', 'Accepted']] },
  { name: 'Retention', icon: 'bars', kind: 'risk', title: 'Spot the need. Start the conversation.',
    overview: 'Student success',
    stats: ['86%', '124', '38'], labels: ['Retention rate', 'Check-ins booked', 'Open referrals'],
    bullets: ['Identify students who need support', 'Coordinate early intervention', 'Keep advisors and students connected'],
    risk: [{ name: 'Alex Morgan', score: 91, note: 'On track' }, { name: 'Jordan Taylor', score: 58, note: 'Check-in due' }, { name: 'Sam Mitchell', score: 34, note: 'Priority referral' }, { name: 'Casey Patel', score: 88, note: 'On track' }] },
  { name: 'Finance', icon: 'document', kind: 'budget', title: 'Bring campus finances into focus.',
    overview: 'Finance overview',
    stats: ['$4.8m', '72%', '28'], labels: ['Operating budget', 'Budget utilized', 'Pending reviews'],
    bullets: ['Connect financial information', 'Streamline departmental processes', 'Make budget decisions with clarity'],
    budget: [{ label: 'Academic affairs', amount: '$1.8M', spent: 62 }, { label: 'Student services', amount: '$920K', spent: 45 }, { label: 'Campus operations', amount: '$1.1M', spent: 78 }, { label: 'Library services', amount: '$410K', spent: 31 }] },
  { name: 'Analytics', icon: 'chart', kind: 'reports', title: 'Turn campus data into clear decisions.',
    overview: 'Institutional analytics',
    stats: ['4,892', '12', '94%'], labels: ['Student headcount', 'Reports shared', 'Data completeness'],
    bullets: ['See key institutional trends', 'Compare performance across terms', 'Share a clearer picture with leadership'],
    reports: [{ title: 'Enrollment summary', meta: 'Updated today', trend: '+4.2%' }, { title: 'Retention report', meta: 'Updated yesterday', trend: '+1.8%' }, { title: 'Finance overview', meta: 'In review', trend: '—' }, { title: 'Program demand', meta: 'Updated today', trend: '+6.5%' }] },
];

const STORIES = [
  { school: 'Parker University', title: 'Earlier support. Stronger student engagement.', quote: 'Our office of Student Success has developed a system of early intervention using Jenzabar Retention that has kept our retention rate consistently above 90% and increased our level of engagement with students.', name: 'Alaina Mount', role: 'Assistant Dean of Student Affairs', img: photo('photo-1523580494863-6f3031224c94', 1200) },
  { school: 'Charleston Southern University', title: 'Less paper. A more connected campus.', quote: 'The experience we gained through working with the Jenzabar team has facilitated our technological acceleration. We were able to advance a print-focused, labor-intensive system and completely automate our campus. We’ve gone paperless.', name: 'Lisa Fleming', role: 'Director of Computer Operations', img: photo('photo-1541339907198-e08756dedf3f', 1200) },
  { school: 'Gordon College', title: 'Faster processes. Better conversations.', quote: 'Getting rid of a lot of the paper has opened up new doors and sped up the process, which in turn means that students are able to have better conversations with their faculty. What used to take days now only takes minutes.', name: 'Jon Williams', role: 'Software Architect and Strategist', img: photo('photo-1562774053-701939374585', 1200) },
];
const ROLES = [
  { name: 'Enrollment teams', text: 'Simplify the application and admissions process with connected data, automated workflows and real-time visibility.', img: '/images/enrollment-teams.png', icon: 'users', product: 1 },
  { name: 'Student success', text: 'Give advisors and support teams a complete view of each student to provide personalised guidance and improve outcomes.', img: '/images/student-success.png', icon: 'cap', product: 2 },
  { name: 'Finance leaders', text: 'Unify financial data across systems, streamline billing and reporting, and get a clearer view of campus performance.', img: '/images/finance-leaders.png', icon: 'bars', product: 3 },
  { name: 'Campus IT', text: 'Connect your systems, improve data quality and keep your campus secure with a modern, scalable platform.', img: '/images/campus-it.png', icon: 'database', product: 4 },
];
const FAQS = [
  ['What is Jenzabar One?', 'Jenzabar One brings together software for student information, recruitment, retention, finance and other campus functions. Its higher education ecosystem helps institutions connect their departments and support the student journey.'],
  ['Which products fit our institution?', 'Start with the teams and processes you want to improve. Jenzabar can help you explore the right combination of products for your institution’s size, priorities and existing technology.', 'Explore our products', `${BASE}/jenzabar-one`],
  ['Can Jenzabar connect with our existing systems?', 'Jenzabar offers integration options through the Jenzabar One API and Jenzabar Unity Platform. Your systems, data requirements and workflows determine the right approach; review compatibility and scope with the Jenzabar team.'],
  ['How does implementation work?', 'Implementation scope depends on the products you choose and your existing environment. Discuss data migration, configuration, training, responsibilities and launch milestones with Jenzabar before agreeing a project plan.'],
  ['What support is available?', 'Jenzabar provides higher education services and customer support. The team can explain the onboarding, training and ongoing support options available for your products and agreement.'],
  ['How long does it take to get up and running?', 'Timelines vary by institution, product mix and scope. Most campuses begin with a phased rollout — a focused launch for one department or workflow, followed by broader adoption. Your Jenzabar team will outline a realistic schedule during planning.'],
  ['Is Jenzabar built for institutions of our size?', 'Yes. Jenzabar serves a broad range of colleges and universities, from small private institutions to larger multi-campus organizations. The platform scales with you — you can start with the modules you need today and expand over time.'],
  ['Can students and faculty access Jenzabar on mobile?', 'Yes. Jenzabar offers responsive web access and a mobile experience for students, faculty and staff. Students can view schedules, grades, financial information and appointments from a phone or tablet.'],
  ['How is data secured and protected?', 'Jenzabar follows industry-standard security practices including encryption in transit and at rest, role-based access controls, and regular audits. Specific compliance frameworks and data handling policies are documented during your evaluation.'],
];

function Icon({ name = 'chart', size = 22, ...props }) {
  const paths = {
    cap: <><path d="m2 8 10-5 10 5-10 5L2 8Z"/><path d="M6 10v6c4 3 8 3 12 0v-6M22 8v8"/></>,
    user: <><circle cx="12" cy="7" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/></>,
    users: <><circle cx="9" cy="8" r="3"/><path d="M2 21v-3a7 7 0 0 1 14 0v3M16 4a4 4 0 0 1 0 8M18 15a5 5 0 0 1 4 5"/></>,
    bars: <><path d="M3 21V13h4v8M10 21V7h4v14M17 21V2h4v19M2 21h21"/></>,
    chart: <><path d="M3 3v18h19M6 16l5-6 4 3 6-8"/><path d="M17 5h4v4"/></>,
    document: <><path d="M6 3h11l4 4v14H6V3ZM3 17V1h12M17 3v5h4M10 12h7M10 16h5"/></>,
    database: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 10c0 4 16 4 16 0M4 15c0 4 16 4 16 0"/></>,
    book: <><path d="M12 5C8 2 4 2 2 3v17c4-1 7 0 10 2 3-2 6-3 10-2V3c-2-1-6-1-10 2v17Z"/></>,
    gear: <><path d="m9 3 1-2h4l1 2 3 2 3 1v4l-2 2 2 2v4l-3 1-3 2-1 2h-4l-1-2-3-2-3-1v-4l2-2-2-2V6l3-1 3-2Z"/><circle cx="12" cy="12" r="4"/></>,
    home: <><path d="m3 11 9-8 9 8M5 10v11h14V10M10 21v-7h4v7"/></>,
    calendar: <><rect x="3" y="5" width="18" height="17" rx="2"/><path d="M7 2v6M17 2v6M3 11h18"/></>,
    check: <path d="m5 12 4 4L20 5"/>,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6"/>,
    chevron: <path d="m8 4 8 8-8 8"/>,
    search: <><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/></>,
    bell: <><path d="M5 17h14l-2-4V8a5 5 0 0 0-10 0v5l-2 4ZM10 21h4"/></>,
    menu: <path d="M3 6h18M3 12h18M3 18h18"/>,
    close: <path d="m5 5 14 14M19 5 5 19"/>,
    play: <path d="m9 5 10 7-10 7V5Z"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.chart}</svg>;
}
function Brand({ dark = false, small = false }) {
  return <span className={`jz-brand ${dark ? 'on-dark' : ''} ${small ? 'small' : ''}`}><img src={ASSETS[0].src} alt="Jenzabar"/><img className="jz-brand-color" src={ASSETS[0].src} alt="" aria-hidden="true"/></span>;
}
function Tabs({ value, onChange, vertical = false, id }) {
  const key = useId();
  return (
    <div 
      className={`jz-tabs ${vertical ? 'vertical' : ''}`} 
      role="tablist" 
      aria-label={vertical ? 'Campus product preview' : 'Explore products'} 
      aria-orientation={vertical ? 'vertical' : 'horizontal'}
    >
      {PRODUCTS.map((p, i) => (
        <button 
          key={p.name} 
          id={`${key}-${i}`} 
          type="button" 
          role="tab" 
          aria-selected={value === i} 
          aria-controls={id} 
          tabIndex={value === i ? 0 : -1} 
          className={value === i ? 'active' : ''} 
          onClick={() => onChange(i)} 
          onKeyDown={e => { 
            const next = ['ArrowRight','ArrowDown'].includes(e.key) ? (i + 1) % 5 : ['ArrowLeft','ArrowUp'].includes(e.key) ? (i + 4) % 5 : e.key === 'Home' ? 0 : e.key === 'End' ? 4 : null; 
            if(next !== null) { 
              e.preventDefault(); 
              onChange(next); 
              document.getElementById(`${key}-${next}`)?.focus(); 
            } 
          }}
        >
          <Icon name={p.icon} size={vertical ? 28 : 18}/>
          <span>{vertical ? 'Jenzabar ' : ''}{p.name}</span>
        </button>
      ))}
    </div>
  );
}
function LineChart({ values, title, period = 'Fall 2025' }) {
  const [hover, setHover] = useState(null); const uid = useId().replace(/:/g, '');
  const max = Math.ceil(Math.max(...values) / 100) * 100 || 100;
  const coords = values.map((v, i) => [38 + i * 44, 151 - v / max * 114]);
  const line = coords.map(p => p.join(',')).join(' ');
  return <div className="jz-line-chart"><div className="jz-chart-title"><strong>{title}</strong><span>{hover === null ? period : `${['Jun','Jul','Aug','Sep','Oct','Nov','Dec'][hover]} · ${values[hover].toLocaleString()}`}</span></div><svg viewBox="0 0 326 190" role="img" aria-label={`${title}: ${values.join(', ')}. Illustrative data.`}><defs><linearGradient id={uid} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2196f3" stopOpacity=".19"/><stop offset="100%" stopColor="#2196f3" stopOpacity=".02"/></linearGradient></defs>{[0,1,2,3].map(i => <g key={i}><path d={`M35 ${38 + i * 38}H310`} stroke="#e8eef3" strokeDasharray="3 4"/><text x="27" y={42 + i * 38} textAnchor="end">{Math.round(max * (1-i/3)).toLocaleString()}</text></g>)}<polygon points={`38,152 ${line} 302,152`} fill={`url(#${uid})`}/><polyline points={line} fill="none" stroke="#0076dc" strokeWidth="2.5"/>{coords.map(([x,y],i) => <g key={i}><circle cx={x} cy={y} r={hover === i ? 5 : 2.8} fill="#0076dc"/><text x={x} y="175" textAnchor="middle">{['Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}</text><rect x={x-18} y="18" width="36" height="145" fill="transparent" tabIndex="0" role="button" aria-label={`${['June','July','August','September','October','November','December'][i]}: ${values[i]}`} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(i)} onBlur={() => setHover(null)}/></g>)}</svg></div>;
}
function AppShell({ children, active = 'Home', compact = false }) {
  return <div className={`jz-app ${compact ? 'compact' : ''}`}><div className="jz-app-toolbar"><Brand small/><span className="jz-fake-search"><Icon name="search" size={12}/>Search for a student, course or file...</span><span className="jz-toolbar-icons"><Icon name="bell" size={14}/><span className="jz-avatar blue">JT</span></span></div><div className="jz-app-body"><aside className="jz-app-nav">{[['Home','home'],['Students','users'],['Academics','book'],['Admissions','document'],['Advising','user'],['Financial','database'],['Reporting','chart']].map(([label, icon]) => <span key={label} className={active === label ? 'selected' : ''}><Icon name={icon} size={15}/>{label}</span>)}<span className="jz-app-more">••• &nbsp; More</span></aside><div className="jz-app-main">{children}</div></div></div>;
}
function FunnelPanel({ stages }) {
  const max = stages[0].value;
  return <div className="jz-funnel">
    <div className="jz-chart-title"><strong>Enrollment funnel</strong><span>Fall 2025 cycle</span></div>
    {stages.map(s => <div className="jz-funnel-row" key={s.label}>
      <span>{s.label}</span>
      <div className="jz-funnel-track"><span style={{ width: `${Math.round(s.value / max * 100)}%` }}/></div>
      <b>{s.value.toLocaleString()}</b>
    </div>)}
  </div>;
}
function RiskPanel({ students }) {
  return <div className="jz-risk-panel">
    <div className="jz-chart-title"><strong>Students needing attention</strong><span>Updated today</span></div>
    <div className="jz-risk-grid">{students.map(s => {
      const tone = s.score >= 75 ? 'good' : s.score >= 50 ? 'watch' : 'risk';
      return <div className={`jz-risk-card tone-${tone}`} key={s.name}>
        <svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="18" fill="none" strokeWidth="4" className="track"/><circle cx="22" cy="22" r="18" fill="none" strokeWidth="4" strokeLinecap="round" className="value" strokeDasharray={`${s.score * 1.13} 200`} transform="rotate(-90 22 22)"/></svg>
        <div><b>{s.name}</b><small>{s.note}</small></div>
      </div>;
    })}</div>
  </div>;
}
function BudgetPanel({ items }) {
  return <div className="jz-budget-panel">
    <div className="jz-chart-title"><strong>Departmental spending</strong><span>Fiscal year 2025</span></div>
    {items.map(b => <div className="jz-budget-row" key={b.label}>
      <span>{b.label}<small>{b.amount}</small></span>
      <div className="jz-budget-track"><span style={{ width: `${b.spent}%` }}/></div>
      <b>{b.spent}%</b>
    </div>)}
  </div>;
}
function ReportsPanel({ reports }) {
  return <div className="jz-reports-grid">{reports.map(r => <div className="jz-report-tile" key={r.title}>
    <Icon name="document" size={17}/>
    <b>{r.title}</b>
    <small>{r.meta}</small>
    <span className={`jz-trend ${r.trend.startsWith('+') ? '' : 'flat'}`}>{r.trend}</span>
  </div>)}</div>;
}
function Dashboard({ index = 0 }) {
  const p = PRODUCTS[index]; const [term, setTerm] = useState('Fall 2025');
  const vals = p.points ? (term === 'Spring 2026' ? p.points.map(v => Math.round(v * 1.08)) : p.points) : [];
  return <AppShell>
    <div className="jz-dash-heading"><h3>{p.overview}</h3><select aria-label="Dashboard term" value={term} onChange={e => setTerm(e.target.value)}><option>Fall 2025</option><option>Spring 2026</option></select></div>
    <div className="jz-stat-cards">{p.stats.map((stat, i) => <div key={i}><Icon name={['users', 'bars', 'book'][i]} size={21}/><div><b>{stat}</b><span>{p.labels[i]}</span></div></div>)}</div>
    {p.kind === 'student' && <div className="jz-dash-bottom"><LineChart title={p.chart} values={vals} period={term}/><div className="jz-records"><strong>Recent student records</strong>{p.rows.map(([name, status], i) => <div className="jz-record" key={name}><span className="jz-avatar">{name.split(' ').map(w => w[0]).join('')}</span><span>{name}</span><small className={`jz-status tone-${i % 3}`}>{status}</small></div>)}</div></div>}
    {p.kind === 'funnel' && <div className="jz-dash-bottom"><FunnelPanel stages={p.funnel}/><div className="jz-records"><strong>Recent applicants</strong>{p.rows.map(([name, status], i) => <div className="jz-record" key={name}><span className="jz-avatar">{name.split(' ').map(w => w[0]).join('')}</span><span>{name}</span><small className={`jz-status tone-${i % 3}`}>{status}</small></div>)}</div></div>}
    {p.kind === 'risk' && <RiskPanel students={p.risk}/>}
    {p.kind === 'budget' && <BudgetPanel items={p.budget}/>}
    {p.kind === 'reports' && <ReportsPanel reports={p.reports}/>}
    <div className="jz-sample">Illustrative product view · Sample data</div>
  </AppShell>;
}
function StudentPhone() {
  const [expanded,setExpanded] = useState(false);
  return <div className="jz-phone"><div className="jz-phone-status"><span>9:41</span><span className="jz-battery"/></div><div className="jz-phone-top"><Brand small/><button type="button" aria-label="Toggle student portal menu" aria-expanded={expanded} onClick={()=>setExpanded(!expanded)}><Icon name={expanded ? 'close':'menu'} size={16}/></button></div>{expanded ? <div className="jz-portal-menu"><b>Student portal</b>{['My semester','Academic progress','Upcoming meeting'].map((l,i)=><button key={l} onClick={()=>{setExpanded(false);document.getElementById(i===1?'platform':'student-semester')?.scrollIntoView({behavior:'smooth',block:'center'});}}>{l}<Icon name="arrow" size={14}/></button>)}</div> : <><div className="jz-person"><img src={PORTRAIT} alt="Illustrative student portrait"/><div><b>Alex Morgan</b><small>Student ID: 100452</small></div></div><h4 id="student-semester">My semester</h4><small>Fall 2025</small><div className="jz-courses">{[['ENG 101','Composition','A'],['BIO 201','Biology','B+'],['HIS 220','World History','A−']].map(([code,name,grade])=><div key={code}><div><b>{code}</b><small>{name}</small></div><span className="jz-grade">{grade}</span></div>)}</div><div className="jz-meeting"><Icon name="calendar" size={25}/><div><small>Upcoming</small><b>Advising meeting</b><small>Mon, Oct 14 · 10:00 AM</small></div></div></>}</div>;
}
function StudentProfile() {
  const [tab,setTab] = useState('Overview');
  return <AppShell active="Academics"><div className="jz-profile-head"><img src={PORTRAIT} alt="Illustrative student"/><div><h3>Alex Morgan</h3><small>100452 &nbsp; · &nbsp; Undergraduate &nbsp; · &nbsp; Business Administration</small></div><span className="jz-status tone-0">● Active</span></div><div className="jz-profile-tabs">{['Overview','Academic','Financial','Documents'].map(t=><button type="button" key={t} className={tab===t?'active':''} onClick={()=>setTab(t)}>{t}</button>)}</div>{tab==='Overview'||tab==='Academic'?<div className="jz-profile-grid"><div className="jz-progress"><strong>Academic progress</strong><div><svg viewBox="0 0 100 100" role="img" aria-label="72 percent academic progress"><circle cx="50" cy="50" r="39" fill="none" stroke="#dfeefa" strokeWidth="10"/><circle cx="50" cy="50" r="39" fill="none" stroke="#0781e8" strokeWidth="10" strokeDasharray="176.4 245" transform="rotate(-90 50 50)"/><text x="50" y="57" textAnchor="middle" fill="#073255" fontSize="22" fontWeight="700">72%</text></svg><span>Credits completed<b>72 of 120</b></span></div><div className="jz-progress-track"><span/></div></div><div className="jz-schedule"><strong>Fall 2025 schedule</strong>{[['ENG 101','Composition','9:00 AM'],['BUS 200','Principles of Business','11:00 AM'],['HIS 220','World History','1:00 PM']].map(row=><div key={row[0]}>{row.map(v=><span key={v}>{v}</span>)}</div>)}</div></div>:<div className="jz-detail-pane"><Icon name={tab==='Financial'?'database':'document'} size={32}/><h4>{tab==='Financial'?'Student account':'Student documents'}</h4><p>{tab==='Financial'?'Semester charges: $8,400 · Payments: $8,400 · Balance: $0':'Transcript · Registration confirmation · Academic plan'}</p><small>Illustrative student record</small></div>}<div className="jz-sample">Illustrative product view · Sample data</div></AppShell>;
}
function BarChart({ mode = 0 }) {
  const [hover,setHover] = useState(null); const sets=[[3100,3480,3710,4110,4500],[62,70,78,84,91],[32,45,64,78,89]];
  const values=sets[mode]; const max=Math.max(...values)*1.13; const labels=mode===0?['Fall 2021','Fall 2022','Fall 2023','Fall 2024','Fall 2025']:['Jun','Jul','Aug','Sep','Oct'];
  return <div className="jz-bar-card"><div className="jz-chart-title"><strong>{['Headcount by term','Messages delivered (%)','Completed workflows (%)'][mode]}</strong><span>{hover!==null?values[hover].toLocaleString():'Sample data'}</span></div><svg viewBox="0 0 460 200" role="img" aria-label={`Illustrative ${['enrollment','communications','workflow'][mode]} chart`}>{[0,1,2,3].map(i=><g key={i}><path d={`M42 ${28+i*43}H448`} stroke="#e7edf2"/><text x="32" y={32+i*43} textAnchor="end">{Math.round(max*(1-i/3)).toLocaleString()}</text></g>)}{values.map((v,i)=><g key={i}><rect x={63+i*77} y={157-v/max*129} width="42" height={v/max*129} rx="2" fill={hover===i?'#ae0879':'#238de5'} tabIndex="0" role="button" aria-label={`${labels[i]}: ${v}`} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)} onFocus={()=>setHover(i)} onBlur={()=>setHover(null)}/><text x={84+i*77} y="182" textAnchor="middle">{labels[i]}</text></g>)}</svg></div>;
}
function AnalyticsSection() {
  return (
    <section className="jz-casestudy jz-dark" id="intelligence">
      <div className="jz-container">
        <div className="jz-casestudy-grid">
          <div className="jz-casestudy-photo">
            <span className="jz-cs-topbar"><span>CUSTOMER STORY</span><span>Jenzabar One</span></span>
            <div className="jz-cs-visual">
              <img src="/images/lakelanduniversity.png" alt="Lakeland University campus, illustrative photography" loading="lazy"/>
              <div className="jz-cs-title">
                <strong>LAKELAND</strong>
                <span>UNIVERSITY</span>
              </div>
 
            </div>
          </div>
          <div className="jz-casestudy-panel">
            <div className="jz-casestudy-badges">
              <span className="jz-pill">Case study</span>
              <span className="jz-pill outline">Higher education</span>
            </div>
            <h2>Modernizing operations. <em>Elevating the student experience.</em></h2>
            <p>Lakeland University partnered with Jenzabar One to bring financial aid, registration and student services onto one connected platform — replacing disconnected systems with a single source of truth.</p>
            <div className="jz-casestudy-stats">
              <div>
                <span className="jz-stat-label">Operations</span>
                <b>One platform</b>
                <small>Illustrative outcome</small>
              </div>
              <div>
                <span className="jz-stat-label">Experience</span>
                <b>Fewer manual steps</b>
                <small>Illustrative outcome</small>
              </div>
            </div>
            <a className="jz-casestudy-button" href="https://www.jenzabar.com/resource/case-study-lakeland-university-modernizing-operations-and-elevating-student-experiences-with-jenzabar-one" target="_blank" rel="noopener noreferrer">
              Read the case study <Icon name="arrow" size={16}/>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


/* Integration illustration: one coordinate system keeps every port aligned. */
function CampusGlyph({ name, size = 24, ...props }) {
  const shapes = {
    shield: <><path d="M12 2 21 6v6c0 5-5 9-9 11-4-2-9-6-9-11V6l9-4Z"/><circle cx="12" cy="10" r="2.5"/><path d="M7.5 18v-1a4.5 4.5 0 0 1 9 0v1"/></>,
    lock: <><rect x="5" y="10" width="14" height="12" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4M12 15v3"/></>,
    card: <><rect x="2" y="5" width="20" height="15" rx="2"/><path d="M2 10h20M6 15h5"/></>,
    chat: <><path d="M4 3h16v14H10l-6 4V3Z"/><path d="M8 8h8M8 12h5"/></>,
    campus: <><path d="m2 7 10-5 10 5H2ZM4 21h16M2 24h20M5 10v8M10 10v8M15 10v8M20 10v8"/></>,
  };
  if (!shapes[name]) return <Icon name={name} size={size} {...props}/>;
  return <svg width={size} height={size} viewBox="0 0 24 26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{shapes[name]}</svg>;
}
function IntegrationDiagram() {
  const [selected, setSelected] = useState(null);
  const noteId = useId();
  const nodes = [
    { id:'Learning', icon:'book', pos:'tl', subIcons:['document','users','cap'], detail:'Explore how learning platforms can connect with your campus systems.' },
    { id:'Identity', icon:'shield', pos:'tr', subIcons:['user','card','lock'], detail:'Discuss identity and access requirements across your institution.' },
    { id:'Finance', icon:'database', pos:'bl', subIcons:['document','card','bars'], detail:'Review the financial systems and data flows your institution needs to connect.' },
    { id:'Student services', icon:'users', pos:'br', subIcons:['user','calendar','chat'], detail:'Explore connections between student records and the services students use.' },
  ];
  const paths = [
    'M374 76H458Q470 76 470 88V164Q470 176 482 176H500',
    'M866 76H782Q770 76 770 88V164Q770 176 758 176H740',
    'M374 354H458Q470 354 470 342V270Q470 258 482 258H500',
    'M866 354H782Q770 354 770 342V270Q770 258 758 258H740',
  ];
  return <div className="jzc-visual-wrap">
    <div className="jzc-map" role="group" aria-label="Campus systems connected through Jenzabar">
      <div className="jzc-backdrop" aria-hidden="true"/>
      <svg className="jzc-wires" viewBox="0 0 1240 460" aria-hidden="true">
        {paths.map((d,i)=><path key={d} d={d} className={selected===nodes[i].id?'is-selected':''}/>)}
        <path d="M620 302V342"/>
        {[[374,76],[866,76],[374,354],[866,354],[500,176],[740,176],[500,258],[740,258],[620,302]].map(([cx,cy])=><circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6.5"/>)}
      </svg>
      {nodes.map(n=><button key={n.id} type="button" className={`jzc-node jzc-${n.pos}${selected===n.id?' is-selected':''}`} aria-pressed={selected===n.id} aria-controls={noteId} onClick={()=>setSelected(selected===n.id?null:n.id)}>
        <span className="jzc-node-heading"><CampusGlyph name={n.icon}/><strong>{n.id}</strong></span>
        <span className="jzc-records" aria-hidden="true">{n.subIcons.map((ic,i)=><span className="jzc-record" key={ic}><CampusGlyph name={ic}/><span style={{width:`${100-i*17}%`}}/></span>)}</span>
      </button>)}
      <div className="jzc-hub"><Brand dark/><span className="jzc-hub-rule"/><p>Jenzabar One API<br/>Jenzabar Unity Platform</p></div>
      <div className="jzc-unified"><CampusGlyph name="campus"/><span>One connected view</span></div>
    </div>
    <div id={noteId} className={`jzc-detail${selected?' is-visible':''}`} role="status" aria-live="polite">{selected&&<><strong>{selected}</strong><span>{nodes.find(n=>n.id===selected).detail}</span></>}</div>
  </div>;
}
function CampusMiniRecords({ connected = false }) {
  if (!connected) return <div className="jzc-mini-records" aria-hidden="true">{[0,1,2].map(i=><React.Fragment key={i}>{i>0&&<span className="jzc-dots">···</span>}<span className="jzc-mini-file"><Icon name="database"/><i/><i/><i/></span></React.Fragment>)}</div>;
  return <div className="jzc-mini-connected" aria-hidden="true"><svg viewBox="0 0 200 100"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20h20q10 0 10 10v8h20M12 80h20q10 0 10-10v-8h20M188 20h-20q-10 0-10 10v8h-20M188 80h-20q-10 0-10-10v-8h-20"/>{[[12,20],[12,80],[188,20],[188,80]].map(([x,y])=><circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="white"/>)}</g></svg><span className="jzc-mini-hub"><Icon name="database"/><span><i/><i/><i/></span></span></div>;
}

function Header() {
  const [open,setOpen]=useState(false);
  return <> <header className="jz-header"><div className="jz-container jz-header-inner"><a href="#top" aria-label="Jenzabar home"><Brand dark/></a><nav className={open?'open':''} aria-label="Main navigation">{[['Platform','#platform'],['Solutions','#roles'],['Case study','#intelligence'],['Integrations','#integrations'],['FAQ','#questions']].map(([label,href])=><a href={href} key={label} onClick={()=>setOpen(false)}>{label}</a>)}</nav><div className="jz-header-actions"><a className="jz-login" href="https://www.myjenzabar.net/">Log in</a><a className="jz-button magenta" href={DEMO}>Request a demo <Icon name="arrow" size={16}/></a><button className="jz-mobile-toggle" aria-label="Toggle navigation" aria-expanded={open} onClick={()=>setOpen(!open)}><Icon name={open?'close':'menu'}/></button></div></div></header></>;
}

const HERO_IMAGE = '/images/jenzabarheroimage.png';

function Hero() {
  return <section className="jz-hero jz-dark" id="top">
    <Header/>
    <div className="jz-container">
      <div className="jz-hero-copy">
        <span className="jz-eyebrow-pill">Built exclusively for higher education</span>
        <h1>Your entire campus.<em>One connected experience.</em></h1>
        <p>Connect every stage of the student journey. From recruitment and registration to retention,<br className="jz-desktop-break"/> finance and advancement, bring your campus together with Jenzabar.</p>
        <div className="jz-hero-actions">
          <a className="jz-button white" href="#platform">Explore Jenzabar One <span>↗</span></a>
          <a className="jz-overview" href={`${BASE}/jenzabar-one`}>Explore the platform <span className="jz-round-play"><Icon name="arrow" size={17}/></span></a>
        </div>
        <small>Higher education, connected &nbsp; • &nbsp; One trusted partner</small>
      </div>
      <div className="jz-hero-showcase">
        <div className="jz-hero-screen">
          <img
            src={HERO_IMAGE}
            alt="Jenzabar dashboard preview"
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }}
          />
        </div>
      </div>
      <div className="jz-proof">
        <h2>Trusted by more than <span>1,400 campuses.</span></h2>
        <div className="jz-campus-logos">{[1,2,3,4].map(i=><img key={i} src={ASSETS[i].src} alt={ASSETS[i].name}/>)}</div>
      </div>
      <div className="jz-benefits">
        {[['database','One campus record'],['users','Connected departments'],['user','Student self-service'],['gear','Flexible workflows'],['cap','Higher ed expertise']].map(([icon,label])=><div key={label}><Icon name={icon} size={31}/><span>{label}</span></div>)}
      </div>
    </div>
  </section>;
}

const PRODUCT_IMAGES = [
  '/images/jenzabar-student-campus-4k.png',
  '/images/jenzabar-recruitment-campus-4k.png',
  '/images/jenzabar-retention-campus-4k.png',
  '/images/jenzabar-finance-campus-4k.png',
  '/images/jenzabar-analytics-campus-4k.png'
];


function ShowcasePanel({ index }) {
  const p = PRODUCTS[index];
  return (
    <div className="jz-showcase-container">
      <img src={PRODUCT_IMAGES[index]} alt={`Jenzabar ${p.name} product screen`} loading="lazy"/>
    </div>
  );
}


function ProductsSection({ selected, onSelect }) {
  const p=PRODUCTS[selected];

  useEffect(() => {
    PRODUCT_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return <section className="jz-products jz-light" id="platform"><div className="jz-container"><div className="jz-products-eyebrow"><span/>Our products<span/></div><h2>Everything your campus needs. <em>Connected.</em></h2><div className="jz-tabs-wrap"><div className="jz-products-tabs"><Tabs value={selected} onChange={onSelect} id="feature-product-panel"/></div></div><div className="jz-product-grid" role="tabpanel" id="feature-product-panel" aria-label={`Jenzabar ${p.name} features`}><div className="jz-product-copy"><span className="jz-kicker">Jenzabar {p.name}</span><h3>{p.title}</h3><ul>{p.bullets.map(b=><li key={b}><span><Icon name="check" size={13}/></span>{b}</li>)}</ul><a className="jz-text-link" href={`${BASE}/jenzabar-one`}>Explore Jenzabar {p.name}<Icon name="arrow" size={20}/></a></div><div className="jz-feature-screen"><div className="jz-slide-panel" key={selected}><ShowcasePanel index={selected}/></div></div></div></div></section>;
}
function StoriesSection() {
  const [story,setStory]=useState(0); const s=STORIES[story];
  const advance=(step)=>setStory((story+step+STORIES.length)%STORIES.length);
  return <section className="jz-stories jz-dark" id="proof"><div className="jz-container"><h2>Real campuses. <em>Meaningful progress.</em></h2><div className="jz-carousel"><button className="jz-carousel-arrow prev" aria-label="Previous customer story" onClick={()=>advance(-1)}><Icon name="chevron"/></button><article className="jz-story" aria-live="polite" key={story}><div className="jz-story-photo"><img src={s.img} alt={`${s.school} campus, illustrative photography`} loading="lazy"/></div><div className="jz-story-copy"><span className="jz-kicker light">{s.school}</span><h3>{s.title}</h3><blockquote className="jz-story-quote"><span aria-hidden="true">&ldquo;</span>{s.quote}<footer><b>{s.name}</b><span>{s.role}, {s.school}</span></footer></blockquote><a className="jz-text-link cyan" href={`${BASE}/`}>Explore customer stories <Icon name="arrow" size={18}/></a></div></article><button className="jz-carousel-arrow next" aria-label="Next customer story" onClick={()=>advance(1)}><Icon name="chevron"/></button></div><div className="jz-dots">{STORIES.map((item,i)=><button key={item.school} aria-label={`Show ${item.school} story`} aria-pressed={i===story} onClick={()=>setStory(i)} className={i===story?'active':''}/>)}</div><div className="jz-outcomes"><h2>Less administration. <em>More time for students.</em></h2><div>{[['users','Connected teams','Bring departments together around shared information.'],['bars','Clearer decisions','Turn data into insight to support student success.'],['user','Consistent experiences','Give students a seamless experience across campus.']].map(([icon,title,text])=><article key={title}><Icon name={icon} size={40}/><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></div></section>;
}
function RolesSection({ onSelect }) {
  return (
    <section className="jz-roles jz-light" id="roles">
      <div className="jz-container">
        <div className="jz-roles-heading">
          <span className="jz-roles-eyebrow">Built for every role</span>
          <h2>Built around <em>your campus.</em></h2>
          <p>One connected platform that brings every team, system and student touchpoint together so your campus can operate more efficiently and deliver a better experience.</p>
        </div>
        <div className="jz-role-grid">
          {ROLES.map(r => (
            <a key={r.name} href="#platform" onClick={() => onSelect(r.product)} className="jz-role">
              <div className="jz-role-copy">
                <span className="jz-role-icon"><Icon name={r.icon} size={22}/></span>
                <h3>{r.name}</h3>
                <p>{r.text}</p>
                <span className="jz-role-link">Explore <Icon name="arrow" size={16}/></span>
              </div>
              <div className="jz-role-photo">
                <img src={r.img} alt={`${r.name} — illustrative product view`} loading="lazy"/>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
function IntegrationsSection() {
  return <section className="jzc-section" id="integrations" aria-labelledby="jzc-title">
    <div className="jzc-container">
      <div className="jzc-heading">
        <div><span className="jzc-eyebrow">A connected campus</span><h2 id="jzc-title">Your campus systems.<br/><em>Better connected.</em></h2></div>
        <div className="jzc-intro"><p>Bring your technology together with the Jenzabar One API and Jenzabar Unity Platform.</p><a href="#platform">Explore campus connectivity <span aria-hidden="true">↗</span></a></div>
      </div>
      <IntegrationDiagram/>
      <div className="jzc-comparison">
        <article className="jzc-before"><div><h3>Disconnected systems</h3><p>Data sits across separate systems, making the full picture harder to see.</p></div><CampusMiniRecords/></article>
        <span className="jzc-compare-arrow" aria-hidden="true"><Icon name="arrow"/></span>
        <article className="jzc-after"><div><h3>A connected campus</h3><p>Bring your systems together for a unified view of your institution.</p></div><CampusMiniRecords connected/></article>
      </div>
    </div>
  </section>;
}
function FAQSection() {
  const [open,setOpen]=useState(1);
  return (
    <section className="jz-faq" id="questions">
      <div className="jz-container jz-faq-grid">
        <div className="jz-faq-intro">
          <span className="jz-faq-eyebrow">Frequently asked</span>
          <h2>Questions,<br/><em>answered.</em></h2>
          <p>Everything you need to know about connecting your campus with Jenzabar.</p>
        
      <div className="jz-faq-illustration" aria-hidden="true">
  <img src="/images/jenzabarsketch.png" alt="" loading="lazy"/>
</div>


          <div className="jz-faq-cta">
            <strong>Your campus.<br/>Your questions.</strong>
            <span>Let's find the right fit for your institution.</span>
            <a href={`${BASE}/contact-us`} className="jz-faq-cta-button"><span>Talk to our team</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg></a>
          </div>
        </div>
        <div className="jz-faq-list">
          {FAQS.map(([q,a,linkLabel,linkHref],i)=>(
            <article className={open===i?'open':''} key={q}>
              <h3>
                <button onClick={()=>setOpen(open===i?null:i)} aria-expanded={open===i} aria-controls={`jz-answer-${i}`} id={`jz-question-${i}`}>
                  <span className="jz-faq-num">{String(i+1).padStart(2,'0')}</span>
                  <span className="jz-faq-q">{q}</span>
                  <span className="jz-faq-toggle" aria-hidden="true">
                    {open===i
                      ? <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                      : <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 8h10M8 3v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}
                  </span>
                </button>
              </h3>
              <div className="jz-faq-answer" id={`jz-answer-${i}`} role="region" aria-labelledby={`jz-question-${i}`} hidden={open!==i}>
                <p>{a}</p>
                {linkLabel && <a className="jz-faq-inline-link" href={linkHref}>{linkLabel} <span aria-hidden="true">↗</span></a>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function Footer() {
  const columns=[['Products',...PRODUCTS.map(p=>[`Jenzabar ${p.name}`,`${BASE}/jenzabar-one`])],['Solutions',['For your role','#roles'],['For your institution',`${BASE}/solutions`],['Integrations','#integrations'],['Support & training',`${BASE}/services`]],['Resources',['Resource library',`${BASE}/resources`],['Customer stories','#proof'],['Frequently asked questions','#questions'],['Blog',`${BASE}/blog`]],['Company',['About us',`${BASE}/about`],['Careers',`${BASE}/careers`],['Contact',`${BASE}/contact-us`]]];
  return <footer className="jz-footer jz-dark" id="demo"><div className="jz-container"><div className="jz-final-cta"><h2>Build a more <em>connected campus.</em></h2><a className="jz-button magenta" href={DEMO}>Request a demo <Icon name="arrow" size={17}/></a><a className="jz-talk" href={`${BASE}/contact-us`}>Talk to our team <Icon name="arrow" size={18}/></a></div><div className="jz-footer-grid"><a href="#top" aria-label="Jenzabar home"><Brand dark/></a>{columns.map(([title,...links])=><div key={title}><h3>{title}</h3>{links.map(([label,href])=><a key={label} href={href}>{label}</a>)}</div>)}</div><div className="jz-footer-bottom"><span>© {new Date().getFullYear()} Jenzabar</span><a href={`${BASE}/privacy-policy`}>Privacy</a><a href={`${BASE}/terms-of-use`}>Terms</a><span className="jz-footer-tagline">Higher education. Connected.</span></div></div></footer>;
}
export default function App() {
  const [selected,setSelected]=useState(0);
  return <div className="jz-site"><style>{CSS}</style><a className="jz-skip" href="#main-content">Skip to content</a><main id="main-content"><Hero/><ProductsSection selected={selected} onSelect={setSelected}/><StoriesSection/><RolesSection onSelect={setSelected}/><AnalyticsSection/><IntegrationsSection/><FAQSection/></main><Footer/></div>;
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;1,500&display=swap');
body:has(.jz-site){margin:0;display:block;min-width:320px}#root:has(.jz-site),#__next:has(.jz-site){width:100%;max-width:none;margin:0;padding:0;text-align:left}
.jz-site{--navy:#0A2540;--deep:#061A2E;--blue:#0067c7;--cyan:#00b8e9;--magenta:#ad087b;--ivory:#FAFAFB;--ink:#1A1F36;--muted:#6B7280;--line:#E3E8EE;--surface:#FFFFFF;--radius:12px;--radius-sm:8px;--shadow-sm:0 1px 2px rgba(16,24,40,.05);--shadow-md:0 4px 20px -6px rgba(16,24,40,.10),0 16px 44px -14px rgba(16,24,40,.16);--font-sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;--font-serif:'Playfair Display',Georgia,'Times New Roman',serif;font-family:var(--font-sans);color:var(--ink);background:var(--ivory);font-size:15px;line-height:1.5;width:100%;overflow:clip;text-align:left;-webkit-font-smoothing:antialiased}
.jz-site *{box-sizing:border-box}.jz-site h1,.jz-site h2,.jz-site h3,.jz-site h4,.jz-site p{margin:0}.jz-site a{color:inherit;text-decoration:none}.jz-site button,.jz-site select{font:inherit}.jz-site button{cursor:pointer}.jz-site button,.jz-site a{-webkit-tap-highlight-color:transparent}.jz-site button{color:inherit}.jz-site button:focus-visible,.jz-site a:focus-visible,.jz-site select:focus-visible,.jz-site svg [tabindex]:focus-visible{outline:3px solid #15b9e3;outline-offset:5px}.jz-site img{display:block;max-width:100%}.jz-site svg{flex-shrink:0}.jz-site h2,.jz-site h3.editorial{font-family:Georgia,'Times New Roman',serif;letter-spacing:-1.1px;font-weight:400}.jz-site h2{font-size:clamp(30px,3.2vw,46px);line-height:1.14}.jz-site em{font-family:Georgia,'Times New Roman',serif;font-weight:400}.jz-container{width:min(1480px,calc(100% - 80px));margin-inline:auto}.jz-dark{background:var(--navy);color:#fff}.jz-light{background:var(--ivory)}.jz-skip{position:fixed;z-index:100;left:16px;top:-100px;background:white;padding:14px;color:var(--ink)!important}.jz-skip:focus{top:16px}.jz-brand{position:relative;display:inline-block;width:176px;height:36px;flex-shrink:0;vertical-align:middle}.jz-brand img{position:absolute;width:100%;height:100%;object-fit:contain;inset:0}.jz-brand.on-dark>img:first-child{filter:brightness(0) invert(1)}.jz-brand .jz-brand-color{clip-path:inset(0 80% 0 0)}.jz-brand.small{width:74px;height:17px}.jz-button{display:inline-flex;align-items:center;justify-content:center;gap:12px;padding:12px 24px;min-height:48px;border-radius:60px;font-size:14px;font-weight:500;line-height:1;transition:all .2s;white-space:nowrap}.jz-button:hover{transform:translateY(-1px);box-shadow:0 8px 20px -6px rgba(10,37,64,.25)}.jz-button.magenta{background:var(--magenta);color:#fff}.jz-button.magenta:hover{background:#c4128e}.jz-button.white{background:#fff;color:var(--navy);border:1.5px solid #d9e3ee}.jz-text-link{display:inline-flex;align-items:center;gap:16px;font-weight:600;font-size:15px;color:var(--blue)!important}.jz-text-link:hover{text-decoration:underline;text-underline-offset:5px}.jz-text-link.cyan{color:var(--cyan)!important}.jz-kicker{text-transform:uppercase;font-size:11px;letter-spacing:.8px;font-weight:700;display:inline-flex;align-items:center;gap:6px;padding:0;border:0;background:transparent;color:#0A2540}
.jz-kicker.light{color:#fff}
.jz-kicker.light{border-color:#ffffff55;color:#fff} .jz-header-inner{display:flex;align-items:center;justify-content:space-between;gap:30px;min-height:84px}.jz-header nav{display:flex;gap:36px;margin-left:44px;margin-right:auto;font-size:13.5px;font-weight:500;letter-spacing:-.005em}
.jz-header nav a{position:relative;display:inline-flex;align-items:center;padding:6px 0;color:#d6e4f0;transition:color .25s ease}
.jz-header nav a:after{content:'';position:absolute;left:0;right:0;bottom:-2px;height:1px;background:var(--cyan);transform:scaleX(0);transform-origin:left center;transition:transform .35s cubic-bezier(.22,.68,0,1.01)}
.jz-header nav a:hover{color:#fff}
.jz-header nav a:hover:after{transform:scaleX(1)}
.jz-header nav a.active{color:#fff}
.jz-header nav a.active:after{transform:scaleX(1)}
.jz-nav-caret{color:#bdd0e0}
.jz-header-actions{display:flex;gap:24px;align-items:center}
.jz-login{font-size:13px;font-weight:500;color:#d6e4f0;transition:color .2s}
.jz-login:hover{color:#fff}.jz-header .jz-button{padding:11px 17px;font-size:12px;min-height:39px}.jz-mobile-toggle{display:none;background:none;border:0;padding:6px}.jz-hero{background:radial-gradient(ellipse at 48% 58%,#0d3556 0%,#082b48 65%,#062b49 100%)}.jz-hero-copy{text-align:center;padding:35px 0 24px}.jz-eyebrow-pill{display:inline-block;font-size:11px;line-height:1.2;border:1px solid #59748a;border-radius:30px;padding:4px 10px;background:#ffffff08}.jz-hero h1{font-size:clamp(40px,4.9vw,69px);line-height:1.03;letter-spacing:-2px;margin:18px 0 13px;font-weight:700}.jz-hero h1 em{display:block;font-size:1.03em;line-height:1.03;letter-spacing:-2.5px}.jz-hero-copy>p{font-size:16px;line-height:1.45;color:#edf3f7;max-width:865px;margin:auto}.jz-hero-actions{display:flex;align-items:center;justify-content:center;gap:27px;margin:22px 0 12px}.jz-hero-actions .jz-button{min-height:41px}.jz-overview{display:flex;align-items:center;gap:12px;font-size:13px}.jz-round-play{display:grid;place-items:center;border:1px solid #a5c2d8;width:29px;height:29px;border-radius:50%}.jz-hero-copy>small{font-size:11px;color:#d6e2ed}.jz-hero-showcase{display:flex;flex-direction:column;align-items:center;gap:25px;margin:24px 0 0}/* Horizontal Tabs - Segmented pill, matches target design */
.jz-products-eyebrow{display:flex;align-items:center;justify-content:center;gap:16px;font-size:11px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:#0067c7;margin-bottom:18px}
.jz-products-eyebrow span{width:44px;height:1px;background:currentColor;opacity:.45}

.jz-tabs {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  background: #FFFFFF;
  padding: 8px;
  border-radius: 60px;
  border: 1px solid #E7EBF0;
  box-shadow: 0 8px 24px -10px rgba(16, 24, 40, 0.10);
  width: auto;
  margin: 0 auto;
}

.jz-tabs button {
  position: relative;
  display: flex;
  align-items: center;
  gap: 11px;
  background: transparent;
  border: 0;
  border-radius: 60px;
  min-height: 54px;
  padding: 0 30px;
  font-size: 16px;
  font-weight: 700;
  color: #8A97A6;
  transition: color 0.2s ease, background 0.2s ease;
  cursor: pointer;
}

.jz-tabs button:not(:last-child):after {
  content: '';
  position: absolute;
  right: -1px;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 20px;
  background: #E5E7EB;
  transition: opacity 0.2s ease;
}

.jz-tabs button.active:after,
.jz-tabs button.active + button:after {
  opacity: 0;
}

.jz-tabs button svg {
  color: #9CA3AF;
  transition: color 0.2s ease;
  width: 21px;
  height: 21px;
}

.jz-tabs button:hover {
  color: #1A1F36;
}

.jz-tabs button.active {
  background: #FFFFFF;
  color: #0067c7;
  box-shadow: 0 4px 12px rgba(16, 24, 40, 0.10);
}



.jz-hero-showcase{
  width:100%;
  max-width:100%;
  margin:24px auto 0;
  padding:0;
}
.jz-hero-showcase .jz-tabs,
.jz-hero-showcase .jz-hero-screen{
  width:100%;
  max-width:none;
  margin:0;
  box-sizing:border-box;
}
.jz-hero-showcase .jz-tabs{
  display:flex;
  justify-content:space-between;
  background:transparent;
  border:0;
  border-radius:0;
  backdrop-filter:none;
  -webkit-backdrop-filter:none;
  box-shadow:none;
  padding:0;
  border-bottom:1px solid rgba(255,255,255,0.15);
}
.jz-hero-showcase .jz-tabs button{
  flex:1;
  justify-content:center;
  color:#c3d3e1;
  background:transparent;
  box-shadow:none;
  border-radius:0;
  border-bottom:2px solid transparent;
  padding:16px 20px;
}
.jz-hero-showcase .jz-tabs button:not(:last-child):after{
  background:rgba(255,255,255,0.15);
}
.jz-hero-showcase .jz-tabs button svg{
  color:#9fb7cb;
}
.jz-hero-showcase .jz-tabs button:hover{
  color:#ffffff;
  background:transparent;
}
.jz-hero-showcase .jz-tabs button.active{
  color:#ffffff;
  background:transparent;
  border-bottom-color:#3aa0e8;
}
.jz-hero-showcase .jz-tabs button.active svg{
  color:#5ec8f2;
}
.jz-tabs button.active svg {
  color: #0067c7;
}

/* Vertical Tabs - Keep Original Style (for Hero) */
.jz-tabs.vertical {
  flex-direction: column;
  gap: 8px;
  background: transparent;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  padding: 24px 0 0;
  align-self: start;
  justify-content: flex-start;
  align-items: stretch;
}

.jz-tabs.vertical button {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  padding: 12px 14px;
  border-bottom: 0;
  border-left: 3px solid transparent;
  border-radius: 0;
  min-height: 56px;
  color: #c8d8e4;
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  width: 100%;
  background: transparent;
  box-shadow: none;
}

.jz-tabs.vertical button.active {
  border-left-color: #db139d;
  background: linear-gradient(90deg, #ffffff09, transparent);
  color: #fff;
  box-shadow: none;
}

.jz-tabs.vertical button svg {
  color: #a9c3d6;
}

.jz-tabs.vertical button.active svg {
  color: #fff;
}

.jz-tabs.vertical button:hover{background:#ffffff09;color:#fff}
.jz-tabs.vertical button:after{display:none}

/* Product Showcase Image Container */
.jz-showcase-container {
  position: relative;
  overflow: hidden;
  min-height: 420px;
  background: #F4F7FA;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.jz-showcase-container img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .jz-tabs {
    flex-wrap: wrap;
    gap: 8px;
    justify-content: flex-start;
  }
  .jz-tabs button {
    padding: 0 16px;
    min-height: 40px;
    font-size: 12px;
  }
  .jz-showcase-container {
    min-height: 300px;
    padding: 10px;
  }
}

/* Rest of the original CSS block that should remain unchanged */
.jz-hero-screen{padding:0;border:0;border-radius:12px;background:transparent;min-width:0;overflow:hidden;max-width:1000px;margin:0 auto}
.jz-slide-panel{
  animation: jzFadeIn .35s ease-out;
  will-change: opacity;
}
@keyframes jzFadeIn{
  from{opacity:0}
  to{opacity:1}
}.jz-app{background:var(--surface);color:var(--ink);border:1px solid #E7EBF0;border-radius:var(--radius);overflow:hidden;font-family:var(--font-sans);line-height:1.4;min-width:0;box-shadow:var(--shadow-md)}
.jz-app-toolbar{height:52px;background:var(--surface);display:flex;align-items:center;gap:16px;padding:0 20px;border-bottom:1px solid var(--line)}.jz-fake-search{display:flex;align-items:center;gap:8px;font-size:11px;flex:1;color:var(--muted);background:#F4F6F8;border-radius:6px;padding:8px 12px;white-space:nowrap}.jz-toolbar-icons{display:flex;align-items:center;gap:12px}.jz-avatar{width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;background:#eef2f7;color:#2f4e6c;border-radius:50%;font-size:8px;font-weight:700}.jz-avatar.blue{background:#0a2f47;color:white;width:22px;height:22px;font-size:7px}.jz-app-body{display:flex;min-height:304px;background:#fbfcfe}.jz-app-nav{width:150px;flex-shrink:0;padding:18px 10px;background:#FBFBFC;border-right:1px solid #EEF1F5;display:flex;flex-direction:column;gap:2px}.jz-app-nav>span{display:flex;gap:9px;align-items:center;font-size:12.5px;line-height:1;padding:9px 10px;border-radius:6px;color:#8B95A3;white-space:nowrap;font-weight:500;transition:all .15s}.jz-app-nav>span.selected{background:#F0F3F6;color:var(--ink);font-weight:600}
.jz-app-nav .jz-app-more{margin-top:auto;color:#9aa8b8}.jz-app-main{padding:18px 16px 12px;min-width:0;flex:1;background:#fff}.jz-app h3{font-family:Arial,sans-serif;letter-spacing:-.3px;font-size:17px;font-weight:700;line-height:1.25}.jz-dash-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:15px}.jz-dash-heading select{font-size:8px;color:#5d7186;background:white;border:1px solid #e7edf2;padding:5px 7px;border-radius:3px;max-width:100px}.jz-stat-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px}.jz-stat-cards>div{background:var(--surface);padding:22px 20px;display:flex;gap:16px;align-items:center;border:1px solid #EEF1F5;border-radius:var(--radius-sm);box-shadow:none}.jz-stat-cards svg{color:#8593A3}.jz-stat-cards b{display:block;font-size:21px;line-height:1.2;color:var(--navy);font-weight:600;letter-spacing:-.01em}.jz-stat-cards span{display:block;font-size:12px;color:var(--muted);white-space:nowrap}.jz-dash-bottom{display:grid;grid-template-columns:1.03fr 1fr;gap:10px}.jz-chart-title{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:14px;min-height:24px;font-weight:600}.jz-chart-title span{font-size:6px;color:#718198}.jz-line-chart,.jz-records{background:var(--surface);padding:20px 16px;border-radius:8px;border:1px solid var(--line);min-width:0}.jz-line-chart svg{display:block;width:100%;height:auto;margin-top:7px}.jz-line-chart svg text,.jz-bar-card svg text{fill:var(--muted);font-family:inherit;font-size:11px}.jz-records>strong{font-size:8px;display:block;margin-bottom:10px}.jz-record{display:flex;align-items:center;gap:12px;padding:12px 8px;border-radius:var(--radius-xs,6px);font-size:13px;transition:background .15s;border-bottom:1px solid var(--line)}.jz-record:last-child{border-bottom:none}.jz-record:hover{background:#f6f9fc}.jz-record .jz-avatar{width:22px;height:22px;font-size:6px}.jz-record>span:nth-child(2){flex:1;white-space:nowrap}.jz-status{display:inline-block;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;white-space:nowrap}.tone-0{background:#e7f5ed;color:#29794a}.tone-1{background:#e6f1ff;color:#116bc0}.tone-2{background:#fff3df;color:#ac7a25}.jz-sample{font-size:6px;text-align:right;color:#8594a3;margin-top:9px}

.jz-funnel{background:var(--surface);padding:20px;border-radius:8px;border:1px solid var(--line)}
.jz-funnel-row{display:grid;grid-template-columns:80px 1fr 40px;align-items:center;gap:12px;padding:12px 0;font-size:13px;border-bottom:1px solid var(--line)}
.jz-funnel-track{height:7px;background:#eef3f7;border-radius:4px;overflow:hidden}
.jz-funnel-track>span{display:block;height:100%;background:linear-gradient(90deg,#0067c7,#00b8e9);border-radius:4px}
.jz-funnel-row b{text-align:right;color:#1a3754}
.jz-risk-panel{background:var(--surface);padding:20px;border-radius:8px;border:1px solid var(--line)}
.jz-risk-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:10px}
.jz-risk-card{display:flex;align-items:center;gap:7px;padding:10px 7px;border:1px solid #eef2f6;border-radius:4px}
.jz-risk-card svg{width:32px;height:32px}
.jz-risk-card .track{stroke:#eef2f6}
.jz-risk-card.tone-good .value{stroke:#2f9e5c}
.jz-risk-card.tone-watch .value{stroke:#c98a1f}
.jz-risk-card.tone-risk .value{stroke:#c23a3a}
.jz-risk-card b{display:block;font-size:6.5px}
.jz-risk-card small{display:block;font-size:5.5px;color:#748297}
.jz-budget-panel{background:var(--surface);padding:20px;border-radius:8px;border:1px solid var(--line)}
.jz-budget-row{display:grid;grid-template-columns:140px 1fr 40px;align-items:center;gap:12px;padding:14px 0;border-bottom:1px solid var(--line);font-size:13px}
.jz-budget-row:last-child{border-bottom:0}
.jz-budget-row>span small{display:block;color:#8494a8;font-size:5.5px;margin-top:2px}
.jz-budget-track{height:6px;background:#eef3f7;border-radius:3px;overflow:hidden}
.jz-budget-track>span{display:block;height:100%;background:#0967c2;border-radius:3px}
.jz-budget-row b{text-align:right}
.jz-tabs-wrap{margin-top:36px;padding-bottom:24px;text-align:center}

/* Products section tabs — same layout as hero, black text, blue active */
.jz-products-tabs .jz-tabs{
  display:flex;
  justify-content:space-between;
  background:transparent;
  border:0;
  border-radius:0;
  box-shadow:none;
  padding:0;
  border-bottom:1px solid #D8DFE7;
  width:100%;
  max-width:none;
  margin:0;
}
.jz-products-tabs .jz-tabs button{
  flex:1;
  justify-content:center;
  color:#4A5A6E;
  background:transparent;
  box-shadow:none;
  border-radius:0;
  border-bottom:2px solid transparent;
  padding:16px 20px;
  font-size:15px;
  font-weight:600;
  gap:10px;
}
.jz-products-tabs .jz-tabs button:not(:last-child):after{
  background:#D8DFE7;
}
.jz-products-tabs .jz-tabs button svg{
  color:#8A97A6;
  width:19px;
  height:19px;
}
.jz-products-tabs .jz-tabs button:hover{
  color:#0A2540;
  background:transparent;
}
.jz-products-tabs .jz-tabs button.active{
  color:#0067c7;
  background:transparent;
  border-bottom-color:#0067c7;
}
.jz-products-tabs .jz-tabs button.active svg{
  color:#0067c7;
}
.jz-reports-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.jz-report-tile{background:white;border:1px solid #eef2f6;border-radius:4px;padding:12px 10px;display:flex;flex-direction:column;gap:6px}
.jz-report-tile svg{color:#0876cf}
.jz-report-tile b{font-size:6.5px}
.jz-report-tile small{font-size:5.5px;color:#8494a8}
.jz-trend{font-size:6px;font-weight:700;align-self:flex-start;padding:2px 5px;border-radius:8px;background:#e6f5eb;color:#2c8a53}
.jz-trend.flat{background:#eef1f5;color:#748297}.jz-phone{position:relative;background:var(--surface);color:var(--ink);border:8px solid #1A1F36;border-radius:32px;min-height:300px;width:260px;padding:16px 16px 14px;align-self:center;box-shadow:0 20px 40px -10px rgba(0,0,0,0.15);border-top:8px solid #1A1F36;border-bottom:8px solid #1A1F36}
.jz-phone:before{content:'';position:absolute;top:6px;left:50%;transform:translateX(-50%);width:64px;height:16px;background:#0d1b2a;border-radius:0 0 12px 12px}
.jz-phone-status{display:flex;justify-content:space-between;align-items:center;font-size:9px;font-weight:700;margin:2px 3px 14px}
.jz-battery{width:20px;height:10px;border:1.4px solid #213a51;border-radius:2px;position:relative}
.jz-battery:before{content:'';position:absolute;right:-4px;top:2.5px;width:2px;height:5px;background:#213a51;border-radius:0 1px 1px 0}
.jz-battery:after{content:'';position:absolute;inset:1.5px;width:70%;background:#1A1F36;border-radius:1px}
.jz-phone-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px}
.jz-phone-top button{background:none;border:0;padding:4px}
.jz-phone .jz-brand{width:80px}
.jz-person{display:flex;align-items:center;gap:12px;margin-bottom:20px}
.jz-person img{width:48px;height:48px;object-fit:cover;border-radius:50%}
.jz-person b{font-size:15px;display:block;font-weight:700}
.jz-person small{display:block;font-size:11px;color:var(--muted);margin-top:2px}
.jz-phone h4{font-size:16px;font-weight:700;margin-bottom:4px}
.jz-phone>small{font-size:12px;color:var(--muted);display:block;margin-bottom:16px}
.jz-courses{margin-top:12px}
.jz-courses>div{display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--line);padding:12px 0}
.jz-courses b{display:block;font-size:13px;font-weight:600}
.jz-courses small{font-size:11px;display:block;color:var(--muted);margin-top:2px}
.jz-grade{font-size:12px;font-weight:700;background:#E6F4EA;color:#137333;border-radius:6px;min-width:32px;text-align:center;padding:4px 6px}
.jz-courses>div:nth-child(2) .jz-grade{background:#E8F0FE;color:#1A73E8}
.jz-meeting{border-top:1px solid var(--line);margin-top:20px;padding-top:20px;display:flex;gap:14px}
.jz-meeting svg{color:#D21091}
.jz-meeting b{display:block;font-size:14px;font-weight:600}
.jz-meeting small{display:block;font-size:12px;color:var(--muted);margin-top:2px}
.jz-portal-menu>b{font-size:16px}
.jz-portal-menu button{display:flex;width:100%;align-items:center;justify-content:space-between;background:none;border:0;border-bottom:1px solid var(--line);padding:22px 0;text-align:left;font-size:14px;font-weight:500}
.jz-proof{text-align:center;margin-top:40px}
.jz-proof h2{font-size:36px}
.jz-proof h2 span{color:var(--cyan)}
.jz-campus-logos{display:flex;align-items:center;justify-content:space-around;gap:50px;margin:30px auto 40px;max-width:1040px}
.jz-campus-logos img{width:180px;height:74px;object-fit:contain;filter:grayscale(1) brightness(0) invert(1);opacity:.87}
.jz-benefits{display:grid;grid-template-columns:repeat(5,1fr);padding:10px 0 40px}
.jz-benefits>div{display:flex;align-items:center;flex-direction:column;gap:12px;border-right:1px solid #8297a966;font-size:13px;font-weight:500}
.jz-benefits>div:last-child{border:0}
.jz-benefits svg{color:#c2d6e5}
.jz-products{padding:50px 0;scroll-margin-top:20px}
.jz-products h2{text-align:center;margin-bottom:32px;font-size:clamp(32px,4vw,52px);letter-spacing:-.03em;font-family:var(--font-serif)}
.jz-product-grid{display:grid;grid-template-columns:.78fr 1.45fr;gap:28px;align-items:center;padding-top:30px;min-height:358px}
.jz-product-copy .jz-kicker{color:#0A2540;font-size:12.5px}
.jz-product-copy h3{font-family:var(--font-sans);font-size:clamp(34px,3.6vw,46px);font-weight:800;line-height:1.12;letter-spacing:-.025em;max-width:360px;margin:14px 0 26px;color:var(--navy)}
.jz-product-copy ul{padding:0;list-style:none;display:flex;flex-direction:column;gap:18px;margin:0 0 30px}
.jz-product-copy li{display:flex;align-items:flex-start;gap:14px;font-size:16.5px;color:#3a4a5e;line-height:1.5}.jz-product-copy li>span{display:grid;place-items:center;color:#fff;background:var(--blue);border-radius:50%;width:22px;height:22px;flex-shrink:0;margin-top:1px}
.jz-feature-screen{min-width:0;overflow:hidden}

/* Plain, centered showcase image — no card, no border */
.jz-showcase-container {
  position: relative;
  overflow: hidden;
  min-height: 420px;
  background: transparent;
  border: 0;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.jz-showcase-container img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
  border-radius: 0;
  box-shadow: none;
}

@media (max-width: 768px) {
  .jz-tabs {
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
  }
  .jz-tabs button {
    padding: 0 16px;
    min-height: 40px;
    font-size: 12px;
  }
  .jz-showcase-container {
    min-height: 300px;
    padding: 0;
  }
}
.jz-image-poster>img{display:block;width:100%;height:100%;object-fit:cover}
@media(max-width:640px){.jz-image-poster{min-height:300px}}

.jz-feature-screen .jz-app-body{min-height:307px}
.jz-feature-screen .jz-app-toolbar{height:44px}
.jz-profile-head{display:flex;align-items:center;gap:16px;margin:16px 0 28px}.jz-profile-head>img{width:56px;height:56px;border-radius:50%;object-fit:cover}.jz-profile-head h3{font-size:19px;font-weight:600;color:var(--navy);letter-spacing:-.01em}.jz-profile-head small{font-size:13px;color:var(--muted);display:block;margin-top:4px}.jz-profile-head>.jz-status{margin-left:auto}

.jz-profile-tabs{display:flex;gap:28px;border-bottom:1px solid var(--line);margin-bottom:24px}.jz-profile-tabs button{background:none;border:0;border-bottom:2px solid transparent;padding:12px 0;font-size:14px;color:var(--muted);font-weight:500;transition:all .15s}.jz-profile-tabs button:hover{color:var(--ink)}.jz-profile-tabs button.active{color:var(--blue);border-bottom-color:var(--blue)}

.jz-profile-grid{display:grid;grid-template-columns:1fr 1.15fr;gap:16px}
.jz-progress,.jz-schedule{background:var(--surface);padding:20px;border-radius:8px;border:1px solid var(--line)}
.jz-progress>strong,.jz-schedule>strong{font-size:14px;display:block;font-weight:600}
.jz-progress>div:first-of-type{display:flex;gap:12px;align-items:center;margin-top:16px}
.jz-progress svg{width:80px;height:80px;transform:rotate(-90deg)}.jz-progress svg circle{fill:none;stroke-width:8}.jz-progress svg circle:first-child{stroke:#e8edf3}.jz-progress svg circle:nth-child(2){stroke:var(--blue);stroke-linecap:round;stroke-dasharray:176.4 245}.jz-progress svg text{transform:rotate(90deg);transform-origin:center;font-size:20px;font-weight:700;fill:var(--navy);font-family:var(--font-sans)}
.jz-progress span{font-size:13px;color:var(--muted)}
.jz-progress span b{display:block;color:var(--ink);margin-top:4px;font-size:16px;font-weight:700}
.jz-progress-track{height:8px;background:#E2EDF5;border-radius:4px;margin-top:16px;overflow:hidden}
.jz-progress-track>span{display:block;height:100%;width:72%;background:var(--blue)}
.jz-schedule>div{display:grid;grid-template-columns:60px 1fr 50px;gap:8px;font-size:12px;padding:14px 0;border-bottom:1px solid var(--line)}
.jz-detail-pane{min-height:180px;padding:30px;background:var(--surface);border:1px solid var(--line);border-radius:8px;font-size:14px}
.jz-detail-pane h4{margin:10px 0;font-size:16px}
.jz-detail-pane small{font-size:12px;color:var(--muted)}
.jz-stories{padding:100px 0 90px}
.jz-stories>div>h2{text-align:center;margin-bottom:44px}
.jz-carousel{position:relative;padding:0 40px}
.jz-story{display:grid;grid-template-columns:1.12fr 1fr;overflow:hidden;box-shadow:0 30px 70px -30px rgba(0,0,0,.5);animation:jzSlideIn .45s cubic-bezier(.22,.68,0,1.01)}
.jz-story-photo{position:relative;min-height:340px}
.jz-story-photo img{width:100%;height:100%;position:absolute;inset:0;object-fit:cover}
.jz-story-copy{padding:56px 52px;background:#0c2f4d;display:flex;flex-direction:column;justify-content:center;gap:2px}
.jz-story-copy h3{font-family:Georgia,serif;font-size:30px;line-height:1.22;letter-spacing:-.3px;font-weight:400;margin:20px 0 20px;max-width:360px}
.jz-story-quote{margin:0 0 28px;max-width:400px;border-left:2px solid #2b5b85;padding-left:20px}
.jz-story-quote>span{font-family:Georgia,serif;font-size:34px;line-height:0;color:#4a86bd;vertical-align:-10px;margin-right:2px}
.jz-story-quote{font-family:Georgia,serif;font-style:italic;font-size:16px;line-height:1.65;color:#dbe6ef}
.jz-story-quote footer{margin-top:16px;font-style:normal}
.jz-story-quote footer b{display:block;font-family:var(--font-sans);font-size:13px;font-weight:700;color:#fff}
.jz-story-quote footer span{display:block;font-family:var(--font-sans);font-size:12px;color:#93a8bc;margin-top:2px}
.jz-story-copy .jz-text-link{font-size:14px}
.jz-carousel-arrow{position:absolute;top:50%;transform:translateY(-50%);background:#ffffff14;border:1px solid #ffffff26;color:#e2ecf4;padding:12px;border-radius:50%;z-index:2;transition:background .2s}
.jz-carousel-arrow:hover{background:#ffffff26}
.jz-carousel-arrow.prev{left:0;transform:translateY(-50%) rotate(180deg)}
.jz-carousel-arrow.next{right:0}
.jz-dots{display:flex;justify-content:center;gap:10px;padding:32px 0 44px}
.jz-dots button{padding:0;border:1px solid #7393ad;background:transparent;border-radius:50%;width:10px;height:10px}
.jz-dots button.active{background:white;border-color:white}
.jz-outcomes{border-top:1px solid #7897b066;padding-top:24px}
.jz-outcomes h2{text-align:center;font-size:36px;margin-bottom:30px}
.jz-outcomes>div{display:grid;grid-template-columns:repeat(3,1fr);gap:30px;padding:0 15px}
.jz-outcomes article{display:flex;align-items:center;gap:24px;border-right:1px solid #8199ab99;padding-right:30px}
.jz-outcomes article:last-child{border:0}
.jz-outcomes article>svg{color:#c5daea}
.jz-outcomes h3{font-family:Georgia,serif;font-weight:400;font-size:22px}
.jz-outcomes p{font-size:14px;line-height:1.5;color:#cfdfec;margin-top:8px}
.jz-roles{padding:100px 0 80px;background:#fff}
.jz-roles-heading{text-align:center;max-width:820px;margin:0 auto 56px}
.jz-roles-eyebrow{display:inline-flex;align-items:center;gap:16px;font-size:11px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:#0a67d8;margin-bottom:22px}
.jz-roles-eyebrow:before,.jz-roles-eyebrow:after{content:'';width:44px;height:1.5px;background:currentColor}
.jz-roles-heading h2{font-family:'Playfair Display',Georgia,serif;font-size:clamp(38px,4.4vw,64px);line-height:1.08;letter-spacing:-.035em;font-weight:500;color:#0A2540;margin:0 0 20px}
.jz-roles-heading h2 em{font-style:italic;color:#0a67d8;font-weight:500}
.jz-roles-heading p{font-size:17px;line-height:1.6;color:#5a6b7f;max-width:660px;margin:0 auto}
.jz-role-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px}
.jz-role{display:grid;grid-template-columns:1fr 1.1fr;min-height:320px;overflow:hidden;background:#ffffff;color:var(--ink)!important;border:1px solid #e2eefb;border-radius:6px;transition:box-shadow .3s ease,transform .3s ease,border-color .3s ease}
.jz-role:hover{box-shadow:0 24px 48px -22px rgba(10,37,64,.22);border-color:#c9dcf0;transform:translateY(-2px)}
.jz-role-copy{padding:36px 32px;display:flex;flex-direction:column;justify-content:center;gap:14px;background:#ffffff}
.jz-role-icon{display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:50%;background:#e6f1fc;color:#0a67d8}
.jz-role-copy h3{font-family:'Playfair Display',Georgia,serif;font-size:26px;font-weight:500;letter-spacing:-.02em;color:#0A2540;margin:0}
.jz-role-copy p{font-size:14px;line-height:1.6;color:#4a5c70;margin:0;max-width:260px}
.jz-role-link{display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:600;color:#0a67d8;margin-top:6px}
.jz-role:hover .jz-role-link svg{transform:translateX(4px)}
.jz-role-link svg{transition:transform .25s}
.jz-role-photo{position:relative;overflow:hidden;background:#eef5fd}
.jz-role-photo>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:left center}
.jz-casestudy{padding:70px 0}
.jz-casestudy-grid{display:grid;grid-template-columns:1.05fr 1fr;box-shadow:0 30px 70px -30px rgba(0,0,0,.5);background:#0c2f4d}
.jz-casestudy-photo{position:relative;min-height:560px;background:#0c2f4d;display:flex;flex-direction:column;padding:22px 26px 0}
.jz-cs-topbar{display:flex;justify-content:space-between;align-items:center;font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:#a7c2d8;padding-bottom:14px}
.jz-cs-topbar span:last-child{letter-spacing:.12em;text-transform:none;font-size:11px;color:#e2ecf4}
.jz-cs-visual{position:relative;flex:1;min-height:440px;background:radial-gradient(ellipse at 50% 40%,#124067 0%,#0a2942 70%,#082338 100%);border-radius:2px;overflow:hidden}
.jz-cs-visual>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.jz-cs-title{position:absolute;top:26px;left:50%;transform:translateX(-50%);text-align:center;color:#eaf3fb;z-index:2;text-shadow:0 2px 14px rgba(0,0,0,.35)}
.jz-cs-title strong{display:block;font-family:Georgia,serif;font-size:clamp(26px,2.4vw,36px);font-weight:500;letter-spacing:.14em}
.jz-cs-title span{display:block;font-size:10px;letter-spacing:.55em;margin-top:4px;color:#b8d2e8;padding-top:6px;border-top:1px solid rgba(184,210,232,.5);width:180px;margin-left:auto;margin-right:auto;padding-top:6px}
.jz-cs-connector{position:absolute;left:50%;bottom:26px;transform:translateX(-50%);width:78%;z-index:2}
.jz-cs-hub{display:block;margin:0 auto;background:#0b2b45;border:1px solid #7FB4E0;color:#eaf3fb;font-size:12.5px;font-weight:600;letter-spacing:.01em;padding:10px 22px;border-radius:4px;text-align:center;position:relative;z-index:3;box-shadow:0 8px 20px -8px rgba(0,0,0,.6)}
.jz-cs-connector svg{display:block;width:100%;height:60px;margin-top:-1px}
.jz-cs-nodes{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;justify-content:center;align-items:end;margin-top:-14px}
.jz-cs-node{display:flex;flex-direction:column;align-items:center;gap:8px;color:#dbe9f5}
.jz-cs-node-icon{width:44px;height:44px;border-radius:50%;border:1px solid #7FB4E0;background:rgba(12,47,77,.65);display:flex;align-items:center;justify-content:center;color:#cfe4f5}
.jz-cs-node-icon svg{width:22px;height:22px}
.jz-cs-node small{font-size:11.5px;color:#cfe4f5;letter-spacing:.005em}
.jz-casestudy-panel{background:#0c2f4d;padding:64px 60px;display:flex;flex-direction:column;justify-content:center}
.jz-casestudy-badges{display:flex;gap:10px;margin-bottom:28px}
.jz-pill{display:inline-flex;align-items:center;font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;padding:6px 14px;border-radius:30px;background:#fff;color:#0A2540}
.jz-pill.outline{background:transparent;border:1px solid #ffffff4a;color:#e2ecf4}
.jz-casestudy-panel h2{font-family:'Playfair Display',Georgia,serif;font-weight:500;font-size:clamp(30px,3vw,44px);line-height:1.15;letter-spacing:-.02em;max-width:520px;margin:0 0 22px;color:#fff}
.jz-casestudy-panel h2 em{font-style:italic;font-weight:400;color:#fff}
.jz-casestudy-panel p{font-size:15px;line-height:1.7;color:#c3d3e2;max-width:500px;margin:0 0 40px}
.jz-casestudy-stats{display:grid;grid-template-columns:1fr 1fr;gap:0;margin-bottom:40px;border-top:1px solid #ffffff26;border-bottom:1px solid #ffffff26}
.jz-casestudy-stats>div{display:flex;flex-direction:column;gap:6px;padding:26px 0}
.jz-casestudy-stats>div+div{border-left:1px solid #ffffff26;padding-left:32px}
.jz-stat-label{font-size:11px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:#8fa6bb}
.jz-casestudy-stats b{font-family:Georgia,serif;font-size:24px;font-weight:400;color:#fff;letter-spacing:-.01em;margin-top:2px}
.jz-casestudy-stats small{font-size:11px;color:#8fa6bb;margin-top:2px}
.jz-casestudy-button{display:inline-flex;align-items:center;justify-content:space-between;gap:24px;align-self:flex-start;min-width:240px;padding:16px 22px;background:#fff;color:#0A2540 !important;font-size:14px;font-weight:600;border:0;border-radius:2px;transition:transform .2s ease,box-shadow .2s ease}
.jz-casestudy-button:hover{transform:translateY(-1px);box-shadow:0 12px 28px -12px rgba(0,0,0,.5)}
.jz-casestudy-button svg{color:#0A2540}



/* Comparison Section */
.jz-comparison {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 40px;
  border: 1px solid #E2E9F0;
  border-radius: 4px;
  overflow: visible;
  background: #fff;
  align-items: stretch;
}

.jz-cmp-panel {
  padding: 34px 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  min-height: 180px;
}

.jz-cmp-left  {
  background: #F8FAFC;
  border-right: 1px solid #E2E9F0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.jz-cmp-right {
  background: #EAF3FC;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.jz-cmp-copy {
  flex: 1 1 auto;
  min-width: 0;
}

.jz-cmp-copy h3 {
  font-family: var(--font-sans);
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: #0A2540;
  margin: 0 0 8px;
}

.jz-cmp-right .jz-cmp-copy h3 { color: #0A6FD8; }

.jz-cmp-copy p {
  font-size: 14px;
  line-height: 1.55;
  color: #52657A;
  max-width: 260px;
  margin: 0;
}

/* Disconnected: three white cards with a db icon inside */
.jz-cmp-disconnected {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  white-space: nowrap;
}
.jz-cmp-db {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: #fff;
  border: 1px solid #E2E9F0;
  border-radius: 6px;
  color: #B5C2CF;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
}
.jz-cmp-db svg { stroke-width: 1.5; }
.jz-cmp-ellipsis {
  color: #B5C2CF;
  font-size: 16px;
  letter-spacing: 2px;
  line-height: 1;
  transform: translateY(-2px);
  user-select: none;
}

/* Connected: white hub card with db icon + bars, connector lines out to dots */
.jz-cmp-connected {
  position: relative;
  width: 180px;
  height: 90px;
  flex-shrink: 0;
}
.jz-cmp-connected > svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.jz-cmp-hub {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: #fff;
  border: 1.2px solid #0A6FD8;
  border-radius: 8px;
  color: #0A6FD8;
  box-shadow: 0 2px 8px -2px rgba(10, 111, 216, 0.25);
  z-index: 2;
}
.jz-cmp-hub svg { flex-shrink: 0; }
.jz-cmp-hub-bar {
  display: block;
  width: 34px;
  height: 5px;
  border-radius: 3px;
  background: #D6E2EE;
}
.jz-cmp-hub-bar.short { width: 22px; }

/* Arrow sitting on the divider */
.jz-cmp-arrow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #D6E2EE;
  color: #0A6FD8;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  box-shadow: 0 2px 6px -2px rgba(10,37,64,.12);
}

@media (max-width: 768px) {
  .jz-comparison { grid-template-columns: 1fr; }
  .jz-cmp-left {
    border-right: 0;
    border-bottom: 1px solid #E2E9F0;
    border-radius: 4px 4px 0 0;
  }
  .jz-cmp-right { border-radius: 0 0 4px 4px; }
  .jz-cmp-panel { padding: 26px 22px; min-height: 0; gap: 22px; }
  .jz-cmp-copy h3 { font-size: 17px; }
  .jz-cmp-copy p  { font-size: 12.5px; }
  .jz-cmp-connected { width: 150px; height: 76px; }
  .jz-cmp-arrow { display: none; }
}

/* Integration Section - Premium Redesign */
.jz-integrations {
  padding: 120px 0 100px;
  background: #FAFBFC;
}

.jz-integration-grid {
  display: grid;
  grid-template-columns: 0.85fr 1fr;
  gap: 48px;
  align-items: start;
  padding: 20px 0 40px;
  border-bottom: 1px solid #E3E8EE;
}

.jz-integration-grid h2 {
  font-size: 52px;
  font-weight: 800;
  font-family: var(--font-sans);
  letter-spacing: -0.035em;
  line-height: 1.05;
  color: #0A2540;
}

.jz-integration-grid h2 em {
  font-family: var(--font-serif);
  font-weight: 400;
  font-style: italic;
}

.jz-integration-copy {
  padding-left: 48px;
  padding-top: 6px;
  border-left: 1px solid #E3E8EE;
}

.jz-integration-copy p {
  font-size: 17px;
  color: #4A5C70;
  line-height: 1.7;
  max-width: 380px;
  margin-bottom: 14px;
}

.jz-integration-copy .jz-text-link { font-size: 14px; }

/* Diagram Map */
.jz-integration-wrap { padding: 48px 0 60px; }

.jz-integration-map {
  position: relative;
  height: 520px;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  background: #F1EEE6 url('images/jenzabarrectangle.png') center / cover no-repeat;
}

.jz-integration-bg {
  position: absolute;
  inset: 0;
  background: transparent;
}

/* Connector lines — solid blue with round rings */
.jz-connector-lines{position:absolute;inset:0;z-index:2;pointer-events:none}
.jz-connector-elbow{position:absolute;border:0 solid #0A6FD8}
.jz-connector-elbow.tl{top:130px;left:305px;width:calc(50% - 455px);height:67.5px;border-top-width:2px;border-right-width:2px;border-top-right-radius:16px}
.jz-connector-elbow.tr{top:130px;left:calc(50% + 150px);width:calc(50% - 455px);height:67.5px;border-top-width:2px;border-left-width:2px;border-top-left-radius:16px}
.jz-connector-elbow.bl{top:322.5px;left:305px;width:calc(50% - 455px);height:12.5px;border-bottom-width:2px;border-right-width:2px;border-bottom-right-radius:16px}
.jz-connector-elbow.br{top:322.5px;left:calc(50% + 150px);width:calc(50% - 455px);height:12.5px;border-bottom-width:2px;border-left-width:2px;border-bottom-left-radius:16px}
.jz-connector-vline{position:absolute;left:50%;top:342.5px;width:2px;height:95.5px;background:#0A6FD8;transform:translateX(-50%)}
.jz-connector-dot{position:absolute;width:9px;height:9px;border-radius:50%;background:#fff;border:2px solid #0A6FD8;transform:translate(-50%,-50%)}
@media (max-width:1024px){.jz-connector-lines{display:none}}

/* Node cards */
.jz-integration-node {
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 22px 24px;
  width: 250px;
  height: 150px;
  border-radius: 12px;
  background: #FFFFFF;
  border: 1px solid #D6E2EE;
  box-shadow: 0 6px 20px -8px rgba(16, 24, 40, 0.12);
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.22, 0.68, 0, 1.01),
              box-shadow 0.25s ease,
              border-color 0.25s ease;
  text-align: left;
  color: #122A41;
}

.jz-integration-node:hover,
.jz-integration-node.active {
  transform: translateY(-2px);
  border-color: #8FC0EA;
  box-shadow: 0 12px 28px -10px rgba(8, 118, 207, 0.35);
}

.jz-node-head {
  display: flex;
  align-items: center;
  gap: 14px;
}

.jz-node-head {
  gap: 16px;
}

.jz-node-head-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  color: #0A6FD8;
  flex-shrink: 0;
}

.jz-node-head-icon svg { width: 40px; height: 40px; stroke-width: 1.6; }

.jz-node-head strong {
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: #0A2540;
}

.jz-node-lines {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 4px;
}

.jz-node-line {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #8FA8BF;
}

.jz-node-line svg { color: #8FA8BF; flex-shrink: 0; width: 18px; height: 18px; }

.jz-node-bar {
  display: block;
  flex: 1;
  height: 6px;
  border-radius: 4px;
  background: #E8EEF4;
}

/* Node Positions */
.jz-integration-node.node-tl { top: 55px; left: 55px; }
.jz-integration-node.node-tr { top: 55px; right: 55px; }
.jz-integration-node.node-bl { bottom: 110px; left: 55px; }
.jz-integration-node.node-br { bottom: 110px; right: 55px; }

/* Center Hub */
.jz-integration-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 300px;
  height: 165px;
  padding: 24px 20px;
  border-radius: 14px;
  background: #0A2540;
  box-shadow: 0 18px 40px -14px rgba(10, 37, 64, 0.5);
}

.jz-integration-center .jz-brand { width: 200px; height: 42px; }

.jz-center-divider {
  display: block;
  width: 60%;
  height: 1px;
  background: rgba(255, 255, 255, 0.18);
  margin: 4px 0 2px;
}

.jz-center-sub {
  font-size: 12.5px;
  line-height: 1.5;
  text-align: center;
  color: #C3D3E2;
  font-weight: 500;
  letter-spacing: 0.005em;
}

/* Bottom Pill */
.jz-integration-pill {
  position: absolute;
  left: 50%;
  bottom: 32px;
  transform: translateX(-50%);
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #FFFFFF;
  border: 1px solid #D6E2EE;
  border-radius: 10px;
  padding: 14px 24px;
  font-size: 15px;
  font-weight: 600;
  color: #122A41;
  box-shadow: 0 6px 16px -8px rgba(16, 24, 40, 0.12);
}

.jz-integration-pill svg { color: #0A6FD8; width: 18px; height: 18px; }

 

/* Responsive Adjustments */
@media (max-width: 1024px) {
  .jz-integration-grid {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  .jz-integration-grid p {
    margin: 0 auto;
  }




  .jz-integration-map {
    height: 240px;
    max-width: 600px;
    margin: 0 auto;
  }
  
}

@media (max-width: 768px) {
  .jz-integrations {
    padding: 80px 0 60px;
  }
  .jz-integration-grid h2 {
    font-size: 38px;
  }
  .jz-integration-node {
    font-size: 11px;
    height: 48px;
    padding: 0 12px;
    gap: 6px;
  }
  .jz-integration-node svg {
    width: 16px;
    height: 16px;
  }
  .jz-integration-center {
    width: 160px;
    height: 64px;
  }
  .jz-integration-center .jz-brand {
    width: 100px;
    height: 24px;
  }
   
}

@media (max-width: 480px) {
  .jz-integration-grid h2 {
    font-size: 30px;
  }
  .jz-integration-grid p {
    font-size: 14px;
  }
  .jz-integration-map {
    height: 200px;
  }
  .jz-integration-node {
    font-size: 9px;
    height: 40px;
    padding: 0 8px;
    gap: 4px;
  }
  .jz-integration-node svg {
    width: 13px;
    height: 13px;
  }
  .jz-integration-center {
    width: 130px;
    height: 52px;
  }
  .jz-integration-center .jz-brand {
    width: 80px;
    height: 18px;
  }
    
}
.jz-faq{background:#F4F6F9;padding:80px 0 130px;position:relative;overflow:hidden}
.jz-faq-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.5fr);gap:48px;align-items:start;position:relative;z-index:1;padding-top:60px}
.jz-faq-intro{position:relative;top:-60px;display:flex;flex-direction:column;gap:0}
.jz-faq-eyebrow{display:inline-flex;align-items:center;gap:14px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0067c7;margin-bottom:26px}
.jz-faq-eyebrow:before{content:'';width:38px;height:1.5px;background:#0067c7}
.jz-faq h2{font-family:var(--font-serif);font-size:clamp(46px,5vw,72px);line-height:1.02;letter-spacing:-.035em;font-weight:550;color:#0A2540;margin:0 0 28px}
.jz-faq h2 em{font-style:italic;color:#0067c7;font-weight:550}
.jz-faq-intro p{font-size:19px;line-height:1.55;color:#3a4a5e;margin:0 0 36px;max-width:420px;font-weight:400;letter-spacing:-.005em}
.jz-faq-illustration{margin:0 0 0;max-width:100%}
.jz-faq-illustration img{display:block;width:100%;height:auto;max-width:420px;object-fit:contain}


.jz-faq-cta{background:#0A2540;color:#fff;padding:44px 38px 38px;border-radius:2px;display:flex;flex-direction:column;gap:16px;max-width:420px;margin-top:0}
.jz-faq-cta strong{font-family:'Playfair Display',Georgia,serif;font-size:32px;line-height:1.15;font-weight:400;letter-spacing:-.015em}
.jz-faq-cta span{font-size:15px;color:#c9d8e6;line-height:1.55;margin-bottom:6px}
.jz-faq-cta-button{margin-top:14px;display:inline-flex;align-items:center;justify-content:space-between;gap:18px;background:#ffffff;color:#0A2540 !important;font-family:var(--font-sans);font-size:14px;font-weight:600;line-height:1;letter-spacing:-.005em;padding:16px 20px 16px 24px;border:0;border-radius:2px;align-self:stretch;text-decoration:none;cursor:pointer;transition:transform .2s ease,box-shadow .2s ease,background .2s ease}


.jz-faq-cta-button:hover{transform:translateY(-1px);box-shadow:0 10px 24px -10px rgba(0,0,0,.45);background:#f4f6f9}
.jz-faq-cta-button span{flex:1;text-align:left;color:#0A2540}
.jz-faq-cta-button svg{stroke:#0A2540;flex-shrink:0}
.jz-faq-list{display:flex;flex-direction:column;gap:0;border-top:1px solid rgba(10,37,64,.12)}
.jz-faq article{background:transparent;border:0;border-bottom:1px solid rgba(10,37,64,.12);border-radius:0;transition:background .25s ease}
.jz-faq article:hover{background:#E7F1FA}
.jz-faq article.open{background:#E7F1FA;border-left:3px solid #0067c7;padding-left:0}
.jz-faq h3{margin:0}
.jz-faq h3 button{display:flex;align-items:center;gap:28px;width:100%;background:none;border:0;text-align:left;padding:28px 20px 28px 24px;color:#0A2540;font-family:var(--font-sans);font-size:18px;font-weight:700;line-height:1.4;letter-spacing:-.012em;transition:color .2s}
.jz-faq article.open h3 button{color:#0067c7}
.jz-faq-num{font-family:var(--font-sans);font-size:13px;font-weight:600;color:#8a98a8;flex-shrink:0;letter-spacing:.5px;min-width:24px}
.jz-faq article.open .jz-faq-num{color:#0067c7}
.jz-faq-q{flex:1;padding-right:20px}
.jz-faq-toggle{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:transparent;border:0;color:#0A2540;flex-shrink:0;transition:color .25s,background .25s}
.jz-faq h3 button:hover .jz-faq-toggle{color:#0067c7}
.jz-faq article.open .jz-faq-toggle{color:#0067c7}
.jz-faq-toggle svg{display:block}
.jz-faq-answer{padding:0 60px 32px 76px;animation:jzFaqIn .35s cubic-bezier(.22,.68,0,1.01)}
@keyframes jzFaqIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
.jz-faq-answer p{font-size:15px;color:#41546a;line-height:1.75;margin:0 0 14px;max-width:640px}
.jz-faq-inline-link{display:inline-flex;align-items:center;gap:6px;font-size:14px;font-weight:600;color:#0067c7;text-decoration:underline;text-underline-offset:3px}
.jz-faq-inline-link:hover{color:#004a94}
.jz-footer{padding:30px 0 25px}
.jz-final-cta{display:flex;align-items:center;justify-content:center;gap:30px;padding:0 0 30px;border-bottom:1px solid #7c96aa99}
.jz-final-cta h2{font-size:36px}
.jz-final-cta .jz-button{font-size:13px;padding:12px 20px;min-height:44px}
.jz-talk{font-size:13px;display:flex;align-items:center;gap:20px}
.jz-footer-grid{display:grid;grid-template-columns:1.15fr repeat(4,1fr);gap:40px;padding:40px 0 30px}
.jz-footer-grid .jz-brand{width:160px;height:34px}
.jz-footer-grid h3{font-size:13px;font-weight:600;margin-bottom:14px}
.jz-footer-grid>div>a{display:block;color:#c0d3e2;font-size:12px;margin:8px 0}
.jz-footer-grid a:hover{color:#00b8e9}
.jz-footer-bottom{display:flex;gap:40px;border-top:1px solid #7894ac77;padding-top:24px;color:#c1d3e2;font-size:12px}
.jz-footer-tagline{margin-left:auto}
@media(min-width:1600px){.jz-container{width:1480px}}
@media(max-width:1180px){.jz-container{width:calc(100% - 48px)}.jz-header nav{gap:16px;margin-left:0}.jz-header-inner{gap:20px}.jz-header .jz-brand{width:150px}.jz-header-actions{gap:17px}.jz-hero-showcase{grid-template-columns:180px minmax(0,1fr) 180px;gap:16px;margin-inline:0}.jz-tabs.vertical button{font-size:11px;gap:11px;padding-left:9px}.jz-tabs.vertical button svg{width:25px}.jz-app-nav{width:78px}.jz-app-nav>span{font-size:6px;gap:5px;padding-inline:3px}.jz-app-main{padding:12px 8px 7px}.jz-app h3{font-size:14px}.jz-stat-cards>div{padding:10px 5px;gap:5px}.jz-stat-cards svg{width:15px}.jz-stat-cards b{font-size:13px}.jz-dash-bottom{gap:6px}.jz-record{font-size:5px;gap:3px}.jz-record .jz-avatar{width:18px;height:18px}.jz-status{font-size:5px;padding:3px}.jz-phone{min-height:350px;padding:12px 9px}.jz-story-copy{padding:22px 26px}.jz-product-grid{gap:30px}.jz-profile-grid{grid-template-columns:1fr 1.1fr}.jz-progress svg{width:60px;height:60px}.jz-schedule{padding:9px}.jz-schedule>div{grid-template-columns:38px 1fr 37px;font-size:5px}.jz-comparison{grid-template-columns:1fr 1fr}.jz-final-cta{gap:20px}.jz-final-cta h2{font-size:30px}}
@media(max-width:900px){.jz-header nav{position:absolute;top:76px;left:24px;right:24px;z-index:20;display:none;background:#073757;border:1px solid #5f8097;border-radius:12px;padding:28px 28px;box-shadow:0 24px 48px -12px rgba(0,20,40,.45);backdrop-filter:blur(12px)}
.jz-header nav.open{display:flex;flex-direction:column;gap:4px}
.jz-header nav a{font-size:16px;font-weight:500;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.07)}
.jz-header nav a:last-child{border-bottom:0}
.jz-header nav a:after{display:none}.jz-mobile-toggle{display:block}.jz-hero h1{font-size:54px}.jz-hero-copy>p{font-size:14px}.jz-hero-showcase{grid-template-columns:minmax(0,1fr);gap:20px}.jz-tabs.vertical{grid-column:1/-1;flex-direction:row;padding:0;gap:0;justify-content:space-between;overflow-x:auto}.jz-tabs.vertical button{border-left:0;border-bottom:2px solid transparent;min-height:46px;padding:8px 10px;gap:7px}.jz-tabs.vertical button svg{width:20px}.jz-tabs.vertical button.active{border-left-color:transparent;border-bottom-color:var(--magenta)}.jz-tabs.vertical button span{font-size:10px}.jz-app-nav{width:83px}.jz-app-body{min-height:295px}.jz-proof h2{font-size:31px}.jz-campus-logos{gap:22px}.jz-campus-logos img{width:20%;height:66px}.jz-product-grid{grid-template-columns:.72fr 1fr;gap:20px}.jz-product-copy h3{font-size:31px}.jz-product-copy li{font-size:12px;gap:9px}.jz-feature-screen .jz-app-nav{display:none}.jz-feature-screen .jz-app-main{padding:13px}.jz-feature-screen .jz-app-body{min-height:284px}.jz-product-copy .jz-text-link{font-size:12px}.jz-tabs{gap:20px;justify-content:space-between}.jz-tabs button{padding-inline:12px}.jz-story-photo{min-height:230px}.jz-story-copy h3{font-size:24px}.jz-story-copy p{font-size:12px}.jz-outcomes h2{font-size:30px}.jz-outcomes>div{gap:18px;padding:0}.jz-outcomes article{gap:12px;padding-right:16px}.jz-outcomes article>svg{width:28px}.jz-outcomes h3{font-size:17px}.jz-outcomes p{font-size:10px}.jz-role-grid{gap:10px}.jz-role{min-height:220px}.jz-role>div{left:12px;right:12px;bottom:12px}.jz-role h3{font-size:18px}.jz-role p{font-size:9px;padding-right:14px}.jz-casestudy-photo{min-height:360px}.jz-casestudy-panel{padding:38px 32px}.jz-casestudy-panel h2{font-size:28px}.jz-casestudy-panel p{font-size:13px}.jz-casestudy-stats b{font-size:21px}.jz-integration-grid{grid-template-columns:.9fr 1.2fr;gap:26px}.jz-integration-grid h2{font-size:34px}.jz-integration-node{gap:9px;font-size:10.5px;height:56px}.jz-integration-node svg{width:17px}.jz-integration-center{height:72px}.jz-integration-center .jz-brand{width:110px}.jz-faq-grid{gap:52px}.jz-faq h2{font-size:46px}.jz-final-cta{flex-wrap:wrap}.jz-footer-grid{gap:22px}.jz-footer-grid .jz-brand{width:115px}}
@media(max-width:640px){.jz-container{width:calc(100% - 36px)} .jz-header-inner{min-height:72px;gap:12px}.jz-header .jz-brand{width:123px;height:30px}.jz-header-actions{gap:10px}.jz-header .jz-button{font-size:10px;padding:10px 12px;min-height:35px;gap:7px}.jz-header .jz-button svg{width:13px}.jz-login{display:none}.jz-header nav{left:18px;right:18px;top:72px}.jz-hero-copy{padding:27px 0 18px}.jz-eyebrow-pill{font-size:9px}.jz-hero h1{font-size:clamp(34px,8.4vw,52px);letter-spacing:-1.4px;line-height:1.08;margin-top:18px}.jz-hero h1 em{letter-spacing:-1.7px;line-height:1.06;margin-top:4px}.jz-hero-copy>p{font-size:12px;line-height:1.65;max-width:400px;margin-top:18px}.jz-desktop-break{display:none}.jz-hero-actions{gap:16px;margin-top:22px}.jz-hero-actions .jz-button{font-size:10px;padding:11px 13px;gap:10px}.jz-overview{font-size:10px;gap:7px}.jz-round-play{width:24px;height:24px}.jz-hero-copy>small{font-size:8px}.jz-hero-showcase{grid-template-columns:1fr;gap:16px;margin-top:10px}.jz-tabs.vertical{grid-column:1;justify-content:start;gap:7px;padding-bottom:2px}.jz-tabs.vertical button{font-size:10px;min-width:124px;gap:8px;min-height:45px;padding-left:7px;padding-right:7px}.jz-tabs.vertical button span{font-size:10px}.jz-hero-screen{padding:3px;border-radius:7px}.jz-app-toolbar{height:34px;padding-inline:9px;gap:10px}.jz-fake-search{font-size:5px;padding:4px;overflow:hidden}.jz-app-nav{width:66px;gap:8px;padding-inline:3px}.jz-app-nav>span{font-size:5px;gap:4px;padding-inline:3px}.jz-app-nav svg{width:11px;height:11px}.jz-app-main{padding:12px 7px 7px}.jz-app h3{font-size:13px}.jz-dash-heading{gap:6px}.jz-dash-heading select{font-size:6px;padding:4px;max-width:78px}.jz-stat-cards{gap:5px;margin-bottom:10px}.jz-stat-cards>div{padding:9px 4px;gap:4px}.jz-stat-cards svg{width:13px}.jz-stat-cards b{font-size:12px}.jz-stat-cards span{font-size:4.5px}.jz-app-body{min-height:256px}.jz-records,.jz-line-chart{padding:7px 4px}.jz-chart-title{font-size:6px;min-height:20px}.jz-chart-title span{font-size:5px}.jz-records>strong{font-size:6px;margin-bottom:7px}.jz-record{font-size:4.5px;padding:7px 0}.jz-record .jz-avatar{width:15px;height:15px;font-size:5px}.jz-record .jz-status{font-size:4px;padding:2px}.jz-phone{width:210px;min-height:342px;margin:0 auto 5px;display:block}.jz-proof{margin-top:20px}.jz-proof h2{font-size:27px;max-width:300px;margin:auto;line-height:1.2}.jz-campus-logos{display:grid;grid-template-columns:1fr 1fr;gap:18px 28px;margin:22px auto;max-width:340px}.jz-campus-logos img{width:100%;height:64px}.jz-benefits{grid-template-columns:repeat(3,1fr);gap:22px 8px;padding:9px 0 30px}.jz-benefits>div{font-size:9px;gap:8px;padding:0 4px}.jz-benefits>div:nth-child(3){border:0}.jz-benefits svg{width:24px;height:24px}.jz-products{padding:33px 0}.jz-products h2{font-size:30px;text-align:left;max-width:350px;line-height:1.14}.jz-tabs{gap:5px;overflow:auto;justify-content:start;margin-top:20px}.jz-tabs button{font-size:11px;padding:0 10px;flex-shrink:0;min-height:44px}
.jz-products-tabs .jz-tabs{overflow-x:auto;flex-wrap:nowrap;justify-content:flex-start}
.jz-products-tabs .jz-tabs button{flex:0 0 auto;font-size:11px;padding:12px 14px;gap:7px;min-width:110px}
.jz-products-tabs .jz-tabs button svg{width:16px;height:16px}.jz-product-grid{grid-template-columns:1fr;gap:26px;padding-top:25px}.jz-product-copy h3{max-width:310px;font-size:34px;margin:12px 0 19px}.jz-product-copy ul{gap:13px;margin-bottom:23px}.jz-product-copy li{font-size:13px}.jz-product-copy .jz-text-link{font-size:13px}.jz-feature-screen .jz-app-body{min-height:275px}.jz-feature-screen .jz-app-main{padding:13px 10px}.jz-profile-head small{font-size:6px}.jz-profile-head h3{font-size:15px}.jz-profile-head>img{width:40px;height:40px}.jz-profile-tabs{gap:22px}.jz-profile-tabs button{font-size:8px}.jz-progress,.jz-schedule{padding:9px}.jz-progress>strong,.jz-schedule>strong{font-size:8px}.jz-progress svg{width:63px;height:63px}.jz-progress>div:first-of-type{gap:5px}.jz-progress span{font-size:6px}.jz-progress span b{font-size:8px}.jz-schedule>div{font-size:5px;grid-template-columns:34px 1fr 35px;gap:3px}.jz-stories{padding:30px 0}.jz-stories>div>h2{font-size:30px;max-width:330px;margin:0 auto 24px}.jz-carousel{padding:0}.jz-story{grid-template-columns:1fr}.jz-story-photo{min-height:210px}.jz-story-copy{padding:25px}.jz-story-copy h3{font-size:29px}.jz-story-copy p{font-size:13px}.jz-carousel-arrow{top:91px;background:#062e4fc9;padding:8px;border-radius:50%}.jz-carousel-arrow.prev{left:9px}.jz-carousel-arrow.next{right:9px}.jz-outcomes h2{font-size:30px;text-align:left;margin-bottom:25px}.jz-outcomes>div{grid-template-columns:1fr;gap:20px}.jz-outcomes article{border-right:0;border-bottom:1px solid #7693aa44;padding:0 0 20px;gap:22px}.jz-outcomes article:last-child{padding-bottom:0}.jz-outcomes article>svg{width:35px}.jz-outcomes h3{font-size:22px}.jz-outcomes p{font-size:12px}.jz-roles{padding:28px 0}.jz-roles h2{font-size:30px;text-align:left}.jz-role-grid{grid-template-columns:repeat(2,1fr);gap:12px}.jz-role{min-height:260px}.jz-role-body{padding:16px}.jz-role-body h3{font-size:18px}.jz-role-body p{font-size:11px;line-height:1.5;max-height:100px;opacity:1;margin-top:8px;padding-right:0}.jz-role-body svg{width:15px;right:16px;bottom:16px}.jz-casestudy{padding:36px 0}.jz-casestudy-grid{grid-template-columns:1fr}.jz-casestudy-photo{min-height:420px;padding:16px 16px 0}.jz-cs-topbar{font-size:9px;letter-spacing:.2em}.jz-cs-visual{min-height:320px}.jz-cs-title strong{font-size:24px}.jz-cs-title span{width:140px;font-size:9px;letter-spacing:.4em}  .jz-casestudy-panel{padding:32px 24px}.jz-casestudy-panel h2{font-size:26px;max-width:100%}.jz-casestudy-panel p{font-size:13px;max-width:100%;margin-bottom:28px}.jz-casestudy-stats{grid-template-columns:1fr 1fr;margin-bottom:28px}.jz-casestudy-stats>div{padding:20px 0}.jz-casestudy-stats>div+div{padding-left:18px}.jz-casestudy-stats b{font-size:18px}.jz-casestudy-button{min-width:0;width:100%;padding:14px 18px}
.jz-integrations{padding:56px 0}.jz-integration-grid{grid-template-columns:1fr;gap:26px}.jz-integration-grid h2{font-size:32px}.jz-integration-grid>div>p{font-size:13px}



.jz-integration-map{height:210px}.jz-integration-node{font-size:10px;gap:7px;height:54px}.jz-integration-node svg{width:18px}.jz-integration-center{height:72px;top:66px}.jz-integration-center .jz-brand{width:100px}.jz-comparison{grid-template-columns:1fr;margin-top:22px}
.jz-cmp-panel{padding:24px 20px;flex-direction:column;align-items:flex-start;gap:18px}
.jz-cmp-copy h3{font-size:17px}
.jz-cmp-copy p{font-size:12.5px}
.jz-cmp-disconnected{gap:8px}
.jz-cmp-db{width:38px;height:38px}
.jz-cmp-connected{width:150px;height:76px}
.jz-cmp-arrow{display:none}.jz-faq{padding:64px 0}.jz-faq-grid{grid-template-columns:1fr;gap:44px}.jz-faq-intro{position:static;gap:0}.jz-faq h2{font-size:42px;margin-bottom:20px}.jz-faq-intro p{font-size:16px;max-width:100%;margin-bottom:28px}.jz-faq-illustration img{max-width:100%}.jz-faq-cta{padding:26px 22px;max-width:100%}.jz-faq-cta strong{font-size:22px}.jz-faq h3 button{font-size:15px;padding:22px 12px 22px 16px;gap:16px}.jz-faq-toggle{width:28px;height:28px}.jz-faq-answer{padding:0 16px 24px 40px}.jz-faq-answer p{font-size:14px}.jz-footer{padding:28px 0 22px}.jz-final-cta{justify-content:start;gap:18px 25px;padding-bottom:27px}.jz-final-cta h2{font-size:33px;width:100%;line-height:1.14;max-width:320px}.jz-final-cta .jz-button{font-size:12px;padding:12px 16px}.jz-talk{font-size:11px}.jz-footer-grid{grid-template-columns:1fr 1fr;gap:24px 25px;padding:28px 0}.jz-footer-grid>a{grid-column:1/-1;margin-bottom:2px}.jz-footer-grid .jz-brand{width:150px}.jz-footer-grid h3{font-size:12px}.jz-footer-grid>div>a{font-size:11px;margin:8px 0}.jz-footer-bottom{gap:22px;flex-wrap:wrap;font-size:9px}.jz-footer-tagline{width:100%;margin-left:0;opacity:.7}}
@media(prefers-reduced-motion:reduce){.jz-site *{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
/* Scoped integration section; unaffected by the previous .jz-integration media queries. */
.jz-site .jzc-section{--jc-navy:#082d49;--jc-blue:#006bce;--jc-line:#c7d8e7;background:#f8f7f4;color:var(--jc-navy);padding:88px 0 72px;font-family:Inter,var(--font-sans);}
.jzc-container{width:min(1480px,calc(100% - 80px));margin-inline:auto;}
.jzc-heading{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(0,1fr);align-items:end;gap:64px;padding:0 34px 36px;}
.jzc-eyebrow{display:flex;align-items:center;gap:22px;color:var(--jc-blue);font-size:11px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;margin-bottom:24px;}
.jzc-eyebrow:before{content:'';width:52px;height:2px;background:currentColor;flex-shrink:0;}
.jz-site .jzc-heading h2{font-family:'Playfair Display',Georgia,serif;font-size:clamp(40px,4.35vw,70px);font-weight:600;line-height:1.07;letter-spacing:-.048em;margin:0;color:var(--jc-navy);}
.jz-site .jzc-heading h2 em{display:inline-block;font-family:inherit;font-weight:500;font-style:italic;color:var(--jc-blue);letter-spacing:-.052em;}
.jzc-intro{border-left:1px solid #d7dce0;padding:16px 0 16px 48px;margin-bottom:2px;}
.jz-site .jzc-intro p{font-size:clamp(16px,1.35vw,21px);line-height:1.65;color:#4c637a;max-width:470px;margin:0 0 12px;}
.jz-site .jzc-intro a{display:inline-flex;align-items:center;gap:10px;color:var(--jc-blue);font-size:clamp(14px,1.2vw,18px);font-weight:650;line-height:1.5;}
.jzc-intro a:hover{text-decoration:underline;text-underline-offset:5px;}
.jzc-intro a span{font-size:1.2em;}
.jzc-visual-wrap{margin:0;}
.jzc-map{container-type:inline-size;position:relative;isolation:isolate;width:100%;aspect-ratio:1240/460;background:#eeece7;overflow:hidden;}
.jzc-backdrop{position:absolute;inset:0;z-index:-1;background:url('/images/jenzabarrectangle.png') center bottom / cover no-repeat;opacity:.9;}
.jzc-wires{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;z-index:3;}
.jzc-wires path{fill:none;stroke:var(--jc-blue);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;transition:stroke-width .18s;}
.jzc-wires path.is-selected{stroke-width:3.8;}
.jzc-wires circle{fill:#fff;stroke:var(--jc-blue);stroke-width:2.5;}
.jz-site .jzc-node{position:absolute;z-index:2;display:flex;flex-direction:column;gap:12px;gap:1cqw;width:18.064516%;height:33.043478%;padding:20px;padding:1.6cqw 1.9cqw;border:1px solid #bed2e5;border-radius:11px;background:#fff;color:var(--jc-navy);text-align:left;box-shadow:none;transition:border-color .18s,background .18s;appearance:none;}
.jzc-tl{left:12.096774%;top:5.217391%;}.jzc-tr{right:12.096774%;top:5.217391%;}.jzc-bl{left:12.096774%;top:59.130435%;}.jzc-br{right:12.096774%;top:59.130435%;}
.jz-site .jzc-node:hover,.jz-site .jzc-node.is-selected{background:#f6fbff;border-color:var(--jc-blue);box-shadow:none;transform:none;}
.jz-site .jzc-node:focus-visible{outline:3px solid var(--jc-blue);outline-offset:4px;}
.jzc-node-heading{display:flex;align-items:center;gap:14px;gap:1.05cqw;white-space:nowrap;}
.jzc-node-heading>svg{width:32px;height:36px;width:2.65cqw;height:2.95cqw;color:var(--jc-blue);stroke-width:1.55;}
.jzc-node-heading strong{font-size:18px;font-size:1.42cqw;line-height:1.2;font-weight:650;letter-spacing:-.025em;}
.jzc-records{display:flex;flex-direction:column;gap:9px;gap:.67cqw;width:100%;}
.jzc-record{display:grid;grid-template-columns:20px 1fr;grid-template-columns:1.65cqw 1fr;align-items:center;gap:18px;gap:1.45cqw;}
.jzc-record>svg{width:17px;height:17px;width:1.45cqw;height:1.45cqw;color:#5d8bb2;}
.jzc-record>span{height:6px;height:.5cqw;background:#dce5ec;border-radius:2px;}
.jzc-hub{position:absolute;left:40.322581%;top:30%;width:19.354839%;height:35.652174%;z-index:2;background:#0c345a;border:1px solid #184873;border-radius:11px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:18px;padding:1.5cqw;box-shadow:none;}
.jzc-hub .jz-brand{width:81%;height:36px;height:3cqw;}
.jzc-hub-rule{width:22%;height:1px;background:#a6bfd2;margin:16px 0 13px;margin:1.3cqw 0 1.05cqw;}
.jz-site .jzc-hub p{font-size:15px;font-size:1.23cqw;line-height:1.4;font-weight:600;color:#fff;text-align:center;white-space:nowrap;}
.jzc-unified{position:absolute;left:39.516129%;top:74.347826%;width:20.967742%;height:12.173913%;z-index:2;border:1px solid #c5d6e4;border-radius:11px;background:#fff;display:flex;align-items:center;justify-content:center;gap:12px;gap:1cqw;font-size:14px;font-size:1.13cqw;font-weight:650;letter-spacing:-.025em;}
.jzc-unified svg{color:var(--jc-blue);width:30px;height:34px;width:2.4cqw;height:2.75cqw;}
.jzc-detail{display:none;}
.jzc-detail.is-visible{display:flex;align-items:baseline;gap:16px;padding:14px 20px;background:#eaf4fc;color:#415d76;font-size:14px;line-height:1.5;}
.jzc-detail strong{color:var(--jc-blue);white-space:nowrap;}
.jzc-comparison{display:grid;grid-template-columns:1fr 1fr;position:relative;margin-top:22px;}
.jzc-comparison article{display:flex;align-items:center;justify-content:space-between;gap:22px;padding:30px 34px;min-width:0;}
.jzc-comparison article>div:first-child{min-width:0;}
.jzc-comparison .jzc-after{background:#eaf4fc;border-left:1px solid #cddce7;padding-left:62px;}
.jz-site .jzc-comparison h3{font-family:'Playfair Display',Georgia,serif;font-size:clamp(23px,2vw,32px);font-weight:600;line-height:1.2;letter-spacing:-.045em;margin:0 0 10px;}
.jzc-after h3{color:var(--jc-blue);}
.jz-site .jzc-comparison p{font-size:15px;line-height:1.6;color:#4c637a;max-width:320px;}
.jzc-mini-records{display:flex;align-items:center;gap:9px;flex-shrink:0;color:#798b9d;}
.jzc-mini-file{width:54px;height:74px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:5px;padding:9px;background:#fafaf9;border:1px solid #ced3d6;border-radius:5px;}
.jzc-mini-file svg{width:21px;height:23px;margin-bottom:2px;}
.jzc-mini-file i{height:4px;width:100%;background:#cdd1d4;border-radius:2px;}.jzc-mini-file i:last-child{width:65%;}
.jzc-dots{font-weight:700;letter-spacing:1px;}
.jzc-compare-arrow{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:44px;height:44px;border:1px solid #dae3e9;border-radius:50%;background:#fff;display:grid;place-items:center;color:var(--jc-blue);z-index:2;}
.jzc-mini-connected{width:180px;height:100px;flex-shrink:0;position:relative;color:var(--jc-blue);}
.jzc-mini-connected>svg{position:absolute;inset:0;width:100%;height:100%;}
.jzc-mini-hub{position:absolute;left:23%;top:18%;width:54%;height:64%;display:flex;align-items:center;gap:9px;padding:11px;border:1px solid var(--jc-blue);border-radius:5px;background:#fff;}
.jzc-mini-hub>svg{width:27px;height:34px;}
.jzc-mini-hub>span{flex:1;display:grid;gap:6px;}.jzc-mini-hub i{display:block;height:5px;background:#cde2f4;border-radius:2px;}.jzc-mini-hub i:last-child{width:65%;}
@media(max-width:1150px){.jzc-heading{gap:32px;padding-inline:12px;}.jzc-intro{padding-left:28px;}.jzc-comparison article{padding:28px 22px;gap:16px;}.jzc-comparison .jzc-after{padding-left:36px;}.jzc-mini-file{width:40px;height:62px;padding:7px;}.jzc-mini-records{gap:5px;}.jzc-mini-connected{width:130px;}.jz-site .jzc-comparison p{font-size:13px;}}
@media(max-width:760px){.jz-site .jzc-section{padding:56px 0;}.jzc-container{width:calc(100% - 36px);}.jzc-heading{grid-template-columns:1fr;gap:22px;padding:0 0 28px;}.jzc-eyebrow{font-size:10px;gap:16px;margin-bottom:20px;}.jz-site .jzc-heading h2{font-size:clamp(32px,6.6vw,50px);}.jzc-intro{border-left:0;padding:0;margin:0;}.jz-site .jzc-intro p{font-size:16px;max-width:520px;}.jzc-comparison{grid-template-columns:1fr;gap:0;margin-top:16px;}.jzc-comparison article{padding:24px 20px;}.jzc-comparison .jzc-after{padding:24px 20px;border:0;border-top:1px solid #cddce7;}.jzc-compare-arrow{display:none;}.jz-site .jzc-comparison h3{font-size:25px;}.jzc-detail.is-visible{flex-direction:column;gap:4px;}
/* On small screens use readable cards, rather than shrinking desktop type. */
.jzc-map{display:grid;grid-template-columns:1fr 1fr;gap:16px 12px;aspect-ratio:auto;padding:24px 16px;}.jzc-backdrop{background-size:auto 100%;opacity:.55;}.jzc-wires{display:none;}.jz-site .jzc-node{position:static;width:100%;height:auto;min-height:140px;padding:16px 12px;gap:16px;border-radius:8px;}.jzc-node-heading{gap:9px;white-space:normal;}.jzc-node-heading>svg{width:26px;height:29px;}.jzc-node-heading strong{font-size:14px;line-height:1.3;}.jzc-records{gap:8px;}.jzc-record{grid-template-columns:16px 1fr;gap:12px;}.jzc-record>svg{width:15px;height:15px;}.jzc-record>span{height:5px;}.jzc-tl{grid-column:1;grid-row:1;}.jzc-tr{grid-column:2;grid-row:1;}.jzc-bl{grid-column:1;grid-row:3;}.jzc-br{grid-column:2;grid-row:3;}.jzc-hub{position:relative;inset:auto;grid-column:1/-1;grid-row:2;width:min(260px,90%);height:150px;justify-self:center;padding:22px;border-radius:8px;}.jzc-hub:before,.jzc-hub:after{content:'';position:absolute;left:50%;width:2px;height:17px;background:var(--jc-blue);}.jzc-hub:before{bottom:100%;}.jzc-hub:after{top:100%;}.jzc-hub .jz-brand{width:180px;height:36px;}.jzc-hub-rule{margin:12px 0;}.jz-site .jzc-hub p{font-size:14px;}.jzc-unified{position:static;grid-column:1/-1;grid-row:4;justify-self:center;width:auto;height:auto;padding:12px 18px;font-size:14px;gap:12px;}.jzc-unified svg{width:26px;height:29px;}}
@media(max-width:380px){.jzc-map{padding:20px 10px;gap:14px 8px;}.jz-site .jzc-node{padding:14px 10px;}.jzc-node-heading{gap:7px;}.jzc-node-heading strong{font-size:13px;}.jzc-node-heading>svg{width:23px;height:26px;}.jzc-comparison article{flex-wrap:wrap;}.jzc-mini-connected{height:80px;}.jzc-eyebrow{letter-spacing:.19em;}}
@media(prefers-reduced-motion:reduce){.jzc-section *{transition:none!important;}}

@media(min-width:761px){.jzc-br .jzc-node-heading{gap:.8cqw;}.jzc-br .jzc-node-heading strong{font-size:1.2cqw;}}
@media(max-width:480px){.jzc-comparison article{flex-direction:column;align-items:flex-start;gap:18px;}.jz-site .jzc-comparison p{font-size:14px;max-width:none;}.jzc-mini-records{gap:10px;}.jzc-mini-connected{height:72px;width:160px;}}
`;
