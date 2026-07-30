import { Home, BarChart2, Search, Radar } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", icon: Home, active: true },
  { label: "Your Programs", icon: BarChart2, active: false },
  { label: "Discover Opportunities", icon: Search, active: false },
  { label: "Track Opportunities", icon: Radar, active: false },
]

export function TopNav() {
  return (
    <header className="sticky top-4 z-10 ml-[120px] mr-10 flex h-14 items-center justify-between rounded-[28px] border-b border-chelcie-separator bg-white/65 px-10 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] backdrop-blur-md">
      <span
        className="bg-clip-text text-2xl font-bold text-transparent"
        style={{ backgroundImage: "linear-gradient(135deg, #2f17ff, #030110)" }}
      >
        Chelcie
      </span>

      <nav className="flex items-center gap-6">
        {navItems.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            className={cn(
              "flex items-center gap-2 whitespace-nowrap text-xl font-bold transition-colors",
              active ? "text-chelcie-blue1" : "text-chelcie-label-secondary hover:text-foreground"
            )}
          >
            <Icon className="size-6 shrink-0" strokeWidth={2} />
            {label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-foreground">Harvard Chan C-CHANGE</span>
        <Avatar size="lg" className="size-9">
          <AvatarFallback className="bg-chelcie-maroon text-sm font-medium text-white">
            HC
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
