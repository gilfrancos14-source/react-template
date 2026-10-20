import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { icons } from '../components/icons'
import { products } from '../data/mock'
import { cn } from '../lib/cn'

const CARD =
  'bg-white rounded-[14px] shadow-[0_2px_12px_rgba(20,60,140,.07)] border border-[#e9f0fc]'
const LABEL = 'block text-[12.5px] font-semibold text-[#0b1e5b] mb-[7px]'
const INPUT =
  'w-full h-[37px] rounded-lg border border-[#d9e4f7] bg-white px-[13px] text-[12.5px] text-[#0b1e5b] placeholder:text-[#9fb2d8] outline-none focus:border-[#0a5cff] focus:ring-2 focus:ring-[#0a5cff]/20 appearance-none'
const TITLE = 'text-[15px] font-bold text-[#0b1e5b]'
const ICON_BOX =
  'w-[28px] h-[28px] rounded-lg bg-[#e3edff] text-[#0a5cff] grid place-items-center shrink-0'
const NAV_ITEM =
  'flex items-center gap-[14px] h-[47px] rounded-[10px] px-[14px] text-left text-[14px] font-medium text-white/95 hover:bg-white/10 transition-colors'
const NAV_ICON = 'w-[24px] h-[24px] shrink-0'
const BADGE =
  'min-w-[21px] h-[21px] px-1.5 rounded-full bg-[#2f7bff] text-[11px] font-semibold grid place-items-center'

const STATUS_STYLE = {
  Actif: { dot: '#19c37d', bg: '#dff7ec', text: '#13a76a' },
  Inactif: { dot: '#ff5a6a', bg: '#ffe5e8', text: '#d93a4b' },
  Brouillon: { dot: '#f5a623', bg: '#fff1d9', text: '#c27d0c' },
} as const

type Status = keyof typeof STATUS_STYLE

const DEFAULT_DESC =
  "Profitez d'un son exceptionnel avec ce casque Bluetooth Pro. Confortable, léger et doté d'une autonomie longue durée."

type Thumb = { id: number; src: string }

const photo = (src: string) => src.replace('w=200&h=160', 'w=640&h=640')

const fmtPrice = (value: string) =>
  value
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export function AddProduct() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [desc, setDesc] = useState('')
  const [status, setStatus] = useState<Status>('Actif')
  const [saved, setSaved] = useState(false)
  const [activeImage, setActiveImage] = useState(() => photo(products[0].image))
  const [thumbs, setThumbs] = useState<Thumb[]>(() =>
    products.slice(0, 4).map((product, index) => ({
      id: index + 1,
      src: photo(product.image),
    })),
  )
  const [features, setFeatures] = useState([
    { id: 1, name: 'Taille', value: '45 mm' },
    { id: 2, name: 'Couleur', value: 'Noir' },
    { id: 3, name: 'Connectivité', value: 'Bluetooth 5.3' },
  ])
  const fileRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const nextThumbId = useRef(5)
  const nextFeatureId = useRef(4)

  useEffect(() => {
    document.title = 'NovaTech – Ajouter un produit'
  }, [])

  const previewName = name || 'Casque Bluetooth Pro'
  const previewPrice = fmtPrice(price) || '45 000'
  const previewDesc = desc.trim() || DEFAULT_DESC
  const tone = STATUS_STYLE[status]

  function addFiles(files: FileList | null) {
    if (!files) return
    const next = Array.from(files)
      .filter((file) => file.type.startsWith('image/') && file.size <= 5 * 1048576)
      .map((file) => ({
        id: nextThumbId.current++,
        src: URL.createObjectURL(file),
      }))
    if (next.length) setThumbs((current) => [...current, ...next])
  }

  function addFeature() {
    setFeatures((current) => [
      ...current,
      { id: nextFeatureId.current++, name: '', value: '' },
    ])
  }

  function save() {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1600)
  }

  function command(cmd: string) {
    if (cmd === 'link') {
      const url = window.prompt('Adresse du lien :', 'https://')
      if (url) document.execCommand('createLink', false, url)
      return
    }
    document.execCommand(cmd)
  }

  return (
    <div className="min-h-screen text-[#0b1e5b] antialiased">
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
          'fixed inset-y-0 left-0 z-40 w-[232px] overflow-hidden text-white transition-transform duration-200 lg:translate-x-0',
          'bg-[linear-gradient(180deg,#0b2d82_0%,#082063_45%,#04123f_100%)]',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <svg
          className="pointer-events-none absolute bottom-0 left-0 h-[560px] w-full opacity-30"
          viewBox="0 0 232 560"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 330C60 250 140 330 232 230V560H0z" fill="#1550c8" opacity=".35" />
          <path d="M0 430C70 380 150 450 232 370V560H0z" fill="#2a6bff" opacity=".25" />
        </svg>

        <div className="relative flex h-full flex-col">
          <div className="flex h-[82px] items-center justify-between px-[27px] pr-[22px]">
            <div className="flex items-center gap-3">
              <svg width="34" height="38" viewBox="0 0 34 38" aria-hidden="true">
                <path d="M17 1 32 9.5v19L17 37 2 28.5v-19z" fill="#1d6bff" />
                <path d="M17 1 32 9.5 17 18 2 9.5z" fill="#5aa0ff" />
                <path d="M17 18v19L2 28.5v-19z" fill="#0a47c9" />
                <path d="M17 11l7 4v8l-7 4-7-4v-8z" fill="#0a2a7a" />
              </svg>
              <span className="text-[23px] font-semibold tracking-tight">NovaTech</span>
            </div>
            <icons.chevronRight className="hidden h-4 w-4 text-white/80 lg:block" />
            <button
              type="button"
              className="lg:hidden"
              aria-label="Fermer le menu"
              onClick={() => setSidebarOpen(false)}
            >
              <icons.close className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-[3px] flex flex-col gap-[3px] px-3">
            <Link to="/" className={NAV_ITEM} onClick={() => setSidebarOpen(false)}>
              <icons.home className={NAV_ICON} />
              Tableau de bord
            </Link>
            <Link
              to="/commandes"
              className={NAV_ITEM}
              onClick={() => setSidebarOpen(false)}
            >
              <icons.cart className={NAV_ICON} />
              <span className="flex-1">Commandes</span>
              <span className={BADGE}>12</span>
            </Link>
            <Link
              to="/produits"
              className={cn(
                NAV_ITEM,
                'bg-[#0a5cff] font-semibold shadow-[0_6px_16px_rgba(10,92,255,.45)]',
              )}
            >
              <icons.package className={NAV_ICON} />
              Produits
            </Link>
            <Link
              to="/clients"
              className={NAV_ITEM}
              onClick={() => setSidebarOpen(false)}
            >
              <icons.user className={NAV_ICON} />
              Clients
            </Link>
            <Link
              to="/rapports"
              className={NAV_ITEM}
              onClick={() => setSidebarOpen(false)}
            >
              <icons.chartColumn className={NAV_ICON} />
              Rapports
            </Link>
            <Link
              to="/messages"
              className={NAV_ITEM}
              onClick={() => setSidebarOpen(false)}
            >
              <icons.message className={NAV_ICON} />
              <span className="flex-1">Messages</span>
              <span className={BADGE}>3</span>
            </Link>
            <button type="button" className={NAV_ITEM}>
              <icons.settings className={NAV_ICON} />
              Paramètres
            </button>
          </nav>

          <div className="mx-[19px] mt-auto mb-[37px] rounded-xl border border-white/10 bg-[#0a3cae]/70 px-4 pt-5 pb-5 text-center">
            <icons.crown className="mx-auto mb-1.5 h-[22px] w-[22px]" />
            <p className="text-[13px] font-semibold">Passez à la version Pro</p>
            <p className="mt-2.5 text-[11px] leading-[17px] text-white/85">
              Profitez de plus de fonctionnalités pour faire grandir votre activité.
            </p>
            <button
              type="button"
              className="mt-[15px] h-[41px] w-full rounded-lg bg-[#0a5cff] text-[13px] font-semibold hover:bg-[#2a70ff]"
            >
              Voir les offres
            </button>
          </div>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[232px]">
        <header className="flex h-[67px] items-center justify-between border-b border-[#eef3fb] bg-white px-4 sm:px-6 lg:pr-[40px] lg:pl-[26px]">
          <div className="flex flex-1 items-center gap-3">
            <button
              type="button"
              className="-ml-1 rounded-lg p-1.5 hover:bg-[#eaf1ff] lg:hidden"
              aria-label="Menu"
              onClick={() => setSidebarOpen(true)}
            >
              <icons.menu className="h-6 w-6" />
            </button>
            <label className="relative block w-full max-w-[436px]">
              <icons.search className="absolute top-1/2 left-3.5 h-[18px] w-[18px] -translate-y-1/2 text-[#5f78b4]" />
              <input
                type="text"
                placeholder="Rechercher quelque chose..."
                className="h-[34px] w-full rounded-lg bg-[#eaf1ff] pr-3 pl-[42px] text-[12.5px] placeholder:text-[#7d93c4] outline-none focus:ring-2 focus:ring-[#0a5cff]/30"
              />
            </label>
          </div>

          <div className="ml-3 flex items-center gap-4 sm:gap-[34px]">
            <button type="button" className="relative" aria-label="Notifications">
              <icons.bell className="h-[22px] w-[22px] text-[#0a5cff]" />
              <span className="absolute -top-1.5 -right-1.5 grid h-[15px] w-[15px] place-items-center rounded-full bg-[#ff3b4e] text-[9px] font-bold text-white">
                3
              </span>
            </button>
            <div className="flex items-center gap-3">
              <div className="relative h-[42px] w-[42px] overflow-hidden rounded-full bg-[linear-gradient(160deg,#6b4a38,#2a1a14)] ring-2 ring-white shadow">
                <div className="absolute top-[8px] left-1/2 h-[20px] w-[17px] -translate-x-1/2 rounded-full bg-[#4a2f22]" />
                <div className="absolute top-[27px] left-1/2 h-[20px] w-[34px] -translate-x-1/2 rounded-t-full bg-[#1a1a1f]" />
              </div>
              <div className="hidden leading-tight sm:block">
                <p className="text-[14px] font-bold">Bidosessi G.</p>
                <p className="text-[12px] text-[#5f78b4]">Administrateur</p>
              </div>
              <icons.chevronDown className="h-4 w-4 text-[#5f78b4]" />
            </div>
          </div>
        </header>

        <main className="max-w-[1000px] px-4 pt-[17px] pb-12 sm:px-6 lg:max-w-none lg:px-[21px]">
          <Link
            to="/produits"
            className="inline-flex items-center gap-2.5 text-[12px] text-[#5f78b4] hover:text-[#0a5cff]"
          >
            <icons.arrowLeft className="h-[15px] w-[15px] text-[#0a5cff]" />
            Retour aux produits
          </Link>
          <h1 className="mt-1.5 text-[26px] leading-[34px] font-bold text-[#0b1e5b]">
            Ajouter un produit
          </h1>
          <p className="mt-0.5 text-[13.5px] text-[#5f78b4]">
            Remplissez les informations ci-dessous pour ajouter un nouveau produit à votre
            boutique.
          </p>

          <div className="mt-[17px] grid grid-cols-1 items-start gap-[22px] xl:grid-cols-[minmax(0,570px)_minmax(0,350px)]">
            <div className="flex flex-col gap-[17px]">
              <section className={cn(CARD, 'p-[17px] pb-[16px]')}>
                <div className="mb-[18px] flex items-center gap-3">
                  <span className="grid h-[31px] w-[31px] shrink-0 place-items-center rounded-lg bg-[#e3edff] text-[#0a5cff]">
                    <icons.fileText className="h-4 w-4" />
                  </span>
                  <h2 className={TITLE}>Informations générales</h2>
                </div>

                <div className="grid grid-cols-1 gap-x-[22px] gap-y-4 sm:grid-cols-[1.07fr_1fr]">
                  <div>
                    <label className={LABEL} htmlFor="ap-name">
                      Nom du produit *
                    </label>
                    <input
                      id="ap-name"
                      className={INPUT}
                      placeholder="Ex : Casque Bluetooth Pro"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                  <div>
                    <label className={LABEL} htmlFor="ap-cat">
                      Catégorie *
                    </label>
                    <div className="relative">
                      <select
                        id="ap-cat"
                        className={cn(INPUT, 'pr-9 text-[#7d93c4]')}
                        defaultValue=""
                      >
                        <option value="">Sélectionner une catégorie</option>
                        <option>Montres connectées</option>
                        <option>Audio</option>
                        <option>Accessoires</option>
                      </select>
                      <icons.chevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                <div className="mt-[17px]">
                  <span className={LABEL}>Description *</span>
                  <div className="overflow-hidden rounded-lg border border-[#d9e4f7] focus-within:border-[#0a5cff]">
                    <div className="flex h-[36px] items-center gap-1 border-b border-[#d9e4f7] bg-[#f0f5ff] px-2.5">
                      {(
                        [
                          ['bold', 'bold', 'Gras'],
                          ['italic', 'italic', 'Italique'],
                          ['underline', 'underline', 'Souligné'],
                          ['insertUnorderedList', 'list', 'Liste à puces'],
                          ['insertOrderedList', 'listOrdered', 'Liste numérotée'],
                        ] as const
                      ).map(([cmd, icon, label]) => {
                        const Icon = icons[icon]
                        return (
                          <button
                            key={cmd}
                            type="button"
                            className="grid h-7 w-7 place-items-center rounded text-[#0b1e5b] hover:bg-white"
                            data-cmd={cmd}
                            aria-label={label}
                            onMouseDown={(event) => {
                              event.preventDefault()
                              command(cmd)
                            }}
                          >
                            <Icon className="h-[15px] w-[15px]" />
                          </button>
                        )
                      })}
                      <span className="mx-1 h-4 w-px bg-[#d9e4f7]" />
                      <button
                        type="button"
                        className="grid h-7 w-7 place-items-center rounded text-[#0a5cff] hover:bg-white"
                        data-cmd="link"
                        aria-label="Lien"
                        onMouseDown={(event) => {
                          event.preventDefault()
                          command('link')
                        }}
                      >
                        <icons.link className="h-[15px] w-[15px]" />
                      </button>
                    </div>
                    <div
                      id="desc"
                      ref={descRef}
                      contentEditable
                      data-ph="Décrivez votre produit en détail..."
                      className="h-[100px] overflow-auto px-[13px] py-[12px] text-[12.5px] text-[#0b1e5b] outline-none empty:before:text-[#9fb2d8] empty:before:content-[attr(data-ph)] [&_a]:text-[#0a5cff] [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"
                      onInput={(event) => setDesc(event.currentTarget.innerText)}
                    />
                  </div>
                </div>

                <div className="mt-[18px] grid grid-cols-1 gap-x-[22px] gap-y-4 sm:grid-cols-[1fr_1fr]">
                  <div>
                    <label className={LABEL} htmlFor="ap-price">
                      Prix (FCFA) *
                    </label>
                    <input
                      id="ap-price"
                      inputMode="numeric"
                      className={INPUT}
                      placeholder="Ex : 45000"
                      value={price}
                      onChange={(event) => setPrice(event.target.value)}
                    />
                  </div>
                  <div>
                    <label className={LABEL} htmlFor="ap-sku">
                      Référence (SKU)
                    </label>
                    <input id="ap-sku" className={INPUT} placeholder="Ex : PRD-001" />
                  </div>
                </div>

                <div className="mt-[18px] grid grid-cols-1 gap-x-[22px] gap-y-4 sm:grid-cols-[1fr_1fr]">
                  <div>
                    <label className={LABEL} htmlFor="ap-status">
                      Statut *
                    </label>
                    <div className="relative">
                      <span
                        className="absolute top-1/2 left-[14px] h-[9px] w-[9px] -translate-y-1/2 rounded-full"
                        style={{ backgroundColor: tone.dot }}
                      />
                      <select
                        id="ap-status"
                        className={cn(INPUT, 'pr-9 pl-[32px]')}
                        value={status}
                        onChange={(event) => setStatus(event.target.value as Status)}
                      >
                        <option>Actif</option>
                        <option>Inactif</option>
                        <option>Brouillon</option>
                      </select>
                      <icons.chevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
                    </div>
                  </div>
                  <div>
                    <label className={LABEL} htmlFor="ap-cat2">
                      Catégorie secondaire{' '}
                      <span className="font-normal text-[#5f78b4]">(optionnel)</span>
                    </label>
                    <div className="relative">
                      <select
                        id="ap-cat2"
                        className={cn(INPUT, 'pr-9 text-[#7d93c4]')}
                        defaultValue=""
                      >
                        <option value="">Sélectionner une catégorie</option>
                        <option>Montres connectées</option>
                        <option>Audio</option>
                        <option>Accessoires</option>
                      </select>
                      <icons.chevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
                    </div>
                  </div>
                </div>
              </section>

              <section className={cn(CARD, 'p-[17px] pb-[18px]')}>
                <div className="mb-[16px] flex items-center gap-3">
                  <span className={ICON_BOX}>
                    <icons.image className="h-4 w-4" />
                  </span>
                  <h2 className={cn(TITLE, 'text-[14px]')}>Images du produit</h2>
                </div>

                <label
                  id="drop"
                  className="flex h-[161px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#a9c2ee] bg-[#f8fbff] px-3 text-center"
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault()
                    addFiles(event.dataTransfer.files)
                  }}
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    className="hidden"
                    onChange={(event) => addFiles(event.target.files)}
                  />
                  <icons.cloudUpload
                    className="h-[44px] w-[44px] text-[#0a5cff]"
                    strokeWidth={1.6}
                  />
                  <p className="mt-2.5 text-[12.5px] font-medium">
                    Glissez et déposez vos images ici
                  </p>
                  <p className="mt-1.5 text-[10.5px] text-[#5f78b4]">
                    ou cliquez pour parcourir
                  </p>
                  <p className="mt-[14px] text-[10.5px] text-[#5f78b4]">
                    Formats acceptés : JPG, PNG, WEBP (max. 5 Mo)
                  </p>
                </label>

                <div className="mt-[15px] grid grid-cols-3 gap-[14px] sm:grid-cols-5">
                  <button
                    type="button"
                    className="flex h-[93px] flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-[#a9c2ee] bg-[#f4f8ff] text-[#5f78b4]"
                    onClick={() => fileRef.current?.click()}
                  >
                    <icons.plus className="h-7 w-7 text-[#0a5cff]" strokeWidth={1.5} />
                    <span className="text-[10px]">Ajouter une image</span>
                  </button>

                  {thumbs.map((thumb) => (
                    <div
                      key={thumb.id}
                      className="relative grid h-[93px] place-items-center overflow-hidden rounded-lg border border-[#e1e7f1] bg-[#eceff4]"
                    >
                      <img
                        src={thumb.src}
                        alt=""
                        className="h-full w-full object-cover"
                      />                      <button
                        type="button"
                        className="absolute -top-1 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-white text-[#0a5cff] shadow"
                        aria-label="Retirer"
                        onClick={() =>
                          setThumbs((current) =>
                            current.filter((item) => item.id !== thumb.id),
                          )
                        }
                      >
                        <icons.close className="h-3 w-3" strokeWidth={3} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className={cn(CARD, 'p-[17px] pb-[20px]')}>
                <div className="mb-[14px] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-[28px] w-[28px] shrink-0 place-items-center rounded-full bg-[#e3edff] text-[#0a5cff]">
                      <icons.cpu className="h-4 w-4" />
                    </span>
                    <h2 className={cn(TITLE, 'text-[14px]')}>Caractéristiques</h2>
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-[26px] items-center gap-2 rounded-md bg-[#0a5cff] px-3.5 text-[10.5px] font-semibold whitespace-nowrap text-white hover:bg-[#2a70ff]"
                    onClick={addFeature}
                  >
                    <icons.plus className="h-3.5 w-3.5" />
                    Ajouter une caractéristique
                  </button>
                </div>

                <div className="flex flex-col gap-[9px]">
                  {features.map((feature) => (
                    <div key={feature.id} className="flex items-center gap-[9px]">
                      <icons.gripVertical className="mx-[3px] h-[14px] w-[14px] shrink-0 text-[#8fa4cf]" />
                      <input
                        className={cn(INPUT, 'h-[34px] w-[130px] shrink-0 text-[11px]')}
                        value={feature.name}
                        placeholder="Nom"
                        onChange={(event) =>
                          setFeatures((current) =>
                            current.map((item) =>
                              item.id === feature.id
                                ? { ...item, name: event.target.value }
                                : item,
                            ),
                          )
                        }
                      />
                      <div className="relative flex-1">
                        <input
                          className={cn(INPUT, 'h-[34px] pr-8')}
                          value={feature.value}
                          placeholder="Valeur"
                          onChange={(event) =>
                            setFeatures((current) =>
                              current.map((item) =>
                                item.id === feature.id
                                  ? { ...item, value: event.target.value }
                                  : item,
                              ),
                            )
                          }
                        />
                        <icons.chevronsUpDown className="pointer-events-none absolute top-1/2 right-2.5 h-3 w-3 -translate-y-1/2 text-[#9fb2d8]" />
                      </div>
                      <button
                        type="button"
                        className="grid w-6 place-items-center text-[#5f78b4] hover:text-[#ff3b4e]"
                        aria-label="Supprimer"
                        onClick={() =>
                          setFeatures((current) =>
                            current.filter((item) => item.id !== feature.id),
                          )
                        }
                      >
                        <icons.close className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="flex flex-col gap-[17px]">
              <section className={cn(CARD, 'p-[16px] pb-[16px]')}>
                <div className="mb-[16px] flex items-center gap-3">
                  <span className={ICON_BOX}>
                    <icons.eye className="h-4 w-4" />
                  </span>
                  <h2 className={cn(TITLE, 'text-[14px]')}>Aperçu du produit</h2>
                </div>

                <div className="h-[202px] overflow-hidden rounded-lg bg-[#eef2f9]">
                  <img
                    src={activeImage}
                    alt="Aperçu du produit"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="mt-[11px] grid grid-cols-4 gap-[11px]">
                  {products.slice(0, 4).map((product) => {
                    const src = photo(product.image)
                    return (
                      <button
                        key={product.ref}
                        type="button"
                        className={cn(
                          'h-[54px] overflow-hidden rounded-lg bg-[#eef2f9]',
                          activeImage === src && 'border-2 border-[#0a5cff]',
                        )}
                        onClick={() => setActiveImage(src)}
                      >
                        <img
                          src={src}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    )
                  })}
                </div>

                <h3 className="mt-[18px] text-[17px] font-bold">{previewName}</h3>
                <p className="mt-[10px] text-[23px] font-bold">
                  <span>{previewPrice}</span> FCFA
                </p>
                <span
                  className="mt-[9px] inline-flex h-[24px] items-center gap-2 rounded-full px-3 text-[12px] font-medium"
                  style={{ backgroundColor: tone.bg, color: tone.text }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: tone.dot }}
                  />
                  <span>{status}</span>
                </span>
                <p className="mt-[18px] text-[13px] leading-[19.5px] text-[#5f78b4]">
                  {previewDesc}
                </p>

                <div className="mt-[22px] rounded-lg border border-[#d9e4f7] bg-[#f7faff] p-[13px] pb-[18px]">
                  <div className="flex items-center gap-3">
                    <span className="grid h-[22px] w-[22px] place-items-center rounded-md bg-[#dbe8ff] text-[#0a5cff]">
                      <icons.info className="h-3.5 w-3.5" />
                    </span>
                    <h4 className="text-[11.5px] font-semibold">Informations complémentaires</h4>
                  </div>
                  <div className="mt-[14px] flex gap-4">
                    <icons.calendar className="mt-0.5 h-[16px] w-[16px] text-[#0b1e5b]" />
                    <div>
                      <p className="text-[10.5px] text-[#5f78b4]">Date d'ajout</p>
                      <p className="mt-[7px] text-[10.5px] text-[#5f78b4]">--</p>
                    </div>
                  </div>
                  <div className="mt-[17px] flex gap-4">
                    <icons.squarePen className="mt-0.5 h-[16px] w-[16px] text-[#0b1e5b]" />
                    <div>
                      <p className="text-[10.5px] text-[#5f78b4]">
                        Dernière modification
                      </p>
                      <p className="mt-[7px] text-[10.5px] text-[#5f78b4]">--</p>
                    </div>
                  </div>
                </div>

                <div className="mt-[21px] flex gap-3.5 rounded-lg border border-[#d6e4fb] bg-[#e7f0ff] p-[14px] pb-[13px]">
                  <icons.lightbulb className="h-[22px] w-[22px] shrink-0 fill-[#ffd54a]/70 text-[#0a5cff]" />
                  <div>
                    <h4 className="text-[12.5px] font-semibold text-[#0a5cff]">Conseil</h4>
                    <p className="mt-[7px] text-[11px] leading-[16.5px] text-[#5f78b4]">
                      Ajoutez des images de bonne qualité pour améliorer l'attractivité de
                      votre produit et augmenter vos ventes.
                    </p>
                  </div>
                </div>
              </section>

              <section className={cn(CARD, 'flex flex-col gap-[9px] p-[16px]')}>
                <button
                  type="button"
                  className="inline-flex h-[42px] items-center justify-center gap-3 rounded-lg bg-[#0a5cff] text-[13px] font-semibold text-white shadow-[0_4px_12px_rgba(10,92,255,.3)] hover:bg-[#2a70ff]"
                  onClick={save}
                >
                  {saved ? (
                    'Produit enregistré'
                  ) : (
                    <>
                      <icons.save className="h-[18px] w-[18px]" />
                      Enregistrer le produit
                    </>
                  )}
                </button>
                <Link
                  to="/produits"
                  className="h-[42px] rounded-lg border border-[#0a5cff] bg-white text-center text-[13px] leading-[40px] font-semibold text-[#0a5cff] hover:bg-[#eaf1ff]"
                >
                  Annuler
                </Link>
              </section>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
