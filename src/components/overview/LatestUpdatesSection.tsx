import { ArrowUp, ArrowDown } from "lucide-react"
import { latestUpdates } from "@/lib/overview-data"

const colorClasses = {
  blue: { swatch: "bg-chelcie-blue1/10", text: "text-chelcie-blue1" },
  orange: { swatch: "bg-chelcie-orange2/10", text: "text-chelcie-orange2" },
}

export function LatestUpdatesSection() {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="text-xl font-semibold tracking-[-0.45px] text-black">Latest updates</p>

      <div className="flex w-full gap-4">
        {latestUpdates.map(({ score, delta, color, org, amount, description }) => {
          const isUp = delta >= 0
          return (
            <div
              key={org}
              className="flex h-[264px] flex-1 flex-col justify-between rounded-[20px] bg-white p-4"
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
                  className={`flex h-[30px] w-[55px] shrink-0 items-center justify-center gap-0.5 rounded-lg text-[17px] font-semibold ${
                    isUp ? "bg-chelcie-green/10 text-chelcie-green" : "bg-chelcie-red/10 text-chelcie-red"
                  }`}
                >
                  {isUp ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />}
                  {Math.abs(delta)}
                </div>
              </div>

              <div className="flex flex-col items-start gap-0 text-left text-[17px] tracking-[-0.43px]">
                <p className="font-semibold text-black">{amount}</p>
              </div>

              <p className="text-[13px] leading-[18px] tracking-[-0.08px] text-black">{description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
