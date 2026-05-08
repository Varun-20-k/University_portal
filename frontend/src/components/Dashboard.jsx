import React, { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;
const downloadCsv = (type) => {
  alert(`Mock download triggered: ${type}.csv (Frontend-only mode)`);
};
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import {
  Home, BookOpen, ClipboardList, Calendar, Bell, Settings,
  LogOut, ChevronRight, TrendingUp, TrendingDown,
  AlertTriangle, CheckCircle, Download, FileText,
  Users, Shield, BarChart2, Activity, Search,
  Plus, Edit2, Trash2, X, GraduationCap, Award,
  Monitor, RefreshCw, ArrowUpRight, ArrowDownRight,
  MessageSquare, ThumbsUp, Flag, Database, Cpu,
  Send, Save, Check, UserPlus
} from 'lucide-react';

/* ══════════════════════════════════════════════════════
   TOKENS
══════════════════════════════════════════════════════ */
// Pure black — Student & Teacher
const DK = {
  bg: '#0A0A0A',
  sidebar: '#111111',
  topbar: '#111111',
  card: '#1A1A1A',
  cardAlt: '#141414',
  border: 'rgba(255,255,255,0.08)',
  sep: 'rgba(255,255,255,0.06)',
  text: '#FFFFFF',
  sub: 'rgba(255,255,255,0.5)',
  muted: 'rgba(255,255,255,0.28)',
  rHigh: '#F87171',
  rMed: '#FBBF24',
  rLow: '#34D399',
  chart: ['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.65)', 'rgba(255,255,255,0.45)', '#FBBF24', '#34D399'],
};

// Clean white — Admin (matches Metricon reference)
const LT = {
  bg: '#F2F4F7',
  sidebar: '#FFFFFF',
  topbar: '#FFFFFF',
  card: '#FFFFFF',
  cardAlt: '#F9FAFB',
  border: '#E8ECF0',
  sep: '#F2F4F7',
  text: '#111827',
  sub: '#4B5563',
  muted: '#9CA3AF',
  accent: '#0D9488',
  teal: '#0D9488',
  tealBg: '#F0FDFA',
  gold: '#F59E0B',
  purple: '#8B5CF6',
  rHigh: '#EF4444',
  rMed: '#F59E0B',
  rLow: '#10B981',
  chart: ['#0D9488', '#8B5CF6', '#F59E0B', '#3B82F6', '#EC4899'],
};

/* ══════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════ */
const EMPTY_STUDENT = {
  name: '', usn: '', program: '', semester: '', mentor: '',
  email: '', phone: '', fees: '', hostel: '', cgpa: 0, attendance: 0,
  subjects: [], assignments: [], timetable: [], marks: [], notifications: []
};


const EMPTY_TEACHER = {
  name: '', empId: '', dept: '', designation: '', email: '',
  courses: [], tasks: [], trend: []
};

const EMPTY_ADMIN = {
  kpis: [], riskDist: [], deptRisk: [], fee: { collected: 0, pending: 0, defaulters: 0 },
  attTrend: [], activity: [], users: [], config: {}, cors: [], secs: []
};



/* ══════════════════════════════════════════════════════
   GLOBAL CSS
══════════════════════════════════════════════════════ */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    body,input,textarea,select,button{font-family:'Inter',sans-serif;}

    .dash{display:flex;height:100vh;overflow:hidden;}
    .dk-root{background:#0A0A0A;color:#FFFFFF;}
    .lt-root{background:#F0F2F5;color:#101828;}
    .main{flex:1;display:flex;flex-direction:column;overflow:hidden;}
    .content{flex:1;overflow-y:auto;padding:1.5rem 1.75rem;}

    ::-webkit-scrollbar{width:4px;height:4px;}
    ::-webkit-scrollbar-track{background:transparent;}
    ::-webkit-scrollbar-thumb{background:rgba(0,0,0,0.12);border-radius:2px;}
    .dk-root ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);}
    .lt-root ::-webkit-scrollbar-thumb{background:rgba(0,0,0,0.12);}

    /* ── SIDEBAR ── */
    .sb-dk{width:216px;flex-shrink:0;background:#111111;border-right:1px solid rgba(255,255,255,0.07);display:flex;flex-direction:column;overflow-y:auto;}
    .sb-lt{width:220px;flex-shrink:0;background:#FFFFFF;border-right:1px solid #E8ECF0;display:flex;flex-direction:column;overflow-y:auto;}
    .sb-logo-dk{padding:1.1rem 1.25rem;border-bottom:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;gap:.65rem;}
    .sb-logo-lt{padding:1.1rem 1.25rem;border-bottom:1px solid #F2F4F7;display:flex;align-items:center;gap:.65rem;}
    .sb-nav-item{display:flex;align-items:center;gap:.55rem;padding:.5rem .75rem;border-radius:7px;cursor:pointer;font-size:.82rem;font-weight:400;margin-bottom:1px;transition:all .12s;user-select:none;}
    /* dark nav */
    .sb-dk .sb-nav-item{color:rgba(255,255,255,0.38);}
    .sb-dk .sb-nav-item:hover{background:rgba(255,255,255,0.07);color:rgba(255,255,255,0.82);}
    .sb-dk .sb-nav-item.on{background:rgba(255,255,255,0.11);color:#FFFFFF;font-weight:600;}
    
    /* light nav — dark text on white */
    .sb-lt .sb-nav-item{color:#6B7280;}
    .sb-lt .sb-nav-item:hover{background:#F2F4F7;color:#111827;}
    .sb-lt .sb-nav-item.on{background:#F0FDFA;color:#0D9488;font-weight:700;}

    /* ── TOPBAR ── */
    .tb-dk{background:#111111;border-bottom:1px solid rgba(255,255,255,0.07);height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 1.75rem;flex-shrink:0;}
    .tb-lt{background:#fff;border-bottom:1px solid #E4E7EC;height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 1.75rem;flex-shrink:0;}

    /* ── CARDS ── */
    .card-dk{background:#1A1A1A;border:1px solid rgba(255,255,255,0.08);border-radius:12px;}
    .card-lt{background:#fff;border:1px solid #E4E7EC;border-radius:12px;}

    /* ── TABLE ── */
    .tbl{width:100%;border-collapse:collapse;font-size:.81rem;}
    .tbl th{text-align:left;padding:.58rem 1rem;font-family:'JetBrains Mono',monospace;font-size:.56rem;text-transform:uppercase;letter-spacing:.1em;white-space:nowrap;}
    .tbl td{padding:.7rem 1rem;vertical-align:middle;}
    .tbl tr:last-child td{border-bottom:none!important;}
    .tbl-dk th{color:rgba(255,255,255,0.28);background:#141414;border-bottom:1px solid rgba(255,255,255,0.07);}
    .tbl-dk td{color:#FFFFFF;border-bottom:1px solid rgba(255,255,255,0.05);}
    .tbl-dk tbody tr:hover td{background:rgba(255,255,255,0.035);}
    .tbl-lt th{color:#98A2B3;background:#F9FAFB;border-bottom:1px solid #F2F4F7;}
    .tbl-lt td{color:#101828;border-bottom:1px solid #F2F4F7;}
    .tbl-lt tbody tr:hover td{background:#FAFAFA;}

    /* ── BADGES ── */
    .b{display:inline-flex;align-items:center;font-size:.6rem;font-weight:600;font-family:'JetBrains Mono',monospace;letter-spacing:.04em;padding:.17rem .5rem;border-radius:5px;text-transform:uppercase;white-space:nowrap;}
    /* dark */
    .bH{background:rgba(248,113,113,0.12);color:#fca5a5;border:1px solid rgba(248,113,113,0.2);}
    .bM{background:rgba(251,191,36,0.12);color:#fcd34d;border:1px solid rgba(251,191,36,0.2);}
    .bL{background:rgba(52,211,153,0.12);color:#6ee7b7;border:1px solid rgba(52,211,153,0.2);}
    .bW{background:rgba(255,255,255,0.07);color:rgba(255,255,255,0.75);border:1px solid rgba(255,255,255,0.12);}
    .bInfo{background:rgba(255,255,255,0.07);color:rgba(255,255,255,0.8);border:1px solid rgba(255,255,255,0.12);}
    .bPend{background:rgba(251,191,36,0.12);color:#fcd34d;border:1px solid rgba(251,191,36,0.2);}
    .bSub{background:rgba(255,255,255,0.07);color:rgba(255,255,255,0.8);border:1px solid rgba(255,255,255,0.12);}
    .bGrd{background:rgba(52,211,153,0.12);color:#6ee7b7;border:1px solid rgba(52,211,153,0.2);}
    .bClr{background:rgba(52,211,153,0.12);color:#6ee7b7;border:1px solid rgba(52,211,153,0.2);}
    /* light */
    .lH{background:#FEE2E2;color:#991B1B;} .lM{background:#FEF3C7;color:#92400E;}
    .lL{background:#D1FAE5;color:#065F46;} .lI{background:#EFF6FF;color:#1D4ED8;}
    .lW{background:#FEF3C7;color:#92400E;} .lS{background:#DBEAFE;color:#1E40AF;}
    .lG{background:#D1FAE5;color:#065F46;} .lOk{background:#D1FAE5;color:#065F46;}
    .lAc{background:#D1FAE5;color:#065F46;} .lIn{background:#F3F4F6;color:#6B7280;}

    /* ── PROGRESS ── */
    .pg{height:5px;border-radius:3px;overflow:hidden;}
    .pg-dk{background:rgba(255,255,255,0.1);}
    .pg-lt{background:#F2F4F7;}
    .pgf{height:100%;border-radius:3px;transition:width .5s ease;}

    /* ── INPUTS ── */
    .inp-dk{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:7px;padding:.46rem .7rem;font-size:.81rem;outline:none;transition:border .15s;width:100%;}
    .inp-dk:focus{border-color:rgba(255,255,255,0.4);}
    .inp-dk::placeholder{color:rgba(255,255,255,0.22);}
    .inp-lt{background:#fff;border:1px solid #D0D5DD;color:#101828;border-radius:7px;padding:.46rem .7rem;font-size:.81rem;outline:none;transition:border .15s;width:100%;}
    .inp-lt:focus{border-color:#0D9488;}
    .inp-lt::placeholder{color:#98A2B3;}

    /* ── BUTTONS ── */
    .btn{display:inline-flex;align-items:center;justify-content:center;gap:.32rem;padding:.4rem .85rem;border-radius:8px;font-size:.78rem;font-weight:500;border:none;cursor:pointer;transition:all .13s;}
    /* dark primary = solid white */
    .btn-wh{background:#FFFFFF;color:#0A0A0A;font-weight:700;} .btn-wh:hover{background:#E8E8E8;}
    /* dark ghost */
    .btn-gh{background:rgba(255,255,255,0.07);color:rgba(255,255,255,0.72);border:1px solid rgba(255,255,255,0.12);} .btn-gh:hover{background:rgba(255,255,255,0.12);}
    /* dark teal */
    .btn-tl{background:#2DD4BF;color:#0A0A0A;font-weight:700;} .btn-tl:hover{background:#1BC9B4;}
    /* light primary */
    .btn-np{background:#0D9488;color:#fff;font-weight:600;} .btn-np:hover{background:#0B7A70;}
    /* light ghost */
    .btn-ng{background:#fff;color:#344054;border:1px solid #D0D5DD;} .btn-ng:hover{background:#F9FAFB;}
    /* light teal */
    .btn-nt{background:#0D9488;color:#fff;font-weight:600;} .btn-nt:hover{background:#0B7A70;}
    /* danger */
    .btn-dr{background:#FEE2E2;color:#991B1B;} .btn-dk-dr{background:rgba(248,113,113,0.12);color:#fca5a5;}

    /* ── ATTENDANCE BUTTON ── */
    .att-b{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.68rem;font-weight:700;border:1.5px solid;cursor:pointer;transition:all .12s;}

    /* ── CHART TOOLTIP ── */
    .ctt{background:#1A1A1A;border:1px solid rgba(255,255,255,0.12);padding:.4rem .65rem;border-radius:8px;font-size:.72rem;color:#fff;}
    .ctt-lt{background:#111827;border:1px solid rgba(255,255,255,0.12);padding:.4rem .65rem;border-radius:8px;font-size:.72rem;color:#fff;}

    /* ── SEARCH ── */
    .srch{display:flex;align-items:center;gap:.4rem;border-radius:8px;padding:.36rem .7rem;}
    .srch input{background:none;border:none;outline:none;font-size:.78rem;}

    /* ── MONO LABEL ── */
    .mlbl{font-family:'JetBrains Mono',monospace;font-size:.56rem;text-transform:uppercase;letter-spacing:.12em;}

    /* ── TABS ── */
    .tabs{display:flex;}
    .tab{padding:.5rem 1rem;font-size:.78rem;font-weight:500;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .15s;}
    .tab-dk{color:rgba(255,255,255,0.3);} .tab-dk:hover{color:rgba(255,255,255,0.72);}
    .tab-dk.on{color:#FFFFFF;border-bottom-color:#FFFFFF;font-weight:600;}
    .tab-lt{color:#667085;} .tab-lt:hover{color:#101828;}
    .tab-lt.on{color:#0D9488;border-bottom-color:#0D9488;font-weight:600;}

    /* ── MODAL ── */
    .modal-over{position:fixed;inset:0;background:rgba(0,0,0,0.82);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem;}
    .modal-dk{background:#1A1A1A;border:1px solid rgba(255,255,255,0.1);border-radius:14px;width:100%;max-width:490px;max-height:88vh;overflow-y:auto;}
    .modal-lt{background:#fff;border:1px solid #E4E7EC;border-radius:14px;width:100%;max-width:490px;max-height:88vh;overflow-y:auto;}

    /* ── NOTIF STRIP ── */
    .nstrip{padding:.52rem .72rem;border-left:2.5px solid;border-radius:0 7px 7px 0;}

    /* ── FADE IN ── */
    .fi{animation:fi .28s ease both;}
    .fi1{animation-delay:.04s}.fi2{animation-delay:.08s}.fi3{animation-delay:.12s}
    .fi4{animation-delay:.16s}.fi5{animation-delay:.2s}.fi6{animation-delay:.24s}
    @keyframes fi{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}

    /* ── GRID HELPERS ── */
    .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;}
    .g2{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;}
    .gauto{display:grid;grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:1rem;}
  `}</style>
);

/* ══════════════════════════════════════════════════════
   SHARED PRIMITIVES
══════════════════════════════════════════════════════ */
const CT = ({ active, payload, label, lt }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={lt ? 'ctt-lt' : 'ctt'}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.55rem', opacity: .55, marginBottom: '.18rem' }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.35rem', marginTop: '.1rem' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.color }} />
          <span>{p.name}: <strong>{p.value}</strong></span>
        </div>
      ))}
    </div>
  );
};

const Pbar = ({ val, threshold = 75, dk }) => {
  const t = dk ? DK : LT;
  const col = val >= threshold ? t.rLow : val >= 65 ? t.rMed : t.rHigh;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '.45rem' }}>
      <div className={`pg ${dk ? 'pg-dk' : 'pg-lt'}`} style={{ flex: 1 }}>
        <div className="pgf" style={{ width: `${val}%`, background: col }} />
      </div>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.64rem', fontWeight: 600, color: col, minWidth: 30, textAlign: 'right' }}>{val}%</span>
    </div>
  );
};

const KPI = ({ label, value, delta, up, icon: Icon, accent, dk, delay = 0 }) => {
  const t = dk ? DK : LT;
  return (
    <div className={`fi fi${delay + 1} ${dk ? 'card-dk' : 'card-lt'}`} style={{ padding: '1.15rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '.68rem', fontWeight: 500, color: t.muted, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '.38rem' }}>{label}</div>
          <div style={{ fontSize: '1.78rem', fontWeight: 700, color: t.text, lineHeight: 1, letterSpacing: '-.02em' }}>{value}</div>
          {delta && <div style={{ fontSize: '.7rem', display: 'flex', alignItems: 'center', gap: '.16rem', marginTop: '.28rem', color: up === true ? t.rLow : up === false ? t.rHigh : t.muted }}>
            {up === true && <ArrowUpRight size={12} />}{up === false && <ArrowDownRight size={12} />}{delta}
          </div>}
        </div>
        <div style={{ width: 38, height: 38, borderRadius: 9, background: `${accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={17} style={{ color: accent }} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};

/* Card Header helper */
const CH = ({ title, sub, right, border = true, dk }) => {
  const t = dk ? DK : LT;
  return (
    <div style={{ padding: '1rem 1.25rem', borderBottom: border ? `1px solid ${t.sep}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '.5rem', flexWrap: 'wrap' }}>
      <div>
        <div style={{ fontWeight: 600, fontSize: '.88rem', color: t.text }}>{title}</div>
        {sub && <div style={{ fontSize: '.7rem', color: t.muted, marginTop: 1 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
};

const Loader = ({ dk }) => {
  const t = dk ? DK : LT;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', gap: '1rem', opacity: 0.6 }}>
      <div style={{ width: 24, height: 24, border: `2px solid ${t.border}`, borderTopColor: t.teal, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.65rem', letterSpacing: '.1em', textTransform: 'uppercase', color: t.muted }}>Loading Data...</div>
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════════════════ */
const Sidebar = ({ role, page, onNav, onLogout, user }) => {
  const dk = role !== 'admin';
  const NAV = {
    student: [
      {
        g: 'Menu', items: [
          { id: 'home', icon: Home, label: 'Dashboard' },
          { id: 'assignments', icon: ClipboardList, label: 'Assignments', badge: 3 },
          { id: 'marks', icon: BarChart2, label: 'Marks & IA' },
          { id: 'attendance', icon: CheckCircle, label: 'Attendance' },
          { id: 'timetable', icon: Calendar, label: 'Timetable' },
        ]
      },
      {
        g: 'Services', items: [
          { id: 'notifications', icon: Bell, label: 'Notifications', badge: 2 },
          { id: 'announcements', icon: MessageSquare, label: 'Announcements' },
          { id: 'downloads', icon: Download, label: 'Downloads' },
          { id: 'settings', icon: Settings, label: 'Settings' },
        ]
      },
    ],
    teacher: [
      {
        g: 'Menu', items: [
          { id: 'home', icon: Home, label: 'Dashboard' },
          { id: 'tasks', icon: ClipboardList, label: 'My Tasks', badge: 2 },
          { id: 'students', icon: Users, label: 'My Students' },
          { id: 'attendance', icon: CheckCircle, label: 'Take Attendance' },
          { id: 'marks', icon: Edit2, label: 'Enter Marks' },
        ]
      },
      {
        g: 'Analytics', items: [
          { id: 'risk', icon: AlertTriangle, label: 'Risk Overview' },
          { id: 'announcements', icon: MessageSquare, label: 'Announcements' },
          { id: 'settings', icon: Settings, label: 'Settings' },
        ]
      },
    ],
    admin: [
      {
        g: 'Menu', items: [
          { id: 'home', icon: Home, label: 'Dashboard' },
          { id: 'analytics', icon: Activity, label: 'Analytics' },
        ]
      },
      {
        g: 'Academics', items: [
          { id: 'courses', icon: BookOpen, label: 'Courses & Sections' },
          { id: 'risk', icon: AlertTriangle, label: 'Risk Management' },
          { id: 'fees', icon: Database, label: 'Fee Management' },
          { id: 'reports', icon: BarChart2, label: 'Reports' },
        ]
      },
      {
        g: 'Administration', items: [
          { id: 'users', icon: Users, label: 'User Management' },
          { id: 'logs', icon: Shield, label: 'Decision Logs' },
          { id: 'config', icon: Settings, label: 'Configuration' },
        ]
      },
    ],
  };
  const NAMES = { student: 'Student Portal', teacher: 'Faculty Portal', admin: 'Admin Panel' };
  
  // Use the passed user or fall back to defaults
  const u = {
    n: user?.name || (role === 'admin' ? 'Admin' : (role === 'teacher' ? 'Dr. Priya Nair' : 'Arjun Sharma')),
    id: user?.specific_id || (role === 'admin' ? 'ADM-001' : (role === 'teacher' ? 'FAC-018' : '21CS047'))
  };
  // Light (admin) sidebar uses dark text on white; dark uses white text on black
  const ltSb = !dk;
  const logoBg = ltSb ? '#F0FDFA' : 'rgba(255,255,255,0.1)';
  const logoIcon = ltSb ? '#0D9488' : 'rgba(255,255,255,0.85)';
  const logoText = ltSb ? '#111827' : '#FFFFFF';
  const logoSub = ltSb ? '#9CA3AF' : 'rgba(255,255,255,0.3)';
  const srchBg = ltSb ? '#F2F4F7' : 'rgba(255,255,255,0.06)';
  const srchBdr = ltSb ? '1px solid #E8ECF0' : '1px solid rgba(255,255,255,0.08)';
  const srchIcon = ltSb ? '#9CA3AF' : 'rgba(255,255,255,0.3)';
  const srchTxt = ltSb ? '#111827' : 'rgba(255,255,255,0.55)';
  const pillBg = ltSb ? '#F9FAFB' : 'rgba(255,255,255,0.06)';
  const pillBdr = ltSb ? '1px solid #E8ECF0' : '1px solid rgba(255,255,255,0.08)';
  const avatarBg = ltSb ? '#F0FDFA' : 'rgba(255,255,255,0.12)';
  const avatarBdr = ltSb ? '1.5px solid #0D9488' : '1.5px solid rgba(255,255,255,0.18)';
  const avatarTxt = ltSb ? '#0D9488' : '#FFFFFF';
  const nameTxt = ltSb ? '#111827' : '#FFFFFF';
  const idTxt = ltSb ? '#9CA3AF' : 'rgba(255,255,255,0.3)';
  const grpLbl = ltSb ? '#D1D5DB' : 'rgba(255,255,255,0.2)';
  const badgeBg = ltSb ? '#0D9488' : 'rgba(255,255,255,0.85)';
  const badgeTxt = ltSb ? '#FFFFFF' : '#0A0A0A';
  const signOutBdr = ltSb ? '1px solid #F2F4F7' : '1px solid rgba(255,255,255,0.07)';
  const signOutC = ltSb ? '#EF4444' : 'rgba(248,113,113,0.6)';

  return (
    <div className={dk ? 'sb-dk' : 'sb-lt'}>
      {/* Logo */}
      <div className={dk ? 'sb-logo-dk' : 'sb-logo-lt'}>
        <div style={{ width: 30, height: 30, background: logoBg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Monitor size={14} strokeWidth={2} style={{ color: logoIcon }} />
        </div>
        <div>
          <div style={{ fontSize: '.95rem', fontWeight: 800, color: logoText, lineHeight: 1, letterSpacing: '-.02em' }}>MUSE</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.44rem', color: logoSub, textTransform: 'uppercase', letterSpacing: '.1em', marginTop: 2 }}>{NAMES[role]}</div>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: '.7rem .875rem' }}>
        <div className="srch" style={{ background: srchBg, border: srchBdr }}>
          <Search size={12} style={{ color: srchIcon, flexShrink: 0 }} />
          <input placeholder="Search…" style={{ color: srchTxt, fontSize: '.78rem', width: '100%' }} />
        </div>
      </div>

      {/* User pill */}
      <div style={{ margin: '0 .75rem .5rem', padding: '.55rem .72rem', borderRadius: 8, background: pillBg, border: pillBdr, display: 'flex', alignItems: 'center', gap: '.5rem' }}>
        <div style={{ width: 27, height: 27, borderRadius: '50%', background: avatarBg, border: avatarBdr, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.68rem', fontWeight: 700, color: avatarTxt, flexShrink: 0 }}>{u.n.charAt(0)}</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: '.76rem', fontWeight: 600, color: nameTxt, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.n}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.52rem', color: idTxt }}>{u.id}</div>
        </div>
      </div>

      {/* Nav */}
      {NAV[role].map(g => (
        <div key={g.g} style={{ padding: '.7rem .875rem .2rem' }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.46rem', textTransform: 'uppercase', letterSpacing: '.18em', color: grpLbl, paddingLeft: '.42rem', marginBottom: '.28rem' }}>{g.g}</div>
          {g.items.map(item => (
            <div key={item.id} className={`sb-nav-item ${page === item.id ? 'on' : ''}`} onClick={() => onNav(item.id)}>
              <item.icon size={14} strokeWidth={1.6} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1, letterSpacing: '-.01em' }}>{item.label}</span>
              {item.badge && <span style={{ background: badgeBg, color: badgeTxt, fontSize: '.52rem', fontWeight: 700, padding: '.07rem .35rem', borderRadius: 9 }}>{item.badge}</span>}
            </div>
          ))}
        </div>
      ))}

      {/* Sign out */}
      <div style={{ marginTop: 'auto', padding: '.7rem .875rem', borderTop: signOutBdr }}>
        <div className="sb-nav-item" style={{ color: signOutC }} onClick={onLogout}>
          <LogOut size={14} strokeWidth={1.6} /><span>Sign Out</span>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   TOPBAR
══════════════════════════════════════════════════════ */
const Topbar = ({ title, sub, dk, unread }) => {
  const t = dk ? DK : LT;
  return (
    <div className={dk ? 'tb-dk' : 'tb-lt'}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.28rem' }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.56rem', color: t.muted, textTransform: 'uppercase', letterSpacing: '.08em' }}>Dashboard</span>
          <ChevronRight size={10} style={{ color: t.muted }} />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.56rem', color: dk ? 'rgba(255,255,255,0.75)' : LT.teal, textTransform: 'uppercase', letterSpacing: '.08em' }}>{title}</span>
        </div>
        {sub && <div style={{ fontSize: '.7rem', color: t.muted, marginTop: 1 }}>{sub}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.55rem' }}>
        <div className="srch" style={{ background: dk ? 'rgba(255,255,255,0.06)' : '#F9FAFB', border: `1px solid ${t.border}` }}>
          <Search size={13} style={{ color: t.muted }} />
          <input placeholder="Search…" style={{ color: t.text, width: 148 }} />
        </div>
        <button className={`btn ${dk ? 'btn-gh' : 'btn-ng'}`} style={{ fontSize: '.72rem' }}><RefreshCw size={12} />Refresh</button>
        <button style={{ position: 'relative', width: 34, height: 34, borderRadius: 8, background: dk ? 'rgba(255,255,255,0.06)' : '#F9FAFB', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Bell size={14} strokeWidth={1.6} style={{ color: t.text }} />
          {unread > 0 && <div style={{ position: 'absolute', top: 7, right: 7, width: 6, height: 6, borderRadius: '50%', background: dk ? '#FFFFFF' : LT.teal, border: `1.5px solid ${dk ? DK.topbar : LT.topbar}` }} />}
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   STUDENT DASHBOARD
══════════════════════════════════════════════════════ */
const StudentDash = ({ page, setPage }) => {
  const [d, setD] = useState(EMPTY_STUDENT);
  const [loading, setLoading] = useState(true);
  const [af, setAf] = useState('All');
  const [gv, setGv] = useState('');
  const [gSent, setGSent] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const t = DK;

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('muse_token');
      const response = await fetch(`${API_URL}/dashboard/student`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) setD(data);
    } catch (err) {
      console.error('Error fetching student dashboard:', err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const markRead = id => setD(p => ({ ...p, notifications: p.notifications.map(n => n.id === id ? { ...n, read: true } : n) }));
  const unread = d.notifications.filter(n => !n.read).length;
  const assigns = d.assignments.filter(a => af === 'All' ||
    (af === 'Pending' && a.status === 'pending') || (af === 'Overdue' && a.status === 'pending' && a.priority === 'high') ||
    (af === 'Submitted' && a.status === 'submitted') || (af === 'Graded' && a.status === 'graded'));

  const C = ({ ch, style = {} }) => <div className="card-dk" style={style}>{ch}</div>;

  // Badge map for dark
  const dbadge = { pending: 'bPend', submitted: 'bSub', graded: 'bGrd', high: 'bH', medium: 'bM', 'Medium': 'bM', low: 'bL', 'High': 'bH', 'Low': 'bL' };

  if (loading) return <Loader dk={true} />;

  if (page === 'timetable') return (
    <div className="card-dk fi">
      <CH title="Today's Timetable" sub="Dec 26, 2024 · Thursday" dk />
      <table className="tbl tbl-dk">
        <thead><tr><th>Time</th><th>Subject</th><th>Room</th><th>Faculty</th></tr></thead>
        <tbody>{d.timetable?.map((c, i) => (
          <tr key={i}>
            <td><span style={{ fontFamily: "'JetBrains Mono',monospace", color: 'rgba(255,255,255,0.6)', fontSize: '.7rem' }}>{c.time}</span></td>
            <td style={{ fontWeight: 500 }}>{c.subject}</td>
            <td style={{ color: t.sub }}>{c.room}</td>
            <td style={{ color: t.sub }}>{c.faculty}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );

  if (page === 'attendance') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="card-dk fi">
        <CH title="Subject-wise Attendance" sub="Minimum required: 75%" right={<span className="b bM">Overall: {d.attendance}%</span>} dk />
        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {d.subjects.map(s => (
            <div key={s.code}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.28rem' }}>
                <div><span style={{ fontSize: '.82rem', fontWeight: 500, color: t.text }}>{s.name}</span><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.58rem', color: t.muted, marginLeft: '.4rem' }}>{s.code}</span></div>
                {s.att < 75 && <span className="b bH">Below threshold</span>}
              </div>
              <Pbar val={s.att} dk />
            </div>
          ))}
        </div>
      </div>
      <div className="card-dk fi fi2" style={{ padding: '1rem 1.25rem' }}>
        <div className="mlbl" style={{ color: t.muted, marginBottom: '.6rem' }}>Legend</div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[{ c: t.rLow, l: '≥75% — Good' }, { c: t.rMed, l: '65–74% — Warning' }, { c: t.rHigh, l: '<65% — Critical' }].map(x => (
            <div key={x.l} style={{ display: 'flex', alignItems: 'center', gap: '.32rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: x.c }} /><span style={{ fontSize: '.72rem', color: t.sub }}>{x.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (page === 'marks') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="card-dk fi">
        <CH title="IA Score Comparison" sub="Max 25 per assessment" dk />
        <div style={{ padding: '.75rem .25rem .5rem' }}>
          <ResponsiveContainer width="100%" height={235}>
            <BarChart data={d.marks} barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="test" tick={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", fill: t.muted }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 25]} tick={{ fontSize: 10, fill: t.muted }} axisLine={false} tickLine={false} />
              <Tooltip content={<CT />} /><Legend iconSize={8} wrapperStyle={{ fontSize: '.7rem', color: t.sub }} />
              {['ML', 'DS', 'CN', 'DL', 'MA'].map((k, i) => <Bar key={k} dataKey={k} fill={DK.chart[i]} radius={[4, 4, 0, 0]} />)}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card-dk fi fi2">
        <CH title="Subject Trends" sub="IA-1 vs IA-2" dk />
        <table className="tbl tbl-dk">
          <thead><tr><th>Subject</th><th>Code</th><th>IA-1</th><th>IA-2</th><th>Trend</th></tr></thead>
          <tbody>{d.subjects.map(s => {
            const tr = s.ia2 > s.ia1 ? 'up' : s.ia2 < s.ia1 ? 'dn' : 'eq'; return (
              <tr key={s.code}>
                <td style={{ fontWeight: 500 }}>{s.name}</td>
                <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.63rem', color: t.muted }}>{s.code}</span></td>
                <td><span style={{ fontFamily: "'JetBrains Mono',monospace" }}>{s.ia1}</span></td>
                <td><span style={{ fontFamily: "'JetBrains Mono',monospace" }}>{s.ia2}</span></td>
                <td>{tr === 'up' ? <TrendingUp size={14} style={{ color: t.rLow }} /> : tr === 'dn' ? <TrendingDown size={14} style={{ color: t.rHigh }} /> : <span style={{ color: t.muted }}>—</span>}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (page === 'assignments') return (
    <div className="card-dk fi">
      <CH title="Assignments & Deadlines" sub={`${d.assignments.filter(a => a.status === 'pending').length} pending`}
        right={<div style={{ display: 'flex', gap: '.35rem', flexWrap: 'wrap' }}>{['All', 'Pending', 'Overdue', 'Submitted', 'Graded'].map(f => (
          <button key={f} onClick={() => setAf(f)} className={`btn ${af === f ? 'btn-wh' : 'btn-gh'}`} style={{ padding: '.28rem .6rem', fontSize: '.7rem' }}>{f}</button>
        ))}</div>} dk />
      <table className="tbl tbl-dk">
        <thead><tr><th>Assignment</th><th>Subject</th><th>Due</th><th>Status</th></tr></thead>
        <tbody>{assigns.map(a => (
          <tr key={a.id}>
            <td style={{ fontWeight: 500, maxWidth: 230, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</td>
            <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.62rem', color: t.muted }}>{a.subject}</span></td>
            <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.7rem', color: a.status === 'pending' && a.priority === 'high' ? t.rHigh : t.text }}>{a.due}</span></td>
            <td><span className={`b b${a.status.charAt(0).toUpperCase() + a.status.slice(1, 4)}`}>{a.status}</span></td>
          </tr>
        ))}
          {assigns.length === 0 && <tr><td colSpan={4} style={{ textAlign: 'center', color: t.muted, padding: '2rem' }}>No assignments match this filter.</td></tr>}
        </tbody>
      </table>
    </div>
  );

  if (page === 'notifications') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.2rem' }}>
        <div style={{ fontWeight: 600, color: t.text }}>Notifications <span style={{ fontSize: '.78rem', color: t.muted, fontWeight: 400 }}>({unread} unread)</span></div>
        <button className="btn btn-gh" style={{ fontSize: '.72rem' }} onClick={() => setD(p => ({ ...p, notifications: p.notifications.map(n => ({ ...n, read: true })) }))}>Mark all read</button>
      </div>
      {d.notifications.map(n => {
        const col = { warn: t.rMed, info: 'rgba(255,255,255,0.5)', ok: t.rLow, alert: t.rHigh }[n.type];
        return (
          <div key={n.id} className="card-dk nstrip fi" style={{ borderLeftColor: col, opacity: n.read ? .52 : 1, cursor: 'pointer' }} onClick={() => markRead(n.id)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ fontSize: '.8rem', color: t.text, lineHeight: 1.5 }}>{n.text}</div>
              {!n.read && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#FFFFFF', flexShrink: 0, marginTop: 5 }} />}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.56rem', color: t.muted, marginTop: '.2rem' }}>{n.time}</div>
          </div>
        );
      })}
    </div>
  );

  if (page === 'announcements') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
      <div style={{ fontWeight: 600, color: t.text, marginBottom: '.2rem' }}>Class Announcements</div>
      {announcements.length === 0 && <div style={{ color: t.muted, padding: '1rem' }}>No announcements yet.</div>}
      {announcements.map(a => (
        <div key={a.id} className="card-dk fi" style={{ padding: '1rem 1.25rem', borderLeft: `3px solid ${t.rLow}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '.4rem' }}>
            <div style={{ fontWeight: 600, fontSize: '.85rem', color: t.text }}>{a.title}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.56rem', color: t.muted }}>{new Date(a.createdAt).toLocaleString()}</div>
          </div>
          <div style={{ fontSize: '.78rem', color: t.sub, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{a.body}</div>
          <div style={{ fontSize: '.65rem', color: t.muted, marginTop: '.6rem' }}>Posted by {a.teacher?.user?.name || 'Faculty'}</div>
        </div>
      ))}
    </div>
  );

  if (page === 'downloads') return (
    <div className="gauto">
      {[
        { icon: Download, label: 'Marksheet', sub: 'Latest semester', c: 'rgba(255,255,255,0.9)', action: () => downloadCsv('marksheet') },
        { icon: FileText, label: 'Attendance', sub: 'Current semester', c: 'rgba(255,255,255,0.7)', action: () => downloadCsv('attendance') },
        { icon: Award, label: 'Bonafide Cert', sub: 'On request', c: t.rLow },
        { icon: FileText, label: 'Transfer Cert', sub: 'On request', c: t.rMed },
        { icon: Shield, label: 'Fee Receipt', sub: 'All payments', c: t.rLow },
        { icon: BookOpen, label: 'Course Reg.', sub: 'Current sem', c: 'rgba(255,255,255,0.55)' },
      ].map(({ icon: Icon, label, sub, c, action }) => (
        <button key={label} onClick={action} className="btn card-dk" style={{ flexDirection: 'column', gap: '.65rem', padding: '1.1rem', height: 'auto', borderRadius: 12, alignItems: 'flex-start', background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)', width: '100%' }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: `${c}14`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={15} style={{ color: c }} strokeWidth={1.5} />
          </div>
          <div><div style={{ fontSize: '.82rem', fontWeight: 600, color: '#FFFFFF', textAlign: 'left' }}>{label}</div>
            <div style={{ fontSize: '.67rem', color: t.muted, marginTop: '.1rem', textAlign: 'left' }}>{sub}</div></div>
        </button>
      ))}
    </div>
  );

  if (page === 'settings') return (
    <div className="card-dk fi" style={{ padding: '1.5rem', maxWidth: 500 }}>
      <div style={{ fontWeight: 600, color: t.text, marginBottom: '1.25rem' }}>Account Settings</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
        {[{ l: 'Full Name', v: d.name }, { l: 'Email', v: d.email }, { l: 'Phone', v: d.phone }, { l: 'USN (read-only)', v: d.usn, ro: true }].map(f => (
          <div key={f.l}><div className="mlbl" style={{ color: t.muted, marginBottom: '.28rem' }}>{f.l}</div>
            <input className="inp-dk" defaultValue={f.v} disabled={!!f.ro} style={{ opacity: f.ro ? .45 : 1 }} /></div>
        ))}
        <div><div className="mlbl" style={{ color: t.muted, marginBottom: '.28rem' }}>Raise a Grievance</div>
          <textarea className="inp-dk" rows={3} style={{ resize: 'vertical' }} value={gv} onChange={e => { setGv(e.target.value); setGSent(false); }} placeholder="Describe your issue…" />
          {gSent ? <div style={{ color: t.rLow, fontSize: '.78rem', display: 'flex', alignItems: 'center', gap: '.3rem', marginTop: '.4rem' }}><Check size={12} />Submitted</div>
            : <button className="btn btn-wh" style={{ marginTop: '.5rem' }} onClick={() => { if (gv.trim()) { setGSent(true); setGv(''); } }}>
              <Send size={12} />Submit Grievance</button>}
        </div>
        <button className="btn btn-wh" style={{ alignSelf: 'flex-start' }}><Save size={12} />Save Changes</button>
      </div>
    </div>
  );

  // ── HOME ──
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Greeting */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '1.28rem', fontWeight: 700, color: t.text, letterSpacing: '-.02em' }}>Welcome back, {d.name.split(' ')[0]} 👋</div>
          <div style={{ fontSize: '.78rem', color: t.muted, marginTop: 2 }}>{d.program} · {d.semester}</div>
        </div>
        <div style={{ display: 'flex', gap: '.45rem' }}>
          <button className="btn btn-gh" onClick={() => setPage('assignments')}><ClipboardList size={13} />Assignments</button>
          <button className="btn btn-wh" onClick={() => setPage('downloads')}><Download size={13} />Downloads</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="g4">
        <KPI label="Attendance" value={`${d.attendance}%`} delta="−3% this week" up={false} icon={CheckCircle} accent={d.attendance < 75 ? t.rHigh : t.rLow} dk delay={0} />
        <KPI label="CGPA" value={d.cgpa} delta="+0.1 this sem" up={true} icon={Award} accent="rgba(255,255,255,0.8)" dk delay={1} />
        <KPI label="Pending Tasks" value={d.assignments.filter(a => a.status === 'pending').length} delta="2 due this week" up={false} icon={ClipboardList} accent={t.rMed} dk delay={2} />
        <KPI label="Notifications" value={unread} delta="unread" up={null} icon={Bell} accent="rgba(255,255,255,0.55)" dk delay={3} />
      </div>

      {/* Profile + AI Risk */}
      <div className="g2">
        <div className="card-dk fi fi2" style={{ padding: '1.25rem' }}>
          <div className="mlbl" style={{ color: t.muted, marginBottom: '.875rem' }}>Student Profile</div>
          <div style={{ display: 'flex', gap: '.875rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', flexShrink: 0 }}>{d.name.charAt(0)}</div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: t.text }}>{d.name}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.6rem', color: t.muted, marginTop: 2 }}>{d.usn} · {d.program}</div>
              <div style={{ display: 'flex', gap: '.3rem', marginTop: '.45rem' }}>
                <span className="b bClr">Fees: {d.fees}</span>
                <span className="b bInfo">Hostel: {d.hostel}</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.45rem' }}>
            {[{ l: 'Semester', v: d.semester }, { l: 'Mentor', v: d.mentor }, { l: 'Email', v: d.email }, { l: 'Phone', v: d.phone }].map(({ l, v }) => (
              <div key={l} style={{ background: 'rgba(255,255,255,0.04)', padding: '.42rem .58rem', borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="mlbl" style={{ color: t.muted, fontSize: '.48rem' }}>{l}</div>
                <div style={{ fontSize: '.73rem', color: t.text, marginTop: '.1rem', wordBreak: 'break-all' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-dk fi fi3" style={{ padding: '1.25rem', borderLeft: '2px solid rgba(251,191,36,0.5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
              <AlertTriangle size={14} style={{ color: t.rMed }} strokeWidth={1.5} />
              <span style={{ fontWeight: 600, color: t.text, fontSize: '.88rem' }}>AI Performance Insight</span>
            </div>
            <span className="b bM">Medium Risk</span>
          </div>
          <div style={{ fontSize: '.79rem', color: t.sub, marginBottom: '.875rem', lineHeight: 1.6 }}>Two risk factors require immediate attention this semester.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.48rem', marginBottom: '.875rem' }}>
            {[{ f: 'Attendance — CS501', c: 82, col: t.rHigh }, { f: 'Attendance — CS503', c: 74, col: t.rMed }, { f: 'Incomplete Assignments', c: 55, col: t.rMed }, { f: 'IA Decline — CS501', c: 38, col: t.rLow }].map(({ f, c, col }) => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '.55rem' }}>
                <div style={{ fontSize: '.7rem', color: t.sub, minWidth: 170 }}>{f}</div>
                <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 2, background: col, width: `${c}%` }} />
                </div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.58rem', color: col, minWidth: 26, textAlign: 'right' }}>{c}%</div>
              </div>
            ))}
          </div>
          <div className="mlbl" style={{ color: t.muted, marginBottom: '.35rem' }}>Recommendations</div>
          {['Attend ≥80% of remaining ML classes.', 'Submit CN lab report before Dec 30.', 'Schedule a session with Dr. Priya Nair.'].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: '.32rem', alignItems: 'flex-start', fontSize: '.74rem', color: t.sub, marginBottom: '.22rem' }}>
              <ChevronRight size={10} style={{ color: 'rgba(255,255,255,0.5)', marginTop: 3, flexShrink: 0 }} />{s}
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="g2">
        <div className="card-dk fi fi2">
          <CH title="Attendance Overview" sub="By subject · Min 75%" right={<button className="btn btn-gh" style={{ fontSize: '.7rem' }} onClick={() => setPage('attendance')}>View All</button>} dk />
          <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {d.subjects.map(s => (
              <div key={s.code}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.22rem' }}>
                  <span style={{ fontSize: '.78rem', color: t.text }}>{s.name}</span>
                  {s.att < 75 && <span className="b bH" style={{ fontSize: '.55rem' }}>Low</span>}
                </div>
                <Pbar val={s.att} dk />
              </div>
            ))}
          </div>
        </div>
        <div className="card-dk fi fi3">
          <CH title="IA Scores" sub="IA-1 vs IA-2" dk />
          <div style={{ padding: '.75rem .25rem .5rem' }}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={d.marks} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="test" tick={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", fill: t.muted }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 25]} tick={{ fontSize: 10, fill: t.muted }} axisLine={false} tickLine={false} />
                <Tooltip content={<CT />} /><Legend iconSize={8} wrapperStyle={{ fontSize: '.68rem', color: t.sub }} />
                {['ML', 'DS', 'CN', 'DL', 'MA'].map((k, i) => <Bar key={k} dataKey={k} fill={DK.chart[i]} radius={[3, 3, 0, 0]} />)}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Assignments + Timetable */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.25rem' }}>
        <div className="card-dk fi fi3">
          <CH title="Assignments" sub={`${d.assignments.filter(a => a.status === 'pending').length} pending`} right={<button className="btn btn-gh" style={{ fontSize: '.7rem' }} onClick={() => setPage('assignments')}>View All</button>} dk />
          <table className="tbl tbl-dk">
            <thead><tr><th>Assignment</th><th>Subject</th><th>Due</th><th>Status</th></tr></thead>
            <tbody>{d.assignments.slice(0, 4).map(a => (
              <tr key={a.id}>
                <td style={{ fontWeight: 500, fontSize: '.78rem', maxWidth: 175, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</td>
                <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.6rem', color: t.muted }}>{a.subject}</span></td>
                <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.7rem', color: a.status === 'pending' && a.priority === 'high' ? t.rHigh : t.text }}>{a.due}</span></td>
                <td><span className={`b ${a.status === 'pending' ? 'bPend' : a.status === 'submitted' ? 'bSub' : 'bGrd'}`}>{a.status}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card-dk fi fi4">
            <CH title="Today's Classes" border={false} dk />
            <div style={{ padding: '.75rem 1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: '.72rem' }}>
              {d.timetable.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '.55rem', alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.6rem', color: 'rgba(255,255,255,0.45)', minWidth: 36, paddingTop: 2 }}>{c.time}</div>
                  <div><div style={{ fontSize: '.78rem', fontWeight: 600, color: t.text }}>{c.subject}</div>
                    <div style={{ fontSize: '.63rem', color: t.muted }}>{c.room} · {c.faculty}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-dk fi fi5">
            <CH title="Notifications" right={unread > 0 && <span style={{ background: 'rgba(255,255,255,0.85)', color: '#0A0A0A', fontSize: '.52rem', fontWeight: 700, padding: '.06rem .35rem', borderRadius: 9 }}>{unread}</span>} dk />
            <div style={{ padding: '.72rem 1rem', display: 'flex', flexDirection: 'column', gap: '.38rem' }}>
              {d.notifications.slice(0, 3).map(n => {
                const col = { warn: t.rMed, info: 'rgba(255,255,255,0.45)', ok: t.rLow, alert: t.rHigh }[n.type];
                return (
                  <div key={n.id} className="nstrip" style={{ borderLeftColor: col, opacity: n.read ? .48 : 1, cursor: 'pointer', background: 'rgba(255,255,255,0.03)', borderRadius: '0 6px 6px 0' }} onClick={() => markRead(n.id)}>
                    <div style={{ fontSize: '.73rem', color: t.text, lineHeight: 1.4 }}>{n.text}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.55rem', color: t.muted, marginTop: '.18rem' }}>{n.time}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   TEACHER DASHBOARD
══════════════════════════════════════════════════════ */
const TeacherDash = ({ page, setPage }) => {
  const [d, setD] = useState(EMPTY_TEACHER);
  const [loading, setLoading] = useState(true);
  const [sel, setSel] = useState(0);
  const t = DK;

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('muse_token');
      const response = await fetch(`${API_URL}/dashboard/teacher`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) setD(data);
    } catch (err) {
      console.error('Error fetching teacher dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ci = sel;
  const C = d.courses[ci] || { list: [], avgAtt: 0, risk: { high: 0, med: 0, low: 0 } };

  const markAtt = (usn, v) => setD(p => { const c = [...p.courses]; c[ci] = { ...c[ci], todayAtt: { ...c[ci].todayAtt, [usn]: v } }; return { ...p, courses: c }; });
  const setMark = (usn, v) => setD(p => { const c = [...p.courses]; c[ci] = { ...c[ci], ia2: { ...c[ci].ia2, [usn]: v } }; return { ...p, courses: c }; });
  const saveMarks = () => { alert(`IA-2 marks saved for ${C.code}-${C.section}`); };
  const saveAtt = () => { const p = Object.values(C.todayAtt || {}).filter(v => v === true).length; alert(`Attendance saved! ${p} present`); };
  const setFb = (usn, v) => setD(p => { const c = [...p.courses]; c[ci] = { ...c[ci], list: c[ci].list.map(s => s.usn === usn ? { ...s, fb: v } : s) }; return { ...p, courses: c }; });
  const toggleTask = id => setD(p => ({ ...p, tasks: p.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t) }));

  const CourseTabs = () => (
    <div style={{ display: 'flex', gap: '.45rem', marginBottom: '.25rem' }}>
      {d.courses?.map((c, i) => (
        <button key={c.code} onClick={() => setSel(i)} className={`btn ${i === sel ? 'btn-wh' : 'btn-gh'}`}>
          {c.code}-{c.section}
        </button>
      ))}
    </div>
  );

  if (loading) return <Loader dk={true} />;

  if (page === 'attendance') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <CourseTabs />
      <div className="card-dk fi">
        <CH title={`Attendance — ${C.name} (${C.code}-${C.section})`} sub="P = present · A = absent · Save when done" right={<button className="btn btn-tl" onClick={saveAtt}><Save size={12} />Save</button>} dk />
        <table className="tbl tbl-dk">
          <thead><tr><th>USN</th><th>Student</th><th>Cumulative</th><th>Today</th></tr></thead>
          <tbody>{C.list.map(s => {
            const v = (C.todayAtt || {})[s.usn];
            return (
              <tr key={s.usn}>
                <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.6rem', color: t.muted }}>{s.usn}</span></td>
                <td style={{ fontWeight: 500 }}>{s.name}</td>
                <td style={{ minWidth: 110 }}><Pbar val={s.att} dk /></td>
                <td><div style={{ display: 'flex', gap: '.38rem' }}>
                  <button className="att-b" onClick={() => markAtt(s.usn, true)} style={{ borderColor: v === true ? t.rLow : 'rgba(255,255,255,0.15)', background: v === true ? `${t.rLow}22` : 'transparent', color: v === true ? t.rLow : 'rgba(255,255,255,0.38)' }}>P</button>
                  <button className="att-b" onClick={() => markAtt(s.usn, false)} style={{ borderColor: v === false ? t.rHigh : 'rgba(255,255,255,0.15)', background: v === false ? `${t.rHigh}22` : 'transparent', color: v === false ? t.rHigh : 'rgba(255,255,255,0.38)' }}>A</button>
                </div></td>
              </tr>
            );
          })}</tbody>
        </table>
      </div>
    </div>
  );

  if (page === 'marks') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <CourseTabs />
      <div className="card-dk fi">
        <CH title={`Enter IA-2 Marks — ${C.name}`} sub="Maximum: 25" right={<button className="btn btn-tl" onClick={saveMarks}><Save size={12} />Save Marks</button>} dk />
        <table className="tbl tbl-dk">
          <thead><tr><th>USN</th><th>Student</th><th>IA-1</th><th>IA-2 (Enter)</th></tr></thead>
          <tbody>{C.list.map(s => {
            const v = (C.ia2 || {})[s.usn] || '';
            return (
              <tr key={s.usn}>
                <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.6rem', color: t.muted }}>{s.usn}</span></td>
                <td style={{ fontWeight: 500 }}>{s.name}</td>
                <td><span style={{ fontFamily: "'JetBrains Mono',monospace" }}>{s.ia1}/25</span></td>
                <td><input type="number" className="inp-dk" style={{ width: 82 }} placeholder="0–25" value={v} onChange={e => setMark(s.usn, e.target.value)} /></td>
              </tr>
            );
          })}</tbody>
        </table>
      </div>
    </div>
  );

  if (page === 'risk') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <CourseTabs />
      <div className="card-dk fi" style={{ overflowX: 'auto' }}>
        <CH title={`Risk — ${C.name} (${C.code}-${C.section})`} sub="XAI-based · Accept or flag AI predictions" dk />
        <table className="tbl tbl-dk">
          <thead><tr><th>Student</th><th>Att.</th><th>Risk</th><th>AI Feedback</th></tr></thead>
          <tbody>{C.list.map(s => (
            <tr key={s.usn}>
              <td style={{ fontWeight: 500 }}>{s.name}</td>
              <td style={{ minWidth: 100 }}><Pbar val={s.att} dk /></td>
              <td><span className={`b ${s.risk === 'High' ? 'bH' : s.risk === 'Medium' ? 'bM' : 'bL'}`}>{s.risk}</span></td>
              <td>{s.fb === null
                  ? <div style={{ display: 'flex', gap: '.24rem' }}>
                    <button className="btn" style={{ padding: '.18rem .36rem', background: `${t.rLow}18`, color: t.rLow }} onClick={() => setFb(s.usn, true)}><ThumbsUp size={10} /></button>
                    <button className="btn" style={{ padding: '.18rem .36rem', background: `${t.rHigh}18`, color: t.rHigh }} onClick={() => setFb(s.usn, false)}><Flag size={10} /></button>
                  </div>
                  : <span style={{ fontSize: '.63rem', color: s.fb ? t.rLow : t.rMed }}>{s.fb ? '✓' : '⚑'}</span>}
                </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '1.28rem', fontWeight: 700, color: t.text }}>Welcome, {d.name.split(' ').pop()} 👋</div>
          <div style={{ fontSize: '.78rem', color: t.muted, marginTop: 2 }}>{d.designation} · {d.dept}</div>
        </div>
      </div>
      <div className="g2">
        <div className="card-dk fi">
          <CH title="Tasks" right={<span style={{ background: 'rgba(255,255,255,0.85)', color: '#0A0A0A', fontSize: '.52rem', fontWeight: 700, padding: '.06rem .35rem', borderRadius: 9 }}>{d.tasks.length}</span>} dk />
          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '.48rem' }}>
            {d.tasks.map(task => (
              <div key={task.id} style={{ display: 'flex', gap: '.52rem', alignItems: 'flex-start', padding: '.58rem .72rem', borderRadius: 8, background: task.urgent && !task.done ? `${t.rHigh}0D` : 'rgba(255,255,255,0.03)', border: `1px solid ${task.urgent && !task.done ? `${t.rHigh}25` : DK.border}`, opacity: task.done ? .45 : 1 }}>
                <button onClick={() => toggleTask(task.id)} style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${task.done ? t.rLow : 'rgba(255,255,255,0.2)'}`, background: task.done ? `${t.rLow}22` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2, cursor: 'pointer' }}>
                  {task.done && <Check size={8} style={{ color: t.rLow }} />}
                </button>
                <div style={{ flex: 1 }}><div style={{ fontSize: '.78rem', color: t.text, textDecoration: task.done ? 'line-through' : 'none' }}>{task.text}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.55rem', color: t.muted, marginTop: '.1rem' }}>Due: {task.due}</div></div>
                {task.urgent && !task.done && <span className="b bH" style={{ fontSize: '.52rem' }}>!</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   ADMIN DASHBOARD
══════════════════════════════════════════════════════ */
const AdminDash = ({ page, setPage }) => {
  const [d, setD] = useState(EMPTY_ADMIN);
  const [loading, setLoading] = useState(true);
  const [rt, setRt] = useState('attendance');
  const [modal, setModal] = useState(false);
  const [nu, setNu] = useState({ name: '', email: '', role: 'Student', dept: 'AI & ML', status: 'active' });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('muse_token');
      const response = await fetch(`${API_URL}/dashboard/admin`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) setD(data);
    } catch (err) {
      console.error('Error fetching admin dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const [cfg, setCfg] = useState(d.config);
  const [cfgSaved, setCfgSaved] = useState(false);
  const t = LT;

  const delUser = id => setD(p => ({ ...p, users: p.users.filter(u => u.id !== id) }));
  const addUser = () => {
    if (!nu.name.trim() || !nu.email.trim()) return;
    setD(p => ({ ...p, users: [...p.users, { ...nu, id: Date.now(), last: 'just now' }] }));
    setModal(false); setNu({ name: '', email: '', role: 'Student', dept: 'AI & ML', status: 'active' });
  };
  const feeData = [{ name: 'Collected', value: d.fee.collected, color: t.rLow }, { name: 'Pending', value: d.fee.pending, color: t.rMed }, { name: 'Defaulters', value: d.fee.defaulters, color: t.rHigh }];

  const Card = ({ children, style = {} }) => <div className="card-lt" style={style}>{children}</div>;
  const CHL = ({ title, sub, right }) => (
    <div style={{ padding: '1rem 1.25rem', borderBottom: `1px solid ${t.sep}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '.5rem', flexWrap: 'wrap' }}>
      <div><div style={{ fontWeight: 600, fontSize: '.88rem', color: t.text }}>{title}</div>{sub && <div style={{ fontSize: '.7rem', color: t.muted, marginTop: 1 }}>{sub}</div>}</div>
      {right}
    </div>
  );

  if (loading) return <Loader dk={false} />;

  if (page === 'users') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {modal && (
        <div className="modal-over" onClick={e => { if (e.target === e.currentTarget) setModal(false) }}>
          <div className="modal-lt">
            <div style={{ padding: '1.1rem 1.25rem', borderBottom: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 600, color: t.text }}>Add New User</div>
              <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.muted }}><X size={17} /></button>
            </div>
            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
              {[{ l: 'Full Name', k: 'name', type: 'text' }, { l: 'Email', k: 'email', type: 'email' }].map(f => (
                <div key={f.k}><div className="mlbl" style={{ color: t.muted, marginBottom: '.28rem' }}>{f.l}</div>
                  <input type={f.type} className="inp-lt" value={nu[f.k]} onChange={e => setNu(p => ({ ...p, [f.k]: e.target.value }))} /></div>
              ))}
              {[{ l: 'Role', k: 'role', opts: ['Student', 'Faculty', 'Admin'] }, { l: 'Department', k: 'dept', opts: ['AI & ML', 'AI & DS', 'CS & Design', 'Biomedical', 'CSE'] }, { l: 'Status', k: 'status', opts: ['active', 'inactive'] }].map(f => (
                <div key={f.k}><div className="mlbl" style={{ color: t.muted, marginBottom: '.28rem' }}>{f.l}</div>
                  <select className="inp-lt" value={nu[f.k]} onChange={e => setNu(p => ({ ...p, [f.k]: e.target.value }))}>
                    {f.opts.map(o => <option key={o}>{o}</option>)}</select></div>
              ))}
              <div style={{ display: 'flex', gap: '.75rem', marginTop: '.25rem' }}>
                <button className="btn btn-np" style={{ flex: 1 }} onClick={addUser}><UserPlus size={13} />Add User</button>
                <button className="btn btn-ng" style={{ flex: 1 }} onClick={() => setModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Card>
        <CHL title="User Management" sub={`${d.users.length} users`} right={<button className="btn btn-np" onClick={() => setModal(true)}><Plus size={13} />Add User</button>} />
        <table className="tbl tbl-lt">
          <thead><tr><th>Name</th><th>Role</th><th>Department</th><th>Email</th><th>Status</th><th>Last Active</th><th>Actions</th></tr></thead>
          <tbody>{d.users.map(u => (
            <tr key={u.id}>
              <td><div style={{ display: 'flex', alignItems: 'center', gap: '.48rem' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: `${t.teal}18`, color: t.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.65rem', fontWeight: 700, flexShrink: 0 }}>{u.name.charAt(0)}</div>
                <span style={{ fontWeight: 500 }}>{u.name}</span></div></td>
              <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.63rem' }}>{u.role}</span></td>
              <td style={{ color: t.sub, fontSize: '.78rem' }}>{u.dept}</td>
              <td style={{ color: t.sub, fontSize: '.73rem' }}>{u.email}</td>
              <td><span className={`b ${u.status === 'active' ? 'lAc' : 'lIn'}`}>{u.status}</span></td>
              <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.6rem', color: t.muted }}>{u.last}</span></td>
              <td><div style={{ display: 'flex', gap: '.28rem' }}>
                <button className="btn btn-ng" style={{ padding: '.22rem .42rem' }}><Edit2 size={11} /></button>
                <button className="btn btn-dr" style={{ padding: '.22rem .42rem' }} onClick={() => delUser(u.id)}><Trash2 size={11} /></button>
              </div></td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
    </div>
  );

  if (page === 'courses') return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
      <Card>
        <CHL title="Courses Master" sub="All curriculum courses" right={<button className="btn btn-np" onClick={async () => {
          const code = prompt('Course Code (e.g. CS601):'); if (!code) return;
          const name = prompt('Course Name:'); if (!name) return;
          const dept = prompt('Department (e.g. AI & ML):'); if (!dept) return;
          const sem = parseInt(prompt('Semester (1-8):', '1')); if (isNaN(sem)) return;
          try { await createCourse({ code, name, department: dept, semester: sem }); alert('Created!'); fetchData(); } catch (e) { alert('Failed'); }
        }}><Plus size={12} />Add Course</button>} />
        <table className="tbl tbl-lt">
          <thead><tr><th>Code</th><th>Name</th><th>Dept</th><th>Sem</th></tr></thead>
          <tbody>{d.cors.map(c => <tr key={c.id}>
            <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.6rem', color: t.muted }}>{c.code}</span></td>
            <td><span style={{ fontWeight: 500 }}>{c.name}</span></td>
            <td style={{ color: t.sub, fontSize: '.78rem' }}>{c.department}</td>
            <td>{c.semester}</td>
          </tr>)}</tbody>
        </table>
      </Card>
      <Card>
        <CHL title="Active Sections" sub="Faculty allocations" right={<button className="btn btn-np" onClick={async () => {
          const cs = prompt('Course Code (e.g. CS501):'); if (!cs) return;
          const sc = prompt('Section name (e.g. A):'); if (!sc) return;
          const te = prompt('Teacher Email (optional):');
          const max = parseInt(prompt('Max Students:', '60'));
          try {
            const course = d.cors.find(x => x.code === cs);
            if (!course) return alert('Course not found');
            const teacherId = d.users.find(u => u.email === te)?.id || null;
            await createSection({ courseId: course.id, name: sc, maxStudents: max, teacherId });
            alert('Section created!'); fetchData();
          } catch (e) { alert('Failed to create section'); }
        }}><Plus size={12} />Create Section</button>} />
        <table className="tbl tbl-lt">
          <thead><tr><th>Course</th><th>Section</th><th>Teacher</th><th>Students</th></tr></thead>
          <tbody>{d.secs.map(s => <tr key={s.id}>
            <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.6rem', color: t.muted }}>{s.course?.code}</span></td>
            <td><span style={{ fontWeight: 500 }}>{s.name}</span></td>
            <td style={{ color: t.sub, fontSize: '.78rem' }}>{s.teacher?.profile?.name || 'Unassigned'}</td>
            <td>{s._count?.students || 0}/{s.maxStudents}</td>
          </tr>)}</tbody>
        </table>
      </Card>
    </div>
  );

  if (page === 'config') return (
    <Card style={{ padding: '1.5rem', maxWidth: 520 }} className="fi">
      <div style={{ fontWeight: 600, color: t.text, marginBottom: '1.25rem' }}>System Configuration</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.875rem' }}>
        {[{ l: 'Min. Attendance (%)', k: 'minAtt' }, { l: 'IA Max Marks', k: 'iaMax' }, { l: 'High Risk Threshold', k: 'highT' }, { l: 'Med Risk Threshold', k: 'medT' }, { l: 'Semester Start', k: 'semStart' }, { l: 'Semester End', k: 'semEnd' }, { l: 'Academic Year', k: 'ay' }].map(f => (
          <div key={f.k} style={{ gridColumn: f.k === 'ay' ? 'span 2' : 'auto' }}>
            <div className="mlbl" style={{ color: t.muted, marginBottom: '.28rem' }}>{f.l}</div>
            <input className="inp-lt" value={cfg[f.k]} onChange={e => setCfg(p => ({ ...p, [f.k]: e.target.value }))} />
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1.25rem' }}>
        {cfgSaved ? <div style={{ color: t.rLow, display: 'flex', alignItems: 'center', gap: '.3rem', fontSize: '.8rem' }}><Check size={12} />Configuration saved!</div>
          : <button className="btn btn-np" onClick={async () => {
            try {
              await updateConfig(cfg);
              setD(p => ({ ...p, config: cfg }));
              setCfgSaved(true);
              setTimeout(() => setCfgSaved(false), 3000);
            } catch (e) { alert('Failed to save configuration'); }
          }}><Save size={13} />Save Configuration</button>}
      </div>
    </Card>
  );

  if (page === 'reports') return (
    <Card>
      <CHL title="Reports & Exports" sub="NAAC/NEP-friendly · One-click download" />
      <div style={{ padding: '0 1.25rem', borderBottom: `1px solid ${t.sep}` }}>
        <div className="tabs">
          {['attendance', 'marks', 'risk', 'compliance'].map(tab => (
            <div key={tab} className={`tab tab-lt ${rt === tab ? 'on' : ''}`} onClick={() => setRt(tab)}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</div>
          ))}
        </div>
      </div>
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '.48rem' }}>
        {({
          attendance: ['Monthly attendance — All departments', 'Subject-wise att. < 75%', 'Critical absentee list — Current semester', 'Faculty attendance summary'],
          marks: ['IA-1 & IA-2 consolidated report', 'Toppers list by branch', 'Below-average performance report', 'Grade distribution analysis'],
          risk: ['High-risk list with factors', 'Intervention log — Current semester', 'Risk trend over 3 semesters', 'Teacher AI feedback log'],
          compliance: ['NAAC — Continuous assessment', 'NEP 2020 outcome report', 'AICTE annual return', 'Internal audit checklist'],
        }[rt]).map((rep, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.58rem .875rem', background: t.bg, borderRadius: 7, border: `1px solid ${t.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.48rem' }}><FileText size={13} style={{ color: t.muted }} strokeWidth={1.5} /><span style={{ fontSize: '.8rem', color: t.text }}>{rep}</span></div>
            <div style={{ display: 'flex', gap: '.28rem' }}>
              <button className="btn btn-ng" style={{ padding: '.28rem .6rem', fontSize: '.68rem' }}>CSV</button>
              <button className="btn btn-ng" style={{ padding: '.28rem .6rem', fontSize: '.68rem' }}>PDF</button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  if (page === 'logs') return (
    <Card>
      <CHL title="Decision Logs" sub="AI prediction history · Faculty actions" />
      <table className="tbl tbl-lt">
        <thead><tr><th>Timestamp</th><th>Student</th><th>Predicted Risk</th><th>Faculty</th><th>Action</th><th>Notes</th></tr></thead>
        <tbody>{[
          { ts: 'Dec 26, 09:14', st: 'Aarav Mehta', risk: 'High', fac: 'Dr. Priya Nair', action: 'Accepted', note: 'Counseled on Dec 26' },
          { ts: 'Dec 26, 09:18', st: 'Rohan Patil', risk: 'High', fac: 'Dr. Priya Nair', action: 'Accepted', note: 'Remedial class planned' },
          { ts: 'Dec 25, 11:32', st: 'Riya Desai', risk: 'Medium', fac: 'Dr. Priya Nair', action: 'Flagged', note: 'Student improved recently' },
          { ts: 'Dec 24, 14:05', st: 'Arjun Sharma', risk: 'Medium', fac: 'Prof. R. Kumar', action: 'Pending', note: '' },
        ].map((row, i) => (
          <tr key={i}>
            <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.62rem', color: t.muted }}>{row.ts}</span></td>
            <td style={{ fontWeight: 500 }}>{row.st}</td>
            <td><span className={`b ${row.risk === 'High' ? 'lH' : row.risk === 'Medium' ? 'lM' : 'lL'}`}>{row.risk}</span></td>
            <td style={{ color: t.sub, fontSize: '.78rem' }}>{row.fac}</td>
            <td><span className={`b ${row.action === 'Accepted' ? 'lOk' : row.action === 'Flagged' ? 'lW' : 'lI'}`}>{row.action}</span></td>
            <td style={{ color: t.muted, fontSize: '.73rem' }}>{row.note || '—'}</td>
          </tr>
        ))}</tbody>
      </table>
    </Card>
  );

  // ── HOME ──
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '1.28rem', fontWeight: 700, color: t.text, letterSpacing: '-.02em' }}>Institution Overview</div>
          <div style={{ fontSize: '.78rem', color: t.muted, marginTop: 2 }}>AY 2024–25 · Semester 5 · Just updated</div>
        </div>
        <div style={{ display: 'flex', gap: '.45rem' }}>
          <button className="btn btn-nt" onClick={() => setPage('reports')}><BarChart2 size={13} />Reports</button>
          <button className="btn btn-np" onClick={() => setPage('users')}><Users size={13} />Manage Users</button>
        </div>
      </div>
      <div className="g4">
        {d.kpis?.map((k, i) => <KPI key={k.label} label={k.label} value={k.value} delta={k.delta} up={k.up} icon={k.icon} accent={k.label.includes('Risk') ? t.rHigh : [LT.teal, LT.gold, LT.purple][i % 3]} dk={false} delay={i} />)}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr 1fr', gap: '1.25rem' }}>
        <Card>
          <CHL title="Risk Distribution" sub="All students" />
          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ResponsiveContainer width="100%" height={145}>
              <PieChart><Pie data={d.riskDist} cx="50%" cy="50%" innerRadius={38} outerRadius={64} paddingAngle={3} dataKey="value">
                {d.riskDist.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie><Tooltip formatter={(v, n) => [v, n]} /></PieChart>
            </ResponsiveContainer>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '.3rem', marginTop: '.25rem' }}>
              {d.riskDist.map(r => (
                <div key={r.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.3rem' }}><div style={{ width: 7, height: 7, borderRadius: 2, background: r.color }} /><span style={{ fontSize: '.75rem', color: t.text }}>{r.name}</span></div>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.7rem', fontWeight: 700, color: t.text }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card>
          <CHL title="Risk by Department" sub="Stacked count" />
          <div style={{ padding: '.75rem .25rem .5rem' }}>
            <ResponsiveContainer width="100%" height={196}>
              <BarChart data={d.deptRisk} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F2F4F7" />
                <XAxis dataKey="dept" tick={{ fontSize: 9, fontFamily: "'JetBrains Mono',monospace", fill: t.muted }} axisLine={false} tickLine={false} interval={0} />
                <YAxis tick={{ fontSize: 10, fill: t.muted }} axisLine={false} tickLine={false} />
                <Tooltip content={<CT lt />} /><Legend iconSize={8} wrapperStyle={{ fontSize: '.7rem' }} />
                <Bar dataKey="high" name="High" fill={t.rHigh} stackId="a" />
                <Bar dataKey="med" name="Med" fill={t.rMed} stackId="a" />
                <Bar dataKey="low" name="Low" fill={t.rLow} stackId="a" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <CHL title="Attendance Trend" sub="Institution-wide monthly avg" />
          <div style={{ padding: '.75rem .25rem .5rem' }}>
            <ResponsiveContainer width="100%" height={196}>
              <LineChart data={d.attTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F2F4F7" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", fill: t.muted }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 10, fill: t.muted }} axisLine={false} tickLine={false} />
                <Tooltip content={<CT lt />} />
                <Line type="monotone" dataKey="avg" name="Avg Attendance" stroke={t.teal} strokeWidth={2.5} dot={{ r: 4, fill: t.teal }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Ops + Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.25rem' }}>
        <Card>
          <CHL title="Academic Operations" sub="Semester 5 · AY 2024–25" />
          <div style={{ padding: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
            {[
              { title: 'Admissions', color: t.teal, rows: [['Applications', '347'], ['Admitted', '298'], ['Pending', '12'], ['Rejected', '37']] },
              { title: 'Examinations', color: t.gold, rows: [['IA-2 Status', 'Ongoing'], ['Semester End', 'Mar 2025'], ['Results Pending', '0'], ['Supplementary', '14']] },
              { title: 'Fee Collection', color: t.purple, rows: [['Collected', `${d.fee.collected}%`], ['Pending', `${d.fee.pending}%`], ['Defaulters', `${d.fee.defaulters}`], ['Last Reminder', 'Dec 20']] },
            ].map(({ title, color, rows }) => (
              <div key={title} style={{ padding: '.875rem', background: t.bg, borderRadius: 8, border: `1px solid ${t.border}`, borderTop: `3px solid ${color}` }}>
                <div className="mlbl" style={{ color, marginBottom: '.55rem', fontSize: '.52rem' }}>{title}</div>
                {rows.map(([l, v], i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '.26rem 0', borderBottom: i < rows.length - 1 ? `1px solid ${t.sep}` : 'none' }}>
                    <span style={{ fontSize: '.71rem', color: t.muted }}>{l}</span>
                    <span style={{ fontSize: '.71rem', fontWeight: 600, color: t.text }}>{v}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ padding: '0 1.25rem 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.28rem' }}>
              <span style={{ fontSize: '.7rem', color: t.muted }}>Fee collection summary</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.63rem', color: t.text }}>100 students</span>
            </div>
            <div style={{ height: 7, borderRadius: 3, overflow: 'hidden', display: 'flex', gap: 1 }}>
              {feeData.map(f => <div key={f.name} style={{ width: `${f.value}%`, background: f.color }} />)}
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '.3rem' }}>
              {feeData.map(f => <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: '.28rem' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: f.color }} /><span style={{ fontSize: '.62rem', color: t.muted }}>{f.name}: {f.value}%</span></div>)}
            </div>
          </div>
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Card style={{ flex: 1 }}>
            <CHL title="Recent Activity" sub="System events" />
            <div style={{ padding: '.72rem 1rem', display: 'flex', flexDirection: 'column', gap: '.38rem' }}>
              {d.activity?.map(a => {
                const col = { info: t.teal, warn: t.rMed, ok: t.rLow, alert: t.rHigh }[a.type];
                return (
                  <div key={a.id} className="nstrip" style={{ borderLeftColor: col, background: '#FAFAFA', borderRadius: '0 6px 6px 0' }}>
                    <div style={{ fontSize: '.75rem', color: t.text, lineHeight: 1.4 }}>{a.text}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.55rem', color: t.muted, marginTop: '.16rem' }}>{a.time}</div>
                  </div>
                );
              })}
            </div>
          </Card>
          <Card style={{ padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.6rem' }}>
              <div className="mlbl" style={{ color: t.teal, fontSize: '.54rem' }}>AI Governance</div>
              <Cpu size={12} style={{ color: t.muted }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.32rem' }}>
              {[{ l: 'Model', v: 'v2.1.4' }, { l: 'Trained', v: 'Dec 15' }, { l: 'Predictions', v: '298' }, { l: 'Flags', v: '7' }].map(({ l, v }) => (
                <div key={l} style={{ padding: '.36rem .52rem', background: t.bg, borderRadius: 5, border: `1px solid ${t.border}` }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.48rem', color: t.muted, textTransform: 'uppercase' }}>{l}</div>
                  <div style={{ fontSize: '.82rem', fontWeight: 700, color: t.text, marginTop: '.08rem' }}>{v}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Users table */}
      <Card>
        <CHL title="Recent Users" sub="Latest registrations" right={<div style={{ display: 'flex', gap: '.45rem' }}>
          <button className="btn btn-np" style={{ fontSize: '.72rem' }} onClick={() => setPage('users')}><Plus size={12} />Add User</button>
          <button className="btn btn-ng" style={{ fontSize: '.72rem' }} onClick={() => setPage('users')}>View All</button>
        </div>} />
        <table className="tbl tbl-lt">
          <thead><tr><th>Name</th><th>Role</th><th>Department</th><th>Status</th><th>Last Active</th><th>Actions</th></tr></thead>
          <tbody>{d.users?.slice(0, 4).map(u => (
            <tr key={u.id}>
              <td><div style={{ display: 'flex', alignItems: 'center', gap: '.45rem' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: `${t.teal}18`, color: t.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.65rem', fontWeight: 700, flexShrink: 0 }}>{u.name.charAt(0)}</div>
                <span style={{ fontWeight: 500 }}>{u.name}</span></div></td>
              <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.63rem' }}>{u.role}</span></td>
              <td style={{ color: t.sub, fontSize: '.78rem' }}>{u.dept}</td>
              <td><span className={`b ${u.status === 'active' ? 'lAc' : 'lIn'}`}>{u.status}</span></td>
              <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.6rem', color: t.muted }}>{u.last}</span></td>
              <td><div style={{ display: 'flex', gap: '.28rem' }}>
                <button className="btn btn-ng" style={{ padding: '.2rem .4rem' }}><Edit2 size={11} /></button>
                <button className="btn btn-dr" style={{ padding: '.2rem .4rem' }} onClick={() => delUser(u.id)}><Trash2 size={11} /></button>
              </div></td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════ */
const Dashboard = ({ role = 'student', onLogout }) => {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('muse_user') || '{}');
    } catch {
      return {};
    }
  });

  const dk = role !== 'admin';
  
  const getSub = () => {
    if (role === 'student') return `${user.name || 'Student'} · ${user.specific_id || ''} · ${user.program || 'B.E. Engineering'}`;
    if (role === 'teacher') return `${user.name || 'Faculty'} · ${user.specific_id || ''} · ${user.dept || 'MUSE'}`;
    return `Institution-wide · AY 2024–25`;
  };

  const META = {
    student: { title: 'Student View', sub: getSub() },
    teacher: { title: 'Faculty View', sub: getSub() },
    admin: { title: 'Admin Panel', sub: getSub() },
  };

  // Standalone mode: no socket initialization needed
  useEffect(() => {}, [role]);
  return (
    <>
      <Styles />
      <div className={`dash ${dk ? 'dk-root' : 'lt-root'}`}>
        <Sidebar 
          role={role} 
          page={page} 
          user={user}
          onNav={setPage} 
          dk={dk}
          onLogout={() => { 
            window.localStorage.removeItem('muse_token'); 
            window.localStorage.removeItem('muse_role'); 
            window.localStorage.removeItem('muse_user'); 
            onLogout(); 
          }} 
        />
        <div className="main">
          <Topbar title={META[role].title} sub={META[role].sub} dk={dk} unread={2} />
          <div className="content">
            {role === 'student' && <StudentDash page={page} setPage={setPage} />}
            {role === 'teacher' && <TeacherDash page={page} setPage={setPage} />}
            {role === 'admin' && <AdminDash page={page} setPage={setPage} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;