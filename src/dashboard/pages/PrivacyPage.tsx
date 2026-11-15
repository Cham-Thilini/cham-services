export function PrivacyPage() {
  return (
    <main className="dashboard-content">
      <section className="dashboard-panels-grid">
        <article className="dashboard-panel">
          <header>
            <h3>Privacy controls</h3>
            <button type="button" className="panel-link-button">Update</button>
          </header>

          <ul className="summary-list">
            <li><span>Location sharing</span><strong>Enabled</strong></li>
            <li><span>App monitoring</span><strong>Limited</strong></li>
            <li><span>Content filters</span><strong>On</strong></li>
            <li><span>Alerts</span><strong>5 active</strong></li>
          </ul>
        </article>

        <article className="dashboard-panel">
          <header>
            <h3>Recent privacy notes</h3>
          </header>
          <div className="alert-list">
            <div className="alert-row">
              <span className="alert-dot severity-low" />
              <div>
                <strong>School geofence updated</strong>
                <p>Boundary radius increased to 150m for safer arrivals.</p>
              </div>
            </div>
            <div className="alert-row">
              <span className="alert-dot severity-medium" />
              <div>
                <strong>Screen time rules synced</strong>
                <p>Evening limits were pushed to all devices.</p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}
