import { useEffect, useState } from "react"
import { Bookmark, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogPopup } from "@/components/ui/dialog"
import { OrgAvatar } from "@/components/OrgAvatar"
import { CreateOpportunityCard } from "@/components/overview/CreateOpportunityCard"
import { UploadProgramBanner } from "./UploadProgramBanner"
import { EmailDraftPanel } from "@/components/overview/EmailDraftPanel"
import { discoverOpportunities } from "@/lib/discover-data"
import type { EmailDraft } from "@/lib/overview-data"
import { DEFAULT_DISCOVER_FILTERS, DiscoverFilters, type DiscoverFilterState } from "./DiscoverFilters"

function OpportunityRowSkeleton() {
  return (
    <div className="flex w-full items-center gap-6 rounded-[18px] bg-white p-6">
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="size-6 shrink-0 animate-pulse rounded-full bg-black/10" />
          <div className="h-3 w-28 animate-pulse rounded-full bg-black/10" />
        </div>
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-black/10" />
        <div className="h-3 w-full animate-pulse rounded-full bg-black/10" />
        <div className="h-3 w-4/5 animate-pulse rounded-full bg-black/10" />
        <div className="flex items-center gap-3">
          <div className="h-3 w-16 animate-pulse rounded-full bg-black/10" />
          <div className="h-3 w-28 animate-pulse rounded-full bg-black/10" />
        </div>
      </div>
      <div className="h-full w-px shrink-0 bg-chelcie-separator" />
      <div className="flex w-[220px] shrink-0 flex-col items-center gap-3">
        <div className="size-16 shrink-0 animate-pulse rounded-full bg-black/10" />
        <div className="h-3 w-32 animate-pulse rounded-full bg-black/10" />
        <div className="h-8 w-full animate-pulse rounded-full bg-black/10" />
      </div>
    </div>
  )
}

function OpportunityRow({ opportunity }: { opportunity: (typeof discoverOpportunities)[number] }) {
  const { org, logoKey, avatarColor, title, amount, deadline, tag, matchPercent, matchedProgram, note } =
    opportunity

  return (
    <div className="flex w-full items-center gap-6 rounded-[18px] bg-white p-6">
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-center gap-2">
          <OrgAvatar org={org} logoKey={logoKey} color={avatarColor} />
          <p className="truncate text-[13px] text-black/60">{org}</p>
        </div>
        <p className="text-[17px] font-semibold tracking-[-0.23px] text-black">{title}</p>
        <p className="max-w-[420px] text-[13px] leading-[18px] tracking-[-0.08px] text-black/70">{note}</p>
        <div className="flex flex-wrap items-center gap-3 text-[13px] tracking-[-0.08px] text-black/60">
          <span className="font-semibold text-black">{amount}</span>
          <span>Deadline: {deadline}</span>
          <span className="w-fit rounded-[6px] bg-chelcie-gray6 px-2 py-0.5 text-xs font-medium text-black/60">
            {tag}
          </span>
        </div>
      </div>

      <div className="h-full w-px shrink-0 bg-chelcie-separator" />

      <div className="flex w-[220px] shrink-0 flex-col items-center gap-3 text-center">
        <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-chelcie-blue1/10 text-2xl font-bold text-chelcie-blue1">
          {matchPercent}%
        </span>
        <div className="flex min-w-0 flex-col items-center gap-0.5">
          <p className="text-[11px] font-medium tracking-[0.02em] text-black/50 uppercase">Matches</p>
          <p className="line-clamp-2 text-[13px] font-semibold tracking-[-0.08px] text-black">
            {matchedProgram}
          </p>
        </div>
        <div className="flex w-full flex-col items-stretch gap-2">
          <Button className="gap-1.5 rounded-full bg-chelcie-primary-button text-white hover:bg-chelcie-primary-button/90 active:scale-95">
            Let's start
          </Button>
          <Button
            variant="outline"
            className="gap-1.5 rounded-full border-chelcie-primary-button bg-transparent text-chelcie-primary-button hover:bg-chelcie-primary-button/5 active:scale-95"
          >
            <Bookmark className="size-3.5" />
            Add to shortlist
          </Button>
        </div>
      </div>
    </div>
  )
}

export function DiscoverOpportunitiesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<DiscoverFilterState>(DEFAULT_DISCOVER_FILTERS)
  const [customDraft, setCustomDraft] = useState<EmailDraft | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(timeout)
  }, [])

  const filteredOpportunities = discoverOpportunities.filter((opportunity) => {
    const matchesQuery = opportunity.org.toLowerCase().includes(filters.query.trim().toLowerCase())
    const matchesScore = opportunity.matchPercent >= filters.minMatch
    const matchesTag = filters.tags.size === 0 || filters.tags.has(opportunity.tag)
    const matchesProgram =
      filters.programTitles.size === 0 || filters.programTitles.has(opportunity.matchedProgram)
    return matchesQuery && matchesScore && matchesTag && matchesProgram
  })

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="font-arizona text-[22px] font-bold leading-7 tracking-[-0.06px] text-black">Discover Opportunities</p>
        <p className="text-[15px] tracking-[-0.23px] text-black/60">
          CHELCIE surfaces funders outside your active pipeline that match your programs.
        </p>
      </div>

      <UploadProgramBanner />

      <CreateOpportunityCard onDraftEmail={setCustomDraft} compact />

      <div className="flex w-full items-start gap-8">
        <DiscoverFilters filters={filters} onChange={setFilters} />

        {isLoading ? (
          <div className="flex w-full flex-col gap-3">
            <p className="flex items-center gap-2 text-[13px] font-medium text-black/60">
              <Sparkles className="size-3.5 animate-pulse text-chelcie-blue1" />
              CHELCIE is sniffing out fresh matches for you
            </p>
            {[0, 1, 2].map((i) => (
              <OpportunityRowSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="flex w-full flex-col gap-3">
            {filteredOpportunities.map((opportunity, index) => (
              <div
                key={opportunity.title}
                className="animate-in fade-in slide-in-from-bottom-3 fill-mode-backwards"
                style={{ animationDuration: "450ms", animationDelay: `${index * 70}ms` }}
              >
                <OpportunityRow opportunity={opportunity} />
              </div>
            ))}
            {filteredOpportunities.length === 0 && (
              <p className="w-full rounded-[16px] border border-dashed border-chelcie-separator p-4 text-center text-xs text-black/40">
                No opportunities match these filters
              </p>
            )}
          </div>
        )}
      </div>

      <Dialog open={customDraft !== null} onOpenChange={(open) => !open && setCustomDraft(null)}>
        <DialogPopup>
          {customDraft && <EmailDraftPanel draft={customDraft} onClose={() => setCustomDraft(null)} />}
        </DialogPopup>
      </Dialog>
    </div>
  )
}
