import { useState } from "react"
import { FileText, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryTabs } from "@/components/CategoryTabs"
import { ProgramCard } from "./ProgramCard"
import { ProgramDetailCard } from "./ProgramDetailCard"
import { ProgramListView } from "./ProgramListView"
import { ProgramBalanceCard } from "@/components/overview/ProgramBalanceCard"
import { programs } from "@/lib/overview-data"

const CATEGORIES = [
  "All",
  "Individuals",
  "Health care systems",
  "Communities and cities",
  "National and global policy",
] as const

type CategoryFilter = (typeof CATEGORIES)[number]
type Layout = "grid" | "list"

type YourProgramsPageProps = {
  initialProgramTitle?: string | null
  onNavigateToDiscover?: () => void
  onNavigateToBoardMemo?: () => void
}

export function YourProgramsPage({
  initialProgramTitle,
  onNavigateToDiscover,
  onNavigateToBoardMemo,
}: YourProgramsPageProps = {}) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All")
  const [openProgram, setOpenProgram] = useState<string | null>(initialProgramTitle ?? null)
  const [layout, setLayout] = useState<Layout>("list")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPrograms = programs
    .filter((program) => activeCategory === "All" || program.category === activeCategory)
    .filter((program) => program.title.toLowerCase().includes(searchQuery.trim().toLowerCase()))

  return (
    <div className="@container flex w-full flex-col gap-6">
      <ProgramBalanceCard />

      <div className="flex items-center justify-between gap-4">
        <p className="font-arizona text-[22px] font-bold leading-7 tracking-[-0.06px] text-black">Your Programs</p>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-black/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search programs"
              className="w-[200px] rounded-full border border-chelcie-separator bg-[#fafafc] py-2 pr-3 pl-9 text-[13px] tracking-[-0.08px] text-black placeholder:text-black/40 focus:ring-2 focus:ring-chelcie-primary-button/30 focus:outline-none"
            />
          </div>

          {onNavigateToBoardMemo && (
            <Button
              variant="outline"
              onClick={onNavigateToBoardMemo}
              className="gap-1.5 rounded-full border-chelcie-primary-button bg-transparent text-chelcie-primary-button hover:bg-chelcie-primary-button/5 active:scale-95"
            >
              <FileText className="size-3.5" />
              Board memo
            </Button>
          )}

          <Button className="gap-1.5 rounded-full bg-chelcie-primary-button text-white hover:bg-chelcie-primary-button/90 active:scale-95">
            <Plus className="size-3.5" />
            Add new program
          </Button>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={() => setLayout(layout === "grid" ? "list" : "grid")}
        className="fixed bottom-6 right-6 z-50 shrink-0 rounded-full border-[#ec4899] bg-white font-devtool text-[#ec4899] shadow-md hover:bg-[#ec4899]/5 active:scale-95"
      >
        {layout === "grid" ? "Alt layout" : "Grid layout"}
      </Button>

      <CategoryTabs
        categories={CATEGORIES}
        active={activeCategory}
        onChange={(category) => {
          setActiveCategory(category)
          setOpenProgram(null)
        }}
      />

      {layout === "list" ? (
        <ProgramListView
          programs={filteredPrograms}
          initialSelectedTitle={initialProgramTitle ?? undefined}
          onSeeMoreOpportunities={onNavigateToDiscover}
        />
      ) : (
        <div className="grid w-full grid-cols-1 gap-6 @[750px]:grid-cols-2 @[1150px]:grid-cols-3">
          {filteredPrograms.map((program) =>
            program.title === openProgram ? (
              <div key={program.title} className="col-span-full">
                <ProgramDetailCard
                  {...program}
                  onClose={() => setOpenProgram(null)}
                  onSeeMoreOpportunities={onNavigateToDiscover}
                />
              </div>
            ) : (
              <ProgramCard
                key={program.title}
                {...program}
                onOpen={() => setOpenProgram(program.title)}
              />
            )
          )}
        </div>
      )}
    </div>
  )
}
