import { useState } from "react"
import { Plus } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type OrgMember = {
  name: string
  initial: string
  avatarColor: string
  role: string
}

const members: OrgMember[] = [
  { name: "Mary Rice", initial: "M", avatarColor: "#8f70d9", role: "Editor" },
  { name: "Jamie Taylor", initial: "J", avatarColor: "#29a699", role: "Editor" },
]

type LoginPageProps = {
  onNavigateToSignUp?: () => void
}

export function LoginPage({ onNavigateToSignUp }: LoginPageProps) {
  const [selectedMember, setSelectedMember] = useState<string | null>(null)

  return (
    <div className="flex min-h-screen w-full flex-col items-start bg-background">
      <div className="flex w-full shrink-0 items-center justify-between border-b border-border px-6 py-6 sm:px-20">
        <span className="text-xl font-extrabold tracking-normal text-foreground">CHELCIE</span>
        <button
          type="button"
          className="flex shrink-0 items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-[0px_1px_1px_rgba(0,0,0,0.1)] transition-colors hover:bg-accent"
        >
          Log in
        </button>
      </div>

      <div className="flex w-full flex-1 flex-col items-center justify-center px-4 pb-24 pt-20">
        <div className="flex w-full max-w-[540px] flex-col items-start gap-8 border border-border bg-background p-6 sm:p-10">
          <div className="flex w-full flex-col items-center gap-2 text-center">
            <p className="text-2xl font-bold leading-8 text-foreground">Welcome to CHELCIE</p>
            <p className="text-sm text-muted-foreground">Select who you are to sign in instantly</p>
          </div>

          <div className="relative flex w-full flex-col items-start gap-4">
            {members.map((member) => {
              const isSelected = selectedMember === member.name
              return (
                <button
                  key={member.name}
                  type="button"
                  onClick={() => setSelectedMember(member.name)}
                  aria-pressed={isSelected}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-md border p-4 text-left transition-colors",
                    isSelected
                      ? "border-foreground ring-1 ring-foreground"
                      : "border-border hover:bg-accent/50"
                  )}
                >
                  <Avatar className="size-10 shrink-0">
                    <AvatarFallback
                      className="text-lg font-semibold text-white"
                      style={{ backgroundColor: member.avatarColor }}
                    >
                      {member.initial}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-1 items-center">
                    <p className="flex-1 truncate text-sm font-medium text-foreground">{member.name}</p>
                  </div>
                  <span className="shrink-0 rounded-xl bg-[#f0f0f5] px-2.5 py-1 text-xs font-medium text-[#666673]">
                    {member.role}
                  </span>
                </button>
              )
            })}

            <button
              type="button"
              onClick={onNavigateToSignUp}
              className="flex h-[76px] w-full items-center gap-4 rounded-md border border-dashed border-border bg-background p-4 text-left transition-colors hover:bg-accent/50"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent">
                <Plus className="size-[18px] text-foreground" />
              </span>
              <span className="text-sm font-medium text-muted-foreground">Add another member</span>
            </button>
          </div>

          <Button type="button" disabled={!selectedMember} className="w-full">
            Go to CHELCIE
          </Button>
        </div>
      </div>
    </div>
  )
}
