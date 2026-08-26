import { useState } from "react"
import { AlertTriangle, Check, ChevronDown } from "lucide-react"
import { CategoryTabs } from "@/components/CategoryTabs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogPopup } from "@/components/ui/dialog"
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/components/ui/menu"
import { cn } from "@/lib/utils"
import { OrgAvatar } from "@/components/OrgAvatar"
import { OpportunityDetailCard } from "./OpportunityDetailCard"
import {
  NEEDS_ASSIGNEE_OWNER,
  TRACKING_STATUSES,
  TRACKING_STATUS_BADGE_STYLES,
  trackedOpportunities,
  type TrackedOpportunity,
  type TrackingStatus,
} from "@/lib/tracking-data"

const FILTERS = ["All", ...TRACKING_STATUSES.map(({ status }) => status)] as const
type StatusFilter = (typeof FILTERS)[number]
type BoardLayout = "pills" | "sections"

const STATUSES_WITHOUT_SCORE = new Set<TrackingStatus>(["Submitted", "Awarded", "Declined"])

function itemKey(item: TrackedOpportunity) {
  return `${item.org}-${item.title}`
}

function OpportunityCard({
  item,
  selectable,
  selected,
  onOpen,
}: {
  item: TrackedOpportunity
  selectable: boolean
  selected: boolean
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "flex w-full flex-col gap-2 rounded-[16px] bg-white p-4 text-left transition-shadow hover:bg-muted/40",
        item.attentionReason && "ring-1 ring-amber-300 bg-amber-50/40",
        selected && "ring-2 ring-chelcie-primary-button"
      )}
    >
      {item.attentionReason && (
        <div className="flex items-center gap-1 text-[11px] font-semibold tracking-[-0.08px] text-amber-700">
          <AlertTriangle className="size-3" strokeWidth={2.5} />
          Needs attention
        </div>
      )}
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "w-fit shrink-0 rounded-[6px] px-2 py-1 text-xs font-semibold whitespace-nowrap",
            TRACKING_STATUS_BADGE_STYLES[item.status]
          )}
        >
          {item.status}
        </span>
        <div className="flex shrink-0 items-center gap-2">
          {item.fitScore !== undefined && !STATUSES_WITHOUT_SCORE.has(item.status) && (
            <span className="flex h-6 shrink-0 items-center justify-center rounded-md bg-chelcie-blue1/10 px-2 text-xs font-semibold text-chelcie-blue1">
              {item.fitScore}%
            </span>
          )}
          {selectable && (
            <span
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                selected ? "border-chelcie-primary-button bg-chelcie-primary-button" : "border-black/20 bg-white"
              )}
            >
              {selected && <Check className="size-3 text-white" strokeWidth={3} />}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <OrgAvatar org={item.org} logoKey={item.logoKey} color={item.avatarColor} />
        <p className="truncate text-xs text-black">{item.org}</p>
      </div>
      <p className="text-[15px] font-semibold tracking-[-0.23px] text-black">{item.title}</p>
      <p className="text-[15px] font-semibold tracking-[-0.23px] text-black">{item.amount}</p>
      {item.attentionReason ? (
        <p className="text-[12px] font-medium tracking-[-0.08px] text-black/50">{item.attentionReason}</p>
      ) : (
        <div className="flex flex-col gap-0.5 text-[12px] tracking-[-0.08px] text-black/50">
          <span>Deadline: {item.deadline}</span>
          <span>Owner: {item.owner}</span>
        </div>
      )}
    </button>
  )
}

export function OpportunityBoard({
  onNavigateToProgram,
}: {
  onNavigateToProgram?: (programTitle: string) => void
}) {
  const [layout, setLayout] = useState<BoardLayout>("pills")
  const [filter, setFilter] = useState<StatusFilter>("All")
  const [expandedKey, setExpandedKey] = useState<string | null>(null)
  const [ownerOverrides, setOwnerOverrides] = useState<Record<string, string>>({})
  const [statusOverrides, setStatusOverrides] = useState<Record<string, TrackingStatus>>({})
  const [selectionMode, setSelectionMode] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())

  const resolvedItems = trackedOpportunities.map((item) => {
    const key = itemKey(item)
    const owner = ownerOverrides[key] ?? item.owner
    const status = statusOverrides[key] ?? item.status
    return {
      ...item,
      owner,
      status,
      attentionReason: owner === NEEDS_ASSIGNEE_OWNER ? item.attentionReason : undefined,
    }
  })

  const filteredItems =
    filter === "All"
      ? [...resolvedItems].sort((a, b) => (a.attentionReason ? 0 : 1) - (b.attentionReason ? 0 : 1))
      : resolvedItems.filter((item) => item.status === filter)
  const expandedItem = resolvedItems.find((item) => itemKey(item) === expandedKey) ?? null

  const toggleSelected = (key: string) => {
    setSelectedKeys((current) => {
      const next = new Set(current)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const exitSelectionMode = () => {
    setSelectionMode(false)
    setSelectedKeys(new Set())
  }

  const applyBatchStatus = (status: TrackingStatus) => {
    setStatusOverrides((current) => {
      const next = { ...current }
      selectedKeys.forEach((key) => {
        next[key] = status
      })
      return next
    })
    setSelectedKeys(new Set())
  }

  const renderItem = (item: TrackedOpportunity) => {
    const key = itemKey(item)
    return (
      <OpportunityCard
        key={key}
        item={item}
        selectable={selectionMode}
        selected={selectedKeys.has(key)}
        onOpen={() => (selectionMode ? toggleSelected(key) : setExpandedKey(key))}
      />
    )
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <Button
        variant="outline"
        onClick={() => {
          exitSelectionMode()
          setLayout(layout === "pills" ? "sections" : "pills")
        }}
        className="fixed bottom-6 right-6 z-50 rounded-full border-[#ec4899] bg-white font-devtool text-[#ec4899] shadow-md hover:bg-[#ec4899]/5 active:scale-95"
      >
        {layout === "pills" ? "Alt layout" : "Pill layout"}
      </Button>

      {layout === "pills" ? (
        <>
          {selectionMode && selectedKeys.size > 0 && (
            <div className="flex w-full items-center justify-between gap-3 rounded-[16px] bg-black px-4 py-3">
              <p className="text-[13px] font-medium text-white">{selectedKeys.size} selected</p>
              <div className="flex items-center gap-2">
                <Menu>
                  <MenuTrigger className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold text-black transition-opacity hover:opacity-80 active:scale-95">
                    Move to status
                    <ChevronDown className="size-3.5" strokeWidth={2} />
                  </MenuTrigger>
                  <MenuPopup>
                    {TRACKING_STATUSES.map(({ status, color }) => (
                      <MenuItem key={status} onClick={() => applyBatchStatus(status)}>
                        <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                        {status}
                      </MenuItem>
                    ))}
                  </MenuPopup>
                </Menu>
                <button
                  type="button"
                  onClick={() => setSelectedKeys(new Set())}
                  className="text-[13px] font-medium text-white/60 transition-colors hover:text-white"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          <div className="flex w-full items-center justify-between gap-4">
            <CategoryTabs categories={FILTERS} active={filter} onChange={setFilter} />
            {selectionMode ? (
              <Button
                variant="outline"
                onClick={exitSelectionMode}
                className="shrink-0 rounded-full border-chelcie-separator bg-transparent text-black/60 hover:bg-muted"
              >
                Cancel
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setSelectionMode(true)}
                className="shrink-0 rounded-full border-chelcie-primary-button bg-transparent text-chelcie-primary-button hover:bg-chelcie-primary-button/5 active:scale-95"
              >
                Select
              </Button>
            )}
          </div>

          <div className="grid w-full grid-cols-3 gap-4">
            {filteredItems.map(renderItem)}
            {filteredItems.length === 0 && (
              <p className="col-span-3 rounded-[16px] border border-dashed border-chelcie-separator p-4 text-center text-xs text-black/40">
                Nothing here yet
              </p>
            )}
          </div>
        </>
      ) : (
        <div className="flex w-full flex-col gap-6">
          {TRACKING_STATUSES.map(({ status, color }) => {
            const items = resolvedItems.filter((opportunity) => opportunity.status === status)
            return (
              <div key={status} className="flex w-full flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                  <p className="text-[17px] font-semibold tracking-[-0.23px] text-black">{status}</p>
                  <span className="rounded-full bg-chelcie-gray6 px-2 py-0.5 text-xs font-medium text-black/60">
                    {items.length}
                  </span>
                </div>

                {items.length > 0 ? (
                  <div className="grid w-full grid-cols-3 gap-4">{items.map(renderItem)}</div>
                ) : (
                  <p className="w-full rounded-[16px] border border-dashed border-chelcie-separator p-4 text-center text-xs text-black/40">
                    Nothing here yet
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}

      <Dialog open={expandedItem !== null} onOpenChange={(open) => !open && setExpandedKey(null)}>
        <DialogPopup>
          {expandedItem && (
            <OpportunityDetailCard
              {...expandedItem}
              onClose={() => setExpandedKey(null)}
              onAssignOwner={(name) => {
                setOwnerOverrides((current) => ({ ...current, [expandedKey as string]: name }))
              }}
              onNavigateToProgram={onNavigateToProgram}
            />
          )}
        </DialogPopup>
      </Dialog>
    </div>
  )
}
