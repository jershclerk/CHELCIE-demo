import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/components/ui/menu"
import { cn } from "@/lib/utils"
import { OrgAvatar } from "@/components/OrgAvatar"
import { usePlaybookSection } from "./PlaybookSection"
import {
  ASSIGNABLE_TEAM,
  NEEDS_ASSIGNEE_OWNER,
  TRACKING_STATUS_BADGE_STYLES,
  type TrackedOpportunity,
} from "@/lib/tracking-data"

type OpportunityDetailCardProps = TrackedOpportunity & {
  onClose: () => void
  onAssignOwner?: (name: string) => void
  onNavigateToProgram?: (programTitle: string) => void
}

export function OpportunityDetailCard({
  onClose,
  onAssignOwner,
  onNavigateToProgram,
  ...item
}: OpportunityDetailCardProps) {
  const {
    org,
    logoKey,
    avatarColor,
    title,
    amount,
    deadline,
    owner,
    status,
    fitScore,
    gapCoveragePercent,
    totalGap,
    window: applicationWindow,
    readyToApply,
    blockerNote,
    scoreHistory,
    covers,
  } = item

  const hasFitData = fitScore !== undefined
  const { body: playbookBody, footer: playbookFooter } = usePlaybookSection({ status })

  return (
    <div className="@container relative flex max-h-[85vh] w-full flex-col overflow-hidden rounded-[20px] bg-white">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/80 text-black/40 backdrop-blur-sm transition-colors hover:bg-muted hover:text-black"
      >
        <X className="size-4" strokeWidth={1.75} />
      </button>

      <div className="flex flex-col gap-6 overflow-y-auto p-6">
      <div className="flex w-full items-start justify-between gap-2">
        <span
          className={cn(
            "w-fit shrink-0 rounded-[6px] px-2 py-1 text-xs font-semibold whitespace-nowrap",
            TRACKING_STATUS_BADGE_STYLES[status]
          )}
        >
          {status}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <OrgAvatar org={org} logoKey={logoKey} color={avatarColor} className="size-10" />
        <div className="flex flex-col">
          <p className="text-[15px] tracking-[-0.23px] text-black/60">{org}</p>
          <p className="text-[20px] font-semibold tracking-[-0.45px] text-black">{title}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
        <div className="flex flex-col">
          <p className="text-[17px] leading-[22px] tracking-[-0.43px] text-black">Ask</p>
          <p className="text-[20px] font-semibold leading-[25px] tracking-[-0.45px] text-black">{amount}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-[17px] leading-[22px] tracking-[-0.43px] text-black">Deadline</p>
          <p className="text-[20px] font-semibold leading-[25px] tracking-[-0.45px] text-black">{deadline}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-[17px] leading-[22px] tracking-[-0.43px] text-black">Owner</p>
          {owner === NEEDS_ASSIGNEE_OWNER && onAssignOwner ? (
            <Menu>
              <MenuTrigger
                className="flex w-fit items-center gap-1 rounded-full border border-chelcie-primary-button px-3 py-1 text-[13px] font-semibold text-chelcie-primary-button transition-colors hover:bg-chelcie-primary-button/5 active:scale-95"
              >
                Assign a member
                <ChevronDown className="size-3.5" strokeWidth={2} />
              </MenuTrigger>
              <MenuPopup>
                {ASSIGNABLE_TEAM.map((name) => (
                  <MenuItem key={name} onClick={() => onAssignOwner(name)}>
                    {name}
                  </MenuItem>
                ))}
              </MenuPopup>
            </Menu>
          ) : (
            <p className="text-[20px] font-semibold leading-[25px] tracking-[-0.45px] text-black">{owner}</p>
          )}
        </div>
        {hasFitData && (
          <div className="flex flex-col">
            <p className="text-[17px] leading-[22px] tracking-[-0.43px] text-black">Fit score</p>
            <p className="text-[20px] font-semibold leading-[25px] tracking-[-0.45px] text-chelcie-blue1">
              {fitScore}
            </p>
          </div>
        )}
      </div>

      {hasFitData && readyToApply !== undefined && (
        <div
          className={cn(
            "flex flex-col gap-3 rounded-[16px] p-4",
            readyToApply ? "bg-[#e6fcf5]" : "bg-chelcie-gray6"
          )}
        >
          <p
            className={cn(
              "text-xs font-semibold tracking-[0.02em] uppercase",
              readyToApply ? "text-[#099268]" : "text-black/50"
            )}
          >
            {status === "Submitted" || status === "Under Review"
              ? "Awaiting funder review"
              : readyToApply
                ? "Ready to apply"
                : "Blocked"}
          </p>
          <p className="text-[13px] leading-[18px] tracking-[-0.08px] text-black/70">{blockerNote}</p>
          {(status === "In Progress" || status === "Drafting") && (
            <Button
              variant="outline"
              className="w-fit gap-1.5 rounded-full border-chelcie-primary-button bg-transparent text-chelcie-primary-button hover:bg-chelcie-primary-button/5 active:scale-95"
            >
              Continue drafting
            </Button>
          )}
        </div>
      )}

      {hasFitData && gapCoveragePercent !== undefined && (
        <div className="flex flex-col gap-2">
          <p className="text-[17px] font-semibold tracking-[-0.43px] text-black">Gap coverage</p>
          <p className="text-[13px] tracking-[-0.08px] text-black/60">
            If awarded, would cover {gapCoveragePercent}% of {totalGap}
            {applicationWindow ? ` · ${applicationWindow}` : ""}
          </p>
        </div>
      )}

      {scoreHistory && scoreHistory.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-[17px] font-semibold tracking-[-0.43px] text-black">Why this score moved</p>
          <div className="flex flex-col gap-3">
            {scoreHistory.map((entry) => (
              <div key={entry.date} className="flex gap-3">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-chelcie-blue1" />
                <div className="flex flex-col gap-0.5">
                  <p className="text-[13px] font-semibold tracking-[-0.08px] text-black">
                    {entry.label} <span className="font-normal text-black/50">· {entry.date}</span>{" "}
                    <span className="text-chelcie-blue1">+{entry.delta}</span>
                  </p>
                  <p className="text-[13px] leading-[18px] tracking-[-0.08px] text-black/60">{entry.note}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs tracking-[-0.01px] text-black/40">
            CHELCIE rescores nightly using 990 filings, RFP language, personnel moves, and public commitments.
          </p>
        </div>
      )}

      {covers && covers.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-[17px] font-semibold tracking-[-0.43px] text-black">
            {status === "Awarded" ? "What this award funds" : "Covers"}
          </p>
          <div className="flex flex-col gap-2">
            {covers.map((coverage) => (
              <div
                key={coverage.title}
                className="flex items-center justify-between gap-4 rounded-[14px] bg-chelcie-gray6 p-3"
              >
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="text-[11px] font-medium tracking-[0.02em] text-black/50 uppercase">
                    {coverage.category}
                  </p>
                  {onNavigateToProgram ? (
                    <button
                      type="button"
                      onClick={() => onNavigateToProgram(coverage.title)}
                      className="truncate text-left text-[13px] font-semibold tracking-[-0.08px] text-chelcie-blue1 hover:underline"
                    >
                      {coverage.title}
                    </button>
                  ) : (
                    <p className="truncate text-[13px] font-semibold tracking-[-0.08px] text-black">
                      {coverage.title}
                    </p>
                  )}
                </div>
                <p
                  className={cn(
                    "shrink-0 text-[13px] font-semibold tracking-[-0.08px]",
                    status === "Awarded" ? "text-[#2b8a3e]" : "text-black"
                  )}
                >
                  {status === "Awarded" ? `Funds ${coverage.gap}` : `Gap ${coverage.gap}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {playbookBody}
      </div>

      {playbookFooter && (
        <div className="shrink-0 border-t border-chelcie-separator p-6 pt-4">{playbookFooter}</div>
      )}
    </div>
  )
}
