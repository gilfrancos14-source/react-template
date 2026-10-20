import { useOutletContext } from 'react-router-dom'
import { ActivityFeed } from '../components/dashboard/ActivityFeed'
import { PromoCard } from '../components/dashboard/PromoCard'
import { RecentOrders } from '../components/dashboard/RecentOrders'
import { RevenueChart } from '../components/dashboard/RevenueChart'
import { SalesDonut } from '../components/dashboard/SalesDonut'
import { icons } from '../components/icons'
import { Button } from '../components/ui/Button'
import { StatCard } from '../components/ui/StatCard'
import { stats } from '../data/mock'
import type { DashboardContext } from '../layouts/DashboardLayout'
import { getEmail } from '../lib/auth'

const today = new Date().toLocaleDateString('fr-FR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function Dashboard() {
  const { search } = useOutletContext<DashboardContext>()
  const email = getEmail()
  const username = email
    .split('@')[0]
    .replace(/[._-]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4 px-[5px]">
        <div>
          <h1 className="text-[28px] leading-[34px] font-bold">Bonjour, {username}</h1>
          <p className="mt-1.5 text-[16px] text-[#3f64b8]">
            Voici un aperçu de votre activité aujourd'hui.
          </p>
        </div>

        <Button variant="secondary" size="lg" className="h-[45px]">
          <icons.calendar className="h-5 w-5 text-mute" />
          <span className="capitalize">{today}</span>
          <icons.chevronDown className="ml-4 h-4 w-4 text-mute" />
        </Button>
      </div>

      <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            delta={stat.delta}
            tone={stat.tone}
            trend={stat.trend}
          />
        ))}
      </section>

      <section className="mt-[19px] grid gap-[19px] xl:grid-cols-[727fr_469fr]">
        <RevenueChart />
        <SalesDonut />
      </section>

      <section className="mt-5 grid gap-[19px] lg:grid-cols-2 xl:grid-cols-[466fr_373fr_338fr]">
        <RecentOrders search={search} />
        <ActivityFeed />
        <div className="lg:col-span-2 xl:col-span-1">
          <PromoCard />
        </div>
      </section>
    </>
  )
}
