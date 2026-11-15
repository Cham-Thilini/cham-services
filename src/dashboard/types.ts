export type DeviceStatus = 'online' | 'offline' | 'warning'

export type Device = {
  id: string
  name: string
  owner: string
  status: DeviceStatus
  battery: number
  lastSync: string
  type: string
  location: string
}

export type AlertItem = {
  id: string
  title: string
  detail: string
  severity: 'low' | 'medium' | 'high'
}

export type UsageStat = {
  app: string
  minutes: number
  share: number
}

export type LocationPoint = {
  lat: number
  lng: number
  label: string
  time: string
}
