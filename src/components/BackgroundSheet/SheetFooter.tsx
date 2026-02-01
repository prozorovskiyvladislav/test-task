type Props = {
  onApply: () => void
}

export function SheetFooter({ onApply }: Props) {
  return (
    <div className="bottom-0 w-full pt-2.5 mt-2 bg-transparent">
      <div className="py-2.5">
        <button type="button" onClick={onApply} className="btn-primary-pill h-10 mx-auto">
          Apply
        </button>
      </div>
    </div>
  )
}
