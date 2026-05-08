import React, { useState, useEffect, useRef } from 'react';
import {
  GraduationCap, BookOpen, Shield, ArrowLeft,
  Eye, EyeOff, Monitor, AlertCircle, ChevronRight
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────
   ROLE CONFIG
───────────────────────────────────────────────────────────────────────── */
const ROLES = [
  {
    id: 'student',
    label: 'Student',
    icon: GraduationCap,
    tagline: 'Access your academics, results & timetable.',
    idLabel: 'University Roll Number',
    idPlaceholder: '21CS001',
    accent: '#C9972B',
    accentDim: 'rgba(201,151,43,0.08)',
    accentBorder: 'rgba(201,151,43,0.25)',
    badge: 'B.E. Student Portal',
  },
  {
    id: 'teacher',
    label: 'Teacher',
    icon: BookOpen,
    tagline: 'Manage courses, attendance & grade submissions.',
    idLabel: 'Employee ID',
    idPlaceholder: 'MUSE-FAC-042',
    accent: '#00797B',
    accentDim: 'rgba(0,121,123,0.07)',
    accentBorder: 'rgba(0,121,123,0.25)',
    badge: 'Faculty Portal',
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: Shield,
    tagline: 'Institutional management & administrative controls.',
    idLabel: 'Admin Username',
    idPlaceholder: 'admin@muse.ac.in',
    accent: '#1A2744',
    accentDim: 'rgba(26,39,68,0.07)',
    accentBorder: 'rgba(26,39,68,0.20)',
    badge: 'Administration Portal',
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   ANIMATED GRID BACKGROUND
───────────────────────────────────────────────────────────────────────── */
const GridBackground = ({ accent }) => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
    <div 
      className="fixed inset-0" 
      style={{ 
        backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/a/a5/Crawford_Hall%2C_University_of_Mysore.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(1.2) contrast(1.05)',
      }} 
    />
    
    {/* Minimal Overlay for depth */}
    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(245,244,240,0.4) 0%, rgba(245,244,240,0.2) 100%)' }} />
    
    {/* Accent glows */}
    <div className="absolute" style={{
      top: '-160px', left: '-160px',
      width: '600px', height: '600px',
      borderRadius: '50%',
      background: `radial-gradient(circle, ${accent}15 0%, transparent 65%)`,
      transition: 'background 0.6s ease',
    }} />
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────
   ROLE TAB
───────────────────────────────────────────────────────────────────────── */
const RoleTab = ({ role, active, onClick }) => {
  const Icon = role.icon;
  return (
    <button
      onClick={() => onClick(role.id)}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.45rem',
        padding: '0.875rem 0.5rem',
        background: active ? 'rgba(255, 255, 255, 0.4)' : 'transparent',
        border: 'none',
        borderBottom: active ? `2px solid ${role.accent}` : '2px solid transparent',
        cursor: 'pointer',
        transition: 'all 0.22s ease',
        borderRadius: '8px',
        boxShadow: active ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
      }}
    >
      <Icon
        size={18}
        strokeWidth={1.5}
        style={{ color: active ? role.accent : '#9CA3AF', transition: 'color 0.22s' }}
      />
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.72rem',
        fontWeight: active ? 600 : 400,
        letterSpacing: '0.02em',
        color: active ? '#1A2744' : '#9CA3AF',
        transition: 'all 0.22s',
      }}>
        {role.label}
      </span>
    </button>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   FLOAT LABEL INPUT
───────────────────────────────────────────────────────────────────────── */
const FloatInput = ({ label, type = 'text', value, onChange, placeholder, accent, required, autoComplete }) => {
  const [focused, setFocused] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const isActive = focused || value.length > 0;
  const isPassword = type === 'password';

  return (
    <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
      <input
        type={isPassword ? (showPw ? 'text' : 'password') : type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        required={required}
        autoComplete={autoComplete}
        style={{
          width: '100%',
          padding: isActive ? '1.5rem 1rem 0.5rem' : '1rem',
          paddingRight: isPassword ? '3rem' : '1rem',
          background: 'rgba(255, 255, 255, 0.2)',
          border: `1px solid ${focused ? accent : '#E0DDD8'}`,
          outline: 'none',
          fontSize: '0.875rem',
          fontFamily: "'DM Sans', sans-serif",
          color: '#1A2744',
          transition: 'border-color 0.18s, box-shadow 0.18s',
          boxShadow: focused ? `0 0 0 3px ${accent}14` : 'none',
          boxSizing: 'border-box',
        }}
      />
      <label style={{
        position: 'absolute',
        left: '1rem',
        top: isActive ? '0.45rem' : '50%',
        transform: isActive ? 'none' : 'translateY(-50%)',
        fontSize: isActive ? '0.58rem' : '0.82rem',
        fontFamily: "'IBM Plex Mono', monospace",
        textTransform: 'uppercase',
        letterSpacing: isActive ? '0.12em' : '0.04em',
        color: isActive ? accent : '#9CA3AF',
        pointerEvents: 'none',
        transition: 'all 0.18s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {label}
      </label>
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPw(p => !p)}
          tabIndex={-1}
          style={{
            position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF',
            padding: 0, display: 'flex', alignItems: 'center',
          }}
        >
          {showPw ? <EyeOff size={15} strokeWidth={1.5} /> : <Eye size={15} strokeWidth={1.5} />}
        </button>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   MAIN LOGIN PAGE
───────────────────────────────────────────────────────────────────────── */
const LoginPage = ({ initialRole = 'student', onBack, onLoginSuccess }) => {
  const [activeRole, setActiveRole] = useState(initialRole);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);

  const role = ROLES.find(r => r.id === activeRole);

  // Reset form on role switch
  useEffect(() => {
    setUserId('');
    setPassword('');
    setError('');
    setSuccess(false);
  }, [activeRole]);

  // Animate form in on mount / role switch
  useEffect(() => {
    if (!formRef.current) return;
    formRef.current.style.opacity = '0';
    formRef.current.style.transform = 'translateY(10px)';
    const t = setTimeout(() => {
      if (!formRef.current) return;
      formRef.current.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      formRef.current.style.opacity = '1';
      formRef.current.style.transform = 'translateY(0)';
    }, 20);
    return () => clearTimeout(t);
  }, [activeRole]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!userId.trim() || !password.trim()) { setError('All fields are required.'); return; }
    setLoading(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password, role: activeRole }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('muse_token', data.token);
      localStorage.setItem('muse_role', data.user.role);
      localStorage.setItem('muse_user', JSON.stringify(data.user));
      
      setLoading(false);
      setSuccess(true);
      setTimeout(() => onLoginSuccess?.(activeRole), 1200);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <GridBackground accent={role.accent} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .login-card { animation: cardIn 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes cardIn { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }

        .submit-btn {
          width: 100%; padding: 0.95rem 1.5rem;
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          border: none; cursor: pointer;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: #fff;
          position: relative; overflow: hidden;
          transition: opacity 0.2s;
        }
        .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .submit-btn .btn-fill {
          position: absolute; inset: 0;
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.77,0,0.175,1);
        }
        .submit-btn:not(:disabled):hover .btn-fill { transform: translateX(0); }
        .submit-btn span { position: relative; z-index: 1; }

        .back-btn {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'IBM Plex Mono', monospace; font-size: 0.62rem;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #6B7280; background: none; border: none; cursor: pointer;
          padding: 0; transition: color 0.18s;
        }
        .back-btn:hover { color: #1A2744; }

        .role-tabs { display: flex; gap: 4px; background: rgba(255,255,255,0.3); padding: 4px; border-radius: 12px; }

        .spinner {
          width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .success-check { animation: popIn 0.45s cubic-bezier(0.34,1.56,0.64,1) both; }
        @keyframes popIn { from{opacity:0;transform:scale(0.5)} to{opacity:1;transform:scale(1)} }

        .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.1); }

        @media (max-width: 480px) {
          .login-container { margin: 1rem !important; }
        }
      `}</style>

      {/* ── Top bar ─────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        padding: '1.25rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'transparent',
      }}>
        <a href="#home" onClick={(e) => { e.preventDefault(); onBack(); }} className="back-btn">
          <ArrowLeft size={13} strokeWidth={1.5} />
          <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Back to MUSE</span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '32px', height: '32px', background: '#1A2744',
            display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3px',
          }}>
            <Monitor size={14} strokeWidth={1.5} style={{ color: '#fff' }} />
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', fontWeight: 600, color: '#1A2744', lineHeight: 1 }}>MUSE</div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9CA3AF', marginTop: '2px' }}>School of Engineering</div>
          </div>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div style={{
        flex: 1, position: 'relative', zIndex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem 1rem',
      }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '460px',
          background: 'transparent',
          padding: '2.5rem 2rem',
        }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              border: `1px solid rgba(255, 255, 255, 0.3)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1rem',
              transition: 'all 0.35s ease',
            }}>
              {React.createElement(role.icon, { size: 22, strokeWidth: 1.5, style: { color: role.accent, transition: 'color 0.35s' } })}
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.4rem',
              fontWeight: 600, color: '#1A2744',
              lineHeight: 1.15, marginBottom: '0.4rem',
              textShadow: '0 1px 2px rgba(255,255,255,0.8)',
            }}>
              Welcome back.
            </h1>
            <p style={{
              fontSize: '0.88rem', color: '#374151',
              lineHeight: 1.6, maxWidth: '320px', margin: '0 auto',
              textShadow: '0 1px 1px rgba(255,255,255,0.5)',
            }}>
              {role.tagline}
            </p>
          </div>

          {/* Card */}
          <div className="login-card" style={{
            background: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(12px)',
            border: '1px solid #E0DDD8',
            boxShadow: '0 8px 32px rgba(26,39,68,0.12)',
            overflow: 'hidden',
          }}>

            {/* Role tabs */}
            <div className="role-tabs" style={{ marginBottom: '1.5rem' }}>
              {ROLES.map(r => (
                <RoleTab key={r.id} role={r} active={activeRole === r.id} onClick={setActiveRole} />
              ))}
            </div>

            {/* Badge strip */}
            <div style={{
              padding: '0.6rem 1.75rem',
              background: 'rgba(255,255,255,0.15)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              transition: 'background 0.35s, border-color 0.35s',
            }}>
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.58rem', textTransform: 'uppercase',
                letterSpacing: '0.14em', color: role.accent,
                transition: 'color 0.35s',
              }}>
                // {role.badge}
              </span>
            </div>

            {/* Form body */}
            <div className="login-card-inner" style={{ padding: '2rem 1.75rem 2rem' }}>
              {success ? (
                /* ── Success state ── */
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <div className="success-check" style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: role.accentDim,
                    border: `1px solid ${role.accentBorder}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                  }}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M4 11l5 5 9-9" stroke={role.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#1A2744', marginBottom: '0.5rem' }}>
                    Login Successful
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: '#9CA3AF' }}>
                    Redirecting you to the {role.label.toLowerCase()} dashboard…
                  </p>
                  <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '0.4rem' }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        background: role.accent, opacity: 0.25,
                        animation: `pulse 1.2s ${i * 0.2}s ease-in-out infinite`,
                      }} />
                    ))}
                  </div>
                  <style>{`@keyframes pulse{0%,100%{opacity:0.2}50%{opacity:1}}`}</style>
                </div>
              ) : (
                /* ── Login form ── */
                <form ref={formRef} onSubmit={handleSubmit} noValidate>

                  <FloatInput
                    label={role.idLabel}
                    type="text"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    placeholder=" "
                    accent={role.accent}
                    required
                    autoComplete="username"
                  />

                  <FloatInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder=" "
                    accent={role.accent}
                    required
                    autoComplete="current-password"
                  />

                  {/* Error */}
                  {error && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.65rem 0.875rem',
                      background: '#FEF2F2', border: '1px solid #FECACA',
                      marginBottom: '1.25rem',
                    }}>
                      <AlertCircle size={13} strokeWidth={1.5} style={{ color: '#EF4444', flexShrink: 0 }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: '#B91C1C' }}>{error}</span>
                    </div>
                  )}

                  {/* Forgot password */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem', marginTop: error ? 0 : '-0.5rem' }}>
                    <a href="#" style={{
                      fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem',
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                      color: role.accent, textDecoration: 'none',
                      transition: 'opacity 0.15s',
                    }}
                      onMouseEnter={e => e.target.style.opacity = '0.65'}
                      onMouseLeave={e => e.target.style.opacity = '1'}
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="submit-btn"
                    style={{ background: role.accent }}
                  >
                    <div className="btn-fill" style={{ background: 'rgba(0,0,0,0.15)' }} />
                    {loading ? (
                      <><div className="spinner" /><span>Verifying…</span></>
                    ) : (
                      <><span>Sign in as {role.label}</span><ChevronRight size={13} strokeWidth={2} style={{ position: 'relative', zIndex: 1 }} /></>
                    )}
                  </button>

                  {/* Divider */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.5rem 0' }}>
                    <div className="divider-line" />
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C4C4C4', whiteSpace: 'nowrap' }}>or continue with</span>
                    <div className="divider-line" />
                  </div>

                  {/* SSO button */}
                  <button
                    type="button"
                    style={{
                      width: '100%', padding: '0.8rem',
                      background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                      cursor: 'pointer', transition: 'border-color 0.18s, background 0.18s',
                      fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem',
                      fontWeight: 500, color: '#1A2744',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = role.accent; e.currentTarget.style.background = 'rgba(255,255,255,0.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'; }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Sign in with Google (SSO)
                  </button>
                </form>
              )}
            </div>

            {/* Footer strip */}
            {!success && (
              <div style={{
                padding: '0.875rem 1.75rem',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                background: 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ 
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', 
                  textTransform: 'uppercase', letterSpacing: '0.1em', color: '#4B5563',
                  textShadow: '0 1px 1px rgba(255,255,255,0.4)'
                }}>
                  Secure login · University of Mysore · MUSE
                </span>
              </div>
            )}
          </div>

          {/* Help text */}
          {!success && (
            <p style={{
              textAlign: 'center', marginTop: '1.25rem',
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: '#374151',
              textShadow: '0 1px 1px rgba(255,255,255,0.4)'
            }}>
              Need access?{' '}
              <a href="#contact" onClick={onBack} style={{ color: '#856404', textDecoration: 'none', fontWeight: 600 }}>
                Contact the administrator →
              </a>
            </p>
          )}
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 1,
        padding: '1rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '0.5rem',
        background: 'transparent',
      }}>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C4C4C4' }}>
          © {new Date().getFullYear()} Mysore University School of Engineering
        </span>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C4C4C4' }}>
          AICTE Approved · Affiliated to UoM
        </span>
      </div>
    </div>
  );
};

export default LoginPage;