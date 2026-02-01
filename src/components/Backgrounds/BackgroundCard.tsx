import * as React from 'react'
import { Card } from '@/components/ui/card'
import { useAppDispatch, useAppSelector, useProgressAnimation } from '@/hooks'
import { setDraftBackgroundId } from '@/lib/store'
import {
  selectDraftBackgroundId,
  selectAppliedBackgroundId,
  selectGeneratedBackgrounds,
  selectGenerationStatus,
} from '@/lib/selectors'
import { PATHS, CARD, GENERATION_DURATION_MS, GENERATION_STATUS } from '@/lib/constants'
import { cn, getCardBorderStyle, formatRemainingTime } from '@/lib/utils'
import DefaultBadge from '@/components/DefaultBadge'
import { ProgressCircle } from './ProgressCircle'

type Props = {
  src: string
  index: number
  characterSrc?: string
}

export default function BackgroundCard({
  src,
  index,
  characterSrc = PATHS.character,
}: Props) {
  const dispatch = useAppDispatch()
  const draftBackgroundId = useAppSelector(selectDraftBackgroundId)
  const appliedBackgroundId = useAppSelector(selectAppliedBackgroundId)
  const generated = useAppSelector(selectGeneratedBackgrounds)
  const generationStatus = useAppSelector(selectGenerationStatus)

  const isDraft = draftBackgroundId === src
  const isApplied = appliedBackgroundId === src
  const isDefaultCard = src === PATHS.defaultBg
  const isGenerating = generationStatus === GENERATION_STATUS.pending
  const isThisCardGenerating = isGenerating && generated[0] === src
  const shouldAnimateInsert = generated.includes(src) && isDraft

  const onSelect = () => {
    dispatch(setDraftBackgroundId(src))
  }
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect()
    }
  }
  const [bgLoaded, setBgLoaded] = React.useState(false)
  const onBgLoad = () => setBgLoaded(true)
  const onBgError = () => setBgLoaded(true)

  const progress = useProgressAnimation(isThisCardGenerating, GENERATION_DURATION_MS)

  return (
    <div data-background-id={src}>
      <Card
        onClick={onSelect}
        onKeyDown={onKeyDown}
        role="button"
        tabIndex={0}
        aria-pressed={isDraft}
        className={cn(
          'relative overflow-hidden cursor-pointer focus-ring',
          shouldAnimateInsert && 'card-insert'
        )}
        style={{
          width: CARD.width,
          height: CARD.height,
          opacity: 1,
          ...getCardBorderStyle(isApplied, isDraft),
        }}
      >
      {/* when generating and this is the generated slot, show loading card */}
      {isThisCardGenerating ? (
        <div className="absolute inset-0 bg-black" />
      ) : (
        <>
          {/* background skeleton while image loads */}
          {!bgLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}

          <img
            src={src}
            alt={`bg-${index}`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            width={CARD.width}
            height={CARD.height}
            onLoad={onBgLoad}
            onError={onBgError}
          />
        </>
      )}

      {!isThisCardGenerating && (
        <img
          src={characterSrc}
          alt="character"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: CARD.characterWidth, height: 'auto' }}
          loading="lazy"
          decoding="async"
        />
      )}

      {isDefaultCard ? <DefaultBadge /> : null}
      {isThisCardGenerating && (
        <div className="absolute bottom-[65px] left-1/2 -translate-x-1/2">
          <ProgressCircle progress={progress} />
        </div>
      )}

      {/* remaining time derived from GENERATION_DURATION_MS and current progress */}
      {isThisCardGenerating && (
        <div className="card-generation-label-wrapper">
          <div className="card-generation-label">
            {formatRemainingTime(
              GENERATION_DURATION_MS * (1 - progress / 100)
            )}
          </div>
        </div>
      )}
    </Card>
    </div>
  )
}
