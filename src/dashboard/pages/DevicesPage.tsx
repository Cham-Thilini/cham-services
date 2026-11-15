import { devices } from '../mockData'

export function DevicesPage() {
  return (
    <main className="dashboard-content">
      <section className="dashboard-panel full-width-panel">
        <header>
          <h3>Devices</h3>
          <button type="button" className="panel-link-button">Refresh</button>
        </header>

        <div className="device-table">
          <div className="device-table-header">
            <span>Device</span>
            <span>Owner</span>
            <span>Status</span>
            <span>Battery</span>
            <span>Last sync</span>
          </div>

          {devices.map((device) => (
            <div key={device.id} className="device-row">
              <div className="device-name-block">
                <strong>{device.name}</strong>
                <small>{device.id}</small>
              </div>
              <span>{device.owner}</span>
              <span className={`status-pill status-${device.status}`}>{device.status}</span>
              <span>{device.battery}%</span>
              <span>{device.lastSync}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
