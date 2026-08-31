import type { LayoutNode } from "@/lib/opportunities"
import { OpportunityCard } from "./OpportunityCard"
import { cn } from "@/lib/utils"

const CARD_HEIGHT = 80

type PlanetProps = {
  node: LayoutNode
  zoom: number
  isSelected: boolean
  isDimmed: boolean
  isHovered: boolean
  onHover: (id: string | null) => void
  onSelect: (id: string) => void
  onCloseCard: () => void
}

export function Planet({ node, zoom, isSelected, isDimmed, isHovered, onHover, onSelect, onCloseCard }: PlanetProps) {
  const active = isSelected || isHovered

  return (
    <div
      className="absolute"
      style={{
        left: node.x,
        top: node.y,
        width: node.cardWidth,
        height: CARD_HEIGHT,
        marginLeft: -node.cardWidth / 2,
        marginTop: -CARD_HEIGHT / 2,
      }}
    >
      <button
        type="button"
        data-planet-id={node.id}
        className={cn(
          "pointer-events-auto absolute inset-0 flex flex-col justify-center gap-1 rounded-2xl border px-2.5 py-1.5 text-left backdrop-blur-md transition-[opacity,transform,box-shadow,border-color] duration-300",
          isDimmed ? "opacity-[0.12] grayscale" : "opacity-100",
          active && !isDimmed ? "border-neon/70 bg-ink/45" : "border-ink/25 bg-ink/30 hover:bg-ink/38"
        )}
        style={{
          boxShadow: active && !isDimmed ? "0 0 0 1px var(--neon), 0 0 22px rgba(62,242,201,0.35)" : "none",
          transform: active && !isDimmed ? "scale(1.05)" : "scale(1)",
          opacity: isDimmed ? undefined : "var(--label-opacity, 1)",
        }}
        onMouseEnter={() => onHover(node.id)}
        onMouseLeave={() => onHover(null)}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(node.id)
        }}
        aria-label={`${node.funder} — ${node.program}, ${node.fit}% fit, ${node.amount}`}
      >
        <div className="flex items-center justify-between gap-1.5">
          <span className="font-devtool text-[10.5px] font-medium text-ink/60">{node.fit}% fit</span>
        </div>
        <p className="font-devtool line-clamp-2 text-[12px] leading-tight font-normal text-ink">{node.funder}</p>
        <p className="font-devtool text-neon text-[10.5px] font-medium">{node.amount}</p>
      </button>

      {isSelected && (
        <div className="absolute bottom-full left-1/2 z-30 -translate-x-1/2 pb-4">
          <div style={{ transform: `scale(${1 / zoom})`, transformOrigin: "bottom center" }}>
            <OpportunityCard opportunity={node} onClose={onCloseCard} />
          </div>
        </div>
      )}
    </div>
  )
}
