import { useState, useEffect, useRef } from 'react'

/**
 * Drives a 0→100 progress value over a duration using requestAnimationFrame.
 * Resets to 0 when inactive. Cleans up RAF on unmount or when active becomes false.
 */
export function useProgressAnimation(
  isActive: boolean,
  durationMs: number
): number {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!isActive) {
      setProgress(0)
      return
    }

    setProgress(0)
    let start: number | null = null

    const step = (ts: number) => {
      if (start === null) start = ts
      const elapsed = ts - start
      const p = Math.min(100, Math.round((elapsed / durationMs) * 100))
      setProgress(p)
      if (elapsed < durationMs) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        setProgress(100)
      }
    }

    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }
    }
  }, [isActive, durationMs])

  return progress
}
