type View = 'overview' | 'devices' | 'location' | 'usage' | 'privacy' | 'appHistory' | 'photos'

type SidebarProps = {
  activeView: View
  onSelect: (view: View) => void
}

const items: { key: View; label: string; group?: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'devices', label: 'Devices', group: 'monitoring' },
  { key: 'location', label: 'Location', group: 'monitoring' },
  { key: 'usage', label: 'App usage', group: 'monitoring' },
  { key: 'appHistory', label: 'App history', group: 'monitoring' },
  { key: 'photos', label: 'Photos', group: 'monitoring' },
  { key: 'privacy', label: 'Privacy', group: 'settings' },
]

export function Sidebar({ activeView, onSelect }: SidebarProps) {
  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-brand-block">
        <div className="dashboard-brand-dot" />
        <div>
          <strong>Monitoring</strong>
          <small>Dashboard</small>
        </div>
      </div>

      <nav className="dashboard-nav">
        {items.map((item, index) => {
          const showGroupLabel = item.group && (index === 0 || items[index - 1].group !== item.group)
          return (
            <div key={`${item.group}-${item.key}`}>
              {showGroupLabel && <span className="nav-group-label">{item.group === 'monitoring' ? 'Monitoring' : 'Settings'}</span>}
              <button
                type="button"
                className={activeView === item.key ? 'dashboard-nav-item active' : 'dashboard-nav-item'}
                onClick={() => onSelect(item.key)}
              >
                {item.label}
              </button>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
