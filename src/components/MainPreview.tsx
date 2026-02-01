import { useAppDispatch, useAppSelector } from '@/hooks'
import { openSidebar } from '@/lib/store'
import { selectAppliedBackgroundId } from '@/lib/selectors'
import { PATHS, PREVIEW } from '@/lib/constants'
import { Card } from '@/components/ui/card'

export default function MainPreview() {
  const dispatch = useAppDispatch()
  const appliedBackgroundId = useAppSelector(selectAppliedBackgroundId)

  return (
    <Card
      className="relative overflow-hidden p-0"
      style={{
        width: PREVIEW.width,
        height: PREVIEW.height,
        borderRadius: 'var(--radius-card)',
      }}
    >
      <div
        aria-hidden
        className="w-full h-full relative overflow-hidden"
        style={{
          borderRadius: 'var(--radius-card)',
          backgroundImage: `url(${appliedBackgroundId || PATHS.defaultBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <img
          src={PATHS.character}
          alt="Character"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none h-auto"
          style={{ width: PREVIEW.characterWidth }}
          decoding="async"
        />
      </div>

      <button
        type="button"
        onClick={() => dispatch(openSidebar())}
        className="btn-overlay absolute top-2 left-16 w-[153px] h-[34px]"
        aria-label="Change background"
      >
        <img src="/icons/change_background_icon.svg" alt="" className="h-4 w-4 shrink-0" />
        <span>Change background</span>
      </button>
    </Card>
  )
}

