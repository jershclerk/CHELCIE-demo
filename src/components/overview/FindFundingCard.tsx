import { ArrowRight, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GrainyGlow } from "@/components/GrainyGlow"

type FindFundingCardProps = {
  onStart?: () => void
}

export function FindFundingCard({ onStart }: FindFundingCardProps) {
  return (
    <div className="relative flex h-[168px] w-full items-center justify-between overflow-hidden rounded-[18px] bg-white/65 p-6 backdrop-blur-md">
      <GrainyGlow width={600} height={168} glowOpacity={0.35} className="pointer-events-none absolute top-0 left-0 z-0" />

      <div className="relative z-10 flex flex-col items-start gap-3">
        <p className="text-[13px] tracking-[-0.08px] text-black/70">
          Discover your next funding in seconds
        </p>
        <p className="font-arizona text-2xl font-semibold tracking-[-0.25px] text-black">
          Find opportunities now
        </p>
        <Button
          onClick={onStart}
          className="gap-1.5 rounded-full bg-chelcie-primary-button px-4 text-white hover:bg-chelcie-primary-button/90 active:scale-95"
        >
          Start now
          <ArrowRight className="size-3.5" />
        </Button>
      </div>

      <div className="relative z-10 flex h-[120px] w-[140px] shrink-0 items-center justify-center rounded-[14px] bg-black/5">
        <Compass className="size-8 text-black/25" strokeWidth={1.5} />
      </div>
    </div>
  )
}
