import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { PATHS, REGULAR_BG_COUNT } from './constants'

/** Sidebar */
export const selectSidebarOpen = (s: RootState) => s.sidebar.open

/** Background state */
export const selectAppliedBackgroundId = (s: RootState) => s.background.appliedBackgroundId
export const selectDraftBackgroundId = (s: RootState) => s.background.draftBackgroundId
export const selectGeneratedBackgrounds = (s: RootState) =>
  s.background.generatedBackgrounds ?? []
export const selectGenerationStatus = (s: RootState) => s.background.generationStatus

const REGULARS = Array.from({ length: REGULAR_BG_COUNT }, (_, i) => PATHS.regularBg(i + 1))

/** Memoized: ordered list for grid (generated first, then default, then regulars). Pass count when calling. */
export const selectBackgroundGridImages = createSelector(
  [selectGeneratedBackgrounds],
  (generated) => {
    const all = [...generated, PATHS.defaultBg, ...REGULARS]
    const seen = new Set<string>()
    return all.filter((src) => {
      if (seen.has(src)) return false
      seen.add(src)
      return true
    })
  }
)

/** Memoized: grid images limited to count. Same inputs → same array reference (avoids unnecessary rerenders). */
export const selectBackgroundGridImagesWithCount = createSelector(
  [selectBackgroundGridImages, (_s: RootState, count: number) => count],
  (images, count) => images.slice(0, count)
)

/** Background idea (textarea) undo/redo — single subscription for present + undo/redo flags */
export const selectBackgroundIdea = createSelector(
  [(s: RootState) => s.backgroundIdea],
  (idea) => ({
    present: idea.present,
    canUndo: idea.past.length > 0,
    canRedo: idea.future.length > 0,
    isEmpty: idea.present.trim() === '',
  })
)

/** True when background idea textarea has no (trimmed) content. Use to disable Generate/Regenerate. */
export const selectIsBackgroundIdeaEmpty = createSelector(
  [selectBackgroundIdea],
  (idea) => idea.isEmpty
)
