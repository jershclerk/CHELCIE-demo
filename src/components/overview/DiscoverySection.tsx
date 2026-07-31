import { ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { recommendedOpportunities } from "@/lib/overview-data"
import wellcomeLogo from "@/assets/org-wellcome.png"
import bloombergLogo from "@/assets/org-bloomberg.png"
import ministryLogo from "@/assets/org-ministry.png"

const logos = {
  wellcome: wellcomeLogo,
  bloomberg: bloombergLogo,
  ministry: ministryLogo,
}

type DiscoverySectionProps = {
  selectedOrg: string | null
  onSelect: (org: string) => void
  onSelectEmail: () => void
  onNavigateToDiscover?: () => void
}

export function DiscoverySection({
  selectedOrg,
  onSelect,
  onSelectEmail,
  onNavigateToDiscover,
}: DiscoverySectionProps) {
  return (
    <div className="@container flex w-full flex-col gap-4">
      {onNavigateToDiscover ? (
        <button
          type="button"
          onClick={onNavigateToDiscover}
          className="flex w-fit items-center gap-1 text-left transition-opacity hover:opacity-70"
        >
          <p className="font-arizona text-xl font-semibold tracking-[-0.25px] text-black">
            Recommended opportunities for you
          </p>
          <ChevronRight className="size-4 shrink-0 text-black/40" strokeWidth={1.75} />
        </button>
      ) : (
        <p className="font-arizona text-xl font-semibold tracking-[-0.25px] text-black">
          Recommended opportunities for you
        </p>
      )}

      <div className="flex w-full flex-col gap-4 @[750px]:flex-row">
        {recommendedOpportunities
          .filter((opportunity) => !opportunity.hidden)
          .map((opportunity) => {
            if (opportunity.kind === "promo") {
              const { heading, body, points, ctaLabel } = opportunity
              return (
                <div
                  key={heading}
                  className="flex w-full flex-col justify-between gap-6 rounded-[18px] bg-white p-5 @[750px]:flex-1"
                >
                  <div className="mt-3 flex flex-col gap-3 text-left text-[17px] tracking-[-0.43px]">
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold text-black">{heading}</p>
                      <p className="text-[13px] leading-[18px] tracking-[-0.08px] text-black/60">
                        {body}
                      </p>
                    </div>

                    {points && points.length > 0 && (
                      <ul className="flex flex-col gap-1.5">
                        {points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-2 text-[13px] leading-[18px] tracking-[-0.08px] text-black/80"
                          >
                            <span className="text-black">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <Button
                    onClick={onSelectEmail}
                    className="w-fit rounded-full bg-chelcie-primary-button px-4 text-white hover:bg-chelcie-primary-button/90 active:scale-95"
                  >
                    {ctaLabel}
                  </Button>
                </div>
              )
            }

            const { logoKey, org, title, amount, percent, submissionDate, tag } = opportunity
            const isSelected = selectedOrg === org
            return (
              <button
                key={org}
                type="button"
                onClick={() => onSelect(org)}
                className={cn(
                  "flex w-full flex-col gap-6 rounded-[18px] bg-white p-5 text-left transition-colors @[750px]:flex-1",
                  isSelected ? "ring-2 ring-chelcie-blue1" : "hover:bg-muted/50"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <img src={logos[logoKey]} alt="" className="size-8 shrink-0 rounded-lg object-cover" />
                    <p className="min-h-12 text-xs leading-4 text-black">{org}</p>
                  </div>
                  <div className="flex h-[30px] w-[55px] shrink-0 items-center justify-center rounded-lg bg-chelcie-blue1/10 text-[17px] font-semibold text-chelcie-blue1">
                    {percent}%
                  </div>
                </div>

                <div className="flex flex-col items-start gap-1 text-left text-[17px] tracking-[-0.43px]">
                  <p className="min-h-[66px] leading-[22px] text-black">{title}</p>
                  <p className="font-semibold text-black">{amount}</p>
                </div>

                <div className="flex flex-col gap-0.5 text-[13px] tracking-[-0.08px]">
                  <span className="text-black/60">Submission date:</span>
                  <span className="text-black">{submissionDate}</span>
                </div>

                <Badge variant="outline" className="w-fit rounded-[11px] border-transparent bg-[#fafafc] px-2.5 py-1 text-xs font-normal text-[#333333]">
                  {tag}
                </Badge>
              </button>
            )
          })}
      </div>
    </div>
  )
}
