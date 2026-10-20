import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { isAuthenticated, signIn } from '../lib/auth'
import './login.css'

const highlights = [
  {
    title: 'Suivi en temps réel',
    description: 'Gardez un œil sur vos ventes et vos performances.',
    icon: (
      <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <rect x="4" y="12" width="4" height="8" rx="1" />
        <rect x="10" y="7" width="4" height="13" rx="1" />
        <rect x="16" y="3" width="4" height="17" rx="1" />
      </svg>
    ),
  },
  {
    title: 'Gestion des produits',
    description: 'Ajoutez, modifiez et organisez vos produits facilement.',
    icon: (
      <svg
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM4 7.5L12 12l8-4.5M12 12v9"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Commandes simplifiées',
    description: "Suivez et gérez toutes vos commandes en un clin d'œil.",
    icon: (
      <svg
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          d="M3 4h2l2.2 10.5h10.2L19.5 7H6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="19" r="1.4" fill="currentColor" />
        <circle cx="17" cy="19" r="1.4" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Vos clients au centre',
    description: 'Offrez une meilleure expérience à vos clients.',
    icon: (
      <svg
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="9" cy="8" r="3.5" />
        <path
          d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.8a3.5 3.5 0 010 6.4M18 14.3c2 .8 3.5 2.6 3.5 5.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

const recentOrders = [
  {
    reference: '#CMD-001245',
    amount: '15 000 FCFA',
    status: 'Livrée',
    className: 'bg-green-100 text-green-700',
  },
  {
    reference: '#CMD-001244',
    amount: '28 000 FCFA',
    status: 'Expédiée',
    className: 'bg-blue-100 text-blue-700',
  },
  {
    reference: '#CMD-001243',
    amount: '42 500 FCFA',
    status: 'En cours',
    className: 'bg-sky-100 text-sky-700',
  },
]

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)

  if (isAuthenticated()) {
    return <Navigate to="/" replace />
  }

  const redirectTo =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/'

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    signIn(String(data.get('email') || 'admin@novatech.com'))
    navigate(redirectTo, { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-white text-slate-800 antialiased">
      {/* ===== GAUCHE : CONNEXION ===== */}
      <main className="left-bg relative flex w-full flex-col items-center justify-center bg-white px-6 py-10 sm:px-12 lg:w-[47%]">
        <div className="relative w-full max-w-[520px]">
          {/* Logo */}
          <div className="mb-14 flex items-center gap-4">
            <svg width="68" height="80" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path
                d="M20 2.9L35.3 11.4V28.6L20 37.1L4.7 28.6V11.4L20 2.9Z"
                fill="#0A5CFF"
              />
              <path
                d="M20 8.7L29.5 14.3V25.7L20 31.3L10.5 25.7V14.3L20 8.7Z"
                fill="#fff"
              />
              <path
                d="M20 14L24.3 16.5V21.5L20 24L15.7 21.5V16.5L20 14Z"
                fill="#0A5CFF"
              />
            </svg>
            <div>
              <h1 className="text-brand-dark text-[40px] leading-none font-bold tracking-tight">
                NovaTech
              </h1>
              <p className="text-brand-mute mt-1.5 text-[15px]">
                Votre boutique, votre succès
              </p>
            </div>
          </div>

          {/* En-tête */}
          <div className="mb-9">
            <h2 className="text-brand-dark mb-3 flex items-center gap-3 text-[38px] font-extrabold tracking-tight">
              Bon retour !{' '}
              <span className="text-[34px]" aria-hidden="true">
                👋
              </span>
            </h2>
            <p className="text-brand-mute text-[17px] leading-relaxed">
              Connectez-vous à votre compte pour accéder
              <br />à votre espace de gestion.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="field">
              <svg
                className="ico h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                <path
                  d="M3.5 7.5l8.5 6 8.5-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <label htmlFor="email">Adresse e-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue="admin@novatech.com"
                autoComplete="email"
                required
              />
            </div>

            {/* Mot de passe */}
            <div className="field">
              <svg
                className="ico h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <rect x="5" y="11" width="14" height="9" rx="2.5" />
                <path
                  d="M8 11V8a4 4 0 018 0v3"
                  strokeLinecap="round"
                />
              </svg>
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                defaultValue="••••••••"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={
                  showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
                }
                className="focus-ring text-brand-dark absolute top-1/2 right-4 -translate-y-1/2 rounded"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="3" />
                  <path
                    d="M4 4l16 16"
                    strokeLinecap="round"
                    className={showPassword ? '' : 'hidden'}
                  />
                </svg>
              </button>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex cursor-pointer items-center gap-3 select-none">
                <span className="relative flex h-7 w-7 items-center justify-center">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                    className="peer focus-ring checked:bg-brand-blue checked:border-brand-blue h-7 w-7 cursor-pointer appearance-none rounded-md border border-slate-300 bg-white transition-colors"
                  />
                  <svg
                    className="pointer-events-none absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span className="text-brand-dark text-[15px]">Se souvenir de moi</span>
              </label>
              <a
                href="#"
                className="focus-ring text-brand-blue rounded text-[15px] hover:underline"
              >
                Mot de passe oublié ?
              </a>
            </div>

            {/* Connexion */}
            <button
              type="submit"
              className="focus-ring bg-brand-blue mt-3 flex h-[66px] w-full items-center justify-center gap-3 rounded-xl text-[16px] font-semibold text-white shadow-[0_10px_24px_rgba(10,92,255,.28)] transition-colors hover:bg-[#0849d6]"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path
                  d="M14 4h3a3 3 0 013 3v10a3 3 0 01-3 3h-3M4 12h11m0 0l-4-4m4 4l-4 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Se connecter
            </button>
          </form>

          {/* Séparateur */}
          <div className="text-brand-mute flex items-center gap-5 py-8 text-[15px]">
            <span className="h-px flex-1 bg-slate-200" />
            Ou
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Google */}
          <button
            type="button"
            className="focus-ring text-brand-dark flex h-[66px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-[16px] font-semibold shadow-[0_1px_2px_rgba(11,30,91,.05)] transition-colors hover:bg-slate-50"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continuer avec Google
          </button>

          <p className="text-brand-mute mt-16 text-center text-[14px]">
            Vous n'avez pas de compte ?{' '}
            <a href="#" className="focus-ring text-brand-blue rounded hover:underline">
              Contacter l'administrateur
            </a>
          </p>
        </div>
      </main>

      {/* ===== DROITE : PROMOTION ===== */}
      <aside className="right-bg relative hidden w-[53%] flex-col justify-between overflow-hidden px-14 py-14 lg:flex xl:px-16">
        <div className="swoosh -top-40 -right-40 h-[700px] w-[700px] bg-[#1C6BFF] opacity-25 blur-[110px]" />
        <div className="swoosh -bottom-72 -left-60 h-[700px] w-[1100px] rotate-[-12deg] bg-[#0B2FA8] opacity-70" />
        <div className="swoosh right-[-160px] bottom-[-260px] h-[600px] w-[900px] rotate-12 bg-[#0A2C9E] opacity-60" />

        {/* Slogan */}
        <div className="relative z-10 flex items-center justify-end gap-4">
          <span className="bg-brand-light h-px w-12" />
          <span className="text-[12px] font-medium tracking-[.14em] text-white/85 uppercase">
            Plus qu'une boutique, une solution
          </span>
        </div>

        <div className="relative z-10 mt-14">
          <h2 className="mb-6 text-[46px] leading-[1.08] font-bold tracking-tight text-white xl:text-[52px]">
            Gérez votre boutique
            <br />
            <span className="text-brand-light">en toute simplicité</span>
          </h2>
          <p className="mb-12 max-w-[460px] text-[16px] leading-relaxed text-white/85">
            Suivez vos ventes, gérez vos produits, vos commandes et vos clients depuis un
            seul espace, sécurisé et intuitif.
          </p>

          <div className="flex items-center gap-4">
            {/* Fonctionnalités */}
            <ul className="w-[270px] shrink-0 space-y-9">
              {highlights.map((highlight) => (
                <li key={highlight.title} className="flex gap-4">
                  <span className="bg-brand-blue flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-lg shadow-black/20">
                    {highlight.icon}
                  </span>
                  <div>
                    <h3 className="mb-1 text-[15px] font-semibold text-white">
                      {highlight.title}
                    </h3>
                    <p className="text-[13px] leading-snug text-white/65">
                      {highlight.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Mockups */}
            <div
              className="scene relative h-[430px] min-w-0 flex-1 origin-right scale-[0.72]"
              aria-hidden="true"
            >
              <div className="disc absolute right-[-8%] bottom-[-10px] left-[8%] h-[150px] rounded-[50%]" />

              {/* Ordinateur */}
              <div className="laptop absolute top-[10px] right-0 w-[430px]">
                <div className="laptop-screen">
                  <div className="flex h-[255px] overflow-hidden rounded-[6px] bg-white">
                    <div className="flex w-[78px] flex-col gap-1.5 bg-[#0B1E5B] p-2">
                      <div className="mb-2 flex items-center gap-1">
                        <div className="bg-brand-blue h-3 w-3 rounded-sm" />
                        <span className="text-[6px] font-semibold text-white">
                          NovaTech
                        </span>
                      </div>
                      <div className="bg-brand-blue/80 flex h-3.5 items-center rounded px-1 text-[5.5px] text-white">
                        Tableau de bord
                      </div>
                      <div className="flex h-3.5 items-center px-1 text-[5.5px] text-white/60">
                        Commandes
                      </div>
                      <div className="flex h-3.5 items-center px-1 text-[5.5px] text-white/60">
                        Produits
                      </div>
                      <div className="flex h-3.5 items-center px-1 text-[5.5px] text-white/60">
                        Clients
                      </div>
                      <div className="flex h-3.5 items-center px-1 text-[5.5px] text-white/60">
                        Rapports
                      </div>
                      <div className="flex h-3.5 items-center px-1 text-[5.5px] text-white/60">
                        Messages
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 bg-[#F4F7FF] p-2.5">
                      <div className="text-brand-dark mb-2 text-[8px] font-bold">
                        Tableau de bord
                      </div>
                      <div className="mb-2 grid grid-cols-3 gap-1.5">
                        <div className="rounded bg-white p-1.5">
                          <div className="text-[5.5px] text-slate-500">
                            Ventes aujourd'hui
                          </div>
                          <div className="text-brand-dark text-[9px] font-bold">
                            342 500 FCFA
                          </div>
                          <div className="text-[5.5px] font-semibold text-green-600">
                            ↑ +12%
                          </div>
                        </div>
                        <div className="rounded bg-white p-1.5">
                          <div className="text-[5.5px] text-slate-500">Commandes</div>
                          <div className="text-brand-dark text-[11px] font-bold">48</div>
                          <div className="text-[5.5px] font-semibold text-green-600">
                            ↑ +8%
                          </div>
                        </div>
                        <div className="rounded bg-white p-1.5">
                          <div className="text-[5.5px] text-slate-500">Clients</div>
                          <div className="text-brand-dark text-[11px] font-bold">36</div>
                          <div className="text-[5.5px] font-semibold text-green-600">
                            ↑ +14%
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5">
                        <div className="col-span-2 flex h-[108px] flex-col rounded bg-white p-1.5">
                          <div className="text-brand-dark mb-1 text-[6px] font-semibold">
                            Évolution des ventes
                          </div>
                          <svg
                            className="w-full flex-1"
                            viewBox="0 0 100 50"
                            preserveAspectRatio="none"
                          >
                            <path
                              d="M0,44 L12,40 L24,42 L36,32 L48,34 L60,22 L72,26 L84,12 L100,6 L100,50 L0,50Z"
                              fill="#E4EEFF"
                            />
                            <path
                              d="M0,44 L12,40 L24,42 L36,32 L48,34 L60,22 L72,26 L84,12 L100,6"
                              fill="none"
                              stroke="#0A5CFF"
                              strokeWidth="1.6"
                            />
                          </svg>
                        </div>
                        <div className="col-span-3 h-[108px] rounded bg-white p-1.5">
                          <div className="text-brand-dark mb-1 text-[6px] font-semibold">
                            Commandes récentes
                          </div>
                          <div className="space-y-1.5 text-[5.5px] text-slate-600">
                            {recentOrders.map((order) => (
                              <div
                                key={order.reference}
                                className="flex items-center justify-between"
                              >
                                <span>{order.reference}</span>
                                <span>{order.amount}</span>
                                <span className={`badge ${order.className}`}>
                                  {order.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="laptop-base" />
              </div>

              {/* Téléphone */}
              <div className="phone absolute bottom-[26px] left-[-6px] z-20 h-[236px] w-[118px] overflow-hidden">
                <div className="absolute top-0 left-1/2 h-3.5 w-12 -translate-x-1/2 rounded-b-xl bg-[#0A1A55]" />
                <div className="flex h-full flex-col px-2.5 pt-6 pb-2">
                  <div className="mb-2 flex items-center gap-1">
                    <div className="bg-brand-blue h-2.5 w-2.5 rounded-sm" />
                    <span className="text-brand-dark text-[6px] font-bold">NovaTech</span>
                  </div>
                  <div className="text-[5px] text-slate-500">Ventes du jour</div>
                  <div className="text-brand-dark text-[10px] font-bold">
                    342 500 FCFA
                  </div>
                  <div className="mb-1 text-[5px] font-semibold text-green-600">
                    ↑ +12%
                  </div>
                  <svg
                    className="mb-2 h-12 w-full"
                    viewBox="0 0 100 40"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,34 L18,28 L34,31 L52,20 L68,22 L84,10 L100,4 L100,40 L0,40Z"
                      fill="#E4EEFF"
                    />
                    <path
                      d="M0,34 L18,28 L34,31 L52,20 L68,22 L84,10 L100,4"
                      fill="none"
                      stroke="#0A5CFF"
                      strokeWidth="2"
                    />
                  </svg>
                  <div className="mt-auto grid grid-cols-3 gap-1.5">
                    <div className="h-7 rounded bg-[#EAF1FF]" />
                    <div className="h-7 rounded bg-[#EAF1FF]" />
                    <div className="h-7 rounded bg-[#EAF1FF]" />
                    <div className="h-7 rounded bg-[#EAF1FF]" />
                    <div className="h-7 rounded bg-[#EAF1FF]" />
                    <div className="h-7 rounded bg-[#EAF1FF]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="relative z-10 mt-6 flex flex-col items-end">
          <p
            className="mb-1 text-[28px] text-white/85"
            style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive" }}
          >
            Bienvenue chez
          </p>
          <div className="flex items-center gap-2.5">
            <svg width="38" height="42" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path
                d="M20 2.9L35.3 11.4V28.6L20 37.1L4.7 28.6V11.4L20 2.9Z"
                fill="#0A5CFF"
              />
              <path
                d="M20 8.7L29.5 14.3V25.7L20 31.3L10.5 25.7V14.3L20 8.7Z"
                fill="#fff"
              />
              <path
                d="M20 14L24.3 16.5V21.5L20 24L15.7 21.5V16.5L20 14Z"
                fill="#0A5CFF"
              />
            </svg>
            <span className="text-[28px] font-bold tracking-tight text-white">
              NovaTech
            </span>
          </div>
        </div>
      </aside>
    </div>
  )
}
