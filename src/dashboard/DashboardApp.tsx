import { useState, type FormEvent } from 'react'
import { Sidebar } from './components/Sidebar'
import { DashboardOverviewPage } from './pages/DashboardOverviewPage'
import { DevicesPage } from './pages/DevicesPage'
import { LocationPage } from './pages/LocationPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { UsagePage } from './pages/UsagePage'
import { AppHistoryPage } from './pages/AppHistoryPage'
import { PhotosPage } from './pages/PhotosPage'
import { LoginPage } from './pages/LoginPage'
import { loginCredentials } from './mockData'

export type DashboardView = 'overview' | 'devices' | 'location' | 'usage' | 'privacy' | 'appHistory' | 'photos'

export function DashboardApp() {
  const params = new URLSearchParams(window.location.search)
  const hasPrivateAccess = params.get('access') === 'private'
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeView, setActiveView] = useState<DashboardView>('overview')
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (email === loginCredentials.email && password === loginCredentials.password) {
      setIsAuthenticated(true)
      setError('')
      return
    }

    setError('Incorrect email or password.')
  }

  const handleGoogleLogin = () => {
    setEmail(loginCredentials.email)
    setPassword(loginCredentials.password)
    setIsAuthenticated(true)
    setError('')
  }

  if (!hasPrivateAccess) {
    return (
      <div className="app-shell services-page">
        <main className="section">
          <div className="container monitoring-detail-panel" style={{ maxWidth: 720, margin: '80px auto 0' }}>
            <span className="section-label">Access required</span>
            <h2 style={{ marginTop: 14 }}>Private dashboard</h2>
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

  if (!isAuthenticated) {
    return (
      <LoginPage
        email={email}
        password={password}
        error={error}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onLogin={handleLogin}
        onGoogleLogin={handleGoogleLogin}
      />
    )
  }

  const renderView = () => {
    switch (activeView) {
      case 'devices':
        return <DevicesPage />
      case 'location':
        return <LocationPage />
      case 'usage':
        return <UsagePage />
      case 'appHistory':
        return <AppHistoryPage />
      case 'photos':
        return <PhotosPage />
      case 'privacy':
        return <PrivacyPage />
      default:
        return <DashboardOverviewPage />
    }
  }

  return (
    <div className="dashboard-shell">
      <Sidebar activeView={activeView} onSelect={setActiveView} />

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <span className="section-label">Monitoring dashboard</span>
            <h1>Family supervision overview</h1>
          </div>
          <button type="button" className="button button-ghost" onClick={() => setIsAuthenticated(false)}>
            Log out
          </button>
        </header>

        {renderView()}
      </div>
    </div>
  )
}
