import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useAppSelector } from '@/hooks'
import { useBackgroundSheet } from '@/hooks/useBackgroundSheet'
import { selectIsBackgroundIdeaEmpty } from '@/lib/selectors'
import { SheetHeader } from './SheetHeader'
import { BackgroundIdeaSection } from './BackgroundIdeaSection'
import { GenerateBackgroundButton } from './GenerateBackgroundButton'
import { GenerationErrorBanner } from './GenerationErrorBanner'
import { YourBackgroundsSection } from './YourBackgroundsSection'
import { SheetFooter } from './SheetFooter'

export default function BackgroundSheet() {
  const {
    isOpen,
    onOpenChange,
    appliedBackgroundId,
    isGenerating,
    isGenerationFailed,
    handleGenerate,
    handleApply,
  } = useBackgroundSheet()
  const isIdeaEmpty = useAppSelector(selectIsBackgroundIdeaEmpty)
  const generateDisabled = isGenerating || isIdeaEmpty

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="!w-full !max-w-[400px] sm:!max-w-[400px] h-full p-0 border-l overflow-y-auto"
        showCloseButton={false}
      >
        <div className="h-full w-full px-5">
          <SheetHeader />
          <BackgroundIdeaSection onGenerate={handleGenerate} disabled={generateDisabled} />
          <GenerateBackgroundButton onGenerate={handleGenerate} disabled={generateDisabled} />
          {isGenerationFailed && (
            <GenerationErrorBanner onRetry={handleGenerate} />
          )}
          <YourBackgroundsSection
            isOpen={isOpen}
            appliedBackgroundId={appliedBackgroundId}
          />
          <SheetFooter onApply={handleApply} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
