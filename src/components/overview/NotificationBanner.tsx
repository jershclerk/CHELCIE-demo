import { WandSparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NotificationBanner() {
  return (
    <div className="flex h-[54px] w-full items-center justify-between gap-4 rounded-xl bg-white p-5">
      <div className="flex items-center gap-4">
        <div className="relative flex size-10 shrink-0 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-chelcie-blue1/10" />
          <WandSparkles className="relative size-6 text-chelcie-blue1" strokeWidth={1.75} />
        </div>
        <p className="text-[15px] font-semibold tracking-[-0.23px] text-black">
          We matched 4 new funding opportunities across programs.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Button className="rounded-full bg-chelcie-primary-button px-4 text-white hover:bg-chelcie-primary-button/90 active:scale-95">
          See all
        </Button>
        <Button
          variant="outline"
          className="rounded-full border-chelcie-primary-button bg-transparent px-4 text-chelcie-primary-button hover:bg-chelcie-primary-button/5 active:scale-95"
        >
          Hide
        </Button>
      </div>
    </div>
  )
}
