import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/dashboard/Sidebar'
import { Topbar } from '../components/dashboard/Topbar'

export type DashboardContext = {
  search: string
}

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')

  return (
    <div className="min-h-svh">
      <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />

      {sidebarOpen ? (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      <div className="lg:pl-[272px]">
        <Topbar
          onMenu={() => setSidebarOpen(true)}
          search={search}
          onSearchChange={setSearch}
        />
        <main className="px-4 pt-[22px] pb-6 sm:px-6">
          <Outlet context={{ search } satisfies DashboardContext} />
        </main>
      </div>
    </div>
  )
}
