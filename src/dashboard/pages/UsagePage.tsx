import { appUsage } from '../mockData'

export function UsagePage() {
  return (
    <main className="dashboard-content">
      <section className="dashboard-panel full-width-panel">
        <header>
          <h3>App usage</h3>
          <button type="button" className="panel-link-button">This week</button>
        </header>

        <div className="usage-list">
          {appUsage.map((item) => (
            <div key={item.app} className="usage-row">
              <div className="usage-label-row">
                <span>{item.app}</span>
                <strong>{item.minutes} min</strong>
              </div>
              <div className="usage-bar-track">
                <span style={{ width: `${item.share}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
