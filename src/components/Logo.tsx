import { cn } from '../lib/cn'

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 38 42"
      fill="none"
      aria-hidden="true"
      className={cn('h-10 w-9 shrink-0', className)}
    >
      <path d="M19 1 36 10v20L19 41 2 30V10z" fill="#1f6bff" />
      <path d="M19 1 36 10 19 19 2 10z" fill="#6aa5ff" />
      <path d="M19 19v22L2 30V10z" fill="#2a78ff" />
      <path d="M19 19 36 10v20L19 41z" fill="#0f4fd6" />
      <path
        d="M12 14v13l7 4 7-4V14"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('text-[22px] font-bold tracking-tight text-white', className)}>
      NovaTech
    </span>
  )
}
