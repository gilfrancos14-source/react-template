import { icons, type IconName } from '../icons'

type Tone = 'brand' | 'violet' | 'teal' | 'amber'

const tones: Record<Tone, { bg: string; fg: string; spark: string }> = {
  brand: { bg: '#e3eeff', fg: '#1f6bff', spark: '#2f6fe8' },
  violet: { bg: '#ece6fb', fg: '#6c3be0', spark: '#7a52e0' },
  teal: { bg: '#dff7ef', fg: '#10b89a', spark: '#10b89a' },
  amber: { bg: '#fff4dd', fg: '#e08a00', spark: '#e0a23a' },
}

function buildPath(values: readonly number[], width = 64, height = 30) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = max - min || 1

  const points = values.map((value, index) => {
    const x = (index * width) / (values.length - 1)
    const y = height - 4 - ((value - min) / span) * (height - 8)
    return [x, y] as const
  })

  const line = points
    .map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ')

  return `${line} L${width},${height} L0,${height} Z`
}

export function StatCard({
  icon,
  label,
  value,
  delta,
  tone = 'brand',
  trend,
}: {
  icon: IconName
  label: string
  value: string
  delta: string
  tone?: Tone
  trend: readonly number[]
}) {
  const Icon = icons[icon]
  const palette = tones[tone]
  const area = buildPath(trend)

  return (
    <div className="rounded-xl bg-white p-[19px] shadow-card">
      <div className="flex items-center gap-[18px]">
        <span
          className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-xl"
          style={{ backgroundColor: palette.bg, color: palette.fg }}
        >
          <Icon className="h-6 w-6" />
        </span>
        <span className="text-[14px] text-ink">{label}</span>
      </div>

      <p className="mt-[9px] text-[22px] leading-7 font-bold">{value}</p>

      <div className="mt-2 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0a9d6b]">
          <icons.arrowUp className="h-4 w-4" />
          {delta}
        </span>
        <svg width="64" height="30" viewBox="0 0 64 30" fill="none" aria-hidden="true">
          <path d={area} fill={palette.spark} opacity="0.13" />
          <path
            d={area.replace(/ L64,30 L0,30 Z$/, '')}
            stroke={palette.spark}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p className="mt-1 text-[11px] text-mute">par rapport au mois dernier</p>
    </div>
  )
}
