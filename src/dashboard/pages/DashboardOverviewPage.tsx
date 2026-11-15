import { alerts, overviewStats } from '../mockData'
import { StatCard } from '../components/StatCard'

export function DashboardOverviewPage() {
  return (
    <main className="dashboard-content">
      <section className="dashboard-stats-grid">
        {overviewStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} delta={stat.delta} />
        ))}
      </section>

      <section className="dashboard-panels-grid">
        <article className="dashboard-panel">
          <header>
            <h3>Alerts</h3>
            <button type="button" className="panel-link-button">View all</button>
          </header>
          <div className="alert-list">
            {alerts.map((alert) => (
              <div key={alert.id} className="alert-row">
                <span className={`alert-dot severity-${alert.severity}`} />
                <div>
                  <strong>{alert.title}</strong>
                  <p>{alert.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-panel">
          <header>
            <h3>Family summary</h3>
            <button type="button" className="panel-link-button">Export</button>
          </header>
          <ul className="summary-list">
            <li><span>Device uptime</span><strong>98.4%</strong></li>
            <li><span>Verified locations</span><strong>24 / 28</strong></li>
            <li><span>Screen time today</span><strong>3h 42m</strong></li>
            <li><span>Blocked apps</span><strong>12</strong></li>
          </ul>
        </article>
      </section>
    </main>
  )
}
