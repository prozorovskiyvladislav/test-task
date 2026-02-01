import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { BACKGROUND_IDEA_HISTORY_MAX } from '@/lib/constants'

/** Keep only the last max entries. Pure helper for reducer logic. */
function capToMax(entries: string[], max: number): string[] {
  return entries.length > max ? entries.slice(-max) : entries
}

export type BackgroundIdeaState = {
  past: string[]
  present: string
  future: string[]
  /** Value of present at the last onGenerate. Pushed into past on next commit so undo always restores a different visible state. */
  lastCommitted: string
}

const initialState: BackgroundIdeaState = {
  past: [],
  present: '',
  future: [],
  lastCommitted: '',
}

export const backgroundIdeaSlice = createSlice({
  name: 'backgroundIdea',
  initialState,
  reducers: {
    /** Update current value (on every textarea onChange). No history change. */
    setPresent: (state, action: PayloadAction<string>) => {
      state.present = action.payload
    },
    /**
     * Snapshot runs BEFORE generate so we capture the state the user just confirmed.
     * We push the previous committed value (not present) into past so that undo always
     * moves to a different visible state—never a no-op.
     * No snapshot for empty input or when present equals last committed (repeated content).
     */
    commitGenerate: (state) => {
      if (state.present.trim() === '') return
      if (state.present === state.lastCommitted) return
      const lastInPast = state.past[state.past.length - 1]
      if (lastInPast === state.present) return

      state.past.push(state.lastCommitted)
      state.past = capToMax(state.past, BACKGROUND_IDEA_HISTORY_MAX)
      state.lastCommitted = state.present
      state.future = []
    },
    /** Undo: present → future (front), pop past → present. No-op if past empty. */
    undo: (state) => {
      if (state.past.length === 0) return
      state.future.unshift(state.present)
      const popped = state.past.pop()
      if (popped !== undefined) state.present = popped
    },
    /** Redo: present → past, shift future → present. No-op if future empty. */
    redo: (state) => {
      if (state.future.length === 0) return
      state.past.push(state.present)
      const shifted = state.future.shift()
      if (shifted !== undefined) state.present = shifted
    },
  },
})

export const { setPresent, commitGenerate, undo, redo } =
  backgroundIdeaSlice.actions
