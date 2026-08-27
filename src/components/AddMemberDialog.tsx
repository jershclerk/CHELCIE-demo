import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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

export const CAPABILITY_OPTIONS = [
  { id: "view-pipeline", label: "View programs & opportunities" },
  { id: "edit-programs", label: "Edit programs & opportunities" },
  { id: "draft-outreach", label: "Draft and send outreach" },
  { id: "manage-members", label: "Manage team members" },
  { id: "view-reports", label: "View funding reports" },
]

export function AddMemberDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [capabilities, setCapabilities] = useState<string[]>([])

  const toggleCapability = (id: string, checked: boolean) => {
    setCapabilities((current) => (checked ? [...current, id] : current.filter((item) => item !== id)))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setName("")
    setEmail("")
    setCapabilities([])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] sm:w-full sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle>Add another member</DialogTitle>
          <DialogDescription>Invite someone to your organization on CHELCIE.</DialogDescription>
        </DialogHeader>
        <form id="add-member-form" onSubmit={handleSubmit} className="flex flex-col gap-6 py-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="member-name">Name</Label>
            <Input
              id="member-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Jane Doe"
              autoComplete="name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="member-email">Email address</Label>
            <Input
              id="member-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="jane@organization.org"
              autoComplete="email"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Capabilities</Label>
            <div className="flex flex-col gap-3">
              {CAPABILITY_OPTIONS.map((capability) => (
                <div key={capability.id} className="flex items-center gap-2">
                  <Checkbox
                    id={capability.id}
                    checked={capabilities.includes(capability.id)}
                    onCheckedChange={(checked) => toggleCapability(capability.id, checked === true)}
                  />
                  <label htmlFor={capability.id} className="text-sm font-medium text-foreground">
                    {capability.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" form="add-member-form" disabled={!name || !email || capabilities.length === 0}>
            Send invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
