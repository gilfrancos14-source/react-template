import { icons } from '../icons'

export function PromoCard() {
  return (
    <div className="relative min-h-[303px] overflow-hidden rounded-xl bg-gradient-to-br from-[#2a6cf0] via-[#1553d6] to-[#0b3aa8] p-[22px] pt-6 text-white shadow-card">
      <svg
        className="absolute -top-16 -right-10 opacity-20"
        width="260"
        height="260"
        aria-hidden="true"
      >
        <circle cx="130" cy="130" r="120" stroke="#fff" strokeWidth="1" fill="none" />
        <circle cx="130" cy="130" r="80" stroke="#fff" strokeWidth="1" fill="none" />
      </svg>

      <span className="relative grid h-[34px] w-[34px] place-items-center rounded-lg bg-white/20">
        <icons.rocket className="h-[18px] w-[18px]" />
      </span>

      <h3 className="relative mt-[14px] max-w-[260px] text-[19px] leading-[23px] font-bold text-white">
        Faites passer votre business au niveau supérieur
      </h3>
      <p className="relative mt-[18px] max-w-[220px] text-[12.5px] leading-5 text-white/90">
        Découvrez nos outils puissants pour gagner en productivité et en visibilité.
      </p>

      <button
        type="button"
        className="relative mt-[26px] flex h-10 items-center gap-3 rounded-lg bg-white px-[18px] text-[14px] font-semibold text-[#1553d6] transition hover:bg-brand-50"
      >
        Découvrir
        <icons.arrowRight className="h-4 w-4" />
      </button>

      <svg
        className="absolute right-3 bottom-0 h-[190px] w-[160px]"
        viewBox="0 0 160 190"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="promo-bar" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <rect x="8" y="128" width="28" height="38" rx="4" fill="url(#promo-bar)" />
        <rect x="44" y="104" width="30" height="62" rx="4" fill="url(#promo-bar)" />
        <rect x="84" y="76" width="32" height="90" rx="4" fill="url(#promo-bar)" />
        <rect x="124" y="40" width="34" height="126" rx="4" fill="url(#promo-bar)" />
      </svg>
    </div>
  )
}
