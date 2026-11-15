import { devices } from '../mockData'
import { useState } from 'react'

type Photo = {
  id: string
  deviceId: string
  timestamp: string
  size: string
  width: number
  height: number
  location: string
  deviceName: string
}

const mockPhotos: Photo[] = [
  { id: 'PH-001', deviceId: 'DEV-2041', timestamp: '2025-08-30 14:32', size: '2.4 MB', width: 1920, height: 1440, location: 'Home', deviceName: 'Ava iPhone 14' },
  { id: 'PH-002', deviceId: 'DEV-2041', timestamp: '2025-08-30 13:15', size: '1.8 MB', width: 1920, height: 1440, location: 'Park', deviceName: 'Ava iPhone 14' },
  { id: 'PH-003', deviceId: 'DEV-2018', timestamp: '2025-08-30 12:45', size: '3.2 MB', width: 2160, height: 1620, location: 'School', deviceName: 'Noah Pixel 8' },
  { id: 'PH-004', deviceId: 'DEV-1995', timestamp: '2025-08-30 11:20', size: '4.1 MB', width: 2732, height: 2048, location: 'Library', deviceName: 'Mila iPad Air' },
  { id: 'PH-005', deviceId: 'DEV-2041', timestamp: '2025-08-29 16:50', size: '2.1 MB', width: 1920, height: 1440, location: 'Home', deviceName: 'Ava iPhone 14' },
  { id: 'PH-006', deviceId: 'DEV-2018', timestamp: '2025-08-29 14:30', size: '2.8 MB', width: 2160, height: 1620, location: 'Park', deviceName: 'Noah Pixel 8' },
  { id: 'PH-007', deviceId: 'DEV-1995', timestamp: '2025-08-29 10:15', size: '3.5 MB', width: 2732, height: 2048, location: 'School', deviceName: 'Mila iPad Air' },
  { id: 'PH-008', deviceId: 'DEV-2041', timestamp: '2025-08-28 15:25', size: '1.9 MB', width: 1920, height: 1440, location: 'Park', deviceName: 'Ava iPhone 14' },
]

export function PhotosPage() {
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | 'all'>('all')
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const filteredPhotos = selectedDeviceId === 'all' ? mockPhotos : mockPhotos.filter((p) => p.deviceId === selectedDeviceId)

  return (
    <main className="dashboard-content">
      <section className="dashboard-device-selector">
        <div className="device-picker-row">
          <label>Filter by device:</label>
          <select
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            className="device-select"
          >
            <option value="all">All devices</option>
            {devices.map((device) => (
              <option key={device.id} value={device.id}>
                {device.name}
              </option>
            ))}
          </select>
        </div>

        <div className="photos-info-row">
          <span>Total photos: <strong>{filteredPhotos.length}</strong></span>
          <span>Total size: <strong>{(filteredPhotos.reduce((sum, p) => sum + parseFloat(p.size), 0)).toFixed(1)} MB</strong></span>
        </div>
      </section>

      <section className="dashboard-panel full-width-panel">
        <header>
          <h3>Photos library</h3>
          <button type="button" className="panel-link-button">Download all</button>
        </header>

        <div className="photos-grid">
          {filteredPhotos.map((photo) => {
            const device = devices.find((d) => d.id === photo.deviceId)
            const aspectRatio = photo.width / photo.height
            return (
              <button
                key={photo.id}
                type="button"
                className="photo-card"
                onClick={() => setSelectedPhoto(photo)}
                style={{ aspectRatio }}
              >
                <div className="photo-placeholder">
                  <div className="photo-thumbnail">
                    <span>📷</span>
                  </div>
                  <div className="photo-overlay">
                    <span className="photo-info">{photo.size}</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {selectedPhoto && (
          <div className="photo-detail-modal">
            <div className="modal-backdrop" onClick={() => setSelectedPhoto(null)} />
            <div className="photo-detail-panel">
              <button type="button" className="modal-close" onClick={() => setSelectedPhoto(null)}>✕</button>

              <div className="photo-detail-grid">
                <div className="photo-preview">
                  <div className="photo-large-placeholder">
                    <span>📷</span>
                    <p>{selectedPhoto.size}</p>
                  </div>
                </div>

                <div className="photo-metadata">
                  <h3>Photo details</h3>
                  <ul className="metadata-list">
                    <li><span>Device</span><strong>{selectedPhoto.deviceName}</strong></li>
                    <li><span>Date & time</span><strong>{selectedPhoto.timestamp}</strong></li>
                    <li><span>Location</span><strong>{selectedPhoto.location}</strong></li>
                    <li><span>Resolution</span><strong>{selectedPhoto.width} × {selectedPhoto.height}</strong></li>
                    <li><span>File size</span><strong>{selectedPhoto.size}</strong></li>
                  </ul>
                  <div className="photo-actions">
                    <button type="button" className="button">Download</button>
                    <button type="button" className="button button-ghost">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
