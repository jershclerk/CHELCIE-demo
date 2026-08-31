import { X } from "lucide-react"
import { donutArcPath } from "@/lib/arc"
import { CHELCIE_SCORE, scoreBreakdown } from "@/lib/opportunities"

export const SUN_DIAMETER = 300
const RING_INNER = 200
const RING_OUTER = 284
const SVG_SIZE = 610
const GAP_DEG = 2.4
// DaisyDisk's ring is a fan that opens at the bottom, not a closed circle —
// leave a gap there instead of wrapping segments all the way around.
const RING_START_ANGLE = 205
const RING_SWEEP = 310

type Segment = { startAngle: number; endAngle: number; midAngle: number } & (typeof scoreBreakdown)[number]

function buildSegments(): Segment[] {
  let cursor = RING_START_ANGLE
  return scoreBreakdown.map((factor) => {
    const span = (factor.weight / 100) * RING_SWEEP
    const startAngle = cursor + GAP_DEG / 2
    const endAngle = cursor + span - GAP_DEG / 2
    cursor += span
    return { ...factor, startAngle, endAngle, midAngle: (startAngle + endAngle) / 2 }
  })
}

const segments = buildSegments()

type SunProps = {
  open: boolean
  onToggle: () => void
  hoveredFactor: string | null
  onHoverFactor: (label: string | null) => void
}

export function Sun({ open, onToggle, hoveredFactor, onHoverFactor }: SunProps) {
  const c = SVG_SIZE / 2

  return (
    <div
      data-sun="true"
      className="pointer-events-auto absolute top-1/2 left-1/2 z-30 flex cursor-pointer items-center justify-center"
      style={{ width: SVG_SIZE, height: SVG_SIZE, marginLeft: -SVG_SIZE / 2, marginTop: -SVG_SIZE / 2 }}
      onClick={onToggle}
      role="button"
      aria-pressed={open}
      aria-label={open ? "Close CHELCIE score breakdown" : "Open CHELCIE score breakdown"}
    >
      {/* faint glass guide rings, purely decorative */}
      <div
        className="border-ink/10 pointer-events-none absolute rounded-full border transition-opacity duration-500"
        style={{ width: SVG_SIZE * 0.62, height: SVG_SIZE * 0.62, opacity: open ? 0 : 1 }}
      />
      <div
        className="border-ink/[0.07] pointer-events-none absolute rounded-full border transition-opacity duration-500"
        style={{ width: SVG_SIZE * 0.86, height: SVG_SIZE * 0.86, opacity: open ? 0 : 1 }}
      />

      {/* breakdown ring */}
      <svg
        width={SVG_SIZE}
        height={SVG_SIZE}
        viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
      >
        {segments.map((seg, i) => (
          <path
            key={seg.label}
            d={donutArcPath(c, c, RING_OUTER, RING_INNER, seg.startAngle, seg.endAngle)}
            fill={seg.color}
            stroke="var(--scene)"
            strokeWidth={2}
            fillOpacity={hoveredFactor === null || hoveredFactor === seg.label ? 0.95 : 0.35}
            style={{
              transformOrigin: `${c}px ${c}px`,
              transform: open ? "scale(1)" : "scale(0.85)",
              opacity: open ? 1 : 0,
              transition: `transform 420ms cubic-bezier(0.22,1,0.36,1) ${i * 55}ms, opacity 320ms ease ${i * 55}ms, fill-opacity 200ms ease`,
              filter: `drop-shadow(0 0 14px ${seg.color}aa)`,
              cursor: "pointer",
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => onHoverFactor(seg.label)}
            onMouseLeave={() => onHoverFactor(null)}
          />
        ))}
      </svg>

      {/* the sun — a plain circle */}
      <div
        className="sun-pulse absolute rounded-full"
        style={{
          width: SUN_DIAMETER,
          height: SUN_DIAMETER,
          background: "var(--sun-gradient)",
        }}
      />
      <div className="border-ink/60 pointer-events-none absolute rounded-full border" style={{ width: SUN_DIAMETER, height: SUN_DIAMETER }} />

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {!open ? (
          <>
            <span
              className="font-devtool text-[128px] leading-none font-medium text-[#04211b]"
              style={{ textShadow: "0 1px 0 rgba(255,255,255,0.35), 0 0 24px rgba(255,255,255,0.25)" }}
            >
              {CHELCIE_SCORE}
            </span>
            <span className="font-devtool mt-2.5 text-[15px] font-normal tracking-[0.02em] text-[#04211b]/80">
              Chelcie score
            </span>
          </>
        ) : (
          <>
            <span className="font-devtool text-6xl leading-none font-medium text-[#04211b]">{CHELCIE_SCORE}</span>
            <span className="font-devtool mt-2 text-[15px] font-normal tracking-[0.02em] text-[#04211b]/70">
              How it's built
            </span>
          </>
        )}
      </div>

      {open && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggle()
          }}
          className="absolute top-[6%] right-[6%] z-30 flex size-8 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white"
          aria-label="Close breakdown"
        >
          <X className="size-4" strokeWidth={2} />
        </button>
      )}
    </div>
  )
}

export { segments as scoreSegments }
