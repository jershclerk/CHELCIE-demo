import { Minus, Plus, Locate } from "lucide-react"

type ZoomControlsProps = {
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
}

export function ZoomControls({ onZoomIn, onZoomOut, onReset }: ZoomControlsProps) {
  return (
    <div className="pointer-events-auto absolute right-4 bottom-6 z-20 flex flex-col items-center gap-2">
      <div className="flex flex-col overflow-hidden rounded-full border border-ink/10 bg-ink/10 backdrop-blur-xl">
        <button
          type="button"
          onClick={onZoomIn}
          className="flex size-9 items-center justify-center text-ink/80 transition-colors hover:bg-ink/10 hover:text-ink"
          aria-label="Zoom in"
        >
          <Plus className="size-4" strokeWidth={2} />
        </button>
        <div className="h-px w-full bg-ink/10" />
        <button
          type="button"
          onClick={onZoomOut}
          className="flex size-9 items-center justify-center text-ink/80 transition-colors hover:bg-ink/10 hover:text-ink"
          aria-label="Zoom out"
        >
          <Minus className="size-4" strokeWidth={2} />
        </button>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="flex size-9 items-center justify-center rounded-full border border-ink/10 bg-ink/10 text-ink/80 backdrop-blur-xl transition-colors hover:bg-ink/10 hover:text-ink"
        aria-label="Recenter view"
      >
        <Locate className="size-4" strokeWidth={2} />
      </button>
    </div>
  )
}
