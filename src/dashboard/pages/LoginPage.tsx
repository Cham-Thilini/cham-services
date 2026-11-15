import type { FormEvent } from 'react'

type LoginPageProps = {
  email: string
  password: string
  error: string
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onLogin: (event: FormEvent<HTMLFormElement>) => void
  onGoogleLogin: () => void
}

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

export function LoginPage({
  email,
  password,
  error,
  onEmailChange,
  onPasswordChange,
  onLogin,
  onGoogleLogin,
}: LoginPageProps) {
  return (
    <div className="app-shell services-page">
      <main className="section">
        <div className="container" style={{ maxWidth: 520 }}>
          <div className="monitoring-login-panel" style={{ marginTop: 60 }}>
            <div className="login-panel-header">
              <div className="login-badge">Private access</div>
              <span>Login required</span>
            </div>

            <h3>Sign in to monitoring service</h3>

            <button type="button" style={googleButtonStyle} onClick={onGoogleLogin}>
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

              <form className="monitoring-login-form" onSubmit={onLogin}>
                <label>
                  Email
                  <input type="email" value={email} onChange={(event) => onEmailChange(event.target.value)} placeholder="admin@monitoring.local" />
                </label>
                <label>
                  Password
                  <input type="password" value={password} onChange={(event) => onPasswordChange(event.target.value)} placeholder="private123" />
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
