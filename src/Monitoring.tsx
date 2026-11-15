import { Bell, Check, Cloud, Database, FileText, Lock, MapPin, ShieldCheck, Smartphone } from 'lucide-react'
import { useState } from 'react'
import { profile } from './data/profile'

const googleButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  width: '100%',
  minHeight: 48,
  borderRadius: 12,
  border: '1px solid rgba(154, 181, 216, 0.2)',
  background: '#fff',
  color: '#111827',
  fontWeight: 700,
  cursor: 'pointer',
  padding: '10px 16px',
} as const

const features = [
  { title: 'Device visibility', summary: 'Transparent, disclosed monitoring for managed devices and family supervision.', icon: Smartphone, accent: 'cyan', items: ['Visible app icon and naming', 'On-device consent and disclosure', 'Background sync with offline queueing'] },
  { title: 'Security architecture', summary: 'Separate dashboard and device flows with secure token handling.', icon: ShieldCheck, accent: 'violet', items: ['Dashboard login separate from device auth', 'JWT and refresh tokens', 'Argon2id/bcrypt password hashing'] },
  { title: 'Monitoring data', summary: 'Location, app activity, call metadata, SMS metadata and alerting.', icon: Database, accent: 'green', items: ['Location history and geofence alerts', 'Call and SMS metadata collection', 'App usage and battery-aware sync'] },
  { title: 'Compliance controls', summary: 'Retention, auditability and legal disclosure built as first-class features.', icon: Lock, accent: 'pink', items: ['Retention policy and deletion tools', 'Audit log of access and exports', 'Required consent and privacy disclosures'] },
]

const checks = [
  'Location, call metadata, SMS metadata, app usage and media handling',
  'Separate dashboard login flow and device API authentication',
  'TLS-only transport and request validation on ingestion endpoints',
  'Encrypted storage, controlled retention and backup strategy',
  'Android foreground service and transparent permission flow',
]

export default function Monitoring() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const params = new URLSearchParams(window.location.search)
  const isPrivateAccess = params.get('access') === 'private'

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault()

    if (email === 'admin@monitoring.local' && password === 'private123') {
      setIsLoggedIn(true)
      setError('')
      return
    }

    setError('Invalid credentials. Use admin@monitoring.local / private123')
  }

  const handleGoogleLogin = () => {
    // Demo-only Google auth placeholder for a portfolio/prototype flow.
    // Replace this with a real Google OAuth flow in a production app.
    setEmail('admin@monitoring.local')
    setPassword('private123')
    setIsLoggedIn(true)
    setError('')
  }

  if (!isPrivateAccess) {
    return (
      <div className="app-shell services-page">
        <header className="nav-wrap">
          <nav className="nav container" aria-label="Monitoring navigation">
            <a className="brand" href="./index.html" aria-label="Back to portfolio">
              <img className="brand-mark" src={profile.photo} alt="" />
              <span>{profile.name}</span>
            </a>
          </nav>
        </header>

        <main className="section">
          <div className="container monitoring-detail-panel" style={{ maxWidth: 720, margin: '80px auto 0' }}>
            <span className="section-label">Access required</span>
            <h2 style={{ marginTop: 14 }}>This page is private.</h2>
            <p style={{ color: '#afc2d9', lineHeight: 1.7 }}>
              Use the direct URL with the private access flag to continue.
            </p>
            <div className="hero-actions" style={{ marginTop: 20 }}>
              <a className="button" href="./monitoring.html?access=private">Open private route</a>
              <a className="button button-ghost" href="./index.html">Back to portfolio</a>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="app-shell services-page">
        <header className="nav-wrap">
          <nav className="nav container" aria-label="Monitoring navigation">
            <a className="brand" href="./index.html" aria-label="Back to portfolio">
              <img className="brand-mark" src={profile.photo} alt="" />
              <span>{profile.name}</span>
            </a>
          </nav>
        </header>

        <main className="section">
          <div className="container" style={{ maxWidth: 520 }}>
            <div className="monitoring-login-panel" style={{ marginTop: 60 }}>
              <div className="login-panel-header">
                <div className="login-badge">Private access</div>
                <span>Login required</span>
              </div>
              <h3>Sign in to monitoring service</h3>

              <button type="button" style={googleButtonStyle} onClick={handleGoogleLogin}>
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.3-1.7 3.9-5.4 3.9-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.9 1.5l2.7-2.6C16.6 3.5 14.5 2.5 12 2.5 6.9 2.5 2.8 6.6 2.8 11.7S6.9 20.9 12 20.9c6.2 0 10.3-4.3 10.3-10.4 0-.7-.1-1.2-.2-1.8H12z" />
                  <path fill="#34A853" d="M3.9 7.2l3.5 2.6c.9-1.8 3.1-3.1 4.6-3.1 1.9 0 3.1.8 3.9 1.5l2.7-2.6C16.6 3.5 14.5 2.5 12 2.5c-3.7 0-6.9 2.2-8.1 5.3z" />
                  <path fill="#FBBC05" d="M3.9 16.3c1.2 3.1 4.4 5.4 8.1 5.4 2.5 0 4.6-.9 6.1-2.5l-3-2.5c-.8.6-1.9 1-3.1 1-2.5 0-4.6-1.7-5.3-3.9l-3.8 3z" />
                  <path fill="#4285F4" d="M12 21.7c2.5 0 4.6-.9 6.1-2.5l-3-2.5c-.8.6-1.9 1-3.1 1-2.5 0-4.6-1.7-5.3-3.9l-3.8 2.9C2.8 18.9 6.8 21.7 12 21.7z" />
                </svg>
                Continue with Google
              </button>

              <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ display: 'block', flex: 1, height: 1, background: 'rgba(154,181,216,0.2)' }} />
                  <span style={{ color: '#9db0c8', fontSize: 12 }}>or</span>
                  <span style={{ display: 'block', flex: 1, height: 1, background: 'rgba(154,181,216,0.2)' }} />
                </div>

                <form className="monitoring-login-form" onSubmit={handleLogin}>
                  <label>
                    Email
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@monitoring.local" />
                  </label>
                  <label>
                    Password
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="private123" />
                  </label>
                  {error && <p style={{ color: '#ff9bb5', margin: 0 }}>{error}</p>}
                  <button type="submit" className="button">Login</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="app-shell services-page">
      <header className="nav-wrap">
        <nav className="nav container" aria-label="Monitoring navigation">
          <a className="brand" href="./index.html" aria-label="Back to portfolio">
            <img className="brand-mark" src={profile.photo} alt="" />
            <span>{profile.name}</span>
          </a>
          <div className="desktop-nav services-nav">
            <a href="./index.html">Portfolio</a>
            <a href="./services.html">Services</a>
            <a className="button button-small" href={`mailto:${profile.email}`}>Contact</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="section monitoring-private-hero">
          <div className="container monitoring-shell">
            <div className="monitoring-intro">
              <span className="section-label">Private product page</span>
              <h1>Device Monitoring &amp; Parental-Control Service</h1>
              <p>
                This is a standalone internal/demo page intended for a direct URL only. It is intentionally
                not linked from the public portfolio or service pages.
              </p>
              <div className="hero-actions">
                <a className="button" href={`mailto:${profile.email}`}>Request access</a>
                <a className="button button-ghost" href="./index.html">Back to portfolio</a>
              </div>
              <ul className="monitoring-badges" aria-label="Key product areas">
                <li><MapPin size={15} /> Location</li>
                <li><Bell size={15} /> Alerts</li>
                <li><FileText size={15} /> Reports</li>
                <li><Cloud size={15} /> Secure sync</li>
              </ul>
            </div>

            <div className="monitoring-login-panel" aria-label="Product overview panel">
              <div className="login-panel-header">
                <div className="login-badge">Hidden route</div>
                <span>Direct URL only</span>
              </div>
              <h3>Private product concept</h3>
              <p>Designed for consent-based supervision, secure data handling and managed device oversight.</p>
              <ul className="detail-list compact">
                <li><strong>Publicly hidden</strong><span>No navigation link from the portfolio or service pages.</span></li>
                <li><strong>Direct access</strong><span>Open by URL only for demos or internal review.</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container monitoring-feature-grid">
            {features.map(({ title, summary, icon: Icon, accent, items }) => (
              <article className={`monitoring-feature ${accent}`} key={title}>
                <div className="feature-icon"><Icon size={20} /></div>
                <h3>{title}</h3>
                <p>{summary}</p>
                <ul>
                  {items.map((item) => <li key={item}><Check size={15} /> {item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="container monitoring-detail-grid">
            <div className="monitoring-detail-panel">
              <span className="section-label">Functional scope</span>
              <h3>Core product requirements</h3>
              <ul className="detail-list">
                {checks.map((item) => <li key={item}><Check size={15} /> {item}</li>)}
              </ul>
            </div>

            <div className="monitoring-detail-panel">
              <span className="section-label">Architecture</span>
              <h3>Secure and scalable</h3>
              <ul className="detail-list compact">
                <li><strong>Backend</strong><span>Express/FastAPI or Supabase-managed PostgreSQL, auth, ingestion APIs and audit events.</span></li>
                <li><strong>Client</strong><span>Android native app with clear onboarding, permissions and offline queueing.</span></li>
                <li><strong>Dashboard</strong><span>Private authenticated web app for history, exports, alerts and device management.</span></li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
