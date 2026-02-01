/** Design and app constants in one place */

export const FONT_FAMILY = 'Italian Plate No2 Expanded' as const

export const PATHS = {
  defaultBg: '/images/bg_default.png',
  character: '/images/character.png',
  generatedBg: '/images/bg_generated.png',
  regularBg: (index: number) => `/images/bg_regular_${index}.png`,
} as const

export const REGULAR_BG_COUNT = 10

/** Max entries in textarea undo history */
export const BACKGROUND_IDEA_HISTORY_MAX = 5

/** Duration used by generateBackground thunk (ms) */
export const GENERATION_DURATION_MS = 1200

/** Background generation status */
export const GENERATION_STATUS = {
  idle: 'idle',
  pending: 'pending',
  succeeded: 'succeeded',
  failed: 'failed',
} as const

export type GenerationStatus = (typeof GENERATION_STATUS)[keyof typeof GENERATION_STATUS]

export const CARD = {
  width: 112,
  height: 198,
  characterWidth: 128,
  /** "X sec left" label on generating card: position and size */
  generationLabel: {
    bottom: 13,
    minWidth: 64,
    height: 12,
    fontSize: 12,
  },
} as const

/** Card selection border (applied = solid, draft = dashed) */
export const CARD_BORDER = {
  width: '2px',
  color: 'black',
} as const

/** Card border state: applied = solid, draft = dashed, none = no border */
export const CARD_BORDER_STATE = {
  applied: 'applied',
  draft: 'draft',
  none: 'none',
} as const

export type CardBorderState = (typeof CARD_BORDER_STATE)[keyof typeof CARD_BORDER_STATE]

export function getCardBorderState(
  isApplied: boolean,
  isDraft: boolean
): CardBorderState {
  if (isApplied) return CARD_BORDER_STATE.applied
  if (isDraft) return CARD_BORDER_STATE.draft
  return CARD_BORDER_STATE.none
}

/** Main preview (large card) dimensions */
export const PREVIEW = {
  width: 281,
  height: 500,
  characterWidth: 320,
} as const
