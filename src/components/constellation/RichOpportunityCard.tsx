import type { Opportunity } from "@/lib/opportunities"
import { cn } from "@/lib/utils"

type RichOpportunityCardProps = {
  opportunity: Opportunity
  active: boolean
  onSelect: () => void
  onHover: (hovering: boolean) => void
}

// V3's ScoreCard, shrunk into a list row: a gradient score panel on the left
// (score sized way down from V3's 80px hero number) + funder detail on the right.
export function RichOpportunityCard({ opportunity, active, onSelect, onHover }: RichOpportunityCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={cn(
        "font-devtool flex w-full items-stretch overflow-hidden rounded-2xl bg-white text-left shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-shadow",
        active ? "ring-2 ring-[color:var(--neon)]" : "hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
      )}
    >
      <div
        className="flex w-[84px] shrink-0 flex-col items-center justify-center gap-0.5 px-2 py-3"
        style={{ background: "var(--card-accent-gradient)" }}
      >
        <span className="font-arizona text-[26px] leading-none font-bold text-black">{opportunity.fit}</span>
        <span className="text-center text-[8.5px] leading-tight font-medium text-black/50">Chelcie score</span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 px-3.5 py-2.5">
        <p className="truncate text-[10.5px] font-medium text-black/45">{opportunity.program}</p>
        <p className="truncate text-[14px] font-bold tracking-[-0.1px] text-black">{opportunity.funder}</p>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <span className="text-[13px] font-semibold text-black">{opportunity.amount}</span>
          <span className="truncate text-[10px] text-black/40">{opportunity.cycle}</span>
        </div>
      </div>
    </button>
  )
}
