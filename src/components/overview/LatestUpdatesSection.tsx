import { ArrowUp, ArrowDown } from "lucide-react"
import { latestUpdates } from "@/lib/overview-data"

const colorClasses = {
  blue: { swatch: "bg-chelcie-blue1/10", text: "text-chelcie-blue1" },
  orange: { swatch: "bg-chelcie-orange2/10", text: "text-chelcie-orange2" },
}

export function LatestUpdatesSection() {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="font-arizona text-xl font-semibold tracking-[-0.25px] text-black">Latest updates</p>

      <div className="flex w-full gap-4">
        {latestUpdates.map(({ score, delta, color, org, amount, description }) => {
          const isUp = delta >= 0
          return (
            <div
              key={org}
              className="flex flex-1 flex-col gap-3 rounded-[18px] bg-white p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-[15px] font-bold tracking-[-0.26px] ${colorClasses[color].swatch} ${colorClasses[color].text}`}
                  >
                    {score}
                  </div>
                  <p className="text-xs leading-4 text-black">{org}</p>
                </div>
                <div
                  className={`flex shrink-0 items-center gap-0.5 text-xs font-medium ${
                    isUp ? "text-chelcie-teal-text" : "text-chelcie-red"
                  }`}
                >
                  {isUp ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                  {Math.abs(delta)}
                </div>
              </div>

              <p className="text-left text-[17px] font-semibold tracking-[-0.43px] text-black">{amount}</p>

              <p className="text-[13px] leading-[18px] tracking-[-0.08px] text-black">{description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
