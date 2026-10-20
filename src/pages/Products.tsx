import { useState } from 'react'
import { Link } from 'react-router-dom'
import { icons, type IconName } from '../components/icons'
import { products, type Product, type ProductCategory } from '../data/mock'
import { cn } from '../lib/cn'

const COLS =
  'grid-cols-[44fr_96fr_211fr_158fr_161fr_92fr_189fr_162fr_69fr]'

const stats = [
  { label: 'Total des produits', value: '248', delta: '+12%', up: true, icon: 'box' },
  { label: 'Produits en stock', value: '231', delta: '+8%', up: true, icon: 'tag' },
  {
    label: 'Produits en rupture',
    value: '17',
    delta: '-6%',
    up: false,
    icon: 'alert',
  },
  { label: 'Catégories', value: '12', delta: '+2%', up: true, icon: 'grid' },
] satisfies {
  label: string
  value: string
  delta: string
  up: boolean
  icon: IconName
}[]

const categories: ('Tout' | ProductCategory)[] = [
  'Tout',
  'Électronique',
  'Mode',
  'Téléphonie',
  'Accessoires',
  'Informatique',
]

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}) {
  return (
    <label className="relative grid h-4 w-4 shrink-0 cursor-pointer place-content-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        aria-label={label}
        className="peer checked:bg-brand checked:border-brand h-4 w-4 cursor-pointer appearance-none rounded-[4px] border-[1.5px] border-[#9db6e6] bg-white"
      />
      <svg
        className="pointer-events-none absolute h-[10px] w-[10px] text-white opacity-0 peer-checked:opacity-100"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M2 6.2L4.6 8.8L10 3.4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </label>
  )
}

function StatusBadge({ stock }: { stock: number }) {
  if (stock > 0) {
    return (
      <span className="inline-flex h-6 items-center gap-2 rounded-full bg-[#dcf6ee] px-3 text-[11px] font-medium text-[#3f5f66]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#2fc08c]" />
        En stock
      </span>
    )
  }

  return (
    <span className="inline-flex h-6 items-center gap-2 rounded-full bg-[#fde6ea] px-3 text-[11px] font-medium text-[#e5304a]">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ef3b4b]" />
      Rupture de stock
    </span>
  )
}

function ProductImage({ product }: { product: Product }) {
  return (
    <div className="relative flex h-[50px] w-[60px] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-[#f4f6fa] to-[#dfe5ee] text-[#3b4660] ring-1 ring-[#e3e9f3]">
      <icons.box className="h-6 w-6" />
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        onError={(event) => {
          event.currentTarget.style.opacity = '0'
        }}
      />
    </div>
  )
}

export function Products() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<'Tout' | ProductCategory>('Tout')
  const [status, setStatus] = useState<'Tout' | 'En stock' | 'Rupture de stock'>('Tout')
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(1)

  const search = query.toLowerCase().trim()
  const filtered = products.filter((product) => {
    const matchesQuery =
      !search ||
      product.name.toLowerCase().includes(search) ||
      product.ref.toLowerCase().includes(search)
    const matchesCategory = category === 'Tout' || product.category === category
    const matchesStatus =
      status === 'Tout' ||
      (status === 'En stock' ? product.stock > 0 : product.stock === 0)

    return matchesQuery && matchesCategory && matchesStatus
  })

  const allSelected = filtered.length > 0 && selected.length === filtered.length

  function toggleAll(checked: boolean) {
    setSelected(checked ? filtered.map((product) => product.ref) : [])
  }

  function toggleOne(ref: string, checked: boolean) {
    setSelected((current) =>
      checked ? [...current, ref] : current.filter((item) => item !== ref),
    )
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-4">
          <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_2px_8px_rgba(20,60,160,.08)]">
            <icons.box className="h-6 w-6 fill-[#2f7bff] text-[#0b6bff]" />
          </div>
          <div className="leading-none">
            <h1 className="text-[30px] leading-[34px] font-bold text-navy">Produits</h1>
            <p className="mt-1 text-[15px] text-[#3b5bb5]">
              Gérez vos produits et mettez à jour votre catalogue.
            </p>
          </div>
        </div>

        <Link
          to="/produits/ajouter"
          className="bg-brand flex h-[42px] items-center gap-3 rounded-lg px-5 text-[14px] font-medium text-white shadow-[0_6px_14px_rgba(11,107,255,.3)] hover:bg-[#0a5fe6]"
        >
          <icons.plus className="h-5 w-5" />
          Ajouter un produit
        </Link>
      </div>

      <section className="mt-[27px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = icons[stat.icon]

          return (
            <div
              key={stat.label}
              className="flex h-[144px] gap-[20px] rounded-lg bg-white px-[20px] pt-[19px] shadow-[0_2px_10px_rgba(20,60,160,.07)]"
            >
              <div className="bg-soft flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-xl">
                {stat.icon === 'alert' ? (
                  <icons.alert className="h-6 w-6 fill-[#0b6bff] [&>*]:stroke-white" />
                ) : (
                  <Icon className="h-6 w-6 fill-[#2f7bff] text-[#2f7bff]" />
                )}
              </div>
              <div className="min-w-0">
                <div className="pt-px text-[14px] text-navy">{stat.label}</div>
                <div className="mt-[6px] text-[26px] leading-[32px] font-bold text-navy">
                  {stat.value}
                </div>
                <div
                  className={cn(
                    'mt-[8px] flex items-center gap-2 text-[13px] font-medium',
                    stat.up ? 'text-[#12b76a]' : 'text-[#ef3b4b]',
                  )}
                >
                  {stat.up ? (
                    <icons.arrowUp className="h-4 w-4" />
                  ) : (
                    <icons.arrowDown className="h-4 w-4" />
                  )}
                  {stat.delta}
                </div>
                <div className="mt-[6px] text-[12px] whitespace-nowrap text-[#7388b8]">
                  par rapport au mois dernier
                </div>
              </div>
            </div>
          )
        })}
      </section>

      <section className="mt-[18px] rounded-xl bg-white p-4 shadow-[0_2px_12px_rgba(20,60,160,.06)]">
        <div className="flex flex-wrap gap-4 xl:flex-nowrap">
          <div className="flex h-[38px] min-w-[220px] flex-1 items-center gap-3 rounded-lg border border-[#d3e1f7] bg-[#f9fbff] px-3.5 xl:flex-[511]">
            <icons.search className="h-[18px] w-[18px] text-[#2a5bd7]" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un produit..."
              className="w-full bg-transparent text-[13px] text-navy placeholder:text-[#7a8fbf] focus:outline-none"
            />
          </div>

          <div className="relative h-[38px] w-full sm:w-[196px]">
            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as 'Tout' | ProductCategory)
              }
              className="h-full w-full appearance-none rounded-lg border border-[#d3e1f7] bg-[#f9fbff] pr-9 pl-4 text-[13px] text-navy focus:outline-none"
            >
              <option value="Tout">Toutes les catégories</option>
              {categories.slice(1).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <icons.chevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#2a5bd7]" />
          </div>

          <div className="relative h-[38px] w-full sm:w-[193px]">
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as 'Tout' | 'En stock' | 'Rupture de stock')
              }
              className="h-full w-full appearance-none rounded-lg border border-[#d3e1f7] bg-[#f9fbff] pr-9 pl-4 text-[13px] text-navy focus:outline-none"
            >
              <option value="Tout">Tous les statuts</option>
              <option>En stock</option>
              <option>Rupture de stock</option>
            </select>
            <icons.chevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#2a5bd7]" />
          </div>

          <div className="flex h-[38px] w-full items-center justify-center gap-3 rounded-lg border border-[#d3e1f7] bg-[#f9fbff] px-3 text-[12px] text-navy sm:w-[231px]">
            <icons.calendar className="h-[18px] w-[18px] text-[#2a5bd7]" />
            <span>20/10/2025</span>
            <icons.arrowRight className="h-4 w-4 text-[#2a5bd7]" />
            <span>20/11/2025</span>
          </div>
        </div>

        <div className="mt-[17px] overflow-x-auto rounded-lg border border-[#e3ebf8]">
          <div className="min-w-[1000px]">
            <div
              className={cn(
                'grid h-[42px] items-center bg-[#f1f6fd] text-[12px] font-medium text-navy',
                COLS,
              )}
            >
              <div className="pl-[14px]">
                <Checkbox
                  checked={allSelected}
                  onChange={toggleAll}
                  label="Tout sélectionner"
                />
              </div>
              <div className="pl-3">Image</div>
              <div>Nom du produit</div>
              <div>Catégorie</div>
              <div>Prix</div>
              <div>Stock</div>
              <div>Statut</div>
              <div>Date d'ajout</div>
              <div>Actions</div>
            </div>

            {filtered.length > 0 ? (
              filtered.map((product) => (
                <div
                  key={product.ref}
                  className={cn(
                    'grid h-[62px] items-center border-t border-[#e8eef8] text-[13px] hover:bg-[#f8fbff]',
                    COLS,
                  )}
                >
                  <div className="pl-[14px]">
                    <Checkbox
                      checked={selected.includes(product.ref)}
                      onChange={(checked) => toggleOne(product.ref, checked)}
                      label={`Sélectionner ${product.name}`}
                    />
                  </div>
                  <div className="pl-[10px]">
                    <ProductImage product={product} />
                  </div>
                  <div className="leading-[18px]">
                    <div className="font-medium text-navy">{product.name}</div>
                    <div className="mt-[5px] text-[11px] text-[#8b9cc0]">
                      #{product.ref}
                    </div>
                  </div>
                  <div>
                    <span className="inline-flex h-6 items-center rounded-full bg-[#e3eefe] px-3 text-[11px] font-medium text-[#1f5fd0]">
                      {product.category}
                    </span>
                  </div>
                  <div className="font-medium text-[#1558d6]">
                    {product.price.toLocaleString('fr-FR')} FCFA
                  </div>
                  <div className="font-medium text-[#1558d6]">{product.stock}</div>
                  <div>
                    <StatusBadge stock={product.stock} />
                  </div>
                  <div className="leading-[18px]">
                    <div className="text-[12px] text-navy">{product.addedAt}</div>
                    <div className="mt-[5px] text-[11px] text-[#8b9cc0]">
                      {product.addedTime}
                    </div>
                  </div>
                  <div className="pl-[16px]">
                    <button
                      type="button"
                      aria-label={`Actions pour ${product.name}`}
                      className="rounded p-1 text-[#1c5fe0] hover:bg-soft"
                    >
                      <icons.more className="h-5 w-5" strokeWidth={3} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="border-t border-[#e8eef8] py-10 text-center text-[13px] text-[#7388b8]">
                Aucun produit trouvé.
              </div>
            )}
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-3 px-1 pt-1">
          <p className="text-[11px] text-[#6d83b5]">
            Affichage de <span>{filtered.length}</span> sur 248 produits
          </p>
          <div className="flex items-center gap-[7px]">
            <button
              type="button"
              aria-label="Page précédente"
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-[#d3e1f7] bg-white text-[#7aa2ee]"
            >
              <icons.chevronLeft className="h-4 w-4" />
            </button>
            {[1, 2, 3, 4, 5].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPage(item)}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-md border text-[12px] font-medium',
                  item === page
                    ? 'bg-brand border-brand text-white shadow-[0_4px_10px_rgba(11,107,255,.35)]'
                    : 'border-[#d3e1f7] bg-white text-[#1c4fc0] hover:bg-soft',
                )}
              >
                {item}
              </button>
            ))}
            <button
              type="button"
              aria-label="Page suivante"
              onClick={() => setPage((value) => Math.min(5, value + 1))}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-[#d3e1f7] bg-white text-navy"
            >
              <icons.chevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
