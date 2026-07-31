import { ChevronRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { activityFeed } from "@/lib/overview-data"

export function ActivityFeed() {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="font-arizona text-xl font-semibold tracking-[-0.25px] text-black">Latest activity</p>

      <div className="flex w-full flex-col overflow-hidden rounded-[18px] bg-white">
        {activityFeed.map((row, i) => (
          <div key={`${row.title}-${i}`} className="flex min-h-[68px] w-full flex-col justify-center px-4 py-2">
            {i > 0 && <Separator className="bg-chelcie-separator" />}
            <div className="flex flex-1 items-center justify-between gap-4">
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <p className="text-[17px] tracking-[-0.43px] text-black">{row.title}</p>
                <p className="text-[15px] tracking-[-0.23px] text-chelcie-label-secondary">
                  {row.date}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                {row.amount && (
                  <span
                    className={`text-[17px] tracking-[-0.43px] ${
                      row.amountColor === "green" ? "text-chelcie-green" : "text-chelcie-label-secondary"
                    }`}
                  >
                    {row.amount}
                  </span>
                )}
                {row.chevron && (
                  <ChevronRight className="size-4 text-black/30" strokeWidth={2.5} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
