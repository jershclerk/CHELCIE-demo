import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import type { OrgMember } from "@/pages/LoginPage"
import { CAPABILITY_OPTIONS } from "@/components/AddMemberDialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const MEMBERS: OrgMember[] = [
  { name: "Mary Rice", initial: "M", avatarColor: "#A51C30", role: "Admin" },
  { name: "Jamie Taylor", initial: "J", avatarColor: "#29a699", role: "Admin" },
]

const ROLE_DEFINITIONS = [
  {
    name: "Admin",
    description: "Complete control of programs, opportunities, and team members.",
    capabilities: ["view-pipeline", "edit-programs", "draft-outreach", "manage-members", "view-reports"],
  },
  {
    name: "Editor",
    description: "Draft, edit, and organize programs and outreach.",
    capabilities: ["view-pipeline", "edit-programs", "draft-outreach", "view-reports"],
  },
  {
    name: "Viewer",
    description: "Read-only access to programs and funding reports.",
    capabilities: ["view-pipeline", "view-reports"],
  },
  {
    name: "Guest",
    description: "Restricted sandbox for temporary collaborators.",
    capabilities: ["view-pipeline"],
  },
]

export function ManageMembersPage({ onAddMember }: { onAddMember: () => void }) {
  const [rolePermissions, setRolePermissions] = useState(() =>
    Object.fromEntries(ROLE_DEFINITIONS.map((role) => [role.name, role.capabilities])),
  )

  const toggleCapability = (roleName: string, capabilityId: string, checked: boolean) => {
    setRolePermissions((current) => ({
      ...current,
      [roleName]: checked
        ? [...current[roleName], capabilityId]
        : current[roleName].filter((id) => id !== capabilityId),
    }))
  }

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-secondary p-5">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">Total Organization Members</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-semibold text-foreground">{MEMBERS.length} Active</p>
              <p className="text-xs text-muted-foreground">admins on Harvard C-Change</p>
            </div>
          </div>
          <Button onClick={onAddMember}>Add Member</Button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-auto py-3 pl-6 font-sans text-sm font-semibold text-foreground">
                  Member
                </TableHead>
                <TableHead className="h-auto py-3 font-sans text-sm font-semibold text-foreground">
                  Email
                </TableHead>
                <TableHead className="h-auto py-3 font-sans text-sm font-semibold text-foreground">
                  Role
                </TableHead>
                <TableHead className="h-auto py-3 pr-6 text-right font-sans text-sm font-semibold text-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MEMBERS.map((member) => (
                <TableRow key={member.name}>
                  <TableCell className="py-3 pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8 shrink-0">
                        <AvatarFallback
                          className="text-xs font-semibold text-white"
                          style={{ backgroundColor: member.avatarColor }}
                        >
                          {member.initial}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-foreground">{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-muted-foreground">
                    {member.name.toLowerCase().replace(" ", ".")}@harvard.edu
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="rounded-xl bg-[#f0f0f5] px-2.5 py-1 text-xs font-medium text-[#666673]">
                      {member.role}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 pr-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button type="button" aria-label={`Edit ${member.name}`} className="text-muted-foreground hover:text-foreground">
                        <Pencil className="size-4" />
                      </button>
                      <button type="button" aria-label={`Remove ${member.name}`} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Roles & Permissions</h2>
          <p className="text-sm text-muted-foreground">Fine-tune what each role can do across CHELCIE.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ROLE_DEFINITIONS.map((role) => (
            <Card key={role.name}>
              <CardHeader className="gap-1">
                <CardTitle className="text-lg font-bold">{role.name}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 border-t border-border pt-4">
                <p className="text-xs font-medium text-muted-foreground">Capabilities</p>
                <div className="flex flex-col gap-3">
                  {CAPABILITY_OPTIONS.map((capability) => (
                    <label key={capability.id} className="flex items-center gap-2 text-sm text-foreground">
                      <Checkbox
                        checked={rolePermissions[role.name].includes(capability.id)}
                        onCheckedChange={(checked) =>
                          toggleCapability(role.name, capability.id, checked === true)
                        }
                      />
                      {capability.label}
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
