import { ArrowRight, Sparkles } from "lucide-react"
import { GrainyGlow } from "@/components/GrainyGlow"
import { pickUpTasks } from "@/lib/overview-data"

type WelcomeTasksPanelProps = {
  onOpenEmailDraft: () => void
  onSelectOrg: (org: string) => void
}

export function WelcomeTasksPanel({ onOpenEmailDraft, onSelectOrg }: WelcomeTasksPanelProps) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-[18px] bg-white">
      <div className="relative flex flex-col overflow-hidden px-4 pt-4">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]">
          <GrainyGlow width={340} height={90} className="absolute top-0 left-0" />
        </div>

        <span className="relative z-10 flex w-fit items-center gap-1 whitespace-nowrap text-[11px] font-semibold tracking-[0.02em] text-chelcie-teal-text uppercase">
          <Sparkles className="size-3" />
          Queued for you
        </span>
      </div>

      <p className="px-4 pt-1.5 text-[17px] font-semibold tracking-[-0.43px] text-black">
        Pick up where you left off
      </p>

      <div className="flex flex-col px-4 pb-4">
        {pickUpTasks.map((task) => (
          <button
            key={task.title}
            type="button"
            onClick={() => {
              if (task.action === "email") onOpenEmailDraft()
              if (task.action === "opportunity" && task.org) onSelectOrg(task.org)
            }}
            disabled={task.action === "none"}
            className="flex items-center justify-between gap-3 border-t border-chelcie-separator py-3 text-left first:border-t-0 first:pt-1 last:pb-0 disabled:cursor-default"
          >
            <div className="flex min-w-0 flex-col gap-0.5">
              <p className="text-[11px] font-medium text-black/40">{task.tag}</p>
              <p className="truncate text-[14px] font-semibold tracking-[-0.15px] text-black">{task.title}</p>
              <p className="truncate text-xs text-black/60">{task.description}</p>
            </div>
            {task.action !== "none" && (
              <span className="flex shrink-0 items-center gap-1 text-[13px] font-semibold text-black">
                {task.ctaLabel}
                <ArrowRight className="size-3.5" />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
