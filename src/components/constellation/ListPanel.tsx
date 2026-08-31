import { Search } from "lucide-react"
import type { Opportunity } from "@/lib/opportunities"
import { cn } from "@/lib/utils"
import { RichOpportunityCard } from "./RichOpportunityCard"

type ListPanelProps = {
  opportunities: Opportunity[]
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  wide: boolean
  search: string
  onSearchChange: (value: string) => void
  rich?: boolean
}

export function ListPanel({
  opportunities,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  wide,
  search,
  onSearchChange,
  rich = false,
}: ListPanelProps) {
  return (
    <div
      className={cn("flex h-full flex-col border-l", rich ? "border-black/10" : "bg-scene border-ink/10")}
      style={rich ? { background: "var(--rich-panel-bg)" } : undefined}
    >
      <div className={cn("shrink-0 border-b px-5 pt-[70px] pb-4", rich ? "border-black/10" : "border-ink/10")}>
        <div
          className={cn(
            "flex items-center gap-2 rounded-full border px-3.5 py-2",
            rich ? "border-black/10 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]" : "border-ink/15 bg-ink/10 backdrop-blur-xl"
          )}
        >
          <Search className={cn("size-3.5 shrink-0", rich ? "text-black/40" : "text-ink/40")} strokeWidth={2} />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search funders or programs"
            className={cn(
              "font-devtool flex-1 bg-transparent text-[13px] font-normal focus:outline-none",
              rich ? "text-black placeholder:text-black/35" : "text-ink placeholder:text-ink/35"
            )}
          />
        </div>
        <p className={cn("font-devtool mt-3 text-lg font-medium", rich ? "text-black" : "text-ink")}>
          {opportunities.length} in view
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3">
        {rich ? (
          <div className="flex flex-col gap-2.5">
            {opportunities.map((o) => (
              <RichOpportunityCard
                key={o.id}
                opportunity={o}
                active={selectedId === o.id}
                onSelect={() => onSelect(o.id)}
                onHover={(hovering) => onHover(hovering ? o.id : null)}
              />
            ))}
            {opportunities.length === 0 && (
              <p className="px-2 py-8 text-center text-[13px] text-black/40">Nothing matches these filters yet.</p>
            )}
          </div>
        ) : (
          <div className={cn("grid gap-2.5", wide ? "grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
            {opportunities.map((o) => {
              const active = selectedId === o.id
              const hovered = hoveredId === o.id
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => onSelect(o.id)}
                  onMouseEnter={() => onHover(o.id)}
                  onMouseLeave={() => onHover(null)}
                  className={cn(
                    "flex flex-col gap-2 rounded-xl border p-3.5 text-left transition-colors",
                    active
                      ? "border-neon/60 bg-ink/[0.08]"
                      : hovered
                        ? "border-ink/15 bg-ink/[0.06]"
                        : "border-ink/10 bg-ink/[0.03] hover:bg-ink/[0.05]"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-devtool text-[13px] leading-tight font-normal text-ink">{o.funder}</p>
                    <span className="font-devtool shrink-0 rounded-full bg-ink/10 px-2 py-0.5 text-[11px] font-normal text-ink/80 tabular-nums">
                      {o.fit}%
                    </span>
                  </div>
                  <p className="line-clamp-2 text-[12px] leading-snug text-ink/50">{o.program}</p>
                  <div className="font-devtool mt-0.5 flex items-center justify-between text-[11.5px] text-ink/40">
                    <span className="text-neon font-medium">{o.amount}</span>
                    <span>Due {o.deadline}</span>
                  </div>
                </button>
              )
            })}

            {opportunities.length === 0 && (
              <p className="col-span-full px-2 py-8 text-center text-[13px] text-ink/40">
                Nothing matches these filters yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
