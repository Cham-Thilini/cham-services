import { locationTrail } from '../mockData'

export function LocationPage() {
  return (
    <main className="dashboard-content">
      <section className="dashboard-panels-grid">
        <article className="dashboard-panel">
          <header>
            <h3>Recent locations</h3>
            <button type="button" className="panel-link-button">Map view</button>
          </header>

          <div className="trail-list">
            {locationTrail.map((point) => (
              <div key={`${point.label}-${point.time}`} className="trail-item">
                <span className="trail-dot" />
                <div>
                  <strong>{point.label}</strong>
                  <small>{point.time}</small>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-panel">
          <header>
            <h3>Last known location</h3>
          </header>
          <div className="map-card">
            <div className="map-grid" />
            <div className="map-pin">
              <strong>Home</strong>
              <small>51.5074, -0.1278</small>
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}
