type Props = {
  onGenerate: () => void
  disabled: boolean
}

export function GenerateBackgroundButton({ onGenerate, disabled }: Props) {
  return (
    <div className="pt-6 flex flex-col">
      <button
        type="button"
        className="btn-primary-pill h-12 mx-auto disabled:pointer-events-none disabled:opacity-50"
        onClick={onGenerate}
        disabled={disabled}
        aria-busy={disabled}
        aria-disabled={disabled}
      >
        <img src="/icons/generate.svg" alt="" className="h-4 w-4 shrink-0" />
        <span>Generate BG for 1 credit</span>
      </button>
    </div>
  )
}
