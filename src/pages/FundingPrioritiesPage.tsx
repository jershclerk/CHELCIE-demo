import { useState } from "react"
import { Check, CheckCircle2, ChevronRight, FileText, FileSpreadsheet, RefreshCw, Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import {
  FUNDER_MATCH_MATRIX,
  PORTFOLIO_INITIATIVES,
  MATRIX_CELL_STYLES,
  SECTOR_OPTIONS,
  getFunderCycle,
  getFunderDeadline,
  getFunderSector,
  type CapitalMatch,
  type PortfolioInitiative,
} from "@/data/capitalMatches"

const SECTOR_FILTER_OPTIONS = ["All", ...SECTOR_OPTIONS] as const

// Hidden per request — flip back to true to re-enable the Cards/Matrix view toggle in the filter sidebar.
const SHOW_VIEW_TOGGLE = false

// Hidden per request — flip back to true to re-enable the sync-from-spreadsheet header row.
const SHOW_SYNC_HEADER = false

// Hidden per request — flip back to true to re-enable the "Capital-source matches" section heading.
const SHOW_MATCHES_HEADING = false

// Hidden per request — flip back to true to re-enable the "Synced priority list" empty-state section.
const SHOW_SYNCED_LIST = false

const MIN_FUNDING_MAX = 2_000_000
const MIN_FUNDING_STEP = 50_000

function parseTicketFloor(ticketRange: string): number {
  const match = ticketRange.match(/\$([\d.]+)(K|M)/)
  if (!match) return 0
  const value = Number.parseFloat(match[1])
  return match[2] === "M" ? value * 1_000_000 : value * 1_000
}

function formatAmount(value: number): string {
  if (value >= 1_000_000) return `$${Number((value / 1_000_000).toFixed(1)).toString()}M`
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`
  return `$${value}`
}

function splitTicketRange(ticketRange: string): { amount: string; supplement?: string } {
  if (ticketRange.startsWith("$")) {
    const plusIndex = ticketRange.indexOf(" + ")
    if (plusIndex !== -1) {
      return { amount: ticketRange.slice(0, plusIndex), supplement: ticketRange.slice(plusIndex + 3) }
    }
  }
  return { amount: ticketRange }
}

function initiativesCoveredByFunder(funder: string): PortfolioInitiative[] {
  const row = FUNDER_MATCH_MATRIX.find((candidate) => candidate.funder === funder)
  if (!row) return []
  return PORTFOLIO_INITIATIVES.filter((initiative) => row.matches[initiative.id])
}

function SyncFromSpreadsheetDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [url, setUrl] = useState("")
  const [synced, setSynced] = useState(false)

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next)
        if (!next) {
          setUrl("")
          setSynced(false)
        }
      }}
    >
      <DialogContent className="w-[calc(100%-2rem)] sm:w-full sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle>Sync from spreadsheet</DialogTitle>
          <DialogDescription>
            Pull your funding priorities in from a shared Google Sheet or CSV link.
          </DialogDescription>
        </DialogHeader>
        {synced ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <span className="flex size-10 items-center justify-center rounded-full bg-emerald-50">
              <Check className="size-5 text-emerald-600" />
            </span>
            <p className="text-sm font-medium text-foreground">Synced successfully</p>
            <p className="text-sm text-muted-foreground">Your funding priorities are now up to date.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 py-2">
            <Label htmlFor="sheet-url">Spreadsheet link</Label>
            <Input
              id="sheet-url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://docs.google.com/spreadsheets/..."
              autoComplete="off"
            />
          </div>
        )}
        <DialogFooter>
          {synced ? (
            <Button type="button" onClick={() => onOpenChange(false)}>
              Done
            </Button>
          ) : (
            <>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="button" disabled={!url} onClick={() => setSynced(true)}>
                Sync now
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function MatchCard({ match, onOpen }: { match: CapitalMatch; onOpen: () => void }) {
  const coveredInitiatives = initiativesCoveredByFunder(match.funder)
  const { amount, supplement } = splitTicketRange(match.ticketRange)

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onOpen()
        }
      }}
      className="flex h-full w-full cursor-pointer flex-col gap-5 rounded-2xl border border-border p-6 text-left transition-colors hover:border-foreground/20 hover:bg-accent/30"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold text-foreground">{match.funder}</p>
          <p className="text-sm text-muted-foreground">{match.programName}</p>
          <span className="w-fit rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-foreground">
            {match.instrument}
          </span>
        </div>
        <p className="shrink-0 text-2xl font-bold leading-7 text-foreground">{match.score}</p>
      </div>

      <a
        href={match.sourceUrl}
        target="_blank"
        rel="noreferrer"
        onClick={(event) => event.stopPropagation()}
        className="inline-flex w-fit items-center gap-1.5 text-xs font-normal text-foreground underline underline-offset-4"
      >
        <FileText className="size-3.5" />
        {match.sourceLabel}
      </a>

      <div className="h-px w-full bg-border" />

      <div className="flex flex-col gap-3">
        <p className="text-sm font-bold text-foreground">Initiatives that it covers</p>
        <div className="flex flex-col gap-2.5">
          {coveredInitiatives.map((initiative) => (
            <div key={initiative.id} className="rounded-lg border border-border bg-accent/40 px-3 py-2.5">
              <p className="text-xs font-normal text-foreground">{initiative.fullTitle}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-border" />

      <div className="mt-auto flex items-center justify-between gap-4">
        <span className="w-fit shrink-0 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-foreground">
          {getFunderCycle(match.funder)}
        </span>
        <p className="text-right text-xl font-bold text-foreground">
          {amount}
          {supplement && <span className="text-sm font-normal text-muted-foreground"> + {supplement}</span>}
        </p>
      </div>
    </div>
  )
}

const APPLICATION_STEPS = [
  { key: "discover", label: "Discover" },
  { key: "eligibility", label: "Eligibility" },
  { key: "requirements", label: "Requirements" },
  { key: "build", label: "Build" },
  { key: "track-submit", label: "Track & Submit" },
] as const

function ApplicationStepTracker({
  currentStep,
  enabledSteps,
  onSelectStep,
}: {
  currentStep: (typeof APPLICATION_STEPS)[number]["key"]
  enabledSteps: Array<(typeof APPLICATION_STEPS)[number]["key"]>
  onSelectStep: (step: (typeof APPLICATION_STEPS)[number]["key"]) => void
}) {
  const currentIndex = APPLICATION_STEPS.findIndex((step) => step.key === currentStep)

  return (
    <div className="flex w-full flex-wrap items-center gap-x-1 gap-y-2 rounded-full border border-border bg-background px-3 py-2">
      {APPLICATION_STEPS.map((step, index) => {
        const isDone = index < currentIndex
        const isCurrent = index === currentIndex
        const isEnabled = enabledSteps.includes(step.key)
        return (
          <div key={step.key} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/40" />}
            <button
              type="button"
              disabled={!isEnabled}
              onClick={() => onSelectStep(step.key)}
              className={cn(
                "flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium",
                isEnabled ? "cursor-pointer" : "cursor-not-allowed opacity-60",
                isCurrent && "bg-foreground text-background",
                !isCurrent && isDone && "text-foreground",
                !isCurrent && !isDone && "text-muted-foreground",
              )}
            >
              {isDone ? (
                <CheckCircle2 className="size-4 text-indigo-600" />
              ) : (
                <span className={cn("text-xs", isCurrent ? "text-background/70" : "text-muted-foreground/70")}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
              {step.label}
            </button>
          </div>
        )
      })}
    </div>
  )
}

function MatchPreviewDialog({
  match,
  onClose,
  onStart,
}: {
  match: CapitalMatch | null
  onClose: () => void
  onStart: () => void
}) {
  return (
    <Dialog open={match !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[calc(100%-2rem)] gap-6 p-8 sm:w-full sm:max-w-2xl">
        {match && (
          <>
            <DialogHeader>
              <div className="flex items-start justify-between gap-4 pr-6">
                <div>
                  <DialogTitle className="text-xl">{match.funder}</DialogTitle>
                  <DialogDescription className="text-base">{match.programName}</DialogDescription>
                </div>
                <p className="shrink-0 text-2xl font-bold text-foreground">{match.score}</p>
              </div>
            </DialogHeader>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <span className="w-fit rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-foreground">
                  {match.instrument}
                </span>
                <span className="w-fit rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-foreground">
                  {getFunderCycle(match.funder)}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">{match.rationale}</p>

              <div className="grid grid-cols-3 divide-x divide-border rounded-2xl border border-border">
                <div className="flex flex-col gap-1.5 px-5 py-4">
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className="text-sm font-semibold text-foreground">{match.ticketRange}</p>
                </div>
                <div className="flex flex-col gap-1.5 px-5 py-4">
                  <p className="text-xs text-muted-foreground">Deadline</p>
                  <p className="text-sm font-semibold text-foreground">{getFunderDeadline(match.funder)}</p>
                </div>
                <div className="flex flex-col gap-1.5 px-5 py-4">
                  <p className="text-xs text-muted-foreground">Fit score</p>
                  <p className="text-sm font-semibold text-foreground">{match.score}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-foreground">Why this match</p>
                <ul className="flex flex-col gap-3">
                  {match.matchReasons.map((reason, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Not now
              </Button>
              <Button type="button" onClick={onStart}>
                Run Eligibility assessment
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

function MatchDetailView({ match, onBack }: { match: CapitalMatch; onBack: () => void }) {
  const [activeStep, setActiveStep] = useState<"eligibility" | "requirements">("eligibility")

  const enabledSteps: Array<(typeof APPLICATION_STEPS)[number]["key"]> = match.requirementsChecklist
    ? ["discover", "eligibility", "requirements"]
    : ["discover", "eligibility"]

  const handleSelectStep = (step: (typeof APPLICATION_STEPS)[number]["key"]) => {
    if (step === "discover") {
      onBack()
      return
    }
    if (step === "eligibility" || step === "requirements") {
      setActiveStep(step)
    }
  }

  const completedRequirements = 0

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={onBack}
            className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Funding Priorities
          </button>
          <ChevronRight className="size-3.5 text-muted-foreground/60" />
          <span className="font-medium text-foreground">{match.funder}</span>
        </div>
        <ApplicationStepTracker currentStep={activeStep} enabledSteps={enabledSteps} onSelectStep={handleSelectStep} />
      </div>

      <div className="flex items-start justify-between gap-4 border-b border-border pb-6">
        <div className="min-w-0 flex-1">
          <p className="text-xl font-bold text-foreground">{match.funder}</p>
          <p className="text-sm text-muted-foreground">{match.programName}</p>
          <span className="mt-2 inline-block w-fit rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-foreground">
            {match.instrument}
          </span>
        </div>
        <p className="shrink-0 text-2xl font-bold text-foreground">{match.score}</p>
      </div>

      {activeStep === "eligibility" && (
        <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
          <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-800">
            <CheckCircle2 className="size-5 shrink-0 text-emerald-600" />
            Eligible — meets all criteria for this program
          </div>

          <div className="rounded-2xl border border-border p-5">
            <p className="text-base font-semibold text-foreground">Eligibility criteria</p>
            <ul className="mt-3 flex flex-col gap-3">
              {match.eligibilityCriteria.map((criterion, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  {criterion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeStep === "requirements" && match.requirementsChecklist && (
        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-border p-6">
          <p className="text-lg font-bold text-foreground">Requirements Checklist</p>
          <p className="text-sm text-muted-foreground">
            {completedRequirements} of {match.requirementsChecklist.length} items complete
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Section
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Type
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Status
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Owner
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Due date
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {match.requirementsChecklist.map((item, index) => (
                  <tr key={index} className="border-t border-border">
                    <td className="px-3 py-3 align-top">
                      <p className="font-medium text-foreground">{item.section}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-1.5">
                        {item.detail && <span className="text-xs text-muted-foreground">{item.detail}</span>}
                        {item.weight && (
                          <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-foreground">
                            {item.weight}% weight
                          </span>
                        )}
                        {item.missing && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                            Missing
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3 align-top">
                      <span className="w-fit rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-foreground">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-3 py-3 align-top">
                      <span className="w-fit rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        Not Started
                      </span>
                    </td>
                    <td className="px-3 py-3 align-top text-muted-foreground">Assign</td>
                    <td className="px-3 py-3 align-top text-muted-foreground">Set date</td>
                    <td className="px-3 py-3 align-top text-right">
                      {item.draftable && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground">
                          <Sparkles className="size-3.5" />
                          Draft in Builder
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export function FundingPrioritiesPage() {
  const [isSyncOpen, setIsSyncOpen] = useState(false)
  const [previewMatch, setPreviewMatch] = useState<CapitalMatch | null>(null)
  const [activeMatch, setActiveMatch] = useState<CapitalMatch | null>(null)
  const [matchView, setMatchView] = useState<"cards" | "matrix">("cards")
  const [selectedInitiativeId, setSelectedInitiativeId] = useState(PORTFOLIO_INITIATIVES[0].id)
  const [sectorFilter, setSectorFilter] = useState<(typeof SECTOR_FILTER_OPTIONS)[number]>("All")
  const [minFunding, setMinFunding] = useState(0)
  const [funderSearch, setFunderSearch] = useState("")

  const selectedInitiative =
    PORTFOLIO_INITIATIVES.find((initiative) => initiative.id === selectedInitiativeId) ?? PORTFOLIO_INITIATIVES[0]

  const visibleMatches = selectedInitiative.matches.filter(
    (match) =>
      (sectorFilter === "All" || getFunderSector(match.funder) === sectorFilter) &&
      match.funder.toLowerCase().includes(funderSearch.trim().toLowerCase()) &&
      parseTicketFloor(match.ticketRange) >= minFunding,
  )

  const openMatch = (match: CapitalMatch) => {
    setPreviewMatch(match)
  }

  if (activeMatch) {
    return <MatchDetailView match={activeMatch} onBack={() => setActiveMatch(null)} />
  }

  return (
    <div className="flex flex-col gap-6">
      {SHOW_SYNC_HEADER && (
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Keep your priority list in sync with the spreadsheet your team already uses.
          </p>
          <Button variant="outline" onClick={() => setIsSyncOpen(true)}>
            <RefreshCw />
            Sync from spreadsheet
          </Button>
        </div>
      )}

      {SHOW_MATCHES_HEADING && (
        <h3 className="text-base font-semibold text-foreground">Capital-source matches</h3>
      )}

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="order-2 min-w-0 flex-1 lg:order-1">
          {matchView === "cards" ? (
            visibleMatches.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {visibleMatches.map((match) => (
                  <MatchCard key={match.id} match={match} onOpen={() => openMatch(match)} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-16 text-center">
                <p className="text-sm font-medium text-foreground">No matches for these filters</p>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Try adjusting the filters on the right.
                </p>
              </div>
            )
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="sticky left-0 bg-background px-4 py-3 text-left text-sm font-semibold text-foreground">
                      Funder
                    </th>
                    {PORTFOLIO_INITIATIVES.map((initiative) => (
                      <th
                        key={initiative.id}
                        className="min-w-[140px] px-4 py-3 text-left text-sm font-semibold text-foreground"
                      >
                        {initiative.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FUNDER_MATCH_MATRIX.map((row) => (
                    <tr key={row.funder}>
                      <td className="sticky left-0 border-t border-border bg-background px-4 py-3 font-medium text-foreground">
                        {row.funder}
                      </td>
                      {PORTFOLIO_INITIATIVES.map((initiative) => {
                        const match = row.matches[initiative.id]
                        return (
                          <td key={initiative.id} className="border-t border-border px-4 py-3">
                            {match && (
                              <button
                                type="button"
                                onClick={() => openMatch(match)}
                                title={`${row.funder} · ${initiative.name}`}
                                className={cn(
                                  "flex size-10 items-center justify-center rounded-full text-sm font-bold transition-colors",
                                  MATRIX_CELL_STYLES[match.confidence],
                                )}
                              >
                                {match.score}
                              </button>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <aside className="order-1 w-full shrink-0 lg:order-2 lg:w-72">
          <div className="flex flex-col gap-6 rounded-2xl border border-border p-5 lg:sticky lg:top-6">
            <h3 className="text-sm font-semibold text-foreground">Filters</h3>

            {SHOW_VIEW_TOGGLE && (
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-medium text-muted-foreground">View</Label>
                <Tabs value={matchView} onValueChange={(value) => setMatchView(value as "cards" | "matrix")}>
                  <TabsList className="w-full">
                    <TabsTrigger value="cards" className="flex-1">
                      Cards
                    </TabsTrigger>
                    <TabsTrigger value="matrix" className="flex-1">
                      Matrix
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}

            {matchView === "cards" && (
              <>
                <div className="flex flex-col gap-2">
                  <Label className="text-xs font-medium text-muted-foreground">Search funders</Label>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={funderSearch}
                      onChange={(event) => setFunderSearch(event.target.value)}
                      placeholder="e.g. Wellcome Trust"
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-xs font-medium text-muted-foreground">Matches your initiative</Label>
                  <Select value={selectedInitiativeId} onValueChange={setSelectedInitiativeId}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PORTFOLIO_INITIATIVES.map((initiative) => (
                        <SelectItem key={initiative.id} value={initiative.id}>
                          {initiative.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-xs font-medium text-muted-foreground">Sector</Label>
                  <Select
                    value={sectorFilter}
                    onValueChange={(value) => setSectorFilter(value as (typeof SECTOR_FILTER_OPTIONS)[number])}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTOR_FILTER_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium text-muted-foreground">Minimum funding</Label>
                    <span className="text-xs font-medium text-foreground">{formatAmount(minFunding)}+</span>
                  </div>
                  <Slider
                    value={[minFunding]}
                    onValueChange={([value]) => setMinFunding(value)}
                    min={0}
                    max={MIN_FUNDING_MAX}
                    step={MIN_FUNDING_STEP}
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">$</span>
                    <Input
                      type="number"
                      min={0}
                      step={MIN_FUNDING_STEP}
                      value={minFunding}
                      onChange={(event) => setMinFunding(Math.max(0, Number(event.target.value) || 0))}
                      className="w-full"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>

      {SHOW_SYNCED_LIST && (
        <div>
          <h3 className="mb-3 text-base font-semibold text-foreground">Synced priority list</h3>
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
            <span className="flex size-10 items-center justify-center rounded-full bg-accent">
              <FileSpreadsheet className="size-5 text-foreground" />
            </span>
            <p className="text-sm font-medium text-foreground">No priorities synced yet</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Connect a spreadsheet to bring your funding priorities into CHELCIE.
            </p>
          </div>
        </div>
      )}

      <SyncFromSpreadsheetDialog open={isSyncOpen} onOpenChange={setIsSyncOpen} />
      <MatchPreviewDialog
        match={previewMatch}
        onClose={() => setPreviewMatch(null)}
        onStart={() => {
          setActiveMatch(previewMatch)
          setPreviewMatch(null)
        }}
      />
    </div>
  )
}
