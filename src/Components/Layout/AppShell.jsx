import { Menu, X } from 'lucide-react';
import { useState } from "react";
import Sidebar from "./Sidebar";

// Provides the responsive sidebar, mobile navigation, and page content frame.
const AppShell = ({children}) => {
    const [mobileOpen, setMobileOpen] = useState(false);

  return (
  <div className="layout-shell">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex shrink-0">
        <Sidebar />
      </aside>

    {/* Mobile */}
    {mobileOpen && (
      <div className="fixed inset-0 z-40 flex md:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm"
          />
          <div className="relative z-50 h-full">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
    )}

   {/* Main content */}
   <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="flex items-center gap-3 border-b border-line px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
            className="btn-ghost p-1"
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
          <span className="text-body-sm font-medium text-ink">FreightFox</span>
        </header>

        <main className="layout-main">
          <div className="layout-page">{children}</div>
        </main>
      </div>

      </div>
  )
}

export default AppShell
