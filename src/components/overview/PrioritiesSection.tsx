import { ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { priorities } from "@/lib/overview-data"

export function PrioritiesSection() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col">
        <p className="font-arizona text-xl font-semibold tracking-[-0.25px] text-black">Priorities</p>
        <p className="text-[15px] tracking-[-0.23px] text-[#1a1a1a]">
          Displayed by highest funding and nearest deadline
        </p>
      </div>

      <div className="flex w-full flex-col gap-4">
        {priorities.map(({ title, amount, owner, deadline, tag }) => (
          <button
            key={title}
            type="button"
            className="flex w-full items-center justify-between gap-4 rounded-[18px] bg-white p-5 text-left transition-colors hover:bg-muted/50"
          >
            <div className="flex flex-col gap-1.5">
              <p className="font-arizona text-xl font-semibold tracking-[-0.25px] text-black">{title}</p>
              <p className="text-[15px] tracking-[-0.23px] text-[#727272]">Owner: {owner}</p>
              <p className="text-[15px] tracking-[-0.23px] text-[#1a1a1a]">Deadline: {deadline}</p>
              <Badge variant="outline" className="mt-1 w-fit rounded-[11px] border-transparent bg-[#fafafc] px-2.5 py-1 text-xs font-normal text-[#333333]">
                {tag}
              </Badge>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <p className="text-xl tracking-[-0.45px] text-black">{amount}</p>
              <ChevronRight className="size-6 text-chelcie-label-secondary" strokeWidth={1.75} />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
