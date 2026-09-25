import React, { useId, useState } from 'react';

// --- Shared Data & Icons needed for this section ---
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
  // Note: We pass the logo source as a prop to avoid duplicating the massive Base64 string
  const logoSrc = ASSETS[0].src; 
  return <span className={`jz-brand ${dark ? 'on-dark' : ''} ${small ? 'small' : ''}`}><img src={logoSrc} alt="Jenzabar"/><img className="jz-brand-color" src={logoSrc} alt="" aria-hidden="true"/></span>;
}

function Tabs({ value, onChange, vertical = false, id }) {
  const key = useId();
  return <div className={`jz-tabs ${vertical ? 'vertical' : ''}`} role="tablist" aria-label={vertical ? 'Campus product preview' : 'Explore products'} aria-orientation={vertical ? 'vertical' : 'horizontal'}>{PRODUCTS.map((p, i) => <button key={p.name} id={`${key}-${i}`} type="button" role="tab" aria-selected={value === i} aria-controls={id} tabIndex={value === i ? 0 : -1} className={value === i ? 'active' : ''} onClick={() => onChange(i)} onKeyDown={e => { const next = ['ArrowRight','ArrowDown'].includes(e.key) ? (i + 1) % 5 : ['ArrowLeft','ArrowUp'].includes(e.key) ? (i + 4) % 5 : e.key === 'Home' ? 0 : e.key === 'End' ? 4 : null; if(next !== null) { e.preventDefault(); onChange(next); document.getElementById(`${key}-${next}`)?.focus(); } }}>{vertical && <Icon name={p.icon} size={30}/>}<span>{vertical ? 'Jenzabar ' : ''}{p.name}</span></button>)}</div>;
}

function AppShell({ children, active = 'Home', compact = false }) {
  return <div className={`jz-app ${compact ? 'compact' : ''}`}><div className="jz-app-toolbar"><Brand small/><span className="jz-fake-search"><Icon name="search" size={12}/>Search for a student, course or file...</span><span className="jz-toolbar-icons"><Icon name="bell" size={14}/><span className="jz-avatar blue">JT</span></span></div><div className="jz-app-body"><aside className="jz-app-nav">{[['Home','home'],['Students','users'],['Academics','book'],['Admissions','document'],['Advising','user'],['Financial','database'],['Reporting','chart']].map(([label, icon]) => <span key={label} className={active === label ? 'selected' : ''}><Icon name={icon} size={15}/>{label}</span>)}<span className="jz-app-more">••• &nbsp; More</span></aside><div className="jz-app-main">{children}</div></div></div>;
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
  // Simplified Dashboard for the product section view
  return <AppShell>
    <div className="jz-dash-heading"><h3>{p.overview}</h3><select aria-label="Dashboard term" value={term} onChange={e => setTerm(e.target.value)}><option>Fall 2025</option><option>Spring 2026</option></select></div>
    <div className="jz-stat-cards">{p.stats.map((stat, i) => <div key={i}><Icon name={['users', 'bars', 'book'][i]} size={21}/><div><b>{stat}</b><span>{p.labels[i]}</span></div></div>)}</div>
    {p.kind === 'reports' && <ReportsPanel reports={p.reports}/>}
    <div className="jz-sample">Illustrative product view · Sample data</div>
  </AppShell>;
}

// --- Main Component Export ---
export default function ProductsSection({ selected, onSelect }) {
  const p = PRODUCTS[selected];
  return <section className="jz-products jz-light" id="platform">
    <div className="jz-container">
      <h2>Everything your campus needs. <em>Connected.</em></h2>
      <Tabs value={selected} onChange={onSelect} id="feature-product-panel"/>
      <div className="jz-product-grid" role="tabpanel" id="feature-product-panel" aria-label={`Jenzabar ${p.name} features`}>
        <div className="jz-product-copy">
          <span className="jz-kicker">Jenzabar {p.name}</span>
          <h3>{p.title}</h3>
          <ul>{p.bullets.map(b=><li key={b}><span><Icon name="check" size={13}/></span>{b}</li>)}</ul>
          <a className="jz-text-link" href={`${BASE}/jenzabar-one`}>Explore Jenzabar {p.name}<Icon name="arrow" size={20}/></a>
        </div>
        <div className="jz-feature-screen">
          <div className="jz-slide-panel" key={selected}>
            {/* We use a simplified Dashboard here for the product view */}
            <Dashboard index={selected}/>
          </div>
        </div>
      </div>
    </div>
  </section>;
}