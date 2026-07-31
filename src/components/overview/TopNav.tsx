import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { GrainyGlow } from "@/components/GrainyGlow"
import { cn } from "@/lib/utils"

export type Page = "home" | "programs" | "discover" | "tracking" | "memo"

const navItems = [
  { label: "Home", page: "home" as const, clickable: true },
  { label: "Track Opportunities", page: "tracking" as const, clickable: true },
  { label: "Your Programs", page: "programs" as const, clickable: true },
  { label: "Discover Opportunities", page: "discover" as const, clickable: true },
]

type TopNavProps = {
  activePage: Page
  onNavigate: (page: Page) => void
}

export function TopNav({ activePage, onNavigate }: TopNavProps) {
  return (
    <header className="sticky top-0 z-10 flex h-14 w-full items-center justify-between border-b border-chelcie-separator bg-white/65 px-10 backdrop-blur-md">
      <GrainyGlow width={346} height={56} className="pointer-events-none absolute top-0 left-0 z-0" />

      <button
        type="button"
        onClick={() => onNavigate("home")}
        className="relative z-10 flex items-center gap-2"
      >
        <span className="font-suisse text-2xl font-medium text-black">CHELCIE</span>
        <span className="rounded-full bg-black/5 px-2 py-0.5 text-[11px] font-semibold tracking-[0.02em] text-black/50 uppercase">
          Beta
        </span>
      </button>

      <nav className="relative z-10 flex items-center gap-5">
        {navItems.map(({ label, page, clickable }) => {
          const active = clickable && page === activePage
          return (
            <button
              key={label}
              type="button"
              onClick={clickable && page ? () => onNavigate(page) : undefined}
              className={cn(
                "font-suisse whitespace-nowrap text-xs tracking-[0.15px] transition-colors",
                active
                  ? "font-semibold text-black underline decoration-2 underline-offset-[6px]"
                  : "font-normal text-black/70 hover:text-black",
                clickable ? "cursor-pointer" : "cursor-default"
              )}
            >
              {label}
            </button>
          )
        })}
      </nav>

      <div className="relative z-10 flex items-center gap-3">
        <span className="font-arizona text-sm font-semibold text-foreground">Harvard C-CHANGE</span>
        <Avatar size="sm">
          <AvatarFallback className="bg-chelcie-maroon text-xs font-semibold text-white">
            HC
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
