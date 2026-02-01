import { clsx, type ClassValue } from "clsx"
import type { CSSProperties } from "react"
import { twMerge } from "tailwind-merge"
import {
  CARD_BORDER,
  getCardBorderState,
  type CardBorderState,
} from '@/lib/constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const CARD_BORDER_STYLES: Record<CardBorderState, CSSProperties> = {
  applied: {
    borderStyle: 'solid',
    borderWidth: CARD_BORDER.width,
    borderColor: CARD_BORDER.color,
  },
  draft: {
    borderStyle: 'dashed',
    borderWidth: CARD_BORDER.width,
    borderColor: CARD_BORDER.color,
  },
  none: {},
}

/**
 * Card border: applied = solid, draft (selected, not applied) = dashed.
 * When draft === applied, only applied style is shown.
 */
export function getCardBorderStyle(
  isApplied: boolean,
  isDraft: boolean
): CSSProperties {
  return CARD_BORDER_STYLES[getCardBorderState(isApplied, isDraft)]
}

/**
 * Format remaining milliseconds as human-readable "X sec left" or "X min Y sec left".
 * Uses GENERATION_DURATION_MS so the label matches the actual wait time.
 */
export function formatRemainingTime(remainingMs: number): string {
  if (remainingMs <= 0) return '0 sec left'
  const totalSec = Math.ceil(remainingMs / 1000)
  if (totalSec < 60) return `${totalSec} sec left`
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  return sec > 0 ? `${min} min ${sec} sec left` : `${min} min left`
}
