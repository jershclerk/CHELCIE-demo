import { GrainyGlow } from "@/components/GrainyGlow"
import { trackedOpportunities } from "@/lib/tracking-data"

export function ChelcieActivitySummary() {
  const opportunitiesFound = trackedOpportunities.length
  const activeInPipeline = trackedOpportunities.filter(
    (opportunity) => opportunity.status !== "Awarded" && opportunity.status !== "Declined"
  ).length
  const mostRecentWin = trackedOpportunities.find((opportunity) => opportunity.status === "Awarded")

  return (
    <div className="relative mx-auto flex w-full max-w-[900px] items-center justify-between gap-10 overflow-hidden rounded-[18px] bg-white/65 p-6 backdrop-blur-md">
      <GrainyGlow width={480} height={220} className="pointer-events-none absolute top-0 left-0 z-0" />

      <div className="relative z-10 flex shrink-0 flex-col gap-4">
        <p className="max-w-[280px] font-arizona text-[19px] font-semibold tracking-[-0.23px] text-black">
          CHELCIE is actively scanning for funding matches on your behalf.
        </p>
      </div>

      <div className="relative z-10 flex w-full max-w-[420px] flex-col gap-2">
        <p className="px-1 text-xs font-medium tracking-[-0.01px] text-black/50">Since you joined CHELCIE</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1 rounded-[14px] bg-white p-4">
            <p className="text-[13px] leading-[16px] tracking-[-0.08px] text-black/60">
              Opportunities found by CHELCIE
            </p>
            <p className="text-2xl font-semibold tracking-tight text-black">{opportunitiesFound}</p>
          </div>
          <div className="flex flex-col gap-1 rounded-[14px] bg-white p-4">
            <p className="text-[13px] leading-[16px] tracking-[-0.08px] text-black/60">
              Opportunities you're pursuing
            </p>
            <p className="text-2xl font-semibold tracking-tight text-black">{activeInPipeline}</p>
          </div>
        </div>
        {mostRecentWin && (
          <div className="flex flex-col gap-1 rounded-[14px] bg-white p-4">
            <p className="text-[13px] tracking-[-0.08px] text-black/60">Most recent win</p>
            <p className="text-[15px] leading-[20px] font-semibold tracking-[-0.23px] text-black">
              {mostRecentWin.org} awarded {mostRecentWin.amount} for the {mostRecentWin.title}.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
