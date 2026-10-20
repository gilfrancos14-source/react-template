import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { signOut } from '../../lib/auth'
import { icons } from '../icons'

const placeholders: Record<string, string> = {
  '/': 'Rechercher quelque chose...',
  '/commandes': 'Rechercher une commande...',
  '/produits': 'Rechercher un produit, une catégorie...',
}

export function Topbar({
  onMenu,
  search,
  onSearchChange,
}: {
  onMenu: () => void
  search: string
  onSearchChange: (value: string) => void
}) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleSignOut() {
    signOut()
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-20 flex h-[76px] items-center gap-3 bg-white px-4 shadow-[0_2px_10px_rgba(20,60,160,.06)] sm:px-7">
      <button
        type="button"
        onClick={onMenu}
        aria-label="Ouvrir le menu"
        className="rounded-lg p-2 text-navy hover:bg-soft lg:hidden"
      >
        <icons.menu className="h-6 w-6" />
      </button>

      <div className="flex h-[41px] w-full max-w-[512px] items-center gap-3 rounded-lg bg-[#eaf2fe] px-4">
        <icons.search className="h-5 w-5 shrink-0 text-[#2a5bd7]" />
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={placeholders[pathname] ?? 'Rechercher...'}
          className="w-full bg-transparent text-[14px] text-navy placeholder:text-[#7a8fbf] focus:outline-none"
        />
      </div>

      <div className="ml-auto flex items-center gap-4 sm:gap-6">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-1.5 text-[#1c5fe0]"
        >
          <icons.bell className="h-[28px] w-[28px]" />
          <span className="absolute -top-0.5 -right-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#ef3b4b] text-[10px] font-semibold text-white">
            3
          </span>
        </button>

        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="h-[50px] w-[50px] shrink-0 overflow-hidden rounded-full ring-2 ring-[#dfe8f8]">
              <img
                src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=160&h=160&q=80&crop=faces"
                alt="Bidosessi G."
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden leading-tight sm:block">
              <div className="text-[15px] font-semibold text-navy">Bidosessi G.</div>
              <div className="text-[14px] text-[#5a74b5]">Administrateur</div>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Menu du compte"
              aria-expanded={menuOpen}
              className="ml-1 hidden text-[#2a5bd7] sm:block"
            >
              <icons.chevronDown className="h-5 w-5" />
            </button>
          </div>

          {menuOpen ? (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
              />
              <div className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-xl border border-[#e3ebf8] bg-white py-1 shadow-[0_8px_24px_rgba(20,60,160,.12)]">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] font-medium text-navy transition hover:bg-soft"
                >
                  <icons.logout className="h-4 w-4 text-[#2a5bd7]" />
                  Déconnexion
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </header>
  )
}
