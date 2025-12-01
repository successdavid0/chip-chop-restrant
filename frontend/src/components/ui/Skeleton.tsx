import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <div
      className={cn(
        'animate-pulse rounded-lg',
        isDark ? 'bg-charcoal-800/60' : 'bg-golden-200/40',
        className
      )}
    />
  )
}

export function MenuCardSkeleton() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <div className={cn(
      "rounded-2xl overflow-hidden",
      isDark 
        ? "bg-charcoal-800/40 border border-charcoal-700/50" 
        : "bg-white/80 border border-golden-200/50 shadow-card-light"
    )}>
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-10 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export function MenuGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MenuCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function HeroSkeleton() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <div className={cn(
      "min-h-screen flex items-center",
      isDark ? "bg-charcoal-900" : "bg-gradient-to-b from-warm-50 to-warm-100"
    )}>
      <div className="container-custom section-padding">
        <div className="max-w-3xl space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-3/4" />
          <Skeleton className="h-6 w-full max-w-xl" />
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-14 w-40 rounded-xl" />
            <Skeleton className="h-14 w-40 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function CartItemSkeleton() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <div className={cn(
      "p-4 flex gap-4 rounded-2xl",
      isDark 
        ? "bg-charcoal-800/40 border border-charcoal-700/50" 
        : "bg-white/80 border border-golden-200/50 shadow-card-light"
    )}>
      <Skeleton className="w-24 h-24 rounded-xl flex-shrink-0" />
      <div className="flex-grow space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-5 w-20" />
      </div>
      <div className="flex flex-col items-end justify-between">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
    </div>
  )
}
