import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { icons } from '../components/icons'
import { cn } from '../lib/cn'

const CARD = 'rounded-[10px] bg-white shadow-[0_2px_12px_rgba(20,60,160,0.06)]'
const NAV_ITEM =
  'flex h-[54px] items-center gap-[18px] rounded-[12px] pl-[18px] pr-[14px] text-left text-[14px] font-medium text-white hover:bg-white/10'
const NAV_ICON = 'h-[24px] w-[24px] shrink-0 text-[#a9bde8]'
const BADGE =
  'ml-auto flex h-[24px] min-w-[24px] items-center justify-center rounded-full bg-[#1a5cf5] px-[6px] text-[12px] font-semibold text-white'

const stats = [
  {
    icon: 'box',
    label: 'Total des commandes',
    value: '248',
    delta: '+12%',
    tone: 'bg-[#dbe8ff] text-[#1d5df0]',
  },
  {
    icon: 'cart',
    label: 'En cours',
    value: '36',
    delta: '+8%',
    tone: 'bg-[#dbe8ff] text-[#1d5df0]',
  },
  {
    icon: 'truck',
    label: 'Expédiées',
    value: '189',
    delta: '+15%',
    tone: 'bg-[#dbe8ff] text-[#1d5df0]',
  },
  {
    icon: 'circleCheck',
    label: 'Livrées',
    value: '203',
    delta: '+18%',
    tone: 'bg-[#d9f6e8] text-[#12b76a]',
  },
] satisfies {
  icon: keyof typeof icons
  label: string
  value: string
  delta: string
  tone: string
}[]

type Status = 'En préparation' | 'Expédiée' | 'Livrée' | 'En cours' | 'Annulée'

const statusStyles: Record<Status, string> = {
  'En préparation': 'bg-[#fff1d6] text-[#f59e0b]',
  Expédiée: 'bg-[#e4eeff] text-[#1d5df0]',
  Livrée: 'bg-[#dcf6e9] text-[#12a15a]',
  'En cours': 'bg-[#e4eeff] text-[#1d5df0]',
  Annulée: 'bg-[#ffe1e5] text-[#e5374a]',
}

const statusFilters = [
  'En préparation',
  'Expédiée',
  'Livrée',
  'En cours',
  'Annulée',
] as const

const orders: {
  id: string
  name: string
  email: string
  avatar: string
  icon: keyof typeof icons
  articles: string
  extra: boolean
  amount: string
  status: Status
  date: string
  time: string
}[] = [
  {
    id: '001248',
    name: 'Koffi S.',
    email: 'koffi@gmail.com',
    avatar: 'from-[#8a5a3c] to-[#3b2418]',
    icon: 'headphones',
    articles: '1 article',
    extra: true,
    amount: '45 000 FCFA',
    status: 'En préparation',
    date: '20/11/2025',
    time: '14:32',
  },
  {
    id: '001247',
    name: 'Aminata D.',
    email: 'aminata@gmail.com',
    avatar: 'from-[#b07a5a] to-[#4a2c1e]',
    icon: 'smartphone',
    articles: '2 articles',
    extra: true,
    amount: '120 000 FCFA',
    status: 'Expédiée',
    date: '20/11/2025',
    time: '11:20',
  },
  {
    id: '001246',
    name: 'Yao M.',
    email: 'yao@gmail.com',
    avatar: 'from-[#6d4630] to-[#24140c]',
    icon: 'footprints',
    articles: '1 article',
    extra: false,
    amount: '32 000 FCFA',
    status: 'Livrée',
    date: '19/11/2025',
    time: '16:45',
  },
  {
    id: '001245',
    name: 'Fatou B.',
    email: 'fatou@gmail.com',
    avatar: 'from-[#a56b4b] to-[#3a2217]',
    icon: 'backpack',
    articles: '1 article',
    extra: false,
    amount: '28 000 FCFA',
    status: 'En cours',
    date: '19/11/2025',
    time: '10:12',
  },
  {
    id: '001244',
    name: 'Sika T.',
    email: 'sika@gmail.com',
    avatar: 'from-[#7b4e33] to-[#2b180f]',
    icon: 'ear',
    articles: '1 article',
    extra: false,
    amount: '75 000 FCFA',
    status: 'Expédiée',
    date: '18/11/2025',
    time: '19:05',
  },
  {
    id: '001243',
    name: 'Rachid A.',
    email: 'rachid@gmail.com',
    avatar: 'from-[#9c6a4a] to-[#35200f]',
    icon: 'watch',
    articles: '1 article',
    extra: false,
    amount: '65 000 FCFA',
    status: 'Livrée',
    date: '18/11/2025',
    time: '13:28',
  },
  {
    id: '001242',
    name: 'Mariam K.',
    email: 'mariam@gmail.com',
    avatar: 'from-[#7a5038] to-[#2a1810]',
    icon: 'armchair',
    articles: '1 article',
    extra: false,
    amount: '52 000 FCFA',
    status: 'Annulée',
    date: '17/11/2025',
    time: '09:14',
  },
  {
    id: '001241',
    name: 'Diallo M.',
    email: 'diallo@gmail.com',
    avatar: 'from-[#5e3b26] to-[#1f1009]',
    icon: 'laptop',
    articles: '1 article',
    extra: false,
    amount: '210 000 FCFA',
    status: 'Livrée',
    date: '16/11/2025',
    time: '17:37',
  },
]

const GRID = 'grid-cols-[61px_127px_217px_187px_157px_173px_182px_82px]'

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
}

export function Orders() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    document.title = 'NovaTech – Commandes'
  }, [])

  const needle = query.trim().toLowerCase()
  const rows = orders.filter(
    (order) =>
      (!status || order.status === status) &&
      `${order.id} ${order.name} ${order.email}`.toLowerCase().includes(needle),
  )

  const allChecked = rows.length > 0 && rows.every((order) => selected.includes(order.id))

  const toggleAll = () => {
    if (allChecked) {
      setSelected((current) => current.filter((id) => !rows.some((order) => order.id === id)))
      return
    }

    setSelected((current) => [
      ...current,
      ...rows.map((order) => order.id).filter((id) => !current.includes(id)),
    ])
  }

  const toggleRow = (id: string) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  return (
    <div className="min-h-screen bg-[#f3f7ff] text-[#0a1f6b] antialiased">
      {sidebarOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      <aside
        id="sidebar"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[273px] shrink-0 flex-col bg-gradient-to-b from-[#0c2f98] to-[#071c63] transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-[88px] items-center gap-[14px] px-[38px] pt-[2px]">
          <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-gradient-to-br from-[#3f8bff] to-[#1a5cf5] text-white shadow-lg">
            <icons.package className="h-[24px] w-[24px]" />
          </div>
          <span className="text-[22px] font-bold tracking-tight text-white">NovaTech</span>
          <icons.chevronRight className="ml-auto h-[18px] w-[18px] text-[#9db4e8]" />
        </div>

        <nav className="mt-[8px] flex flex-col gap-[6px] px-[16px]">
          <Link to="/" className={NAV_ITEM} onClick={() => setSidebarOpen(false)}>
            <icons.home className={NAV_ICON} />
            <span>Tableau de bord</span>
          </Link>
          <Link
            to="/commandes"
            className={cn(
              NAV_ITEM,
              'bg-[#1a5cf5] font-semibold shadow-[0_6px_14px_rgba(26,92,245,0.35)]',
            )}
          >
            <icons.cart className={cn(NAV_ICON, 'text-white')} />
            <span>Commandes</span>
            <span className={cn(BADGE, 'bg-white/25')}>12</span>
          </Link>
          <Link to="/produits" className={NAV_ITEM} onClick={() => setSidebarOpen(false)}>
            <icons.package className={NAV_ICON} />
            <span>Produits</span>
          </Link>
          <Link to="/clients" className={NAV_ITEM} onClick={() => setSidebarOpen(false)}>
            <icons.user className={NAV_ICON} />
            <span>Clients</span>
          </Link>
          <Link to="/rapports" className={NAV_ITEM} onClick={() => setSidebarOpen(false)}>
            <icons.chartColumn className={NAV_ICON} />
            <span>Rapports</span>
          </Link>
          <Link to="/messages" className={NAV_ITEM} onClick={() => setSidebarOpen(false)}>
            <icons.message className={NAV_ICON} />
            <span>Messages</span>
            <span className={BADGE}>3</span>
          </Link>
          <button type="button" className={NAV_ITEM}>
            <icons.settings className={NAV_ICON} />
            <span>Paramètres</span>
          </button>
        </nav>

        <div className="mt-auto px-[26px] pb-[65px]">
          <div className="flex flex-col items-center rounded-[12px] border border-[#2158d8] bg-[#0a2889] px-[24px] pt-[22px] pb-[22px] text-center">
            <icons.crown className="h-[26px] w-[26px] fill-white text-white" />
            <p className="mt-[10px] text-[14px] font-bold text-white">
              Passez à la version Pro
            </p>
            <p className="mt-[10px] text-[12px] leading-[19px] text-[#d4e0fb]">
              Profitez de plus de fonctionnalités pour faire grandir votre activité.
            </p>
            <button
              type="button"
              className="mt-[18px] h-[44px] w-full rounded-[8px] bg-[#1a5cf5] text-[14px] font-semibold text-white transition hover:bg-[#3470ff]"
            >
              Voir les offres
            </button>
          </div>
        </div>
      </aside>

      <div className="min-w-0 lg:pl-[273px]">
        <header className="flex h-[76px] items-center gap-[16px] bg-white px-[16px] shadow-[0_2px_10px_rgba(20,60,160,0.06)] sm:px-[28px] lg:pr-[24px] lg:pl-[28px]">
          <button
            type="button"
            className="rounded-lg p-2 text-[#0a1f6b] hover:bg-[#eaf2ff] lg:hidden"
            aria-label="Ouvrir le menu"
            onClick={() => setSidebarOpen(true)}
          >
            <icons.menu className="h-6 w-6" />
          </button>
          <label className="flex h-[42px] w-full max-w-[506px] items-center gap-[14px] rounded-[10px] bg-[#eaf2ff] px-[16px]">
            <icons.search className="h-[20px] w-[20px] text-[#5d7bc2]" />
            <input
              type="text"
              placeholder="Rechercher une commande, un client..."
              className="w-full bg-transparent text-[14px] text-[#0a1f6b] outline-none placeholder:text-[#6f86bd]"
            />
          </label>
          <div className="ml-auto flex items-center gap-[28px]">
            <button type="button" className="relative text-[#1d5df0]" aria-label="Notifications">
              <icons.bell className="h-[28px] w-[28px]" />
              <span className="absolute -top-[6px] -right-[6px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#ef4444] text-[10px] font-bold text-white">
                3
              </span>
            </button>
            <div className="flex items-center gap-[14px]">
              <div
                className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-gradient-to-br from-[#7a4a2b] to-[#2d1a10] text-[16px] font-bold text-white"
                title="Remplacer par la photo de profil"
              >
                BG
              </div>
              <div className="hidden leading-tight sm:block">
                <p className="text-[15px] font-bold">Bidosessi G.</p>
                <p className="mt-[3px] text-[14px] text-[#5d7bc2]">Administrateur</p>
              </div>
              <icons.chevronDown className="ml-[10px] hidden h-[18px] w-[18px] text-[#0a1f6b] sm:block" />
            </div>
          </div>
        </header>

        <main className="px-[16px] pt-[20px] pb-[18px] sm:px-[24px] lg:pr-[23px] lg:pl-[28px]">
          <div className="flex flex-wrap items-start justify-between gap-4 pb-[26px]">
            <div>
              <h1 className="text-[34px] leading-[40px] font-extrabold tracking-tight sm:text-[36px]">
                Commandes
              </h1>
              <p className="mt-[6px] text-[17px] text-[#4f6bb3]">
                Gérez toutes vos commandes en un seul endroit.
              </p>
            </div>
            <button
              type="button"
              className="mt-[8px] flex h-[45px] w-[198px] items-center justify-center gap-[12px] rounded-[10px] bg-[#1a5cf5] text-[14px] font-semibold text-white shadow-[0_6px_14px_rgba(26,92,245,0.3)] transition hover:bg-[#3470ff]"
            >
              <icons.plus className="h-[22px] w-[22px]" />
              Nouvelle commande
            </button>
          </div>

          <section className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = icons[stat.icon]
              return (
                <article
                  key={stat.label}
                  className="flex h-[152px] items-start gap-[20px] rounded-[10px] bg-white px-[19px] pt-[19px] shadow-[0_2px_12px_rgba(20,60,160,0.06)]"
                >
                  <div
                    className={cn(
                      'flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[14px]',
                      stat.tone,
                    )}
                  >
                    <Icon className="h-[28px] w-[28px]" />
                  </div>
                  <div>
                    <p className="mt-[5px] text-[14px] font-medium">{stat.label}</p>
                    <p className="mt-[6px] text-[26px] leading-[32px] font-extrabold">
                      {stat.value}
                    </p>
                    <p className="mt-[6px] flex items-center gap-[8px] text-[14px] font-semibold text-[#12b76a]">
                      <icons.arrowUp className="h-[16px] w-[16px]" />
                      {stat.delta}
                    </p>
                    <p className="mt-[6px] text-[12px] text-[#7d92c4]">
                      par rapport au mois dernier
                    </p>
                  </div>
                </article>
              )
            })}
          </section>

          <section className={cn('mt-[20px] p-[15px]', CARD)}>
            <div className="flex flex-wrap items-center gap-[16px]">
              <label className="flex h-[36px] min-w-[220px] flex-1 items-center gap-[12px] rounded-[8px] border border-[#dbe6fb] px-[12px] lg:max-w-[447px]">
                <icons.search className="h-[18px] w-[18px] text-[#5d7bc2]" />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Rechercher une commande..."
                  className="w-full bg-transparent text-[12.5px] outline-none placeholder:text-[#5d7bc2]"
                />
              </label>
              <div className="relative h-[36px] w-[197px]">
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="h-full w-full appearance-none rounded-[8px] border border-[#dbe6fb] bg-white px-[16px] text-[13px] font-medium text-[#0a1f6b] outline-none"
                >
                  <option value="">Tous les statuts</option>
                  {statusFilters.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <icons.chevronDown className="pointer-events-none absolute top-[10px] right-[14px] h-[16px] w-[16px]" />
              </div>
              <div className="relative h-[36px] w-[181px]">
                <select className="h-full w-full appearance-none rounded-[8px] border border-[#dbe6fb] bg-white px-[16px] text-[13px] font-medium text-[#0a1f6b] outline-none">
                  <option>Toutes les dates</option>
                  <option>Aujourd'hui</option>
                  <option>7 derniers jours</option>
                  <option>30 derniers jours</option>
                </select>
                <icons.chevronDown className="pointer-events-none absolute top-[10px] right-[14px] h-[16px] w-[16px]" />
              </div>
              <div className="flex h-[40px] w-[241px] items-center justify-center gap-[14px] rounded-[8px] border border-[#dbe6fb] text-[12.5px] font-medium sm:ml-auto lg:ml-[85px]">
                <icons.calendar className="h-[18px] w-[18px] text-[#1d5df0]" />
                <span>20/10/2025</span>
                <icons.arrowRight className="h-[14px] w-[14px] text-[#1d5df0]" />
                <span>20/11/2025</span>
              </div>
            </div>

            <div className="mt-[18px] overflow-x-auto rounded-[10px] border border-[#e3ecfb]">
              <div className="min-w-[1186px]">
                <div
                  className={cn(
                    'grid h-[44px] items-center bg-[#f5f9ff] text-[12.5px] font-medium',
                    GRID,
                  )}
                >
                  <div className="pl-[15px]">
                    <input
                      id="checkAll"
                      type="checkbox"
                      checked={allChecked}
                      onChange={toggleAll}
                      className="h-[16px] w-[16px] rounded border-[#b9c8e8] accent-[#1d5df0]"
                    />
                  </div>
                  <div>N° commande</div>
                  <div>Client</div>
                  <div>Produits</div>
                  <div>Montant</div>
                  <div>Statut</div>
                  <div>Date</div>
                  <div>Actions</div>
                </div>

                {rows.map((order) => {
                  const Icon = icons[order.icon]
                  return (
                    <div
                      key={order.id}
                      className={cn(
                        'grid h-[61px] items-center border-t border-[#e8effb] bg-white text-[13px] hover:bg-[#f8fbff]',
                        GRID,
                      )}
                    >
                      <div className="pl-[15px]">
                        <input
                          type="checkbox"
                          checked={selected.includes(order.id)}
                          onChange={() => toggleRow(order.id)}
                          className="row-check h-[16px] w-[16px] rounded border-[#b9c8e8] accent-[#1d5df0]"
                        />
                      </div>
                      <div className="font-bold">#CMD-{order.id}</div>
                      <div className="flex items-center gap-[15px]">
                        <div
                          className={cn(
                            'flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[13px] font-bold text-white',
                            order.avatar,
                          )}
                        >
                          {initials(order.name)}
                        </div>
                        <div className="leading-tight">
                          <p className="font-semibold">{order.name}</p>
                          <p className="mt-[4px] text-[12px] text-[#7d92c4]">{order.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-[14px]">
                        <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[8px] border border-[#e3ecfb] bg-[#f6f9ff] text-[#1f2a44]">
                          <Icon className="h-[22px] w-[22px]" />
                        </div>
                        <span className="text-[12px] text-[#5d7bc2]">{order.articles}</span>
                        {order.extra ? (
                          <span className="rounded-full bg-[#eef3ff] px-[8px] py-[3px] text-[11px] text-[#1d5df0]">
                            +1
                          </span>
                        ) : null}
                      </div>
                      <div className="font-medium">{order.amount}</div>
                      <div>
                        <span
                          className={cn(
                            'inline-flex h-[26px] items-center gap-[8px] rounded-full px-[12px] text-[12px] font-medium',
                            statusStyles[order.status],
                          )}
                        >
                          <span className="h-[8px] w-[8px] rounded-full bg-current" />
                          {order.status}
                        </span>
                      </div>
                      <div className="leading-tight">
                        <p className="text-[12.5px] font-medium">{order.date}</p>
                        <p className="mt-[6px] text-[11.5px] text-[#7d92c4]">{order.time}</p>
                      </div>
                      <div>
                        <button
                          type="button"
                          aria-label={`Actions pour la commande ${order.id}`}
                          className="flex w-[41px] justify-center text-[#0a1f6b]"
                        >
                          <icons.more className="h-[20px] w-[20px]" />
                        </button>
                      </div>
                    </div>
                  )
                })}

                {rows.length === 0 ? (
                  <p className="border-t border-[#e8effb] py-10 text-center text-[13px] text-[#7d92c4]">
                    Aucune commande trouvée.
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-[14px]">
              <p className="pl-[4px] text-[12px] text-[#5d7bc2]">
                Affichage de {rows.length} sur 248 commandes
              </p>
              <div className="flex items-center gap-[10px]">
                <button
                  type="button"
                  aria-label="Page précédente"
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border border-[#dbe6fb] bg-white text-[#9db4e8] transition"
                >
                  <icons.chevronLeft className="h-[14px] w-[14px]" />
                </button>
                {[1, 2, 3, 4, 5].map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => setPage(number)}
                    className={cn(
                      'flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border text-[12.5px] font-medium transition',
                      number === page
                        ? 'border-[#1a5cf5] bg-[#1a5cf5] text-white shadow-[0_4px_10px_rgba(26,92,245,0.35)]'
                        : 'border-[#dbe6fb] bg-white text-[#0a1f6b]',
                    )}
                  >
                    {number}
                  </button>
                ))}
                <button
                  type="button"
                  aria-label="Page suivante"
                  onClick={() => setPage((value) => Math.min(5, value + 1))}
                  className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border border-[#dbe6fb] bg-white text-[#0a1f6b] transition"
                >
                  <icons.chevronRight className="h-[14px] w-[14px]" />
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
