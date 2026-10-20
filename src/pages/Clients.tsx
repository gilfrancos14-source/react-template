import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { icons } from '../components/icons'
import { cn } from '../lib/cn'

const NAV_ITEM =
  'flex h-[50px] items-center gap-[19px] rounded-[6px] pl-[16px] pr-[9px] text-[14.5px] font-medium text-white/95 hover:bg-white/5'
const BADGE =
  'ml-auto grid h-[24px] w-[24px] place-items-center rounded-full bg-[#1a62e8] text-[12px] font-bold text-white'

const portrait = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=160&h=160&q=80&crop=faces`

const adminPhoto = portrait('1566492031773-4f4e44671857')

type Client = {
  name: string
  email: string
  phone: string
  orders: number
  date: string
  time: string
  status: 'Actif' | 'En attente' | 'Inactif'
  spent: string
  photo: string
}

const clients: Client[] = [
  {
    name: 'Amine D.',
    email: 'amine.d@gmail.com',
    phone: '+229 62 12 34 56',
    orders: 5,
    date: '18/11/2025',
    time: '14:32',
    status: 'Actif',
    spent: '342 500 FCFA',
    photo: portrait('1507003211169-0a1dd7228f2d'),
  },
  {
    name: 'Koffi S.',
    email: 'koffi.s@gmail.com',
    phone: '+229 66 98 76 54',
    orders: 3,
    date: '16/11/2025',
    time: '10:21',
    status: 'Actif',
    spent: '198 000 FCFA',
    photo: portrait('1519085360753-af0119f7cbe7'),
  },
  {
    name: 'Yao M.',
    email: 'yao.m@gmail.com',
    phone: '+229 97 45 32 10',
    orders: 8,
    date: '15/11/2025',
    time: '16:45',
    status: 'Actif',
    spent: '512 750 FCFA',
    photo: portrait('1506794778202-cad84cf45f1d'),
  },
  {
    name: 'Fatou B.',
    email: 'fatou.b@gmail.com',
    phone: '+229 95 22 11 33',
    orders: 2,
    date: '12/11/2025',
    time: '09:18',
    status: 'Actif',
    spent: '87 500 FCFA',
    photo: portrait('1531123897727-8f129e1688ce'),
  },
  {
    name: 'Sika T.',
    email: 'sika.t@gmail.com',
    phone: '+229 67 88 77 66',
    orders: 4,
    date: '10/11/2025',
    time: '17:02',
    status: 'Actif',
    spent: '164 200 FCFA',
    photo: portrait('1534528741775-53994a69daeb'),
  },
  {
    name: 'Rachid A.',
    email: 'rachid.a@gmail.com',
    phone: '+229 96 33 55 44',
    orders: 6,
    date: '08/11/2025',
    time: '11:37',
    status: 'Actif',
    spent: '421 300 FCFA',
    photo: portrait('1500648767791-00dcc994a43e'),
  },
  {
    name: 'Mariama K.',
    email: 'mariama.k@gmail.com',
    phone: '+229 91 02 03 04',
    orders: 1,
    date: '05/11/2025',
    time: '15:26',
    status: 'En attente',
    spent: '25 000 FCFA',
    photo: portrait('1494790108377-be9c29b29330'),
  },
  {
    name: 'Diallo M.',
    email: 'diallo.m@gmail.com',
    phone: '+229 93 76 54 32',
    orders: 3,
    date: '02/11/2025',
    time: '12:14',
    status: 'Actif',
    spent: '143 900 FCFA',
    photo: portrait('1531384441138-2736e62e0919'),
  },
  {
    name: 'El Hadj B.',
    email: 'elhadj.b@gmail.com',
    phone: '+229 98 11 22 33',
    orders: 7,
    date: '29/10/2025',
    time: '18:05',
    status: 'Actif',
    spent: '468 600 FCFA',
    photo: portrait('1547425260-76bcadfb4f2c'),
  },
  {
    name: 'Aissata S.',
    email: 'aissata.s@gmail.com',
    phone: '+229 66 44 55 77',
    orders: 2,
    date: '26/10/2025',
    time: '09:42',
    status: 'Actif',
    spent: '96 800 FCFA',
    photo: portrait('1580489944761-15a19d654956'),
  },
]

const stats = [
  {
    icon: 'users',
    label: 'Total des clients',
    value: '248',
    delta: '+12%',
    up: true,
    labelGap: 'mt-[4px]',
  },
  {
    icon: 'user',
    label: 'Nouveaux clients',
    value: '96',
    delta: '+20%',
    up: true,
    labelGap: 'mt-[4px]',
  },
  {
    icon: 'cart',
    label: 'Clients actifs',
    value: '221',
    delta: '+8%',
    up: true,
    labelGap: 'mt-[3px]',
  },
  {
    icon: 'ban',
    label: 'Clients inactifs',
    value: '27',
    delta: '-5%',
    up: false,
    labelGap: 'mt-[4px]',
  },
] satisfies {
  icon: keyof typeof icons
  label: string
  value: string
  delta: string
  up: boolean
  labelGap: string
}[]

const statusStyles = {
  Actif: {
    badge: 'bg-[#d9f5e3] text-[#15803d]',
    dot: 'bg-[#16a34a]',
  },
  'En attente': {
    badge: 'bg-[#fff0d9] text-[#ea8a0a]',
    dot: 'bg-[#f59e0b]',
  },
  Inactif: {
    badge: 'bg-[#fde2e2] text-[#dc2626]',
    dot: 'bg-[#ef4444]',
  },
} as const

const pages = [1, 2, 3, 4, 5, 25]

function StatusBadge({ status }: { status: Client['status'] }) {
  const style = statusStyles[status]

  return (
    <span
      className={cn(
        'inline-flex h-[22px] items-center gap-[6px] rounded-full px-[9px] text-[11.5px] font-medium',
        style.badge,
      )}
    >
      <span className={cn('h-[7px] w-[7px] rounded-full', style.dot)} />
      {status}
    </span>
  )
}

export function Clients() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('Tous')
  const [date, setDate] = useState('Toutes les dates')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<string[]>([])
  const [activeName, setActiveName] = useState(clients[0].name)

  useEffect(() => {
    document.title = 'NovaTech – Clients'
  }, [])

  const needle = query.trim().toLowerCase()
  const visible = clients.filter(
    (client) =>
      (status === 'Tous' || client.status === status) &&
      (!needle ||
        [client.name, client.email, client.phone].some((value) =>
          value.toLowerCase().includes(needle),
        )),
  )

  const active = clients.find((client) => client.name === activeName) ?? clients[0]
  const activeStatus = statusStyles[active.status]
  const allChecked =
    visible.length > 0 && visible.every((client) => selected.includes(client.name))

  const toggleAll = () => {
    if (allChecked) {
      setSelected((current) =>
        current.filter((name) => !visible.some((client) => client.name === name)),
      )
      return
    }

    setSelected((current) => [
      ...current,
      ...visible.map((client) => client.name).filter((name) => !current.includes(name)),
    ])
  }

  const toggleRow = (name: string) => {
    setSelected((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    )
  }

  const movePage = (direction: -1 | 1) => {
    const index = pages.indexOf(page)
    setPage(pages[Math.min(Math.max(index + direction, 0), pages.length - 1)])
  }

  return (
    <div className="min-h-screen bg-[#f3f7fd] font-sans text-[#0b2563] antialiased">
      {sidebarOpen ? (
        <div
          className="fixed inset-0 z-40 bg-[#031238]/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      <aside
        id="sidebar"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[268px] -translate-x-full flex-col overflow-y-auto bg-gradient-to-b from-[#0a3591] via-[#082a7b] to-[#051a4e] transition-transform duration-200 lg:translate-x-0',
          sidebarOpen && 'translate-x-0',
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,.045)_48%,transparent_66%)]" />

        <div className="relative mt-[22px] mb-[27px] flex h-[44px] shrink-0 items-center px-[32px]">
          <svg className="h-[48px] w-[44px] shrink-0" viewBox="0 0 44 48" aria-hidden="true">
            <polygon points="22,2 41,13 41,35 22,46 3,35 3,13" fill="#1d63f0" />
            <polygon points="22,2 41,13 22,24 3,13" fill="#3d88ff" />
            <polygon points="3,13 22,24 22,46 3,35" fill="#0b47c4" />
            <polygon points="41,13 22,24 22,46 41,35" fill="#1356d8" />
            <polygon
              points="22,13 32,19 32,31 22,37 12,31 12,19"
              fill="#0a2a78"
              opacity=".9"
            />
          </svg>
          <span className="ml-[12px] text-[24px] font-medium tracking-tight text-white">
            NovaTech
          </span>
          <icons.chevronRight className="ml-auto h-[18px] w-[18px] text-[#3b6bd0]" />
        </div>

        <nav className="relative space-y-[2px] px-[14px]">
          <Link to="/" className={NAV_ITEM} onClick={() => setSidebarOpen(false)}>
            <icons.home className="h-[26px] w-[26px] fill-white/90 text-white/90" />
            <span>Tableau de bord</span>
          </Link>
          <Link to="/commandes" className={NAV_ITEM} onClick={() => setSidebarOpen(false)}>
            <icons.cart className="h-[26px] w-[26px] fill-white/90 text-white/90" />
            <span>Commandes</span>
            <span className={BADGE}>12</span>
          </Link>
          <Link to="/produits" className={NAV_ITEM} onClick={() => setSidebarOpen(false)}>
            <icons.package className="h-[26px] w-[26px] fill-white/90 text-white/90" />
            <span>Produits</span>
          </Link>
          <Link
            to="/clients"
            aria-current="page"
            className="flex h-[50px] items-center gap-[19px] rounded-[6px] bg-[#0a62f5] pl-[16px] pr-[9px] text-[14.5px] font-semibold text-white shadow-[0_4px_14px_rgba(10,98,245,.35)]"
          >
            <icons.user className="h-[26px] w-[26px] fill-white text-white" />
            <span>Clients</span>
          </Link>
          <Link to="/rapports" className={NAV_ITEM} onClick={() => setSidebarOpen(false)}>
            <icons.chart className="h-[26px] w-[26px] fill-white/90 text-white/90" />
            <span>Rapports</span>
          </Link>
          <Link to="/messages" className={NAV_ITEM} onClick={() => setSidebarOpen(false)}>
            <icons.message className="h-[26px] w-[26px] fill-white/90 text-white/90" />
            <span>Messages</span>
            <span className={BADGE}>3</span>
          </Link>
        </nav>

        <div className="relative mx-[22px] mt-auto mb-[90px] flex shrink-0 flex-col items-center rounded-[8px] border border-[#1d4ba6] bg-[#0b2f85]/80 px-[18px] pt-[20px] pb-[22px] text-center">
          <icons.crown className="h-[28px] w-[28px] fill-white text-white" />
          <h3 className="mt-[8px] text-[15px] font-bold text-white">
            Passez à la version Pro
          </h3>
          <p className="mt-[12px] text-[12.5px] leading-[20px] text-white/85">
            Profitez de plus de fonctionnalités pour faire grandir votre activité.
          </p>
          <button
            type="button"
            className="mt-[21px] h-[43px] w-full rounded-[6px] bg-[#0b5cf0] text-[14px] font-semibold text-white transition hover:bg-[#0a52d8]"
          >
            Voir les offres
          </button>
        </div>
      </aside>

      <div className="lg:pl-[268px]">
        <header className="sticky top-0 z-30 flex h-[75px] items-center gap-3 border-b border-[#e9f0fa] bg-white px-4 shadow-[0_1px_6px_rgba(16,50,120,.05)] sm:px-[26px]">
          <button
            id="menuBtn"
            type="button"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md text-[#0b5cf0] hover:bg-[#e8f0fd] lg:hidden"
            aria-label="Ouvrir le menu"
            onClick={() => setSidebarOpen(true)}
          >
            <icons.menu className="h-6 w-6" />
          </button>

          <label className="flex h-[40px] w-full max-w-[574px] items-center gap-[14px] rounded-[8px] bg-[#e6eefb] px-[17px]">
            <icons.search className="h-[20px] w-[20px] shrink-0 text-[#0b5cf0]" />
            <input
              id="globalSearch"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un client, un email, un numéro de téléphone..."
              className="w-full bg-transparent text-[12.5px] text-[#0b2563] outline-none placeholder:text-[#5f84cc]"
            />
          </label>

          <div className="ml-auto flex items-center gap-[34px]">
            <button type="button" className="relative text-[#0b5cf0]" aria-label="Notifications">
              <icons.bell className="h-[27px] w-[27px] fill-[#0b5cf0]/10" />
              <span className="absolute -top-[8px] -right-[7px] grid h-[18px] w-[18px] place-items-center rounded-full bg-[#ef4444] text-[10px] font-bold text-white ring-2 ring-white">
                3
              </span>
            </button>

            <button type="button" className="flex items-center gap-[12px] text-left">
              <span
                id="adminAvatar"
                className="h-[46px] w-[46px] shrink-0 overflow-hidden rounded-full bg-[#7a4e33]"
              >
                <img
                  src={adminPhoto}
                  alt="Bidosessi G."
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="hidden sm:block">
                <span className="block text-[14.5px] leading-[18px] font-bold text-[#0b2563]">
                  Bidosessi G.
                </span>
                <span className="block text-[13px] leading-[18px] text-[#1f5bd6]">
                  Administrateur
                </span>
              </span>
              <icons.chevronDown className="ml-[14px] hidden h-[20px] w-[20px] text-[#0b5cf0] sm:block" />
            </button>
          </div>
        </header>

        <main className="px-4 pt-[20px] pb-[36px] sm:px-[25px]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-[18px]">
              <div className="grid h-[48px] w-[48px] shrink-0 place-items-center rounded-[10px] bg-white shadow-[0_1px_5px_rgba(16,50,120,.1)]">
                <icons.users className="h-[30px] w-[30px] fill-[#0b5cf0] text-[#0b5cf0]" />
              </div>
              <div>
                <h1 className="text-[27px] leading-[30px] font-bold text-[#0b2563]">
                  Clients
                </h1>
                <p className="mt-[3px] text-[13.5px] text-[#1f5bd6]">
                  Gérez vos clients et suivez leurs informations.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="flex h-[43px] w-[174px] items-center justify-center gap-[10px] rounded-[6px] bg-[#0b5cf0] text-[13.5px] font-semibold text-white shadow-[0_4px_12px_rgba(11,92,240,.28)] transition hover:bg-[#0a52d8]"
            >
              <icons.plus className="h-[18px] w-[18px]" />
              Ajouter un client
            </button>
          </div>

          <section className="mt-[22px] grid grid-cols-1 gap-[15px] sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1.5fr]">
            {stats.map((stat, index) => {
              const Icon = icons[stat.icon]

              return (
                <article
                  key={stat.label}
                  className={cn(
                    'flex h-[126px] gap-[18px] rounded-[8px] bg-white px-[17px] py-[14px] shadow-[0_1px_4px_rgba(16,50,120,.07)]',
                    index === 3 && 'sm:col-span-2 xl:col-span-1',
                  )}
                >
                  <div className="grid h-[50px] w-[50px] shrink-0 place-items-center rounded-[12px] bg-[#e8f0fd]">
                    <Icon className="h-[28px] w-[28px] fill-[#0b5cf0] text-[#0b5cf0]" />
                  </div>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        'text-[13px] font-semibold text-[#0b2563]',
                        stat.labelGap,
                      )}
                    >
                      {stat.label}
                    </p>
                    <p className="mt-[8px] text-[25px] leading-none font-extrabold text-[#0b2563]">
                      {stat.value}
                    </p>
                    <p
                      className={cn(
                        'mt-[10px] flex items-center gap-[3px] text-[12px] font-semibold',
                        stat.up ? 'text-[#16a34a]' : 'text-[#ef4444]',
                      )}
                    >
                      {stat.up ? (
                        <icons.arrowUp className="h-[14px] w-[14px] stroke-[3]" />
                      ) : (
                        <icons.arrowDown className="h-[14px] w-[14px] stroke-[3]" />
                      )}
                      {stat.delta}
                    </p>
                    <p className="mt-[3px] text-[10.5px] text-[#6e86b6]">
                      par rapport au mois dernier
                    </p>
                  </div>
                </article>
              )
            })}
          </section>

          <section className="mt-[18px] grid grid-cols-1 items-start gap-[17px] xl:grid-cols-[minmax(0,1fr)_258px]">
            <div className="rounded-[8px] bg-white shadow-[0_1px_4px_rgba(16,50,120,.07)]">
              <div className="flex flex-wrap items-start gap-x-[18px] gap-y-3 px-[14px] pt-[12px] pb-[22px]">
                <label className="mt-[5px] flex h-[40px] min-w-[220px] flex-1 items-center gap-[12px] rounded-[6px] border border-[#c9d8f0] bg-white px-[11px] focus-within:border-[#0b5cf0]">
                  <icons.search className="h-[20px] w-[20px] shrink-0 text-[#0b5cf0]" />
                  <input
                    id="tableSearch"
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Rechercher un client par nom, email ou téléphone..."
                    className="w-full bg-transparent text-[12.5px] text-[#0b2563] outline-none placeholder:text-[#5f84cc]"
                  />
                </label>

                <div className="w-[155px]">
                  <label
                    htmlFor="statusFilter"
                    className="block text-[11.5px] leading-[14px] text-[#0b2563]"
                  >
                    Statut
                  </label>
                  <div className="relative mt-[4px]">
                    <select
                      id="statusFilter"
                      value={status}
                      onChange={(event) => setStatus(event.target.value)}
                      className="h-[36px] w-full appearance-none rounded-[6px] border border-[#c9d8f0] bg-white pr-8 pl-[11px] text-[12.5px] text-[#1f5bd6] outline-none focus:border-[#0b5cf0]"
                    >
                      <option>Tous</option>
                      <option>Actif</option>
                      <option>En attente</option>
                      <option>Inactif</option>
                    </select>
                    <icons.chevronDown className="pointer-events-none absolute top-1/2 right-[10px] h-[16px] w-[16px] -translate-y-1/2 stroke-[2.5] text-[#0b2563]" />
                  </div>
                </div>

                <div className="w-[166px]">
                  <label
                    htmlFor="dateFilter"
                    className="block text-[11.5px] leading-[14px] text-[#0b2563]"
                  >
                    Date d'inscription
                  </label>
                  <div className="relative mt-[4px]">
                    <select
                      id="dateFilter"
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                      className="h-[36px] w-full appearance-none rounded-[6px] border border-[#c9d8f0] bg-white pr-8 pl-[11px] text-[12.5px] text-[#1f5bd6] outline-none focus:border-[#0b5cf0]"
                    >
                      <option>Toutes les dates</option>
                      <option>7 derniers jours</option>
                      <option>30 derniers jours</option>
                      <option>12 derniers mois</option>
                    </select>
                    <icons.calendarSync className="pointer-events-none absolute top-1/2 right-[10px] h-[16px] w-[16px] -translate-y-1/2 text-[#0b5cf0]" />
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-[10px] flex h-[36px] w-[84px] items-center justify-center gap-[7px] rounded-[6px] border border-[#c5d6f4] bg-[#e8f0fd] text-[12.5px] font-medium text-[#1f5bd6] transition hover:bg-[#dbe8fc]"
                >
                  <icons.filter className="h-[16px] w-[16px]" />
                  Filtres
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[847px] table-fixed border-collapse text-left">
                  <colgroup>
                    <col style={{ width: 40 }} />
                    <col style={{ width: 153 }} />
                    <col style={{ width: 152 }} />
                    <col style={{ width: 127 }} />
                    <col style={{ width: 100 }} />
                    <col style={{ width: 156 }} />
                    <col style={{ width: 119 }} />
                  </colgroup>
                  <thead>
                    <tr className="h-[41px] border-b border-[#e4ecf8] text-[12.5px] font-semibold text-[#0b2563]">
                      <th className="pl-[16px] font-semibold">
                        <input
                          id="checkAll"
                          type="checkbox"
                          className="client-cb"
                          aria-label="Tout sélectionner"
                          checked={allChecked}
                          onChange={toggleAll}
                        />
                      </th>
                      <th className="pl-[14px] font-semibold">Client</th>
                      <th className="font-semibold">Email</th>
                      <th className="font-semibold">Téléphone</th>
                      <th className="font-semibold">Commandes</th>
                      <th className="font-semibold">Dernière commande</th>
                      <th className="font-semibold">Statut</th>
                    </tr>
                  </thead>
                  <tbody id="rows">
                    {visible.map((client) => (
                      <tr
                        key={client.name}
                        className="h-[47.5px] cursor-pointer border-b border-[#e4ecf8] hover:bg-[#f7faff]"
                        onClick={() => setActiveName(client.name)}
                      >
                        <td className="pl-[16px]">
                          <input
                            type="checkbox"
                            className="client-cb"
                            aria-label={`Sélectionner ${client.name}`}
                            checked={selected.includes(client.name)}
                            onChange={() => toggleRow(client.name)}
                            onClick={(event) => event.stopPropagation()}
                          />
                        </td>
                        <td className="pl-[9px]">
                          <div className="flex items-center gap-[14px]">
                            <span className="h-[32px] w-[32px] shrink-0 overflow-hidden rounded-full">
                              <img
                                src={client.photo}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </span>
                            <span className="truncate text-[13px] font-bold text-[#0b1f4d]">
                              {client.name}
                            </span>
                          </div>
                        </td>
                        <td className="truncate pr-2 text-[12.5px] text-[#1f5bd6]">
                          {client.email}
                        </td>
                        <td className="text-[12.5px] text-[#0b2563]">{client.phone}</td>
                        <td className="pl-[10px] text-[12.5px] text-[#0b2563]">
                          {client.orders}
                        </td>
                        <td>
                          <p className="text-[12.5px] leading-[15px] text-[#0b2563]">
                            {client.date}
                          </p>
                          <p className="text-[10.5px] leading-[13px] text-[#6e86b6]">
                            {client.time}
                          </p>
                        </td>
                        <td>
                          <StatusBadge status={client.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 px-[13px] pt-[27px] pb-[14px]">
                <p id="countText" className="text-[11px] text-[#6e86b6]">
                  {visible.length} sur 248 clients
                </p>
                <nav
                  id="pager"
                  className="flex items-center gap-[4px] text-[12px] font-medium text-[#0b2563]"
                  aria-label="Pagination"
                >
                  <button
                    type="button"
                    data-nav="prev"
                    className={cn(
                      'grid h-[32px] w-[32px] place-items-center rounded-[6px]',
                      page === 1
                        ? 'bg-[#e8f0fd] text-[#9bb6ea]'
                        : 'border border-[#0b5cf0] text-[#0b5cf0] hover:bg-[#e8f0fd]',
                    )}
                    aria-label="Page précédente"
                    onClick={() => movePage(-1)}
                  >
                    <icons.chevronLeft className="h-[16px] w-[16px] stroke-[2.5]" />
                  </button>
                  {pages.map((value, index) => (
                    <span key={value} className="contents">
                      {index === 5 ? (
                        <span className="grid h-[32px] w-[30px] place-items-center text-[#0b2563]">
                          …
                        </span>
                      ) : null}
                      <button
                        type="button"
                        data-page={value}
                        className={cn(
                          'pg h-[32px] rounded-[6px]',
                          value === 25 ? 'w-[34px]' : 'w-[30px]',
                          value === page
                            ? 'bg-[#0b5cf0] font-semibold text-white'
                            : 'text-[#0b2563] hover:bg-[#e8f0fd]',
                        )}
                        onClick={() => setPage(value)}
                      >
                        {value}
                      </button>
                    </span>
                  ))}
                  <button
                    type="button"
                    data-nav="next"
                    className="ml-[4px] grid h-[32px] w-[32px] place-items-center rounded-[6px] border border-[#0b5cf0] text-[#0b5cf0] hover:bg-[#e8f0fd]"
                    aria-label="Page suivante"
                    onClick={() => movePage(1)}
                  >
                    <icons.chevronRight className="h-[16px] w-[16px] stroke-[2.5]" />
                  </button>
                </nav>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-[17px] md:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-[8px] bg-white px-[17px] pt-[15px] pb-[17px] shadow-[0_1px_4px_rgba(16,50,120,.07)]">
                <h2 className="text-[15px] leading-[18px] font-bold text-[#0b2563]">
                  Profil client sélectionné
                </h2>

                <div className="mt-[14px] flex items-center gap-[14px]">
                  <div className="relative h-[62px] w-[62px] shrink-0">
                    <div
                      id="pfAvatar"
                      className="h-full w-full overflow-hidden rounded-full"
                    >
                      <img
                        src={active.photo}
                        alt={active.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="absolute right-[1px] bottom-[1px] h-[11px] w-[11px] rounded-full bg-[#16a34a] ring-2 ring-white" />
                  </div>
                  <div className="min-w-0">
                    <p
                      id="pfName"
                      className="text-[17px] leading-[20px] font-bold text-[#0b2563]"
                    >
                      {active.name}
                    </p>
                    <p id="pfEmail" className="mt-[5px] truncate text-[11px] text-[#1f5bd6]">
                      {active.email}
                    </p>
                    <p className="mt-[4px] flex items-center gap-[6px] text-[11px] text-[#1f5bd6]">
                      <span
                        id="pfDot"
                        className={cn('h-[7px] w-[7px] rounded-full', activeStatus.dot)}
                      />
                      <span id="pfStatus">{active.status}</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-[19px] flex h-[37px] w-full items-center justify-center gap-[9px] rounded-[5px] bg-[#0b5cf0] text-[12.5px] font-semibold text-white transition hover:bg-[#0a52d8]"
                >
                  <icons.plus className="h-[16px] w-[16px]" />
                  Voir le profil complet
                </button>

                <div className="mt-[22px] border-t border-[#e4ecf8] pt-[10px]">
                  <h3 className="text-[14.5px] leading-[18px] font-bold text-[#0b2563]">
                    Détails rapides
                  </h3>
                  <ul className="mt-[11px]">
                    <li className="flex h-[49px] gap-[14px]">
                      <icons.phone className="mt-[6px] h-[22px] w-[22px] shrink-0 text-[#0b5cf0]" />
                      <div>
                        <p className="text-[11.5px] leading-[15px] text-[#1f5bd6]">
                          Téléphone
                        </p>
                        <p
                          id="pfPhone"
                          className="mt-[3px] text-[12.5px] font-medium text-[#0b2563]"
                        >
                          {active.phone}
                        </p>
                      </div>
                    </li>
                    <li className="flex h-[49px] gap-[14px]">
                      <icons.cart className="mt-[6px] h-[22px] w-[22px] shrink-0 fill-[#0b5cf0] text-[#0b5cf0]" />
                      <div>
                        <p className="text-[11.5px] leading-[15px] text-[#1f5bd6]">
                          Total des commandes
                        </p>
                        <p
                          id="pfOrders"
                          className="mt-[3px] text-[12.5px] font-medium text-[#0b2563]"
                        >
                          {active.orders}
                        </p>
                      </div>
                    </li>
                    <li className="flex h-[49px] gap-[14px]">
                      <icons.wallet className="mt-[6px] h-[22px] w-[22px] shrink-0 text-[#0b5cf0]" />
                      <div>
                        <p className="text-[11.5px] leading-[15px] text-[#1f5bd6]">
                          Montant dépensé
                        </p>
                        <p
                          id="pfSpent"
                          className="mt-[3px] text-[12.5px] font-medium text-[#0b2563]"
                        >
                          {active.spent}
                        </p>
                      </div>
                    </li>
                    <li className="flex h-[49px] gap-[14px]">
                      <icons.calendarDays className="mt-[6px] h-[22px] w-[22px] shrink-0 text-[#0b5cf0]" />
                      <div>
                        <p className="text-[11.5px] leading-[15px] text-[#1f5bd6]">
                          Dernière commande
                        </p>
                        <p
                          id="pfLast"
                          className="mt-[3px] text-[12.5px] font-medium text-[#0b2563]"
                        >
                          {active.date}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-[8px] bg-white px-[17px] pt-[15px] pb-[24px] shadow-[0_1px_4px_rgba(16,50,120,.07)]">
                <h2 className="text-[14.5px] leading-[18px] font-bold text-[#0b2563]">
                  Statut des clients
                </h2>

                <div className="mt-[25px] flex items-center gap-[13px]">
                  <div className="relative h-[108px] w-[108px] shrink-0">
                    <svg
                      viewBox="0 0 108 108"
                      className="h-full w-full -rotate-90"
                      aria-hidden="true"
                    >
                      <circle
                        cx="54"
                        cy="54"
                        r="47"
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="13"
                        strokeDasharray="261.3 295.31"
                        strokeDashoffset="0"
                      />
                      <circle
                        cx="54"
                        cy="54"
                        r="47"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="13"
                        strokeDasharray="10.3 295.31"
                        strokeDashoffset="-264.3"
                      />
                      <circle
                        cx="54"
                        cy="54"
                        r="47"
                        fill="none"
                        stroke="#f5a623"
                        strokeWidth="13"
                        strokeDasharray="19.2 295.31"
                        strokeDashoffset="-276.1"
                      />
                    </svg>
                    <div className="absolute inset-0 grid place-content-center text-center">
                      <span className="text-[16px] leading-[18px] font-extrabold text-[#0b2563]">
                        248
                      </span>
                      <span className="text-[11px] leading-[14px] text-[#0b2563]">
                        clients
                      </span>
                    </div>
                  </div>

                  <ul className="flex-1 space-y-[12px] text-[10px]">
                    <li className="flex items-center gap-[8px] text-[#0b2563]">
                      <span className="h-[8px] w-[8px] rounded-full bg-[#16a34a]" />
                      Actifs
                      <span className="ml-auto text-[#6e86b6]">89% (221)</span>
                    </li>
                    <li className="flex items-center gap-[8px] text-[#0b2563]">
                      <span className="h-[8px] w-[8px] rounded-full bg-[#f5a623]" />
                      En attente
                      <span className="ml-auto text-[#6e86b6]">7% (18)</span>
                    </li>
                    <li className="flex items-center gap-[8px] text-[#0b2563]">
                      <span className="h-[8px] w-[8px] rounded-full bg-[#ef4444]" />
                      Inactifs
                      <span className="ml-auto text-[#6e86b6]">4% (9)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
