import { useBackgroundIdeaUndoRedo } from '@/hooks'
import { Textarea } from '@/components/ui/textarea'

type Props = {
  onGenerate: () => void
  disabled: boolean
}

export function BackgroundIdeaSection({ onGenerate, disabled }: Props) {
  const {
    present,
    handleChange,
    handleKeyDown,
    canUndo,
    canRedo,
    onUndo,
    onRedo,
  } = useBackgroundIdeaUndoRedo()

  return (
    <div className="pt-6 flex flex-col gap-3 max-w-[var(--sheet-content-width)] w-full">
      <label
        htmlFor="background-idea"
        className="text-label block h-[17px] flex-none"
      >
        Background idea
      </label>
      <div className="panel-sheet">
        <div className="txt-input">
          <Textarea
            id="background-idea"
            placeholder=""
            value={present}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="h-[116px] min-h-[116px] resize-none border-0 bg-transparent px-4 py-4 shadow-none outline-none focus-visible:ring-0 text-body-sm text-black placeholder:text-black/50 box-border m-0 w-full"
          />
        </div>

        <div className="sheet-footer">
          <button
            type="button"
            className="btn-text-sheet disabled:pointer-events-none disabled:opacity-50"
            onClick={onGenerate}
            disabled={disabled}
          >
            <img
              src="/icons/regenerate.svg"
              alt=""
              className="shrink-0 w-[18px] h-[18px] rounded-[4.04px]"
              style={{ transform: 'matrix(-1, 0, 0, 1, 0, 0)' }}
            />
            <span>Regenerate</span>
          </button>
          <div className="flex flex-row items-center gap-2 pl-2">
            <button
              type="button"
              className="btn-icon-sheet disabled:pointer-events-none disabled:opacity-50"
              aria-label="Undo"
              onClick={onUndo}
              disabled={!canUndo}
            >
              <img src="/icons/backward.svg" alt="" className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="btn-icon-sheet disabled:pointer-events-none disabled:opacity-50"
              aria-label="Redo"
              onClick={onRedo}
              disabled={!canRedo}
            >
              <img src="/icons/forward.svg" alt="" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
