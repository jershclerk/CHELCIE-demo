import { useState } from "react"
import { ArrowRight, ChevronDown, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogPopup } from "@/components/ui/dialog"
import { GrainyGlow } from "@/components/GrainyGlow"
import { OrgAvatar } from "@/components/OrgAvatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { OpportunityDetailCard } from "@/components/tracking/OpportunityDetailCard"
import { cn } from "@/lib/utils"
import { discoverOpportunities } from "@/lib/discover-data"
import { trackedOpportunities, type TrackingStatus } from "@/lib/tracking-data"
import type { Program, ProgramOpportunityStatus, SecuredFundColor } from "@/lib/overview-data"
import wellcomeLogo from "@/assets/org-wellcome.png"
import bloombergLogo from "@/assets/org-bloomberg.png"
import ministryLogo from "@/assets/org-ministry.png"

const programStatusToTrackingStatus: Record<ProgramOpportunityStatus, TrackingStatus> = {
  Drafting: "Drafting",
  Submitted: "Submitted",
  "In review": "Under Review",
}

function opportunityKey(org: string, title: string) {
  return `${org}-${title}`
}

const logos = {
  wellcome: wellcomeLogo,
  bloomberg: bloombergLogo,
  ministry: ministryLogo,
}

const segmentColor: Record<SecuredFundColor, string> = {
  coral: "#ffb89f",
  yellow: "#fff29f",
  blue: "#9faaff",
}

const statusStyles: Record<ProgramOpportunityStatus, string> = {
  Drafting: "bg-[#e6fcf5] text-[#099268]",
  Submitted: "bg-chelcie-blue1/10 text-chelcie-blue1",
  "In review": "bg-[#fff4e6] text-[#e8590c]",
}

type ProgramDetailCardProps = Program & {
  onClose?: () => void
  onSeeMoreOpportunities?: () => void
}

export function ProgramDetailCard({
  category,
  title,
  secured,
  goal,
  toGo,
  underPursuit,
  securedFunds,
  opportunities,
  onClose,
  onSeeMoreOpportunities,
}: ProgramDetailCardProps) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const matches = discoverOpportunities.filter((opportunity) => opportunity.matchedProgram === title)

  const selectedOpportunity = opportunities.find(
    (opportunity) => opportunityKey(opportunity.org, opportunity.awardName) === selectedKey
  )
  const selectedTracked = selectedOpportunity
    ? trackedOpportunities.find(
        (tracked) => opportunityKey(tracked.org, tracked.title) === selectedKey
      )
    : undefined
  const selectedDetail =
    selectedTracked ??
    (selectedOpportunity && {
      org: selectedOpportunity.org,
      logoKey: selectedOpportunity.logoKey,
      title: selectedOpportunity.awardName,
      amount: selectedOpportunity.amount,
      deadline: selectedOpportunity.submissionDate,
      owner: selectedOpportunity.owner,
      status: programStatusToTrackingStatus[selectedOpportunity.status],
    })

  return (
    <div className="@container flex w-full flex-col gap-6 rounded-[20px] bg-white p-6">
      {onClose ? (
        <button type="button" onClick={onClose} className="flex w-full items-start justify-between gap-2 text-left">
          <span className="w-fit rounded-[6px] bg-chelcie-gray6 px-2 py-1 text-xs font-medium tracking-[-0.01px] text-black">
            {category}
          </span>
          <ChevronDown className="size-6 shrink-0 text-black/40" strokeWidth={1.75} />
        </button>
      ) : (
        <span className="w-fit rounded-[6px] bg-chelcie-gray6 px-2 py-1 text-xs font-medium tracking-[-0.01px] text-black">
          {category}
        </span>
      )}

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-[20px] font-semibold leading-[25px] tracking-[-0.45px] text-black">{title}</p>
        <button
          type="button"
          className="shrink-0 text-[13px] font-medium tracking-[-0.08px] text-chelcie-primary-button underline underline-offset-2 hover:opacity-70"
        >
          See your transaction history
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-x-14 gap-y-3">
        <div className="flex flex-col">
          <p className="text-[15px] leading-[20px] tracking-[-0.23px] text-black">Secured</p>
          <p className="text-[17px] font-semibold leading-[22px] tracking-[-0.43px] text-black">{secured}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-[15px] leading-[20px] tracking-[-0.23px] text-black">Goal</p>
          <p className="text-[17px] font-semibold leading-[22px] tracking-[-0.43px] text-black">{goal}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-[15px] leading-[20px] tracking-[-0.23px] text-black">To go</p>
          <p className="text-[17px] font-semibold leading-[22px] tracking-[-0.43px] text-black">{toGo}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-[15px] leading-[20px] tracking-[-0.23px] text-black">Under pursuit</p>
          <p className="text-[17px] font-semibold leading-[22px] tracking-[-0.43px] text-black">
            {underPursuit}
          </p>
        </div>
      </div>

      <TooltipProvider>
        <div className="flex h-5 w-full overflow-hidden rounded-full bg-[#d9d9d9]">
          {securedFunds.map((fund) => (
            <Tooltip key={fund.label}>
              <TooltipTrigger
                render={
                  <div
                    className="h-full"
                    style={{ width: `${fund.percentOfGoal}%`, backgroundColor: segmentColor[fund.color] }}
                  />
                }
              />
              <TooltipContent>
                {fund.label}: {fund.amount} · {fund.percentOfGoal}%
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>

      <div className="flex flex-col gap-3">
        <div className="flex w-full max-w-[400px] items-baseline justify-between gap-4">
          <p className="text-[17px] font-semibold tracking-[-0.43px] text-black">Secured funds</p>
          <p className="text-[17px] font-semibold tracking-[-0.43px] text-black">{secured}</p>
        </div>
        <div className="flex max-w-[400px] flex-col gap-2.5">
          {securedFunds.map((fund) => (
            <div key={fund.label} className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: segmentColor[fund.color] }}
                />
                <p className="truncate text-[15px] tracking-[-0.23px] text-[#1a1a1a]">{fund.label}</p>
              </div>
              <p className="shrink-0 text-[15px] tracking-[-0.23px] text-[#1a1a1a]">{fund.amount}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex w-full max-w-[400px] items-baseline justify-between gap-4">
          <p className="text-[17px] font-semibold tracking-[-0.43px] text-black">Under pursuit</p>
          <p className="shrink-0 text-[17px] font-semibold tracking-[-0.43px] text-black">{underPursuit}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 @[600px]:grid-cols-2">
          {opportunities.map((opportunity) => (
            <button
              key={opportunity.awardName}
              type="button"
              onClick={() => setSelectedKey(opportunityKey(opportunity.org, opportunity.awardName))}
              className="flex flex-col gap-2.5 rounded-[20px] bg-chelcie-gray6 p-3.5 text-left transition-shadow hover:bg-chelcie-gray6/70"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <img
                    src={logos[opportunity.logoKey]}
                    alt=""
                    className="size-8 shrink-0 rounded-lg object-cover"
                  />
                  <p className="truncate text-xs text-black">{opportunity.org}</p>
                </div>
                <span
                  className={cn(
                    "w-fit shrink-0 rounded-[6px] px-2 py-1 text-xs font-semibold whitespace-nowrap",
                    statusStyles[opportunity.status]
                  )}
                >
                  {opportunity.status}
                </span>
              </div>

              <div className="flex flex-col text-[15px] tracking-[-0.23px]">
                <p className="text-black">{opportunity.awardName}</p>
                <p className="font-semibold text-black">{opportunity.amount}</p>
              </div>

              <div className="flex flex-col gap-1 text-[13px] tracking-[-0.08px]">
                <p>
                  <span className="text-black/60">Submission date:</span>{" "}
                  <span className="text-black">{opportunity.submissionDate}</span>
                </p>
                <p>
                  <span className="text-black/60">Owner:</span>{" "}
                  <span className="text-black">{opportunity.owner}</span>
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex flex-col gap-4 overflow-hidden rounded-[20px] bg-[#f2fbf9] p-5">
        <GrainyGlow width={360} height={180} className="pointer-events-none absolute top-0 left-0 z-0" />

        <div className="relative z-10 flex w-full max-w-[400px] items-baseline justify-between gap-4">
          <p className="flex items-center gap-1.5 text-[17px] font-semibold tracking-[-0.43px] text-black">
            <Rocket className="size-4 shrink-0" />
            Close the gap
          </p>
          <p className="shrink-0 text-[17px] font-semibold tracking-[-0.43px] text-black">{toGo}</p>
        </div>

        {matches.length > 0 ? (
          <div className="relative z-10 grid grid-cols-1 gap-4 @[600px]:grid-cols-2">
            {matches.map((match) => (
              <div
                key={match.title}
                className="flex flex-col gap-4 rounded-[20px] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <OrgAvatar org={match.org} logoKey={match.logoKey} color={match.avatarColor} />
                    <p className="truncate text-xs text-black">{match.org}</p>
                  </div>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-chelcie-blue1/10 text-[13px] font-semibold text-chelcie-blue1">
                    {match.matchPercent}%
                  </span>
                </div>

                <div className="flex flex-col text-[17px] tracking-[-0.43px]">
                  <p className="text-black">{match.title}</p>
                  <p className="font-semibold text-black">{match.amount}</p>
                </div>

                <p className="text-[13px] tracking-[-0.08px] text-black/60">Deadline: {match.deadline}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="relative z-10 text-[13px] tracking-[-0.08px] text-black/60">
            No new matches found right now. CHELCIE will keep scanning.
          </p>
        )}

        {onSeeMoreOpportunities && (
          <Button
            variant="outline"
            onClick={onSeeMoreOpportunities}
            className="relative z-10 w-fit gap-1.5 rounded-full border-chelcie-primary-button bg-transparent text-chelcie-primary-button hover:bg-chelcie-primary-button/5 active:scale-95"
          >
            See more
            <ArrowRight className="size-3.5" />
          </Button>
        )}
      </div>

      <Dialog open={selectedDetail !== undefined} onOpenChange={(open) => !open && setSelectedKey(null)}>
        <DialogPopup>
          {selectedDetail && (
            <OpportunityDetailCard {...selectedDetail} onClose={() => setSelectedKey(null)} />
          )}
        </DialogPopup>
      </Dialog>
    </div>
  )
}
