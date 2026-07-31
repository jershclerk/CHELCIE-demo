import { ChevronRight } from "lucide-react"
import type { Program } from "@/lib/overview-data"

type ProgramCardProps = Program & {
  onOpen: () => void
}

export function ProgramCard({ category, title, secured, goal, underPursuit, percent, onOpen }: ProgramCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full flex-col gap-[21px] rounded-[20px] bg-white p-6 text-left transition-colors hover:bg-muted/40"
    >
      <div className="flex w-full items-start justify-between gap-2">
        <div className="flex flex-col gap-2.5">
          <span className="w-fit rounded-[6px] bg-chelcie-gray6 px-2 py-1 text-xs font-medium tracking-[-0.01px] text-black">
            {category}
          </span>
          <p className="text-[17px] font-semibold leading-[22px] tracking-[-0.43px] text-black">
            {title}
          </p>
        </div>
        <ChevronRight className="size-6 shrink-0 text-black/40" strokeWidth={1.75} />
      </div>

      <div className="flex items-center gap-14">
        <div className="flex flex-col">
          <p className="text-[17px] leading-[22px] tracking-[-0.43px] text-black">Secured</p>
          <p className="text-[20px] font-semibold leading-[25px] tracking-[-0.45px] text-black">
            {secured}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-[17px] leading-[22px] tracking-[-0.43px] text-black">Goal</p>
          <p className="text-[20px] font-semibold leading-[25px] tracking-[-0.45px] text-black">
            {goal}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-[17px] leading-[22px] tracking-[-0.43px] text-black">Under pursuit</p>
          <p className="text-[20px] font-semibold leading-[25px] tracking-[-0.45px] text-black">
            {underPursuit}
          </p>
        </div>
      </div>

      <div className="relative h-5 w-full rounded-full bg-[#d9d9d9]">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-chelcie-lavender"
          style={{ width: `${percent}%` }}
        />
      </div>
    </button>
  )
}
