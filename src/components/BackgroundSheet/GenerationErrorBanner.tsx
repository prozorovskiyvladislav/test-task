type Props = {
  onRetry: () => void
}

export function GenerationErrorBanner({ onRetry }: Props) {
  return (
    <div
      className="mt-3 w-full max-w-[var(--sheet-content-width)] rounded-[var(--radius-button)] border border-red-200 bg-red-50 px-4 py-3 text-left"
      role="alert"
      aria-live="polite"
    >
      <p className="text-label text-red-800">
        Background generation failed. Please try again.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-2 text-body-sm font-semibold text-red-700 underline underline-offset-2 hover:text-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 rounded"
      >
        Try again
      </button>
    </div>
  )
}
