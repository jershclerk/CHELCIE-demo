import { scoreBreakdown, CHELCIE_SCORE } from "@/lib/opportunities"
import { cn } from "@/lib/utils"

type ScoreLegendProps = {
  open: boolean
  hoveredFactor: string | null
  onHoverFactor: (label: string | null) => void
}

export function ScoreLegend({ open, hoveredFactor, onHoverFactor }: ScoreLegendProps) {
  return (
    <div
      className={cn(
        "absolute bottom-6 left-6 z-20 w-[300px] rounded-2xl border border-ink/10 bg-ink/10 p-5 text-ink shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-300",
        open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      <p className="font-devtool text-[11px] font-normal tracking-[0.03em] text-ink/45">How your score is built</p>
      <p className="font-devtool mt-0.5 text-xl font-medium text-ink">
        {CHELCIE_SCORE} <span className="text-sm font-normal text-ink/45">/ 100</span>
      </p>

      <div className="mt-4 flex flex-col gap-3">
        {scoreBreakdown.map((factor) => (
          <button
            key={factor.label}
            type="button"
            className={cn(
              "flex items-start gap-2.5 rounded-lg p-1.5 text-left transition-colors",
              hoveredFactor === factor.label ? "bg-ink/10" : "hover:bg-ink/5"
            )}
            onMouseEnter={() => onHoverFactor(factor.label)}
            onMouseLeave={() => onHoverFactor(null)}
          >
            <span className="mt-1 size-2.5 shrink-0 rounded-full" style={{ background: factor.color, boxShadow: `0 0 8px ${factor.color}` }} />
            <span className="flex-1">
              <span className="flex items-baseline justify-between gap-2">
                <span className="text-[13px] font-normal text-ink">{factor.label}</span>
                <span className="font-devtool text-[13px] font-medium text-ink/70">{factor.weight}%</span>
              </span>
              <span className="mt-0.5 block text-[11.5px] leading-snug text-ink/45">{factor.detail}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
