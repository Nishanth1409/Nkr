export function SectionDivider() {
  return (
    <div
      className="flex w-full items-center justify-center py-8 md:py-12"
      aria-hidden
    >
      <div className="h-px flex-1 bg-linear-to-r from-transparent via-black/20 to-black/40" />
      <div className="mx-6 flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-black shadow-sm" />
        <div className="h-1 w-1 animate-pulse rounded-full bg-black" />
        <div className="h-2 w-2 rotate-45 bg-black" />
        <div className="h-1 w-1 animate-pulse rounded-full bg-black delay-75" />
        <div className="h-3 w-3 rounded-full bg-black shadow-sm" />
      </div>
      <div className="h-px flex-1 bg-linear-to-r from-black/40 via-black/20 to-transparent" />
    </div>
  )
}
