import { Check, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { programs } from "@/lib/overview-data"
import { discoverOpportunities } from "@/lib/discover-data"

export type DiscoverFilterState = {
  query: string
  minMatch: number
  tags: Set<string>
  programTitles: Set<string>
}

export const DEFAULT_DISCOVER_FILTERS: DiscoverFilterState = {
  query: "",
  minMatch: 0,
  tags: new Set(),
  programTitles: new Set(),
}

const CATEGORY_TAGS = Array.from(new Set(discoverOpportunities.map((o) => o.tag)))

function countByTag(tag: string) {
  return discoverOpportunities.filter((o) => o.tag === tag).length
}

function countByProgram(title: string) {
  return discoverOpportunities.filter((o) => o.matchedProgram === title).length
}

function FilterCheckbox({
  label,
  count,
  checked,
  onChange,
}: {
  label: string
  count?: number
  checked: boolean
  onChange: () => void
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex w-full items-center gap-2.5 rounded-[10px] py-1 text-left transition-colors hover:bg-chelcie-gray6"
    >
      <span
        className={cn(
          "flex size-[18px] shrink-0 items-center justify-center rounded-[6px] border transition-colors",
          checked ? "border-chelcie-primary-button bg-chelcie-primary-button" : "border-black/20 bg-white"
        )}
      >
        {checked && <Check className="size-3 text-white" strokeWidth={3} />}
      </span>
      <span className="text-[14px] tracking-[-0.08px] text-black">
        {label}
        {count !== undefined && <span className="text-black/40"> ({count})</span>}
      </span>
    </button>
  )
}

function toggle(set: Set<string>, value: string) {
  const next = new Set(set)
  if (next.has(value)) {
    next.delete(value)
  } else {
    next.add(value)
  }
  return next
}

export function DiscoverFilters({
  filters,
  onChange,
}: {
  filters: DiscoverFilterState
  onChange: (filters: DiscoverFilterState) => void
}) {
  const matchablePrograms = programs.filter((program) => countByProgram(program.title) > 0)

  return (
    <aside className="sticky top-[72px] flex w-[260px] shrink-0 flex-col gap-6 rounded-[18px] bg-white p-5">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-black/50">Search by funder</p>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-black/40" />
          <input
            type="text"
            value={filters.query}
            onChange={(event) => onChange({ ...filters, query: event.target.value })}
            placeholder="e.g. Wellcome Trust"
            className="w-full rounded-[11px] border border-chelcie-separator bg-[#fafafc] py-2 pr-3 pl-9 text-[13px] tracking-[-0.08px] text-black placeholder:text-black/40 focus:ring-2 focus:ring-chelcie-primary-button/30 focus:outline-none"
          />
        </div>
      </div>

      <div className="h-px w-full bg-chelcie-separator" />

      <div className="flex flex-col gap-3">
        <p className="text-[17px] font-semibold tracking-[-0.43px] text-black">Filter by</p>
        <div className="flex items-baseline justify-between">
          <p className="text-xs font-semibold text-black/50">Minimum match score</p>
          <span className="text-[13px] font-semibold text-chelcie-blue1">{filters.minMatch}%+</span>
        </div>
        <input
          type="range"
          min={0}
          max={90}
          step={5}
          value={filters.minMatch}
          onChange={(event) => onChange({ ...filters, minMatch: Number(event.target.value) })}
          className="w-full accent-chelcie-primary-button"
        />
      </div>

      <div className="h-px w-full bg-chelcie-separator" />

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-black/50">Category</p>
        {CATEGORY_TAGS.map((tag) => (
          <FilterCheckbox
            key={tag}
            label={tag}
            count={countByTag(tag)}
            checked={filters.tags.has(tag)}
            onChange={() => onChange({ ...filters, tags: toggle(filters.tags, tag) })}
          />
        ))}
      </div>

      {matchablePrograms.length > 0 && (
        <>
          <div className="h-px w-full bg-chelcie-separator" />
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-black/50">Matches your program</p>
            {matchablePrograms.map((program) => (
              <FilterCheckbox
                key={program.title}
                label={program.title}
                count={countByProgram(program.title)}
                checked={filters.programTitles.has(program.title)}
                onChange={() =>
                  onChange({ ...filters, programTitles: toggle(filters.programTitles, program.title) })
                }
              />
            ))}
          </div>
        </>
      )}
    </aside>
  )
}
