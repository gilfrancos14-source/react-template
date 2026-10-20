import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { icons } from '../components/icons'
import { products } from '../data/mock'
import { cn } from '../lib/cn'

const CARD = 'rounded-xl bg-white shadow-[0_2px_12px_rgba(20,60,160,0.06)]'
const NAV_ITEM =
  'flex h-[50px] items-center gap-[18px] rounded-lg px-[18px] text-left text-[14.5px] text-white hover:bg-white/10'
const NAV_ICON = 'h-6 w-6 shrink-0 fill-current text-white/85 [fill-opacity:.25]'
const BADGE =
  'flex h-6 w-6 items-center justify-center rounded-full bg-[#0b6bff] text-[12px] font-medium'

const portrait = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=160&h=160&q=80&crop=faces`

const adminPhoto = portrait('1566492031773-4f4e44671857')

const stats = [
  {
    icon: 'cart',
    label: "Chiffre d'affaires total",
    value: '3 420 000 FCFA',
    delta: '+18%',
  },
  { icon: 'truck', label: 'Nombre de commandes', value: '248', delta: '+12%' },
  { icon: 'user', label: 'Nouveaux clients', value: '96', delta: '+20%' },
  { icon: 'box', label: 'Produits vendus', value: '312', delta: '+15%' },
] satisfies { icon: keyof typeof icons; label: string; value: string; delta: string }[]

const legend = [
  { name: 'Livrées', color: '#0b6bff', value: '68%' },
  { name: 'En cours', color: '#fbb024', value: '16%' },
  { name: 'Expédiées', color: '#7c3aed', value: '12%' },
  { name: 'Annulées', color: '#ef4444', value: '4%' },
]

const sales = [
  0.27, 0.4, 0.6, 0.59, 0.6, 0.78, 0.88, 0.87, 1.05, 1.24, 1.15, 1.05, 1.22, 1.03, 1.12, 1.32,
  1.5, 1.49, 1.5, 1.69,
].map((value) => value / 2)

const points = sales.map((value, index) => [
  (index / (sales.length - 1)) * 100,
  100 - value * 100,
])

const xLabels = [
  '20/10',
  '24/10',
  '28/10',
  '01/11',
  '05/11',
  '09/11',
  '13/11',
  '17/11',
  '20/11',
]

const yLabels = ['0', '500 000', '1 000 000', '1 500 000', '2 000 000']

type OrderStatus = 'Livrée' | 'Expédiée' | 'En cours'

const statusStyles: Record<OrderStatus, { pill: string; dot: string }> = {
  Livrée: { pill: 'bg-[#dcfce7] text-[#16a34a]', dot: 'bg-[#16a34a]' },
  Expédiée: { pill: 'bg-[#dbeafe] text-[#2563eb]', dot: 'bg-[#2563eb]' },
  'En cours': { pill: 'bg-[#dbeafe] text-[#2563eb]', dot: 'bg-[#2563eb]' },
}

const latestOrders: {
  id: string
  name: string
  email: string
  amount: string
  status: OrderStatus
  date: string
  time: string
  photo: string
}[] = [
  {
    id: '#CMD-001248',
    name: 'Koffi S.',
    email: 'koffi@gmail.com',
    amount: '45 000 FCFA',
    status: 'Livrée',
    date: '20/11/2025',
    time: '14:32',
    photo: portrait('1519085360753-af0119f7cbe7'),
  },
  {
    id: '#CMD-001247',
    name: 'Aminata D.',
    email: 'aminata@gmail.com',
    amount: '120 000 FCFA',
    status: 'Expédiée',
    date: '20/11/2025',
    time: '11:20',
    photo: portrait('1580489944761-15a19d654956'),
  },
  {
    id: '#CMD-001246',
    name: 'Yao M.',
    email: 'yao@gmail.com',
    amount: '32 000 FCFA',
    status: 'Livrée',
    date: '19/11/2025',
    time: '16:45',
    photo: portrait('1506794778202-cad84cf45f1d'),
  },
  {
    id: '#CMD-001245',
    name: 'Fatou B.',
    email: 'fatou@gmail.com',
    amount: '28 000 FCFA',
    status: 'En cours',
    date: '19/11/2025',
    time: '10:12',
    photo: portrait('1531123897727-8f129e1688ce'),
  },
  {
    id: '#CMD-001244',
    name: 'Sika T.',
    email: 'sika@gmail.com',
    amount: '75 000 FCFA',
    status: 'Expédiée',
    date: '18/11/2025',
    time: '19:05',
    photo: portrait('1534528741775-53994a69daeb'),
  },
]

const topProducts = [
  { ...products[0], sales: '48 ventes', share: '15%' },
  { ...products[1], sales: '42 ventes', share: '13%' },
  { ...products[2], sales: '36 ventes', share: '11%' },
  { ...products[3], sales: '28 ventes', share: '9%' },
  { ...products[4], sales: '24 ventes', share: '8%' },
]

const categories = [
  { icon: 'smartphone', name: 'Électronique', share: 28 },
  { icon: 'shirt', name: 'Mode', share: 22 },
  { icon: 'watch', name: 'Accessoires', share: 18 },
  { icon: 'home', name: 'Maison & Déco', share: 12 },
  { icon: 'dumbbell', name: 'Sport', share: 10 },
  { icon: 'package', name: 'Autres', share: 10 },
] satisfies { icon: keyof typeof icons; name: string; share: number }[]

export function Reports() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    document.title = 'NovaTech – Rapports'
  }, [])

  return (
    <div className="min-h-screen bg-[#f4f7fd] text-[#0a2a7a] antialiased">
      {sidebarOpen ? (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      <aside
        id="sidebar"
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-[270px] flex-col transition-transform duration-300 lg:translate-x-0',
          'bg-gradient-to-b from-[#0a3ba8] via-[#072b84] to-[#041851]',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-[90px] items-center gap-3 px-[30px]">
          <svg width="40" height="46" viewBox="0 0 40 46" fill="none" aria-hidden="true">
            <path d="M20 1 38 11v24L20 45 2 35V11z" fill="#1d6bff" />
            <path d="M20 1 38 11 20 21 2 11z" fill="#4d93ff" />
            <path d="M20 14l8 4.5v9L20 32l-8-4.5v-9z" fill="#0a2a7a" />
          </svg>
          <span className="text-[26px] font-semibold tracking-tight text-white">NovaTech</span>
        </div>

        <nav className="mt-[2px] flex flex-col gap-[2px] px-[15px]">
          <Link to="/" className={NAV_ITEM} onClick={() => setSidebarOpen(false)}>
            <icons.home className={NAV_ICON} />
            <span className="flex-1">Tableau de bord</span>
          </Link>
          <Link to="/commandes" className={NAV_ITEM} onClick={() => setSidebarOpen(false)}>
            <icons.cart className={NAV_ICON} />
            <span className="flex-1">Commandes</span>
            <span className={BADGE}>12</span>
          </Link>
          <Link to="/produits" className={NAV_ITEM} onClick={() => setSidebarOpen(false)}>
            <icons.package className={NAV_ICON} />
            <span className="flex-1">Produits</span>
          </Link>
          <Link to="/clients" className={NAV_ITEM} onClick={() => setSidebarOpen(false)}>
            <icons.user className={NAV_ICON} />
            <span className="flex-1">Clients</span>
          </Link>
          <Link
            to="/rapports"
            className={cn(
              NAV_ITEM,
              'bg-[#0b5cff] shadow-[0_6px_16px_rgba(11,92,255,0.4)]',
            )}
          >
            <icons.chart className={cn(NAV_ICON, 'text-white')} />
            <span className="flex-1">Rapports</span>
            <span className={cn(BADGE, 'bg-white/25')}>3</span>
          </Link>
          <Link to="/messages" className={NAV_ITEM} onClick={() => setSidebarOpen(false)}>
            <icons.message className={NAV_ICON} />
            <span className="flex-1">Messages</span>
            <span className={BADGE}>3</span>
          </Link>
        </nav>

        <div className="mt-auto p-[23px] pb-[84px]">
          <div className="rounded-xl border border-[#2f63d6]/60 bg-[#0a3290]/70 px-[22px] pt-[22px] pb-[22px] text-center">
            <icons.crown className="mx-auto h-7 w-7 fill-white text-white" />
            <h3 className="mt-3 text-[15px] font-semibold text-white">
              Passez à la version Pro
            </h3>
            <p className="mt-3 text-[12.5px] leading-[1.7] text-white/85">
              Profitez de plus de fonctionnalités pour faire grandir votre activité.
            </p>
            <button
              type="button"
              className="mt-5 h-[46px] w-full rounded-lg bg-[#0b5cff] text-[14px] font-medium text-white transition hover:bg-[#2a72ff]"
            >
              Voir les offres
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-[270px]">
        <header className="flex h-[75px] items-center gap-4 bg-white px-4 sm:px-[25px]">
          <button
            type="button"
            className="rounded-lg p-2 text-[#0a2a7a] hover:bg-[#eaf1ff] lg:hidden"
            aria-label="Ouvrir le menu"
            onClick={() => setSidebarOpen(true)}
          >
            <icons.menu className="h-6 w-6" />
          </button>
          <label className="flex h-[40px] w-full max-w-[548px] items-center gap-3 rounded-lg bg-[#eaf1ff] px-4">
            <icons.search className="h-5 w-5 shrink-0 text-[#2a5bd7]" />
            <input
              type="text"
              placeholder="Rechercher une commande, un client, un produit..."
              className="w-full bg-transparent text-[13px] text-[#0a2a7a] outline-none placeholder:text-[#6f8fd8]"
            />
          </label>
          <div className="ml-auto flex items-center gap-4 sm:gap-8">
            <button type="button" className="relative" aria-label="Notifications">
              <icons.bell className="h-7 w-7 text-[#0b5cff]" />
              <span className="absolute -top-2 -right-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#ef3b3b] text-[10px] font-semibold text-white">
                3
              </span>
            </button>
            <div className="flex items-center gap-3">
              <div className="relative flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#8a5a3c] to-[#3b2418] text-[15px] font-semibold text-white">
                BG
                <img
                  src={adminPhoto}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="hidden leading-tight sm:block">
                <div className="text-[15px] font-semibold text-[#0a2a7a]">Bidosessi G.</div>
                <div className="mt-0.5 text-[14px] text-[#6f86c4]">Administrateur</div>
              </div>
              <icons.chevronDown className="ml-3 hidden h-4 w-4 text-[#6f86c4] sm:block" />
            </div>
          </div>
        </header>

        <main className="px-4 pt-[25px] pb-8 sm:px-[25px]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_2px_8px_rgba(11,92,255,0.12)]">
                <icons.chart className="h-7 w-7 text-[#0b5cff]" strokeWidth={3} />
              </div>
              <div>
                <h1 className="text-[30px] leading-[34px] font-bold text-[#0a2a7a]">
                  Rapports
                </h1>
                <p className="mt-1.5 text-[14px] text-[#4a6bc0]">
                  Analysez les performances de votre boutique et prenez les bonnes décisions.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="flex h-[44px] items-center gap-3 rounded-lg border border-[#e3ebfa] bg-white px-4 text-[13px] text-[#0a2a7a]"
              >
                <icons.calendar className="h-5 w-5 text-[#0b5cff]" />
                <span>20/10/2025</span>
                <icons.arrowRight className="h-4 w-4 text-[#0b5cff]" />
                <span>20/11/2025</span>
                <icons.chevronDown className="ml-1 h-4 w-4 text-[#0a2a7a]" />
              </button>
              <button
                type="button"
                className="flex h-[44px] items-center gap-2.5 rounded-lg bg-[#0b5cff] px-5 text-[14px] font-medium text-white shadow-[0_6px_14px_rgba(11,92,255,0.3)] transition hover:bg-[#2a72ff]"
              >
                <icons.download className="h-[18px] w-[18px]" />
                Exporter le rapport
              </button>
            </div>
          </div>

          <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = icons[stat.icon]
              return (
                <article
                  key={stat.label}
                  className="flex gap-4 rounded-xl bg-white px-4 py-[18px] shadow-[0_2px_12px_rgba(20,60,160,0.06)]"
                >
                  <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-xl bg-[#e4ecff]">
                    <Icon className="h-6 w-6 fill-current text-[#2a6bff] [fill-opacity:.3]" />
                  </div>
                  <div>
                    <div className="text-[13px] text-[#0a2a7a]">{stat.label}</div>
                    <div className="mt-1 text-[27px] leading-[34px] font-bold text-[#0a2a7a]">
                      {stat.value}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-[13px] font-semibold text-[#16a34a]">
                      <icons.arrowUp className="h-4 w-4" />
                      {stat.delta}
                    </div>
                    <div className="mt-1 text-[11.5px] text-[#6f86c4]">
                      par rapport au mois dernier
                    </div>
                  </div>
                </article>
              )
            })}
          </section>

          <div className="mt-5 grid grid-cols-1 gap-[18px] xl:grid-cols-[1fr_340px]">
            <div className="flex min-w-0 flex-col gap-[18px]">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[512px_1fr]">
                <section className={cn('min-w-0 p-[18px]', CARD)}>
                  <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-2.5 text-[15px] font-semibold text-[#0a2a7a]">
                      <icons.trendingUp className="h-5 w-5 text-[#0b5cff]" />
                      Évolution des ventes
                    </h2>
                    <span className="flex items-center gap-1.5 text-[11px] text-[#3a5bb8]">
                      <span className="h-2 w-2 rounded-full bg-[#0b6bff]" />
                      Chiffre d'affaires
                    </span>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <div className="relative h-[160px] w-[52px] shrink-0 text-[11px] text-[#3a5bb8]">
                      {yLabels.map((label, index) => (
                        <span
                          key={label}
                          className="absolute right-0 translate-y-1/2 leading-none"
                          style={{ bottom: `${index * 25}%` }}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="relative h-[160px] border-b border-l border-[#e6edfa]">
                        <svg
                          className="absolute inset-0 h-full w-full"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          <defs>
                            <linearGradient
                              id="reports-area"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop offset="0" stopColor="#0b6bff" stopOpacity=".22" />
                              <stop offset="1" stopColor="#0b6bff" stopOpacity=".02" />
                            </linearGradient>
                          </defs>
                          <g
                            stroke="#e6edfa"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          >
                            {[0, 25, 50, 75].map((y) => (
                              <line key={`h-${y}`} x1="0" x2="100" y1={y} y2={y} />
                            ))}
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                              <line
                                key={`v-${index}`}
                                y1="0"
                                y2="100"
                                x1={(index * 100) / 8}
                                x2={(index * 100) / 8}
                              />
                            ))}
                          </g>
                          <polygon
                            points={`${points
                              .map((point) => point.join(','))
                              .join(' ')} 100,100 0,100`}
                            fill="url(#reports-area)"
                          />
                          <polyline
                            points={points.map((point) => point.join(',')).join(' ')}
                            fill="none"
                            stroke="#0b6bff"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                        {points.map((point) => (
                          <span
                            key={`dot-${point[0]}`}
                            className="absolute h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0b6bff] bg-white"
                            style={{ left: `${point[0]}%`, top: `${point[1]}%` }}
                          />
                        ))}
                      </div>
                      <div className="mt-3 flex justify-between text-[11px] text-[#3a5bb8]">
                        {xLabels.map((label) => (
                          <span key={label}>{label}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <section className={cn('p-[18px]', CARD)}>
                  <h2 className="flex items-center gap-2.5 text-[15px] font-semibold text-[#0a2a7a]">
                    <icons.pieChart className="h-5 w-5 text-[#0b5cff]" />
                    Répartition des commandes
                  </h2>
                  <div className="mt-4 flex flex-col items-center gap-4">
                    <div
                      className="relative h-[118px] w-[118px] shrink-0 rounded-full"
                      style={{
                        background:
                          'conic-gradient(#0b6bff 0 68%,#fbb024 68% 84%,#7c3aed 84% 96%,#ef4444 96% 100%)',
                      }}
                    >
                      <div className="absolute inset-[18px] flex flex-col items-center justify-center rounded-full bg-white shadow-[0_0_0_1px_rgba(20,60,160,0.05)]">
                        <span className="text-[20px] leading-none font-bold text-[#0a2a7a]">
                          248
                        </span>
                        <span className="mt-0.5 text-[11.5px] text-[#0a2a7a]">
                          commandes
                        </span>
                      </div>
                    </div>
                    <ul className="grid w-full grid-cols-2 gap-x-3 gap-y-2 text-[10.5px] text-[#0a2a7a]">
                      {legend.map((item) => (
                        <li key={item.name} className="flex items-center gap-1.5">
                          <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ background: item.color }}
                          />
                          <span className="flex-1">{item.name}</span>
                          <span className="font-medium">{item.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </div>

              <section className={cn('overflow-hidden', CARD)}>
                <div className="flex items-center justify-between px-[18px] pt-5 pb-[14px]">
                  <h2 className="flex items-center gap-2.5 text-[15px] font-semibold text-[#0a2a7a]">
                    <icons.cart className="h-5 w-5 text-[#0b5cff]" />
                    Dernières commandes
                  </h2>
                  <Link
                    to="/commandes"
                    className="mr-3 flex items-center gap-1.5 text-[12px] font-medium text-[#0b5cff]"
                  >
                    Voir tout
                    <icons.arrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left text-[13px]">
                    <thead>
                      <tr className="h-[38px] bg-[#f6f9ff] text-[12.5px] font-normal text-[#3a5bb8]">
                        <th className="pl-[21px] font-normal">N° commande</th>
                        <th className="font-normal">Client</th>
                        <th className="font-normal">Montant</th>
                        <th className="font-normal">Statut</th>
                        <th className="font-normal">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {latestOrders.map((order) => (
                        <tr key={order.id} className="h-[50px] border-t border-[#eef2fb]">
                          <td className="pl-[21px] text-[13px] font-medium text-[#0a2a7a]">
                            {order.id}
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="relative flex h-[37px] w-[37px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#9a6a48] to-[#3b2418] text-[12px] font-semibold text-white">
                                {order.name.slice(0, 1)}
                                <img
                                  src={order.photo}
                                  alt=""
                                  className="absolute inset-0 h-full w-full object-cover"
                                />
                              </div>
                              <div className="leading-[17px]">
                                <div className="text-[12.5px] text-[#0a2a7a]">
                                  {order.name}
                                </div>
                                <div className="text-[11.5px] text-[#6f86c4]">
                                  {order.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="text-[13px] text-[#0a2a7a]">{order.amount}</td>
                          <td>
                            <span
                              className={cn(
                                'inline-flex h-[24px] items-center gap-2 rounded-full px-3.5 text-[11.5px]',
                                statusStyles[order.status].pill,
                              )}
                            >
                              <span
                                className={cn(
                                  'h-2 w-2 rounded-full',
                                  statusStyles[order.status].dot,
                                )}
                              />
                              {order.status}
                            </span>
                          </td>
                          <td className="text-[11.5px] leading-[17px] text-[#6f86c4]">
                            {order.date}
                            <br />
                            {order.time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="h-6" />
              </section>
            </div>

            <div className="flex flex-col gap-[18px]">
              <section className={cn('px-[18px] pt-5 pb-3', CARD)}>
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2.5 text-[15px] font-semibold text-[#0a2a7a]">
                    <icons.trophy className="h-5 w-5 text-[#0b5cff]" />
                    Produits les plus vendus
                  </h2>
                  <Link
                    to="/produits"
                    className="flex items-center gap-1 text-[11px] font-medium text-[#0b5cff]"
                  >
                    Voir tout
                    <icons.arrowRight className="h-3 w-3" />
                  </Link>
                </div>
                <ul className="mt-3">
                  {topProducts.map((product, index) => (
                    <li
                      key={product.ref}
                      className={cn(
                        'flex items-center gap-3 py-[7px]',
                        index > 0 && 'border-t border-[#eef2fb]',
                      )}
                    >
                      <div
                        className="flex h-[50px] w-[50px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#e6edfa] bg-[#f1f4f9]"
                        title="Remplacer par la photo du produit"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 leading-[18px]">
                        <div className="text-[12px] text-[#0a2a7a]">{product.name}</div>
                        <div className="text-[11px] text-[#6f86c4]">{product.sales}</div>
                      </div>
                      <span className="text-[12px] text-[#0a2a7a]">{product.share}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className={cn('px-[18px] pt-5 pb-4', CARD)}>
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2.5 text-[15px] font-semibold text-[#0a2a7a]">
                    <icons.pieChart className="h-5 w-5 text-[#0b5cff]" />
                    Ventes par catégorie
                  </h2>
                  <Link
                    to="/produits"
                    className="flex items-center gap-1 text-[11px] font-medium text-[#0b5cff]"
                  >
                    Voir tout
                    <icons.arrowRight className="h-3 w-3" />
                  </Link>
                </div>
                <ul className="mt-3 space-y-[10px]">
                  {categories.map((category) => {
                    const Icon = icons[category.icon]
                    return (
                      <li key={category.name} className="flex items-center gap-3">
                        <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#e4ecff]">
                          <Icon className="h-[18px] w-[18px] text-[#0b5cff]" />
                        </div>
                        <div className="flex-1">
                          <div className="text-[12px] text-[#0a2a7a]">{category.name}</div>
                          <div className="mt-1.5 h-[5px] rounded-full bg-[#e6edfa]">
                            <div
                              className="h-full rounded-full bg-[#0b6bff]"
                              style={{ width: `${category.share * 1.72}%` }}
                            />
                          </div>
                        </div>
                        <span className="w-9 text-right text-[12px] text-[#0a2a7a]">
                          {category.share}%
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
