/**
 * Tests for background-idea undo/redo state (past / present / future).
 * Reducer behavior: setPresent updates text; commitGenerate snapshots before generate;
 * undo restores previous committed value and clears redo stack; redo restores next value.
 */
import { describe, it, expect } from 'vitest'
import {
  backgroundIdeaSlice,
  setPresent,
  commitGenerate,
  undo,
  redo,
  type BackgroundIdeaState,
} from '@/lib/slices/backgroundIdeaSlice'
import { BACKGROUND_IDEA_HISTORY_MAX } from '@/lib/constants'

const { reducer } = backgroundIdeaSlice

describe('backgroundIdeaSlice', () => {
  describe('setPresent', () => {
    it('updates present only; past, future, lastCommitted unchanged', () => {
      const state = reducer(undefined, setPresent('hello'))
      expect(state.present).toBe('hello')
      expect(state.past).toEqual([])
      expect(state.future).toEqual([])
      expect(state.lastCommitted).toBe('')
    })
  })

  describe('commitGenerate', () => {
    it('no-ops when present is empty (trimmed)', () => {
      const before = { past: [], present: '   ', future: [], lastCommitted: '' }
      const state = reducer(before, commitGenerate())
      expect(state.past).toEqual(before.past)
      expect(state.lastCommitted).toBe(before.lastCommitted)
    })

    it('no-ops when present === lastCommitted (no new content to snapshot)', () => {
      const before = { past: [], present: 'same', future: [], lastCommitted: 'same' }
      const state = reducer(before, commitGenerate())
      expect(state.past).toEqual([])
      expect(state.lastCommitted).toBe('same')
    })

    it('no-ops when last entry in past equals present (avoids duplicate in history)', () => {
      const before = { past: ['b'], present: 'b', future: [], lastCommitted: 'a' }
      const state = reducer(before, commitGenerate())
      expect(state.past).toEqual(before.past)
      expect(state.lastCommitted).toBe(before.lastCommitted)
    })

    it('snapshots: pushes lastCommitted into past, sets lastCommitted to present, clears future', () => {
      const state = reducer(
        { past: [], present: 'new', future: ['x'], lastCommitted: 'old' },
        commitGenerate()
      )
      expect(state.past).toEqual(['old'])
      expect(state.lastCommitted).toBe('new')
      expect(state.present).toBe('new')
      expect(state.future).toEqual([])
    })

    it('keeps past length at most BACKGROUND_IDEA_HISTORY_MAX (drops oldest)', () => {
      const past = Array.from(
        { length: BACKGROUND_IDEA_HISTORY_MAX },
        (_, i) => `entry-${i}`
      )
      const state = reducer(
        {
          past: [...past],
          present: 'new',
          future: [],
          lastCommitted: past[past.length - 1]!,
        },
        commitGenerate()
      )
      expect(state.past.length).toBe(BACKGROUND_IDEA_HISTORY_MAX)
      expect(state.past).toContain('entry-4')
      expect(state.past[0]).toBe('entry-1')
      expect(state.past[state.past.length - 1]).toBe('entry-4')
    })
  })

  describe('undo', () => {
    it('no-ops when past is empty', () => {
      const before = { past: [], present: 'only', future: [], lastCommitted: '' }
      const state = reducer(before, undo())
      expect(state.present).toBe(before.present)
      expect(state.past).toEqual([])
      expect(state.future).toEqual([])
    })

    it('restores previous value: present becomes last in past, current present goes to future', () => {
      const state = reducer(
        { past: ['a'], present: 'b', future: [], lastCommitted: '' },
        undo()
      )
      expect(state.present).toBe('a')
      expect(state.past).toEqual([])
      expect(state.future).toEqual(['b'])
    })

    it('each undo steps back one committed value; future holds undone values (most recent first)', () => {
      let state: BackgroundIdeaState = {
        past: ['first', 'second'],
        present: 'third',
        future: [],
        lastCommitted: 'third',
      }
      state = reducer(state, undo())
      expect(state.present).toBe('second')
      expect(state.future).toEqual(['third'])
      state = reducer(state, undo())
      expect(state.present).toBe('first')
      expect(state.future).toEqual(['second', 'third'])
    })
  })

  describe('redo', () => {
    it('no-ops when future is empty', () => {
      const before = { past: ['a'], present: 'b', future: [], lastCommitted: '' }
      const state = reducer(before, redo())
      expect(state.present).toBe(before.present)
      expect(state.future).toEqual([])
    })

    it('restores next value: first in future becomes present, current present goes to past', () => {
      const state = reducer(
        { past: ['a'], present: 'b', future: ['c'], lastCommitted: '' },
        redo()
      )
      expect(state.present).toBe('c')
      expect(state.past).toEqual(['a', 'b'])
      expect(state.future).toEqual([])
    })

    it('redo after undo returns to the value before undo', () => {
      let state: BackgroundIdeaState = {
        past: ['a'],
        present: 'b',
        future: [],
        lastCommitted: '',
      }
      state = reducer(state, undo())
      expect(state.present).toBe('a')
      state = reducer(state, redo())
      expect(state.present).toBe('b')
    })
  })
})
