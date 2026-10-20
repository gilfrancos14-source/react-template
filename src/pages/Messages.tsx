import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { icons } from '../components/icons'
import { cn } from '../lib/cn'

const portrait = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=160&h=160&q=80&crop=faces`

function Avatar({
  photo,
  alt = '',
  className,
}: {
  photo: string
  alt?: string
  className: string
}) {
  return (
    <span
      className={cn('block shrink-0 overflow-hidden rounded-full bg-[#cfdcf6]', className)}
    >
      <img src={photo} alt={alt} className="h-full w-full object-cover" />
    </span>
  )
}

type Message = {
  id: string
  from: 'me' | 'them'
  text: string
  time: string
  width?: string
  timeGap: string
}

type Conversation = {
  id: string
  name: string
  photo: string
  time: string
  timeClass: string
  preview: string
  previewClass: string
  previewGap: string
  unread: boolean
  height: string
  avatarSize: string
  nameClass: string
}

const admin = { photo: portrait('1566492031773-4f4e44671857') }

const conversations: Conversation[] = [
  {
    id: 'aminata',
    name: 'Aminata D.',
    photo: portrait('1580489944761-15a19d654956'),
    time: '14:32',
    timeClass: 'text-[13px] text-[#3b5fd9]',
    preview: 'Bonjour, est-ce que ce produit...',
    previewClass: 'text-[13.5px] text-[#2a45a8]',
    previewGap: 'mt-[5px]',
    unread: true,
    height: 'h-[96px]',
    avatarSize: 'h-[62px] w-[62px]',
    nameClass: 'text-[15px] font-bold',
  },
  {
    id: 'koffi',
    name: 'Koffi S.',
    photo: portrait('1519085360753-af0119f7cbe7'),
    time: '13:50',
    timeClass: 'text-[13px] text-[#3b5fd9]',
    preview: 'Merci beaucoup ! 🙏',
    previewClass: 'text-[13.5px] text-[#2a45a8]',
    previewGap: 'mt-[5px]',
    unread: true,
    height: 'h-[91px]',
    avatarSize: 'h-[62px] w-[62px]',
    nameClass: 'text-[15px] font-bold',
  },
  {
    id: 'sika',
    name: 'Sika T.',
    photo: portrait('1534528741775-53994a69daeb'),
    time: '12:15',
    timeClass: 'text-[13px] text-[#3b5fd9]',
    preview: "D'accord, je valide ma commande.",
    previewClass: 'text-[13.5px] text-[#2a45a8]',
    previewGap: 'mt-[5px]',
    unread: true,
    height: 'h-[86px]',
    avatarSize: 'h-[62px] w-[62px]',
    nameClass: 'text-[15px] font-bold',
  },
  {
    id: 'yao',
    name: 'Yao M.',
    photo: portrait('1506794778202-cad84cf45f1d'),
    time: 'Hier',
    timeClass: 'text-[12px] text-[#5470c8]',
    preview: 'Quand est-ce que ma commande...',
    previewClass: 'text-[13.5px] text-[#2a45a8]',
    previewGap: 'mt-[5px]',
    unread: false,
    height: 'h-[80px]',
    avatarSize: 'h-[60px] w-[60px]',
    nameClass: 'text-[15px] font-bold',
  },
  {
    id: 'fati',
    name: 'Fati B.',
    photo: portrait('1544005313-94ddf0286df2'),
    time: 'Hier',
    timeClass: 'text-[12px] text-[#5470c8]',
    preview: 'Parfait, merci !',
    previewClass: 'text-[13.5px] text-[#2a45a8]',
    previewGap: 'mt-[5px]',
    unread: false,
    height: 'h-[80px]',
    avatarSize: 'h-[62px] w-[62px]',
    nameClass: 'text-[15px] font-bold',
  },
  {
    id: 'rachid',
    name: 'Rachid A.',
    photo: portrait('1500648767791-00dcc994a43e'),
    time: 'Mar. 19 oct.',
    timeClass: 'text-[11.5px] text-[#5470c8]',
    preview: "Est-ce possible de modifier l'adresse ?",
    previewClass: 'text-[12px] text-[#2a45a8]',
    previewGap: 'mt-[4px]',
    unread: false,
    height: 'h-[70px]',
    avatarSize: 'h-[58px] w-[58px]',
    nameClass: 'text-[14.5px] font-bold',
  },
  {
    id: 'marian',
    name: 'Marian K.',
    photo: portrait('1494790108377-be9c29b29330'),
    time: 'Mar. 19 oct.',
    timeClass: 'text-[11.5px] text-[#5470c8]',
    preview: 'Très bien, merci.',
    previewClass: 'text-[12px] text-[#2a45a8]',
    previewGap: 'mt-[4px]',
    unread: false,
    height: 'h-[70px]',
    avatarSize: 'h-[58px] w-[58px]',
    nameClass: 'text-[14.5px] font-bold',
  },
  {
    id: 'diallo',
    name: 'Diallo M.',
    photo: portrait('1531384441138-2736e62e0919'),
    time: 'Lun. 18 oct.',
    timeClass: 'text-[11.5px] text-[#5470c8]',
    preview: "Ok, c'est noté.",
    previewClass: 'text-[12px] text-[#2a45a8]',
    previewGap: 'mt-[4px]',
    unread: false,
    height: 'h-[66px]',
    avatarSize: 'h-[56px] w-[56px]',
    nameClass: 'text-[14.5px] font-bold',
  },
]

const initialThreads: Record<string, Message[]> = {
  aminata: [
    {
      id: 'a1',
      from: 'them',
      text: 'Bonjour, est-ce que ce produit est encore disponible ?',
      time: '14:20',
      width: 'w-[368px]',
      timeGap: 'mt-[4px]',
    },
    {
      id: 'a2',
      from: 'me',
      text: "Bonjour ! Oui, il est bien disponible. Souhaitez-vous plus d'informations ?",
      time: '14:23',
      width: 'w-[320px]',
      timeGap: 'mt-[6px]',
    },
    {
      id: 'a3',
      from: 'them',
      text: 'Oui, pouvez-vous me dire le délai de livraison pour Cotonou ?',
      time: '14:28',
      width: 'w-[391px]',
      timeGap: 'mt-[12px]',
    },
    {
      id: 'a4',
      from: 'me',
      text: 'Bien sûr, la livraison prend généralement entre 2 et 5 jours ouvrés à Cotonou.',
      time: '14:30',
      width: 'w-[329px]',
      timeGap: 'mt-[8px]',
    },
    {
      id: 'a5',
      from: 'them',
      text: 'Parfait, merci beaucoup ! 🙏',
      time: '14:32',
      width: 'w-[284px]',
      timeGap: 'mt-[5px]',
    },
  ],
  koffi: [
    {
      id: 'k1',
      from: 'me',
      text: 'Avec plaisir, bonne réception !',
      time: '13:47',
      timeGap: 'mt-[6px]',
    },
    {
      id: 'k2',
      from: 'them',
      text: 'Merci beaucoup ! 🙏',
      time: '13:50',
      timeGap: 'mt-[6px]',
    },
  ],
  sika: [
    {
      id: 's1',
      from: 'me',
      text: 'Votre commande est bien confirmée.',
      time: '12:10',
      timeGap: 'mt-[6px]',
    },
    {
      id: 's2',
      from: 'them',
      text: "D'accord, je valide ma commande.",
      time: '12:15',
      timeGap: 'mt-[6px]',
    },
  ],
  yao: [
    {
      id: 'y1',
      from: 'them',
      text: 'Quand est-ce que ma commande sera livrée ?',
      time: 'Hier',
      timeGap: 'mt-[6px]',
    },
  ],
  fati: [
    {
      id: 'f1',
      from: 'me',
      text: 'Votre colis est arrivé à destination.',
      time: 'Hier',
      timeGap: 'mt-[6px]',
    },
    {
      id: 'f2',
      from: 'them',
      text: 'Parfait, merci !',
      time: 'Hier',
      timeGap: 'mt-[6px]',
    },
  ],
  rachid: [
    {
      id: 'r1',
      from: 'them',
      text: "Est-ce possible de modifier l'adresse ?",
      time: 'Mar. 19 oct.',
      timeGap: 'mt-[6px]',
    },
  ],
  marian: [
    {
      id: 'm1',
      from: 'them',
      text: 'Très bien, merci.',
      time: 'Mar. 19 oct.',
      timeGap: 'mt-[6px]',
    },
  ],
  diallo: [
    {
      id: 'd1',
      from: 'them',
      text: "Ok, c'est noté.",
      time: 'Lun. 18 oct.',
      timeGap: 'mt-[6px]',
    },
  ],
}

type Tab = 'all' | 'unread' | 'archived'

const NAV_ITEM =
  'flex w-full items-center gap-[21px] px-5 text-left text-[14px] font-medium'

function currentTime() {
  return new Date().toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function messageId() {
  return `sent-${Date.now()}`
}

export function Messages() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tab, setTab] = useState<Tab>('all')
  const [query, setQuery] = useState('')
  const [convos, setConvos] = useState(conversations)
  const [threads, setThreads] = useState(initialThreads)
  const [activeId, setActiveId] = useState('aminata')
  const [mobileChat, setMobileChat] = useState(false)
  const [draft, setDraft] = useState('')
  const messagesRef = useRef<HTMLDivElement>(null)

  const active = convos.find((conversation) => conversation.id === activeId) ?? convos[0]
  const thread = threads[activeId] ?? []
  const unreadCount = convos.filter((conversation) => conversation.unread).length

  const needle = query.trim().toLowerCase()
  const visible = convos.filter((conversation) => {
    if (tab === 'archived') return false
    if (tab === 'unread' && !conversation.unread) return false
    if (!needle) return true

    return `${conversation.name} ${conversation.preview}`.toLowerCase().includes(needle)
  })

  useEffect(() => {
    document.title = 'NovaTech – Messages'
  }, [])

  useEffect(() => {
    document.documentElement.classList.add('no-scrollbar')

    return () => document.documentElement.classList.remove('no-scrollbar')
  }, [])

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      const node = messagesRef.current
      if (node) node.scrollTop = node.scrollHeight
    })
  }

  const openConversation = (id: string) => {
    setActiveId(id)
    setMobileChat(true)
    setConvos((current) =>
      current.map((conversation) =>
        conversation.id === id ? { ...conversation, unread: false } : conversation,
      ),
    )
    scrollToBottom()
  }

  const sendMessage = () => {
    const text = draft.trim()
    if (!text) return

    const time = currentTime()

    setThreads((current) => ({
      ...current,
      [activeId]: [
        ...(current[activeId] ?? []),
        {
          id: messageId(),
          from: 'me',
          text,
          time,
          timeGap: 'mt-[6px]',
        },
      ],
    }))
    setConvos((current) =>
      current.map((conversation) =>
        conversation.id === activeId
          ? { ...conversation, preview: text, time, unread: false }
          : conversation,
      ),
    )
    setDraft('')
    scrollToBottom()
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'all', label: 'Toutes (12)' },
    { key: 'unread', label: `Non lus (${unreadCount})` },
    { key: 'archived', label: 'Archivés' },
  ]

  return (
    <div className="min-h-screen bg-[#f4f7fe] text-[#0a1f66] antialiased">
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
          'fixed inset-y-0 left-0 z-40 flex w-[274px] flex-col overflow-y-auto bg-gradient-to-b from-[#0b3399] to-[#07216e] text-white transition-transform duration-200 no-scrollbar lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-[96px] shrink-0 items-center px-[35px]">
          <svg
            className="h-[46px] w-[41px] shrink-0"
            viewBox="0 0 46 50"
            fill="none"
            aria-hidden="true"
          >
            <polygon points="23,2 43,13.5 43,36.5 23,48 3,36.5 3,13.5" fill="#1a62ff" />
            <polygon points="23,2 43,13.5 23,25 3,13.5" fill="#4d8bff" />
            <polygon points="23,25 43,13.5 43,36.5 23,48" fill="#0b3fc9" />
            <polygon points="23,13 33,19 33,31 23,37 13,31 13,19" fill="#0a2a8c" />
            <polygon points="23,13 33,19 23,25 13,19" fill="#2f6fff" />
          </svg>
          <span className="ml-[14px] text-[26px] font-semibold tracking-tight">
            NovaTech
          </span>
          <icons.chevronRight className="ml-auto h-5 w-5 text-white/80" />
        </div>

        <nav className="mt-[10px] px-[11px]">
          <ul>
            <li className="flex h-[55px] items-center">
              <Link to="/" className={NAV_ITEM} onClick={() => setSidebarOpen(false)}>
                <icons.home className="h-6 w-6 fill-white" />
                Tableau de bord
              </Link>
            </li>
            <li className="flex h-[55px] items-center">
              <Link
                to="/commandes"
                className={NAV_ITEM}
                onClick={() => setSidebarOpen(false)}
              >
                <icons.cart className="h-6 w-6 fill-white" />
                Commandes
                <span className="ml-auto grid h-[26px] w-[26px] place-items-center rounded-full bg-[#1a5cff] text-[11.5px] font-semibold">
                  12
                </span>
              </Link>
            </li>
            <li className="flex h-[55px] items-center">
              <Link
                to="/produits"
                className={NAV_ITEM}
                onClick={() => setSidebarOpen(false)}
              >
                <icons.box className="h-6 w-6 fill-white" />
                Produits
              </Link>
            </li>
            <li className="flex h-[55px] items-center">
              <Link
                to="/clients"
                className={NAV_ITEM}
                onClick={() => setSidebarOpen(false)}
              >
                <icons.user className="h-6 w-6 fill-white" />
                Clients
              </Link>
            </li>
            <li className="flex h-[55px] items-center">
              <Link
                to="/rapports"
                className={NAV_ITEM}
                onClick={() => setSidebarOpen(false)}
              >
                <icons.chartColumnIncreasing className="h-6 w-6 stroke-[3]" />
                Rapports
              </Link>
            </li>
            <li className="flex h-[55px] items-center">
              <Link
                to="/messages"
                className={cn(
                  NAV_ITEM,
                  'h-[56px] rounded-xl bg-[#0a5cf5] font-semibold',
                )}
              >
                <icons.message className="h-6 w-6 fill-white" />
                Messages
                <span className="ml-auto grid h-[26px] w-[26px] place-items-center rounded-full bg-[#0a2f9c] text-[11.5px] font-semibold">
                  3
                </span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mx-[21px] mt-auto mb-6 flex w-[235px] shrink-0 flex-col items-center rounded-xl border border-[#2b55c4] bg-[#0b3aa8]/80 px-[18px] pt-[22px] pb-[23px] text-center lg:mb-[75px]">
          <icons.crown className="h-7 w-7 fill-white" />
          <p className="mt-[10px] text-[14px] font-bold">Passez à la version Pro</p>
          <p className="mt-[14px] text-[11.5px] leading-[21px] text-white/90">
            Profitez de plus de fonctionnalités pour faire grandir votre activité.
          </p>
          <button
            type="button"
            className="mt-[16px] h-[45px] w-[177px] rounded-lg bg-[#0a5cf5] text-[14px] font-semibold text-white transition hover:bg-[#1f6bff]"
          >
            Voir les offres
          </button>
        </div>
      </aside>

      <div className="lg:pl-[274px]">
        <header className="sticky top-0 z-20 flex h-[78px] items-center gap-4 bg-white px-4 shadow-[0_2px_10px_rgba(20,50,140,0.08)] sm:px-[26px] lg:pr-[36px]">
          <button
            id="menuBtn"
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg bg-[#e8f0ff] text-[#0a5cf5] lg:hidden"
            aria-label="Ouvrir le menu"
            onClick={() => setSidebarOpen(true)}
          >
            <icons.menu className="h-5 w-5" />
          </button>
          <label className="flex h-[43px] w-full max-w-[525px] items-center gap-[14px] rounded-xl bg-[#eaf1ff] px-[18px]">
            <icons.search className="h-[22px] w-[22px] text-[#2f5be0]" />
            <input
              id="search"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher une conversation..."
              className="w-full bg-transparent text-[13.5px] text-[#0a1f66] outline-none placeholder:text-[#4a67c9]"
            />
          </label>
          <div className="ml-auto flex items-center gap-[36px] lg:gap-[49px]">
            <button type="button" className="relative" aria-label="Notifications">
              <icons.bell className="h-[30px] w-[30px] text-[#1a4fd6]" />
              <span className="absolute -top-[6px] -right-[3px] grid h-[17px] w-[17px] place-items-center rounded-full border border-white bg-[#ef3b3b] text-[10px] font-bold text-white">
                3
              </span>
            </button>
            <div className="flex items-center gap-[18px]">
              <Avatar {...admin} className="h-[52px] w-[52px]" />
              <div className="hidden leading-[21px] sm:block">
                <p className="text-[14px] font-bold text-[#0a1f66]">Bidosessi G.</p>
                <p className="text-[13px] text-[#4a67c9]">Administrateur</p>
              </div>
              <icons.chevronDown className="hidden h-5 w-5 text-[#2f5be0] sm:block" />
            </div>
          </div>
        </header>

        <main className="px-4 pt-[25px] pb-[71px] sm:pr-[15px] sm:pl-[26px]">
          <div
            className={cn(
              'flex items-center gap-5',
              mobileChat && 'hidden lg:flex',
            )}
          >
            <div className="grid h-[50px] w-[53px] shrink-0 place-items-center rounded-xl bg-white shadow-[0_3px_10px_rgba(20,50,140,0.10)]">
              <svg
                className="h-[38px] w-[40px]"
                viewBox="0 0 40 40"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 4h22a7 7 0 0 1 7 7v12a7 7 0 0 1-7 7H21l-8 7v-7H9a7 7 0 0 1-7-7V11a7 7 0 0 1 7-7z"
                  fill="#0a5cf5"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-[30px] leading-[34px] font-bold text-[#0a1f66]">
                Messages
              </h1>
              <p className="mt-[3px] text-[14px] leading-[20px] text-[#4560c8]">
                Échangez avec vos clients et restez à l’écoute de leurs besoins.
              </p>
            </div>
          </div>

          <div
            className={cn(
              'grid gap-[14px] lg:mt-[39px] lg:h-[calc(100vh-263px)] lg:min-h-[640px] lg:grid-cols-[414px_minmax(0,1fr)]',
              mobileChat ? 'mt-0' : 'mt-[39px]',
            )}
          >
            <section
              className={cn(
                'flex h-[calc(100dvh-290px)] min-h-[500px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_18px_rgba(20,50,140,0.08)] lg:h-auto lg:min-h-0',
                mobileChat && 'hidden lg:flex',
              )}
            >
              <div className="flex shrink-0 px-3 pb-[11px]">
                {tabs.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setTab(item.key)}
                    className={cn(
                      'relative flex h-[52px] flex-1 items-start justify-center pt-[19px] text-[14px]',
                      tab === item.key
                        ? 'font-semibold text-[#0a5cf5]'
                        : 'font-medium text-[#0a1f66]',
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        'absolute bottom-0 left-1/2 h-[3px] w-[108px] -translate-x-1/2 rounded-full bg-[#0a5cf5]',
                        tab === item.key ? '' : 'hidden',
                      )}
                    />
                  </button>
                ))}
              </div>

              <ul className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-[5px]">
                {visible.map((conversation) => {
                  const isActive = conversation.id === activeId

                  return (
                    <li key={conversation.id}>
                      <button
                        type="button"
                        onClick={() => openConversation(conversation.id)}
                        className={cn(
                          'group flex w-full items-center gap-[21px] rounded-xl border px-[15px] text-left',
                          conversation.height,
                          isActive
                            ? 'border-[#b9d0fb] bg-[#e8f0ff]'
                            : 'border-transparent',
                        )}
                      >
                        <Avatar
                          photo={conversation.photo}
                          alt={conversation.name}
                          className={conversation.avatarSize}
                        />
                        <span
                          className={cn(
                            'flex h-full min-w-0 flex-1 flex-col justify-center border-b border-[#e4eaf8]',
                            isActive && 'border-transparent',
                          )}
                        >
                          <span className="flex items-center justify-between">
                            <span
                              className={cn(
                                'text-[#0a1f66]',
                                conversation.nameClass,
                              )}
                            >
                              {conversation.name}
                            </span>
                            <span className={conversation.timeClass}>
                              {conversation.time}
                            </span>
                          </span>
                          <span
                            className={cn(
                              'flex items-center justify-between',
                              conversation.previewGap,
                            )}
                          >
                            <span
                              className={cn(
                                'truncate',
                                conversation.previewClass,
                              )}
                            >
                              {conversation.preview}
                            </span>
                            {conversation.unread ? (
                              <span className="ml-3 grid h-[24px] min-w-[24px] shrink-0 place-items-center rounded-[7px] bg-[#0a5cf5] px-1 text-[12px] leading-none font-bold text-white">
                                1
                              </span>
                            ) : null}
                          </span>
                        </span>
                      </button>
                    </li>
                  )
                })}

                {visible.length === 0 ? (
                  <li className="px-4 py-10 text-center text-[12px] text-[#5470c8]">
                    Aucune conversation.
                  </li>
                ) : null}
              </ul>

              <div className="shrink-0 px-[14px] pt-[8px] pb-[10px]">
                <button
                  type="button"
                  className="flex h-[35px] w-full items-center justify-center gap-2 rounded-lg bg-[#eef3ff] text-[13px] font-medium text-[#1a4fd6] transition hover:bg-[#e8f0ff]"
                >
                  Voir plus de messages
                  <icons.chevronDown className="h-4 w-4" />
                </button>
              </div>
            </section>

            <section
              className={cn(
                'flex h-[calc(100dvh-174px)] min-h-[500px] min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_18px_rgba(20,50,140,0.08)] lg:h-auto lg:min-h-0',
                !mobileChat && 'hidden lg:flex',
              )}
            >
              <div className="flex h-[83px] shrink-0 items-center border-b border-[#e6ecf8] px-4 sm:px-[23px]">
                <button
                  type="button"
                  onClick={() => setMobileChat(false)}
                  className="mr-3 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#e8f0ff] text-[#0a5cf5] lg:hidden"
                  aria-label="Retour aux conversations"
                >
                  <icons.arrowLeft className="h-5 w-5" />
                </button>
                <div className="relative shrink-0">
                  <Avatar
                    photo={active.photo}
                    alt={active.name}
                    className="h-[64px] w-[64px]"
                  />
                  <span className="absolute right-0 bottom-[1px] h-[15px] w-[15px] rounded-full border-2 border-white bg-[#16c05a]" />
                </div>
                <div className="ml-[23px] min-w-0">
                  <h2
                    id="chatName"
                    className="truncate text-[20px] leading-[24px] font-bold text-[#0a1f66]"
                  >
                    {active.name}
                  </h2>
                  <p className="mt-[3px] flex items-center gap-[8px] text-[13.5px] text-[#4560c8]">
                    <span className="h-[11px] w-[11px] rounded-full bg-[#16c05a]" />
                    En ligne
                  </p>
                </div>
                <div className="ml-auto flex gap-[13px]">
                  <button
                    type="button"
                    className="hidden h-[50px] w-[52px] place-items-center rounded-xl bg-[#e8f0ff] text-[#0a5cf5] transition hover:bg-[#d9e6ff] sm:grid"
                    aria-label="Appeler"
                  >
                    <icons.phone className="h-6 w-6 fill-current" />
                  </button>
                  <button
                    type="button"
                    className="hidden h-[50px] w-[52px] place-items-center rounded-xl bg-[#e8f0ff] text-[#0a5cf5] transition hover:bg-[#d9e6ff] sm:grid"
                    aria-label="Appel vidéo"
                  >
                    <icons.video className="h-6 w-6 fill-current" />
                  </button>
                  <button
                    type="button"
                    className="grid h-[50px] w-[52px] place-items-center rounded-xl bg-[#e8f0ff] text-[#0a5cf5] transition hover:bg-[#d9e6ff]"
                    aria-label="Plus d'options"
                  >
                    <icons.more className="h-6 w-6 stroke-[3]" />
                  </button>
                </div>
              </div>

              <div
                id="messages"
                ref={messagesRef}
                className="no-scrollbar flex min-h-0 flex-1 flex-col gap-[10px] overflow-y-auto bg-[#fbfcff] px-4 pt-[12px] pb-[8px] sm:gap-[20px] sm:pr-[17px] sm:pl-[23px] sm:pt-[29px] sm:pb-4"
              >
                {thread.map((message) =>
                  message.from === 'them' ? (
                    <div key={message.id} className="flex items-start gap-[15px]">
                      <Avatar
                        photo={active.photo}
                        alt={active.name}
                        className="h-[54px] w-[54px]"
                      />
                      <div
                        className={cn(
                          'max-w-[calc(100%-70px)] rounded-2xl bg-[#eef1f9] px-[14px] pt-[9px] pb-[3px] sm:px-[17px] sm:pt-[13px] sm:pb-[6px]',
                          message.width,
                        )}
                      >
                        <p className="text-[15px] leading-[20px] text-[#0a1f66]">
                          {message.text}
                        </p>
                        <p
                          className={cn(
                            'text-right text-[11.5px] leading-[14px] text-[#5470c8]',
                            message.timeGap,
                          )}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={message.id}
                      className="flex items-start justify-end gap-[17px]"
                    >
                      <div
                        className={cn(
                          'max-w-[calc(100%-70px)] rounded-2xl bg-[#0a5cf5] px-[14px] pt-[9px] pb-[3px] text-white sm:px-[17px] sm:pt-[13px] sm:pb-[6px]',
                          message.width,
                        )}
                      >
                        <p className="text-[15px] leading-[21px]">{message.text}</p>
                        <p
                          className={cn(
                            'flex items-center justify-end gap-[6px] text-[11.5px] leading-[14px] text-white/90',
                            message.timeGap,
                          )}
                        >
                          {message.time}
                          <icons.checkCheck className="h-[15px] w-[15px]" />
                        </p>
                      </div>
                      <Avatar {...admin} className="h-[52px] w-[52px]" />
                    </div>
                  ),
                )}
              </div>

              <form
                id="composer"
                onSubmit={(event) => {
                  event.preventDefault()
                  sendMessage()
                }}
                className="flex shrink-0 items-center gap-[14px] border-t border-[#e6ecf8] bg-white px-[13px] pt-[13px] pb-[22px] sm:pr-[19px]"
              >
                <div className="flex h-[64px] min-w-0 flex-1 items-center rounded-xl border border-[#d6e0f5] bg-white pr-[18px]">
                  <button
                    type="button"
                    className="grid h-full w-[62px] shrink-0 place-items-center border-r border-[#d6e0f5] text-[#2f5be0]"
                    aria-label="Joindre un fichier"
                  >
                    <icons.paperclip className="h-6 w-6" />
                  </button>
                  <input
                    id="msgInput"
                    type="text"
                    autoComplete="off"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="Tapez votre message..."
                    className="min-w-0 flex-1 bg-transparent px-[13px] text-[15px] text-[#0a1f66] outline-none placeholder:text-[#6f87d3]"
                  />
                  <button
                    type="button"
                    className="text-[#2f5be0]"
                    aria-label="Emoji"
                  >
                    <icons.smile className="h-[30px] w-[30px]" />
                  </button>
                </div>
                <button
                  type="submit"
                  className="grid h-[58px] w-[64px] shrink-0 place-items-center rounded-xl bg-[#0a5cf5] text-white shadow-[0_4px_12px_rgba(10,92,245,0.35)] transition hover:bg-[#1f6bff]"
                  aria-label="Envoyer"
                >
                  <icons.send className="h-[26px] w-[26px] fill-white" />
                </button>
              </form>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
