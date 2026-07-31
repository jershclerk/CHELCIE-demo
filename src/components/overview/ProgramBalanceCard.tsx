import { ChevronRight } from "lucide-react"
import { programBalance } from "@/lib/overview-data"
import { GrainTexture } from "@/components/GrainTexture"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

function formatCompactUsd(amount: number) {
  return `$${(amount / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 2 })}M`
}

export function ProgramBalanceCard({ onNavigateToPrograms }: { onNavigateToPrograms?: () => void } = {}) {
  const { total, goal, fundedPercent, underPursuitPercent } = programBalance
  const goalAmount = Number(goal.replace(/\D/g, ""))
  const underPursuitAmount = formatCompactUsd((goalAmount * underPursuitPercent) / 100)

  const Wrapper = onNavigateToPrograms ? "button" : "div"

  return (
    <Wrapper
      type={onNavigateToPrograms ? "button" : undefined}
      onClick={onNavigateToPrograms}
      className="w-full rounded-[18px] bg-white p-6 text-left transition-opacity hover:opacity-90"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm tracking-[-0.01px] text-black/50">Secured funding across all programs</p>
        {onNavigateToPrograms && <ChevronRight className="size-4 shrink-0 text-black/40" strokeWidth={1.75} />}
      </div>
      <div className="mt-1 flex items-baseline justify-between gap-2">
        <p className="text-3xl font-semibold tracking-tight text-black">{total}</p>
        <p className="shrink-0 text-[15px] tracking-[-0.23px] text-black">
          <span className="font-normal">Goal:</span> ${Number(goal.replace(/\D/g, "")).toLocaleString()}
        </p>
      </div>

      <div className="mt-2 flex flex-col gap-5">
        <TooltipProvider>
          <div className="relative h-5 w-full rounded-full bg-[#d9d9d9]">
            <Tooltip>
              <TooltipTrigger
                render={
                  <div
                    className="absolute inset-y-0 left-0 overflow-hidden rounded-l-full bg-chelcie-teal/80"
                    style={{ width: `${fundedPercent}%` }}
                  >
                    <GrainTexture className="absolute inset-0 size-full opacity-40 mix-blend-overlay" />
                  </div>
                }
              />
              <TooltipContent>
                {total} · {fundedPercent}% funded
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={
                  <div
                    className="absolute inset-y-0 bg-[#A3C6D9]"
                    style={{ left: `${fundedPercent}%`, width: `${underPursuitPercent}%` }}
                  />
                }
              />
              <TooltipContent>
                {underPursuitAmount} · {underPursuitPercent}% under pursuit
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2.5">
            <span className="size-4 shrink-0 rounded-full bg-chelcie-teal" />
            <p className="text-[15px] font-semibold tracking-[-0.23px] text-black">
              {fundedPercent}% funded
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="size-4 shrink-0 rounded-full bg-[#A3C6D9]" />
            <p className="text-[15px] font-semibold tracking-[-0.23px] text-black">
              {underPursuitPercent}% under pursuit
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
