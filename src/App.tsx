import { useState } from "react"
import { AppShell } from "./components/layout/AppShell"
import { Dashboard } from "./pages/Dashboard"
import { CalendarPage } from "./pages/CalendarPage"

import { Analytics } from "./pages/Analytics"

export type Page = 'dashboard' | 'calendar' | 'analytics'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  return (
    <AppShell currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'calendar' && <CalendarPage />}
      {currentPage === 'analytics' && <Analytics />}
    </AppShell>
  )
}

export default App
