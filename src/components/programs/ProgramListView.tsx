import { useEffect, useRef, useState } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Program } from "@/lib/overview-data"
import { ProgramDetailCard } from "./ProgramDetailCard"

type ProgramListViewProps = {
  programs: Program[]
  initialSelectedTitle?: string
  onSeeMoreOpportunities?: () => void
}

export function ProgramListView({ programs, initialSelectedTitle, onSeeMoreOpportunities }: ProgramListViewProps) {
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const index = initialSelectedTitle ? programs.findIndex((program) => program.title === initialSelectedTitle) : -1
    return index === -1 ? 0 : index
  })
  const [canScrollDown, setCanScrollDown] = useState(false)
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([])
  const listRef = useRef<HTMLDivElement | null>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setSelectedIndex(0)
  }, [programs])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault()
        setSelectedIndex((index) => Math.min(index + 1, programs.length - 1))
      } else if (event.key === "ArrowUp") {
        event.preventDefault()
        setSelectedIndex((index) => Math.max(index - 1, 0))
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [programs.length])

  useEffect(() => {
    rowRefs.current[selectedIndex]?.scrollIntoView({ block: "nearest" })
  }, [selectedIndex])

  useEffect(() => {
    const el = listRef.current
    if (!el) return

    const updateScrollState = () => {
      setCanScrollDown(el.scrollHeight - el.scrollTop - el.clientHeight > 1)
    }

    updateScrollState()
    el.addEventListener("scroll", updateScrollState)
    const resizeObserver = new ResizeObserver(updateScrollState)
    resizeObserver.observe(el)
    return () => {
      el.removeEventListener("scroll", updateScrollState)
      resizeObserver.disconnect()
    }
  }, [programs])

  if (programs.length === 0) {
    return <p className="text-[15px] tracking-[-0.23px] text-black/60">No programs in this category.</p>
  }

  const selected = programs[selectedIndex]

  return (
    <div className="flex w-full items-start gap-6">
      <div className="sticky top-[72px] w-[360px] shrink-0">
        <div
          ref={listRef}
          className="flex max-h-[calc(100vh-200px)] flex-col overflow-y-auto rounded-[20px] bg-white [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-track]:bg-transparent"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(0,0,0,0.2) transparent" }}
        >
          {programs.map((program, index) => {
          const isSelected = index === selectedIndex
          return (
            <button
              key={program.title}
              ref={(el) => {
                rowRefs.current[index] = el
              }}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "flex w-full shrink-0 flex-col gap-3 border-b border-chelcie-separator px-5 py-5 text-left transition-colors last:border-b-0",
                isSelected ? "bg-black/[0.08]" : "hover:bg-muted/50"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="line-clamp-2 text-[15px] font-semibold tracking-[-0.23px] text-black">
                  {program.title}
                </p>
                <ChevronRight
                  className={cn("size-4 shrink-0", isSelected ? "text-black/60" : "text-black/30")}
                  strokeWidth={1.75}
                />
              </div>
              <span className="text-xs font-medium text-black/60">
                {program.secured} / {program.goal} · {program.percent}% funded
              </span>
            </button>
            )
          })}
        </div>

        {canScrollDown && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 rounded-b-[20px] bg-gradient-to-t from-white to-transparent" />
        )}
      </div>

      <div className="sticky top-[72px] flex-1">
        <ProgramDetailCard
          key={selected.title}
          {...selected}
          onSeeMoreOpportunities={onSeeMoreOpportunities}
        />
      </div>
    </div>
  )
}
