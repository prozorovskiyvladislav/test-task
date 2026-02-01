import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary'
import { store } from './lib/store'
import { APPLIED_BACKGROUND_STORAGE_KEY } from './lib/slices/backgroundSlice'

// Persist applied background to localStorage when it changes
let prevApplied = store.getState().background.appliedBackgroundId
store.subscribe(() => {
  const next = store.getState().background.appliedBackgroundId
  if (next !== prevApplied) {
    prevApplied = next
    try {
      localStorage.setItem(APPLIED_BACKGROUND_STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
)
