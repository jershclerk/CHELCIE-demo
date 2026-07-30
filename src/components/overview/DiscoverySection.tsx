import { Badge } from "@/components/ui/badge"
import { recommendedOpportunities } from "@/lib/overview-data"
import wellcomeLogo from "@/assets/org-wellcome.png"
import bloombergLogo from "@/assets/org-bloomberg.png"
import ministryLogo from "@/assets/org-ministry.png"

const logos = {
  wellcome: wellcomeLogo,
  bloomberg: bloombergLogo,
  ministry: ministryLogo,
}

export function DiscoverySection() {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="text-xl font-semibold tracking-[-0.45px] text-black">
        Recommended opportunities for you
      </p>

      <div className="flex w-full gap-4">
        {recommendedOpportunities.map(({ logoKey, org, title, amount, percent, submissionDate, tag }) => (
          <div
            key={org}
            className="flex h-[264px] flex-1 flex-col justify-between rounded-[20px] bg-white p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <img src={logos[logoKey]} alt="" className="size-8 shrink-0 rounded-lg object-cover" />
                <p className="text-xs leading-4 text-black">{org}</p>
              </div>
              <div className="flex h-[30px] w-[55px] shrink-0 items-center justify-center rounded-lg bg-chelcie-blue1/10 text-[17px] font-semibold text-chelcie-blue1">
                {percent}%
              </div>
            </div>

            <div className="flex flex-col items-start gap-0 text-left text-[17px] tracking-[-0.43px]">
              <p className="text-black">{title}</p>
              <p className="font-semibold text-black">{amount}</p>
            </div>

            <div className="flex flex-col text-[13px] tracking-[-0.08px]">
              <span className="text-black/60">Submission date:</span>
              <span className="text-black">{submissionDate}</span>
            </div>

            <Badge variant="outline" className="w-fit rounded-lg px-2.5 py-1 text-xs font-normal text-chelcie-label-secondary">
              {tag}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
