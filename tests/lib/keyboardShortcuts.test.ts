/**
 * Tests for undo/redo keyboard detection: Cmd|Ctrl+Z (undo), Cmd|Ctrl+Shift+Z (redo).
 */
import { describe, it, expect } from 'vitest'
import { isUndoShortcut, isRedoShortcut } from '@/lib/keyboardShortcuts'

function keyEvent(
  key: string,
  options: { metaKey?: boolean; ctrlKey?: boolean; shiftKey?: boolean } = {}
): React.KeyboardEvent {
  return {
    key,
    metaKey: options.metaKey ?? false,
    ctrlKey: options.ctrlKey ?? false,
    shiftKey: options.shiftKey ?? false,
    preventDefault: () => {},
  } as unknown as React.KeyboardEvent
}

describe('keyboardShortcuts', () => {
  describe('isUndoShortcut', () => {
    it('returns true for Cmd+Z (metaKey + z, no shift)', () => {
      expect(isUndoShortcut(keyEvent('z', { metaKey: true }))).toBe(true)
    })

    it('returns true for Ctrl+Z (ctrlKey + z, no shift)', () => {
      expect(isUndoShortcut(keyEvent('z', { ctrlKey: true }))).toBe(true)
    })

    it('returns false for Cmd+Shift+Z (redo)', () => {
      expect(isUndoShortcut(keyEvent('z', { metaKey: true, shiftKey: true }))).toBe(false)
    })

    it('returns false for Ctrl+Shift+Z (redo)', () => {
      expect(isUndoShortcut(keyEvent('z', { ctrlKey: true, shiftKey: true }))).toBe(false)
    })

    it('returns false for key other than z', () => {
      expect(isUndoShortcut(keyEvent('y', { metaKey: true }))).toBe(false)
    })

    it('returns false when no modifier', () => {
      expect(isUndoShortcut(keyEvent('z'))).toBe(false)
    })
  })

  describe('isRedoShortcut', () => {
    it('returns true for Cmd+Shift+Z', () => {
      expect(isRedoShortcut(keyEvent('z', { metaKey: true, shiftKey: true }))).toBe(true)
    })

    it('returns true for Ctrl+Shift+Z', () => {
      expect(isRedoShortcut(keyEvent('z', { ctrlKey: true, shiftKey: true }))).toBe(true)
    })

    it('returns false for Cmd+Z (undo)', () => {
      expect(isRedoShortcut(keyEvent('z', { metaKey: true }))).toBe(false)
    })

    it('returns false for Ctrl+Z (undo)', () => {
      expect(isRedoShortcut(keyEvent('z', { ctrlKey: true }))).toBe(false)
    })

    it('returns false for key other than z', () => {
      expect(isRedoShortcut(keyEvent('y', { metaKey: true, shiftKey: true }))).toBe(false)
    })
  })
})
