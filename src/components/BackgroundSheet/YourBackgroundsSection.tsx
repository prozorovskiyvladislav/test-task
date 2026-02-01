import { useEffect, useRef } from 'react'
import { BackgroundGrid } from '@/components/Backgrounds/BackgroundGrid'

type Props = {
  isOpen: boolean
  appliedBackgroundId: string
}

export function YourBackgroundsSection({ isOpen, appliedBackgroundId }: Props) {
  const gridContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen || !appliedBackgroundId || !gridContainerRef.current) return
    const el = gridContainerRef.current.querySelector(
      `[data-background-id="${appliedBackgroundId}"]`
    )
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [isOpen, appliedBackgroundId])

  return (
    <>
      <div className="pt-10">
        <span className="text-label block h-[17px]">Your backgrounds</span>
      </div>
      <div ref={gridContainerRef}>
        <div className="sheet-content-width">
          <BackgroundGrid />
        </div>
      </div>
    </>
  )
}
