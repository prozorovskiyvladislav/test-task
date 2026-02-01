import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setPresent, undo, redo } from '@/lib/store'
import { selectBackgroundIdea } from '@/lib/selectors'
import { isUndoShortcut, isRedoShortcut } from '@/lib/keyboardShortcuts'

/**
 * Encapsulates background-idea textarea state and undo/redo (Redux + keyboard).
 * Use in BackgroundIdeaSection so the component stays presentational.
 */
export function useBackgroundIdeaUndoRedo() {
  const dispatch = useAppDispatch()
  const { present, canUndo, canRedo } = useAppSelector(selectBackgroundIdea)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(setPresent(e.target.value))
    },
    [dispatch]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (isUndoShortcut(e)) {
        e.preventDefault()
        dispatch(undo())
      } else if (isRedoShortcut(e)) {
        e.preventDefault()
        dispatch(redo())
      }
    },
    [dispatch]
  )

  const onUndo = useCallback(() => dispatch(undo()), [dispatch])
  const onRedo = useCallback(() => dispatch(redo()), [dispatch])

  return {
    present,
    handleChange,
    handleKeyDown,
    canUndo,
    canRedo,
    onUndo,
    onRedo,
  }
}
