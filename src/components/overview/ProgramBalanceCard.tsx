import { programBalance } from "@/lib/overview-data"

export function ProgramBalanceCard() {
  const { total, goal, fundedPercent } = programBalance

  return (
    <div className="w-full rounded-[20px] bg-white p-6">
      <p className="text-4xl font-semibold tracking-tight text-black">{total}</p>
      <p className="mt-4 text-[17px] tracking-[-0.43px] text-black">
        Secured funding across all programs
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <p className="text-[15px] tracking-[-0.23px] text-black">
          <span className="font-normal">Goal:</span> ${Number(goal.replace(/\D/g, "")).toLocaleString()}
        </p>

        <div className="relative h-5 w-full rounded-full bg-[#d9d9d9]">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-chelcie-blue1/80"
            style={{ width: `${fundedPercent}%` }}
          />
        </div>

        <div className="flex items-center gap-2.5">
          <span className="size-4 shrink-0 rounded-full bg-chelcie-blue1" />
          <p className="text-[17px] font-semibold tracking-[-0.43px] text-black">
            {fundedPercent}% funded
          </p>
        </div>
      </div>
    </div>
  )
}
