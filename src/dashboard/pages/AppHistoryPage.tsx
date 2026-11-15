import { devices } from '../mockData'
import { useState } from 'react'

export function AppHistoryPage() {
  const [selectedDeviceId, setSelectedDeviceId] = useState(devices[0].id)
  const selectedDevice = devices.find((d) => d.id === selectedDeviceId)

  const appHistory = [
    { app: 'Instagram', duration: '45 min', timeStart: '14:30', timeEnd: '15:15', category: 'Social' },
    { app: 'YouTube', duration: '28 min', timeStart: '13:15', timeEnd: '13:43', category: 'Video' },
    { app: 'Safari', duration: '12 min', timeStart: '12:45', timeEnd: '12:57', category: 'Browser' },
    { app: 'Messages', duration: '18 min', timeStart: '11:20', timeEnd: '11:38', category: 'Chat' },
    { app: 'Camera', duration: '8 min', timeStart: '10:15', timeEnd: '10:23', category: 'Media' },
    { app: 'Spotify', duration: '92 min', timeStart: '08:30', timeEnd: '10:02', category: 'Music' },
  ]

  return (
    <main className="dashboard-content">
      <section className="dashboard-device-selector">
        <div className="device-picker-row">
          <label>Select device:</label>
          <select value={selectedDeviceId} onChange={(e) => setSelectedDeviceId(e.target.value)} className="device-select">
            {devices.map((device) => (
              <option key={device.id} value={device.id}>
                {device.name} ({device.owner})
              </option>
            ))}
          </select>
        </div>

        {selectedDevice && (
          <article className="device-info-card">
            <div className="device-card-header">
              <div>
                <strong>{selectedDevice.name}</strong>
                <small>{selectedDevice.id}</small>
              </div>
              <span className={`status-pill status-${selectedDevice.status}`}>{selectedDevice.status}</span>
            </div>
            <div className="device-card-stats">
              <div><span>Battery</span><strong>{selectedDevice.battery}%</strong></div>
              <div><span>Last sync</span><strong>{selectedDevice.lastSync}</strong></div>
              <div><span>Location</span><strong>{selectedDevice.location}</strong></div>
            </div>
          </article>
        )}
      </section>

      <section className="dashboard-panel full-width-panel">
        <header>
          <h3>App usage history</h3>
          <button type="button" className="panel-link-button">Today</button>
        </header>

        <div className="app-history-list">
          {appHistory.map((item) => (
            <div key={`${item.app}-${item.timeStart}`} className="app-history-row">
              <div className="app-history-left">
                <strong>{item.app}</strong>
                <small>{item.timeStart} - {item.timeEnd}</small>
              </div>
              <div className="app-history-middle">
                <span className="category-badge">{item.category}</span>
              </div>
              <div className="app-history-right">
                <strong>{item.duration}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
