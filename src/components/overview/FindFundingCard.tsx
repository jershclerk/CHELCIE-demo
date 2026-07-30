import { Button } from "@/components/ui/button"
import illustration from "@/assets/find-funding-illustration.png"

export function FindFundingCard() {
  return (
    <div className="relative flex h-[168px] w-full items-center justify-between overflow-hidden rounded-[20px] bg-white p-6">
      <div className="flex flex-col items-start gap-6">
        <p className="text-[17px] tracking-[-0.43px] text-black">
          Discover your next funding in seconds
        </p>
        <p className="text-3xl font-semibold tracking-tight text-black">
          Find opportunities now
        </p>
        <Button className="rounded-full bg-chelcie-blue1 px-4 text-white hover:bg-chelcie-blue1/90">
          Start now
        </Button>
      </div>

      <img
        src={illustration}
        alt=""
        className="h-[170px] w-[195px] shrink-0 object-contain"
      />
    </div>
  )
}
