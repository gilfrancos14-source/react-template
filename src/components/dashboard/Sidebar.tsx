import { NavLink } from 'react-router-dom'
import { navItems } from '../../data/mock'
import { cn } from '../../lib/cn'
import { icons } from '../icons'

const baseItem = 'flex h-[52px] items-center gap-[18px] rounded-lg px-[16px]'
const idleItem = 'text-[#cfe0ff] hover:bg-white/10'

export function Sidebar({
  open,
  onNavigate,
}: {
  open: boolean
  onNavigate: () => void
}) {
  return (
    <aside
      className={cn(
        'sb fixed inset-y-0 left-0 z-40 flex w-[272px] flex-col bg-gradient-to-b from-[#0a2a8f] via-[#0a3aa8] to-[#06206d] transition-transform duration-200',
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      )}
    >
      <div className="flex h-[76px] items-center gap-2.5 px-[38px]">
        <svg width="40" height="44" viewBox="0 0 40 44" fill="none" aria-hidden="true">
          <path d="M20 1l17 10v22L20 43 3 33V11L20 1z" fill="#1e86ff" />
          <path d="M20 1l17 10-17 10L3 11 20 1z" fill="#5cb0ff" />
          <path d="M20 21v22L3 33V11l17 10z" fill="#0f5fe0" />
          <path
            d="M20 15l7 4v7l-7 4-7-4v-7l7-4z"
            fill="#0a2a8f"
            fillOpacity=".85"
          />
        </svg>
        <span className="text-[26px] font-semibold tracking-tight text-white">
          NovaTech
        </span>
        <icons.chevronRight className="ml-3 h-[18px] w-[18px] text-white/80" />
      </div>

      <nav className="mt-[24px] flex flex-col gap-[6px] px-4 text-[15px] font-medium text-white">
        {navItems.map((item) => {
          const Icon = icons[item.icon]
          const content = (
            <>
              <Icon
                className="h-[26px] w-[26px] fill-current [fill-opacity:.85]"
                strokeWidth={item.icon === 'chart' ? 3.2 : 2}
              />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge ? (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2f7bff] text-[12px] font-semibold text-white">
                  {item.badge}
                </span>
              ) : null}
            </>
          )

          return item.to ? (
            <NavLink
              key={item.label}
              to={item.to}
              end
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  baseItem,
                  isActive
                    ? 'bg-brand text-white shadow-[0_6px_16px_rgba(11,107,255,.35)]'
                    : idleItem,
                )
              }
            >
              {content}
            </NavLink>
          ) : (
            <button
              key={item.label}
              type="button"
              className={cn(baseItem, idleItem, 'w-full')}
            >
              {content}
            </button>
          )
        })}
      </nav>

      <div className="mx-[23px] mt-auto mb-[86px] rounded-xl border border-[#2e5fd0] bg-[#0a2f9e]/70 px-[18px] pt-[22px] pb-[22px] text-center">
        <icons.crown className="mx-auto h-[26px] w-[26px] fill-white text-white" />
        <h3 className="mt-2 text-[15px] font-semibold text-white">
          Passez à la version Pro
        </h3>
        <p className="mt-[14px] text-[13px] leading-[19px] text-[#dbe7ff]">
          Profitez de plus de fonctionnalités pour faire grandir votre activité.
        </p>
        <button
          type="button"
          className="bg-brand mt-[16px] h-[43px] w-full rounded-md text-[14px] font-medium text-white shadow-[0_6px_14px_rgba(11,107,255,.4)] hover:bg-[#0a5fe6]"
        >
          Voir les offres
        </button>
      </div>
    </aside>
  )
}
