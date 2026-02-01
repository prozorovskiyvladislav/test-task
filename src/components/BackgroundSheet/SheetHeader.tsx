import { SheetClose, SheetTitle, SheetDescription } from '@/components/ui/sheet'

export function SheetHeader() {
  return (
    <div className="flex items-center justify-between pt-8">
      <SheetTitle className="sr-only">Change background</SheetTitle>
      <SheetDescription className="sr-only">
        Dialog for changing the background image and generating new backgrounds
      </SheetDescription>
      <span className="text-heading-sheet">
        Change background
      </span>
      <SheetClose
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-none border-0 bg-transparent p-0 outline-none ring-0 hover:opacity-80 focus:ring-0 cursor-pointer"
        aria-label="Close"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="shrink-0"
          style={{ transform: 'rotate(-180deg)' }}
          aria-hidden
        >
          <line x1="0" y1="0" x2="12" y2="12" stroke="currentColor" strokeWidth="1.6" />
          <line x1="12" y1="0" x2="0" y2="12" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </SheetClose>
    </div>
  )
}
