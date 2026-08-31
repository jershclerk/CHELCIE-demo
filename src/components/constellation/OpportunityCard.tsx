import { X } from "lucide-react"
import type { Opportunity } from "@/lib/opportunities"

export function OpportunityCard({ opportunity, onClose }: { opportunity: Opportunity; onClose: () => void }) {
  return (
    <div className="border-neon/40 relative w-[260px] rounded-2xl border bg-ink/10 p-4 text-left shadow-[0_18px_45px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute top-2.5 right-2.5 flex size-5 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-ink/10 hover:text-ink"
        aria-label="Close"
      >
        <X className="size-3" strokeWidth={2} />
      </button>

      <div className="flex items-start justify-between gap-2 pr-5">
        <div className="flex flex-col gap-0.5">
          <p className="font-devtool text-[10.5px] font-normal text-ink/45">{opportunity.program}</p>
          <p className="font-devtool text-[16px] leading-tight font-medium tracking-[-0.1px] text-ink">{opportunity.funder}</p>
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between">
        <span className="font-devtool text-lg font-medium tracking-tight text-ink">{opportunity.amount}</span>
        <span className="border-neon/50 text-neon font-devtool rounded-full border px-2 py-0.5 text-[11px] font-medium">
          {opportunity.fit}% fit
        </span>
      </div>
      <p className="font-devtool mt-1 text-[10.5px] text-ink/40">
        {opportunity.cycle} · Due {opportunity.deadline}
      </p>

      <div className="mt-3 flex flex-col gap-1.5 border-t border-ink/10 pt-2.5">
        {opportunity.matchReasons.slice(0, 2).map((reason) => (
          <div key={reason} className="flex items-start gap-1.5">
            <span className="bg-neon mt-1 size-1.5 shrink-0 rounded-full" />
            <p className="text-[11.5px] leading-snug text-ink/65">{reason}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
