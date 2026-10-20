import { activities } from '../../data/mock'
import { cn } from '../../lib/cn'
import { icons } from '../icons'

const tones = {
  brand: 'bg-[#e3eeff] text-[#1f6bff]',
  teal: 'bg-[#dff7ef] text-[#10b89a]',
  violet: 'bg-[#ece6fb] text-[#6c3be0]',
  amber: 'bg-[#fff4dd] text-[#e08a00]',
} as const

export function ActivityFeed() {
  return (
    <div className="rounded-xl bg-white px-[19px] pt-[14px] pb-4 shadow-card">
      <h2 className="flex h-[22px] items-center text-[15px] font-bold">
        Activité récente
      </h2>

      <ul className="mt-2">
        {activities.map((activity) => {
          const Icon = icons[activity.icon]

          return (
            <li key={activity.title} className="flex h-[51px] items-start gap-3">
              <span
                className={cn(
                  'grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full',
                  tones[activity.tone],
                )}
              >
                <Icon className="h-[17px] w-[17px]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11.5px] leading-4 font-semibold">{activity.title}</p>
                <p className="mt-[3px] truncate text-[10.5px] text-mute">
                  {activity.description}
                </p>
              </div>
              <span className="text-[10px] whitespace-nowrap text-mute">
                {activity.time}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
