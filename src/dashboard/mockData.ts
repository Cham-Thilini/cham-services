import type { AlertItem, Device, LocationPoint, UsageStat } from './types'

export const devices: Device[] = [
  { id: 'DEV-2041', name: 'Ava iPhone 14', owner: 'Ava', status: 'online', battery: 86, lastSync: '2 min ago', type: 'iPhone', location: 'Home' },
  { id: 'DEV-2018', name: 'Noah Pixel 8', owner: 'Noah', status: 'warning', battery: 42, lastSync: '7 min ago', type: 'Android', location: 'School' },
  { id: 'DEV-1995', name: 'Mila iPad Air', owner: 'Mila', status: 'online', battery: 91, lastSync: '11 min ago', type: 'iPad', location: 'Library' },
  { id: 'DEV-1960', name: 'Ethan Samsung A54', owner: 'Ethan', status: 'offline', battery: 18, lastSync: '38 min ago', type: 'Android', location: 'Unknown' },
]

export const alerts: AlertItem[] = [
  { id: 'ALT-1', title: 'Geofence exit', detail: 'Noah left school perimeter 14 minutes ago.', severity: 'high' },
  { id: 'ALT-2', title: 'Low battery', detail: 'Ethan Galaxy A54 battery at 18%.', severity: 'medium' },
  { id: 'ALT-3', title: 'App time warning', detail: 'Ava exceeded evening screen-time limit by 21 minutes.', severity: 'low' },
]

export const appUsage: UsageStat[] = [
  { app: 'Instagram', minutes: 120, share: 31 },
  { app: 'YouTube', minutes: 96, share: 24 },
  { app: 'Messages', minutes: 48, share: 13 },
  { app: 'Safari', minutes: 42, share: 11 },
  { app: 'Spotify', minutes: 36, share: 9 },
  { app: 'Camera', minutes: 18, share: 5 },
]

export const locationTrail: LocationPoint[] = [
  { lat: 51.5074, lng: -0.1278, label: 'Home', time: '08:10' },
  { lat: 51.5142, lng: -0.1276, label: 'School route', time: '08:42' },
  { lat: 51.5186, lng: -0.1257, label: 'Zone check', time: '09:06' },
  { lat: 51.5219, lng: -0.1212, label: 'After school', time: '09:30' },
]

export const overviewStats = [
  { label: 'Active devices', value: '4', delta: '+1 this week' },
  { label: 'Location updates', value: '2.8k', delta: '+14%' },
  { label: 'App alerts', value: '17', delta: '3 urgent' },
  { label: 'Battery warnings', value: '2', delta: '1 critical' },
]

export const loginCredentials = {
  email: 'admin@monitoring.local',
  password: 'private123',
}
