import { configureStore } from '@reduxjs/toolkit'
import {
  sidebarSlice,
  backgroundSlice,
  backgroundIdeaSlice,
  openSidebar,
  closeSidebar,
  setDraftBackgroundId,
  applyDraftBackground,
  generateBackground,
  setPresent,
  commitGenerate,
  undo,
  redo,
} from './slices'

export const store = configureStore({
  reducer: {
    sidebar: sidebarSlice.reducer,
    background: backgroundSlice.reducer,
    backgroundIdea: backgroundIdeaSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Re-export actions and thunks so components can import from '@/lib/store'
export { openSidebar, closeSidebar }
export { setDraftBackgroundId, applyDraftBackground, generateBackground }
export { setPresent, commitGenerate, undo, redo }
