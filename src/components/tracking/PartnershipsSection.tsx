import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { OrgAvatar } from "@/components/OrgAvatar"
import { partnerships, type PartnershipStatus } from "@/lib/tracking-data"

const statusStyles: Record<PartnershipStatus, string> = {
  Active: "bg-[#e6fcf5] text-[#099268]",
  "In discussion": "bg-chelcie-blue1/10 text-chelcie-blue1",
  "Renewal due": "bg-[#fff4e6] text-[#e8590c]",
}

export function PartnershipsSection() {
  return (
    <div className="@container flex w-full flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="font-arizona text-xl font-semibold tracking-[-0.25px] text-black">
          Corporate & foundation partnerships
        </p>
        <p className="text-[15px] tracking-[-0.23px] text-black/60">
          Business-unit sponsors and in-kind partners, tracked outside the grant pipeline
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 @[750px]:grid-cols-3">
        {partnerships.map((partnership) => (
          <div key={partnership.org} className="flex flex-col gap-4 rounded-[18px] bg-white p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <OrgAvatar org={partnership.org} color={partnership.avatarColor} />
                <p className="truncate text-[15px] font-semibold tracking-[-0.23px] text-black">
                  {partnership.org}
                </p>
              </div>
              <span
                className={cn(
                  "w-fit shrink-0 rounded-[6px] px-2 py-1 text-xs font-semibold whitespace-nowrap",
                  statusStyles[partnership.status]
                )}
              >
                {partnership.status}
              </span>
            </div>

            <p className="text-[13px] leading-[18px] tracking-[-0.08px] text-black/60">
              {partnership.note}
            </p>

            <p className="text-[13px] tracking-[-0.08px] text-black/60">
              Contact: <span className="text-black">{partnership.contact}</span>
            </p>

            <Button className="w-fit rounded-full bg-chelcie-primary-button text-white hover:bg-chelcie-primary-button/90 active:scale-95">
              {partnership.ctaLabel}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
