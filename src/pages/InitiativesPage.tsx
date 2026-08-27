import { useState, type FormEvent } from "react"
import { FolderOpen, Plus, Trash2 } from "lucide-react"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const PRIORITY_OPTIONS = ["High", "Medium", "Low"] as const
type Priority = (typeof PRIORITY_OPTIONS)[number]

const PRIORITY_STYLES: Record<Priority, string> = {
  High: "bg-amber-50 text-amber-700",
  Medium: "bg-blue-50 text-blue-700",
  Low: "bg-[#f0f0f5] text-[#666673]",
}

type Initiative = {
  id: string
  name: string
  piOwner: string
  funding: string
  priority: Priority
}

const INITIAL_INITIATIVES: Initiative[] = []

function EditableTextCell({
  value,
  onCommit,
  placeholder,
}: {
  value: string
  onCommit: (value: string) => void
  placeholder?: string
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  if (editing) {
    return (
      <Input
        autoFocus
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={() => {
          setEditing(false)
          if (draft !== value) onCommit(draft)
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") event.currentTarget.blur()
          if (event.key === "Escape") {
            setDraft(value)
            setEditing(false)
          }
        }}
        className="h-8 text-sm"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => {
        setDraft(value)
        setEditing(true)
      }}
      className="w-full rounded px-2 py-1 text-left text-sm text-foreground transition-colors hover:bg-accent/50"
    >
      {value || <span className="text-muted-foreground">{placeholder}</span>}
    </button>
  )
}

function EditablePriorityCell({
  value,
  onCommit,
}: {
  value: Priority
  onCommit: (value: Priority) => void
}) {
  return (
    <Select value={value} onValueChange={(next) => onCommit(next as Priority)}>
      <SelectTrigger
        className={`h-8 w-auto gap-1.5 rounded-full border-none px-2.5 py-1 text-xs font-medium shadow-none ${PRIORITY_STYLES[value]}`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {PRIORITY_OPTIONS.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function AddInitiativeDialog({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (initiative: Initiative) => void
}) {
  const [name, setName] = useState("")
  const [piOwner, setPiOwner] = useState("")
  const [funding, setFunding] = useState("")
  const [priority, setPriority] = useState<Priority>("Medium")

  const reset = () => {
    setName("")
    setPiOwner("")
    setFunding("")
    setPriority("Medium")
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onAdd({
      id: crypto.randomUUID(),
      name,
      piOwner,
      funding,
      priority,
    })
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] sm:w-full sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Add initiative</DialogTitle>
          <DialogDescription>Add a program to your portfolio.</DialogDescription>
        </DialogHeader>
        <form
          id="add-initiative-form"
          onSubmit={handleSubmit}
          className="flex max-h-[60vh] flex-col gap-5 overflow-y-auto py-2"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="initiative-name">Name</Label>
            <Input
              id="initiative-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Climate & Health Data Initiative"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="initiative-pi">PI / Owner</Label>
            <Input
              id="initiative-pi"
              value={piOwner}
              onChange={(event) => setPiOwner(event.target.value)}
              placeholder="Dr. Jane Doe"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="initiative-funding">Funding</Label>
              <Input
                id="initiative-funding"
                value={funding}
                onChange={(event) => setFunding(event.target.value)}
                placeholder="$500,000"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="initiative-priority">Priority</Label>
              <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
                <SelectTrigger id="initiative-priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITY_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" form="add-initiative-form" disabled={!name || !piOwner || !funding}>
            Add initiative
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function InitiativesPage() {
  const [initiatives, setInitiatives] = useState<Initiative[]>(INITIAL_INITIATIVES)
  const [isAddOpen, setIsAddOpen] = useState(false)

  const updateInitiative = <K extends keyof Initiative>(id: string, field: K, value: Initiative[K]) => {
    setInitiatives((current) =>
      current.map((initiative) => (initiative.id === id ? { ...initiative, [field]: value } : initiative)),
    )
  }

  const removeInitiative = (id: string) => {
    setInitiatives((current) => current.filter((initiative) => initiative.id !== id))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Portfolio</h2>
          <p className="text-sm text-muted-foreground">
            Track programs, funding, and next steps across your portfolio.
          </p>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus />
          Add initiative
        </Button>
      </div>

      {initiatives.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
          <span className="flex size-10 items-center justify-center rounded-full bg-accent">
            <FolderOpen className="size-5 text-foreground" />
          </span>
          <p className="text-sm font-medium text-foreground">No initiatives yet</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Add a program to start tracking it here.
          </p>
        </div>
      ) : (
      <div className="overflow-hidden rounded-2xl border border-border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-auto min-w-[220px] py-3 pl-6 font-sans text-sm font-semibold text-foreground">
                Name
              </TableHead>
              <TableHead className="h-auto min-w-[160px] py-3 font-sans text-sm font-semibold text-foreground">
                PI / Owner
              </TableHead>
              <TableHead className="h-auto min-w-[140px] py-3 font-sans text-sm font-semibold text-foreground">
                Funding
              </TableHead>
              <TableHead className="h-auto min-w-[120px] py-3 font-sans text-sm font-semibold text-foreground">
                Priority
              </TableHead>
              <TableHead className="h-auto py-3 pr-6 text-right font-sans text-sm font-semibold text-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initiatives.map((initiative) => (
              <TableRow key={initiative.id}>
                <TableCell className="py-1.5 pl-6 font-medium">
                  <EditableTextCell
                    value={initiative.name}
                    onCommit={(value) => updateInitiative(initiative.id, "name", value)}
                    placeholder="Untitled initiative"
                  />
                </TableCell>
                <TableCell className="py-1.5">
                  <EditableTextCell
                    value={initiative.piOwner}
                    onCommit={(value) => updateInitiative(initiative.id, "piOwner", value)}
                    placeholder="Add owner"
                  />
                </TableCell>
                <TableCell className="py-1.5">
                  <EditableTextCell
                    value={initiative.funding}
                    onCommit={(value) => updateInitiative(initiative.id, "funding", value)}
                    placeholder="$0"
                  />
                </TableCell>
                <TableCell className="py-1.5">
                  <EditablePriorityCell
                    value={initiative.priority}
                    onCommit={(value) => updateInitiative(initiative.id, "priority", value)}
                  />
                </TableCell>
                <TableCell className="py-1.5 pr-6 text-right">
                  <button
                    type="button"
                    aria-label={`Remove ${initiative.name}`}
                    onClick={() => removeInitiative(initiative.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      )}

      <AddInitiativeDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onAdd={(initiative) => setInitiatives((current) => [...current, initiative])}
      />
    </div>
  )
}
