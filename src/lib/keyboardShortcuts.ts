/**
 * Keyboard shortcut helpers for undo/redo. Isolated for testability and reuse.
 */

export function isUndoShortcut(e: React.KeyboardEvent): boolean {
  return (e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey
}

export function isRedoShortcut(e: React.KeyboardEvent): boolean {
  return (e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey
}
