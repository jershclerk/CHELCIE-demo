import { cn } from "@/lib/utils"

export type FitTier = "all" | "strong" | "good" | "explore"

const FIT_TIERS: { key: FitTier; label: string }[] = [
  { key: "all", label: "All fit" },
  { key: "strong", label: "Strong 80+" },
  { key: "good", label: "Good 60–79" },
  { key: "explore", label: "Explore <60" },
]

type FilterBarProps = {
  fitTier: FitTier
  onSetFitTier: (tier: FitTier) => void
}

export function FilterBar({ fitTier, onSetFitTier }: FilterBarProps) {
  return (
    <div className="pointer-events-none absolute top-[72px] left-4 z-20 flex max-w-[calc(100%-2rem)] flex-col gap-2">
      <div className="pointer-events-auto flex flex-wrap gap-1.5">
        {FIT_TIERS.map((tier) => (
          <button
            key={tier.key}
            type="button"
            onClick={() => onSetFitTier(tier.key)}
            className={cn(
              "font-devtool rounded-full border px-3 py-1.5 text-[12px] font-normal backdrop-blur-xl transition-colors",
              fitTier === tier.key
                ? "border-neon/60 bg-neon/25 text-ink"
                : "border-ink/10 bg-ink/10 text-ink/65 hover:border-ink/25 hover:text-ink"
            )}
          >
            {tier.label}
          </button>
        ))}
      </div>
    </div>
  )
}
