import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'success' | 'info' | 'warning' | 'neutral'

const variants: Record<Variant, string> = {
  success: 'bg-[#dcf6ea] text-[#0f9d6b]',
  info: 'bg-[#e1edff] text-brand-500',
  warning: 'bg-[#fff0d9] text-[#e08a00]',
  neutral: 'bg-slate-100 text-slate-500',
}

export function Badge({
  variant = 'neutral',
  className,
  children,
}: {
  variant?: Variant
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-[10.5px] font-semibold whitespace-nowrap',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
