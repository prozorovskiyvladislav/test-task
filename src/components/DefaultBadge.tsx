export default function DefaultBadge() {
  return (
    <div
      className="absolute top-2 left-2 flex items-center justify-center rounded-[var(--radius-badge)] border border-black/[0.05] bg-white backdrop-blur-[15px] box-border w-[50px] h-[19px] py-1.5 px-1"
    >
      <span className="text-caption-bold uppercase">
        Default
      </span>
    </div>
  )
}

