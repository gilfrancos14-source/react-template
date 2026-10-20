import { useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { rangeTabs, revenueRanges, type RangeKey } from '../../data/mock'
import { cn } from '../../lib/cn'

const formatAxis = (value: number) =>
  value >= 1_000_000
    ? `${(value / 1_000_000).toFixed(1).replace('.0', '')}M`
    : `${Math.round(value / 1000)}k`

export function RevenueChart() {
  const [range, setRange] = useState<RangeKey>('30d')
  const data = revenueRanges[range]

  return (
    <div className="rounded-xl bg-white px-6 pt-[19px] pb-4 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[17px] font-bold">Évolution des revenus</h2>
        <div className="flex h-[29px] overflow-hidden rounded-md border border-[#dfe8f7] text-[12px] font-medium text-[#5b78b5]">
          {rangeTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setRange(tab.key)}
              className={cn(
                'px-3 transition',
                range === tab.key
                  ? 'bg-[#1f6bff] font-semibold text-white'
                  : 'hover:bg-brand-50',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-[11px] h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="revenue-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#3b82f6" stopOpacity={0.38} />
                <stop offset="1" stopColor="#3b82f6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e6edf9" vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11.5, fill: '#6f87b8' }}
              dy={8}
            />
            <YAxis
              width={46}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11.5, fill: '#6f87b8' }}
              tickFormatter={formatAxis}
            />
            <Tooltip
              cursor={{ stroke: '#cfe0ff' }}
              formatter={(value) => [
                `${Number(value).toLocaleString('fr-FR')} FCFA`,
                'Revenus',
              ]}
              contentStyle={{
                borderRadius: 10,
                border: '1px solid #e6edf9',
                boxShadow: '0 8px 24px rgba(20,60,160,.12)',
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#1f6bff"
              strokeWidth={2.2}
              fill="url(#revenue-fill)"
              activeDot={{ r: 4.5, strokeWidth: 1.5, stroke: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
