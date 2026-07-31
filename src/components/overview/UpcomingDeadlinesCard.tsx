import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { OrgAvatar } from "@/components/OrgAvatar"
import { trackedOpportunities } from "@/lib/tracking-data"

const MAX_SHOWN = 4

function daysUntil(deadline: Date, today: Date) {
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.ceil((deadline.getTime() - today.getTime()) / msPerDay)
}

function urgencyLabel(days: number) {
  if (days < 0) return "Overdue"
  if (days === 0) return "Due today"
  if (days === 1) return "1 day left"
  return `${days} days left`
}

function urgencyClasses(days: number) {
  if (days <= 7) return "bg-chelcie-red/10 text-chelcie-red"
  if (days <= 30) return "bg-[#fff4e6] text-[#e8590c]"
  return "bg-chelcie-gray6 text-black/60"
}

export function UpcomingDeadlinesCard() {
  const today = new Date()

  const upcoming = trackedOpportunities
    .filter((opportunity) => opportunity.status !== "Awarded" && opportunity.status !== "Declined")
    .map((opportunity) => ({ ...opportunity, deadlineDate: new Date(opportunity.deadline) }))
    .sort((a, b) => a.deadlineDate.getTime() - b.deadlineDate.getTime())
    .slice(0, MAX_SHOWN)

  return (
    <div className="flex w-full flex-col gap-4 rounded-[18px] bg-white p-4">
      <div className="flex items-center gap-1.5">
        <Clock className="size-4 text-black/50" strokeWidth={2} />
        <p className="text-[17px] font-semibold tracking-[-0.43px] text-black">Upcoming deadlines</p>
      </div>

      <div className="flex flex-col gap-1">
        {upcoming.map((opportunity) => {
          const days = daysUntil(opportunity.deadlineDate, today)
          return (
            <div key={`${opportunity.org}-${opportunity.title}`} className="flex items-center gap-2.5 py-1.5">
              <OrgAvatar org={opportunity.org} logoKey={opportunity.logoKey} color={opportunity.avatarColor} />
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="truncate text-[13px] font-semibold tracking-[-0.08px] text-black">
                  {opportunity.title}
                </p>
                <p className="truncate text-xs text-black/50">
                  {opportunity.org} · {opportunity.deadline}
                </p>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-[6px] px-2 py-1 text-[11px] font-semibold whitespace-nowrap",
                  urgencyClasses(days)
                )}
              >
                {urgencyLabel(days)}
              </span>
            </div>
          )
        })}

        {upcoming.length === 0 && (
          <p className="text-[13px] text-black/50">Nothing on the calendar right now.</p>
        )}
      </div>
    </div>
  )
}
