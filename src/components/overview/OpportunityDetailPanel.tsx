import { Sparkles, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { recommendedOpportunities } from "@/lib/overview-data"
import wellcomeLogo from "@/assets/org-wellcome.png"
import bloombergLogo from "@/assets/org-bloomberg.png"
import ministryLogo from "@/assets/org-ministry.png"

const logos = {
  wellcome: wellcomeLogo,
  bloomberg: bloombergLogo,
  ministry: ministryLogo,
}

type OpportunityDetailPanelProps = {
  selectedOrg: string | null
  onClose: () => void
  onStartDraft: () => void
}

export function OpportunityDetailPanel({ selectedOrg, onClose, onStartDraft }: OpportunityDetailPanelProps) {
  const opportunity = recommendedOpportunities.find(
    (o) => o.kind === "match" && o.org === selectedOrg
  )

  if (!opportunity || opportunity.kind !== "match") {
    return (
      <div className="flex h-full min-h-[300px] w-full flex-col items-center justify-center gap-1 rounded-[18px] bg-white p-6 text-center">
        <p className="text-[17px] font-semibold tracking-[-0.43px] text-black">
          Select an opportunity
        </p>
        <p className="text-[13px] tracking-[-0.08px] text-black/60">
          Click a card on the left to see more details here.
        </p>
      </div>
    )
  }

  const { logoKey, org, title, amount, percent, submissionDate, tag, details } = opportunity

  return (
    <div className="relative flex max-h-[85vh] w-full flex-col overflow-hidden rounded-[18px] bg-white">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/80 text-black/40 backdrop-blur-sm transition-colors hover:bg-muted hover:text-black"
      >
        <X className="size-4" />
      </button>

      <div className="flex flex-col gap-5 overflow-y-auto p-6">
      <div className="flex items-start justify-between gap-2 pr-8">
        <div className="flex items-center gap-2">
          <img src={logos[logoKey]} alt="" className="size-10 shrink-0 rounded-lg object-cover" />
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-black">{org}</p>
            <p className="text-xs text-black/60">{submissionDate}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex h-[30px] w-[55px] shrink-0 items-center justify-center rounded-lg bg-chelcie-blue1/10 text-[17px] font-semibold text-chelcie-blue1">
            {percent}%
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-[17px] font-semibold tracking-[-0.43px] text-black">{title}</p>
        <p className="text-[17px] tracking-[-0.43px] text-black/60">{amount}</p>
      </div>

      <Badge variant="outline" className="w-fit rounded-[11px] border-transparent bg-[#fafafc] px-2.5 py-1 text-xs font-normal text-[#333333]">
        {tag}
      </Badge>

      <Button
        variant="outline"
        onClick={onStartDraft}
        className="w-fit gap-1.5 rounded-full border-chelcie-primary-button bg-transparent text-chelcie-primary-button hover:bg-chelcie-primary-button/5 active:scale-95"
      >
        <Sparkles className="size-3.5" />
        Start draft with CHELCIE
      </Button>

      <div className="h-px w-full bg-chelcie-separator" />

      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-semibold text-black/60">Overview</p>
        <p className="text-[13px] leading-[18px] tracking-[-0.08px] text-black">
          {details.description}
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-semibold text-black/60">Focus areas</p>
        <div className="flex flex-wrap gap-1.5">
          {details.focusAreas.map((area) => (
            <Badge
              key={area}
              variant="outline"
              className="rounded-[11px] border-transparent bg-[#fafafc] px-2.5 py-1 text-xs font-normal text-[#333333]"
            >
              {area}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-semibold text-black/60">Program officer</p>
        <p className="text-[13px] tracking-[-0.08px] text-black">{details.programOfficer}</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-semibold text-black/60">Funding type</p>
        <p className="text-[13px] tracking-[-0.08px] text-black">{details.fundingType}</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-semibold text-black/60">Why this is a good match</p>
        <ul className="flex flex-col gap-1">
          {details.matchReasons.map((reason) => (
            <li key={reason} className="flex gap-2 text-[13px] leading-[18px] tracking-[-0.08px] text-black">
              <span className="text-chelcie-blue1">•</span>
              {reason}
            </li>
          ))}
        </ul>
      </div>

      </div>

      <div className="shrink-0 border-t border-chelcie-separator p-6 pt-4">
        <Button className="w-fit rounded-full bg-chelcie-primary-button px-4 text-white hover:bg-chelcie-primary-button/90 active:scale-95">
          Start application
        </Button>
      </div>
    </div>
  )
}
