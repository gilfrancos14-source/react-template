import { cn } from '../../lib/cn'
import { icons, type IconName } from '../icons'

type Tone = 'brand' | 'teal' | 'violet' | 'amber'

const tones: Record<Tone, string> = {
  brand: 'bg-[#e3eeff] text-[#1f6bff]',
  teal: 'bg-[#dff7ef] text-[#10b89a]',
  violet: 'bg-[#ece6fb] text-[#6c3be0]',
  amber: 'bg-[#fff4dd] text-[#e08a00]',
}

export function KpiCard({
  icon,
  label,
  value,
  hint,
  tone,
}: {
  icon: IconName
  label: string
  value: string
  hint: string
  tone: Tone
}) {
  const Icon = icons[icon]

  return (
    <div className="rounded-xl bg-white p-5 shadow-card">
      <div className="flex items-center gap-3">
        <span className={cn('grid h-11 w-11 place-items-center rounded-xl', tones[tone])}>
          <Icon className="h-5 w-5" />
        </span>
        <span className="text-[13px] text-mute">{label}</span>
      </div>
      <p className="mt-3 text-[24px] leading-8 font-bold text-ink">{value}</p>
      <p className="mt-0.5 text-[11.5px] text-mute">{hint}</p>
    </div>
  )
}
