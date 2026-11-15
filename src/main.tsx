import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/700.css'
import App from './App'
import Services from './Services'
import { DashboardApp } from './dashboard/DashboardApp'
import './styles.css'

const RootPage = window.location.pathname.endsWith('/monitoring.html')
  ? DashboardApp
  : window.location.pathname.endsWith('/services.html')
    ? Services
    : App

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootPage />
  </React.StrictMode>
)
