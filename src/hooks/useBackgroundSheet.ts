import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import {
  openSidebar,
  closeSidebar,
  setDraftBackgroundId,
  applyDraftBackground,
  generateBackground,
  commitGenerate,
} from '@/lib/store'
import {
  selectSidebarOpen,
  selectAppliedBackgroundId,
  selectGenerationStatus,
} from '@/lib/selectors'
import { GENERATION_STATUS } from '@/lib/constants'

export function useBackgroundSheet() {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(selectSidebarOpen)
  const appliedBackgroundId = useAppSelector(selectAppliedBackgroundId)
  const generationStatus = useAppSelector(selectGenerationStatus)

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        dispatch(openSidebar())
        dispatch(setDraftBackgroundId(appliedBackgroundId))
      } else {
        dispatch(closeSidebar())
        dispatch(setDraftBackgroundId(appliedBackgroundId))
      }
    },
    [dispatch, appliedBackgroundId]
  )

  const handleGenerate = useCallback(() => {
    dispatch(commitGenerate())
    dispatch(generateBackground())
  }, [dispatch])

  const handleApply = useCallback(() => {
    dispatch(applyDraftBackground())
    dispatch(closeSidebar())
  }, [dispatch])

  const isGenerating = generationStatus === GENERATION_STATUS.pending
  const isGenerationFailed = generationStatus === GENERATION_STATUS.failed

  return {
    isOpen,
    onOpenChange,
    appliedBackgroundId,
    generationStatus,
    isGenerating,
    isGenerationFailed,
    handleGenerate,
    handleApply,
  }
}
