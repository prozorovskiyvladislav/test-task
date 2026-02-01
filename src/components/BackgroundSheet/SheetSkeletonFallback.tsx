import { useAppSelector } from '@/hooks'
import { selectSidebarOpen } from '@/lib/selectors'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * Shown while BackgroundSheet is lazy-loading. Matches sheet position/size so layout doesn’t jump.
 */
export function SheetSkeletonFallback() {
  const isOpen = useAppSelector(selectSidebarOpen)
  if (!isOpen) return null

  return (
    <div
      className="fixed top-0 right-0 z-40 h-full w-full max-w-[400px] border-l border-border bg-background p-5"
      aria-hidden
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between pt-8">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="size-6 rounded-none" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-[116px] w-full max-w-[360px] rounded-[12px]" />
        </div>
        <Skeleton className="h-12 w-full max-w-[360px] rounded-full" />
        <Skeleton className="h-4 w-32" />
        <div className="grid grid-cols-3 gap-3 pt-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[198px] w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
