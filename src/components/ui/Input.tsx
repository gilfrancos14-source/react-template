import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { icons, type IconName } from '../icons'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: IconName
  trailing?: ReactNode
}

export function Input({ label, icon, trailing, id, className, ...props }: InputProps) {
  const Icon = icon ? icons[icon] : null

  return (
    <div
      className={cn(
        'relative rounded-xl border border-[#dce5f7] bg-[#f5f8ff] shadow-soft transition focus-within:border-brand-500 focus-within:ring-[3px] focus-within:ring-brand-500/15',
        className,
      )}
    >
      {Icon ? (
        <Icon className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-ink" />
      ) : null}
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-[9px] left-13 text-[11.5px] font-medium text-mute"
      >
        {label}
      </label>
      <input
        id={id}
        className="h-16 w-full bg-transparent pt-5 pr-12 pl-13 text-[15px] font-medium text-ink outline-none placeholder:text-mute/70"
        {...props}
      />
      {trailing ? (
        <div className="absolute top-1/2 right-3 -translate-y-1/2">{trailing}</div>
      ) : null}
    </div>
  )
}
