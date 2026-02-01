import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  PATHS,
  GENERATION_DURATION_MS,
  GENERATION_STATUS,
  type GenerationStatus,
} from '@/lib/constants'

export type BackgroundState = {
  /** The background currently applied and used in the app */
  appliedBackgroundId: string
  /** The background selected in the sidebar but not yet applied (draft) */
  draftBackgroundId: string | null
  generatedBackgrounds: string[]
  generationStatus: GenerationStatus
}

export const APPLIED_BACKGROUND_STORAGE_KEY = 'appliedBackgroundId'

function getInitialAppliedId(): string {
  try {
    const s = localStorage.getItem(APPLIED_BACKGROUND_STORAGE_KEY)
    if (s) return s
  } catch {
    // ignore
  }
  return PATHS.defaultBg
}

const initialState: BackgroundState = {
  appliedBackgroundId: getInitialAppliedId(),
  draftBackgroundId: null,
  generatedBackgrounds: [],
  generationStatus: GENERATION_STATUS.idle,
}

export const generateBackground = createAsyncThunk(
  'background/generateBackground',
  async () => {
    await new Promise((res) => setTimeout(res, GENERATION_DURATION_MS))
    return PATHS.generatedBg
  }
)

export const backgroundSlice = createSlice({
  name: 'background',
  initialState,
  reducers: {
    /** Set draft selection (e.g. when user clicks a card or when sidebar opens/closes) */
    setDraftBackgroundId: (state, action: PayloadAction<string | null>) => {
      state.draftBackgroundId = action.payload
    },
    /** Apply draft: set applied = draft, reset draft, then caller closes sidebar */
    applyDraftBackground: (state) => {
      if (state.draftBackgroundId) {
        state.appliedBackgroundId = state.draftBackgroundId
      }
      state.draftBackgroundId = state.appliedBackgroundId
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateBackground.pending, (state) => {
        state.generationStatus = GENERATION_STATUS.pending
        state.generatedBackgrounds = [PATHS.generatedBg]
        state.draftBackgroundId = PATHS.generatedBg
      })
      .addCase(generateBackground.fulfilled, (state, action) => {
        state.generationStatus = GENERATION_STATUS.succeeded
        state.generatedBackgrounds = [action.payload]
        state.draftBackgroundId = action.payload
      })
      .addCase(generateBackground.rejected, (state) => {
        state.generationStatus = GENERATION_STATUS.failed
        state.generatedBackgrounds = []
        state.draftBackgroundId = state.appliedBackgroundId
      })
  },
})

export const { setDraftBackgroundId, applyDraftBackground } =
  backgroundSlice.actions
