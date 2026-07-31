import { useState } from "react"
import { Plus, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GrainyGlow } from "@/components/GrainyGlow"
import { LinkedInIcon } from "@/components/LinkedInIcon"
import type { EmailDraft } from "@/lib/overview-data"

type CreateOpportunityCardProps = {
  onDraftEmail: (draft: EmailDraft) => void
  compact?: boolean
}

function buildDraft(orgName: string): EmailDraft {
  const name = orgName.trim() || "your organization"
  return {
    stagedLabel: "Drafted by Chelcie",
    readNote: "Read before it ships",
    title: `Partnership intro · ${orgName.trim() || "New contact"}`,
    to: `${name}, Partnerships contact`,
    subject: `Harvard Chan C-CHANGE × ${name}: a partnership worth exploring`,
    body: `Hi [Name],

I lead partnerships for Harvard Chan C-CHANGE. I think there's a strong fit between our climate and health research and the work ${name} is already doing.

I'd love to find the right starting point, whether that's a research collaboration, an in-kind partnership, or a funding route that skips the standard grant queue. Worth a 20-minute call?

[Your name]
Harvard T.H. Chan School of Public Health · C-CHANGE`,
  }
}

function OrgInput({
  orgName,
  onChange,
  className,
}: {
  orgName: string
  onChange: (value: string) => void
  className?: string
}) {
  return (
    <input
      type="text"
      value={orgName}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Organization name, e.g. Novartis Foundation"
      className={`rounded-[11px] border border-chelcie-separator bg-[#fafafc] px-3 py-2 text-[13px] tracking-[-0.08px] text-black placeholder:text-black/40 focus:ring-2 focus:ring-chelcie-primary-button/30 focus:outline-none ${className ?? ""}`}
    />
  )
}

export function CreateOpportunityCard({ onDraftEmail, compact = false }: CreateOpportunityCardProps) {
  const [orgName, setOrgName] = useState("")

  const findLinkedInContacts = () => {
    const query = orgName.trim() || ""
    const url = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(query)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const draftButton = (
    <Button
      onClick={() => onDraftEmail(buildDraft(orgName))}
      className="gap-1.5 rounded-full bg-chelcie-primary-button text-white hover:bg-chelcie-primary-button/90 active:scale-95"
    >
      <Send className="size-3.5" />
      Draft outreach email
    </Button>
  )

  const linkedInButton = (
    <Button
      variant="outline"
      onClick={findLinkedInContacts}
      className="gap-1.5 rounded-full border-chelcie-primary-button bg-transparent text-chelcie-primary-button hover:bg-chelcie-primary-button/5 active:scale-95"
    >
      <LinkedInIcon className="size-4 rounded-[3px]" />
      Find LinkedIn contacts
    </Button>
  )

  const heading = (
    <div className="flex items-center gap-2">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-chelcie-primary-button text-white">
        <Plus className="size-3.5" />
      </span>
      <p className="font-arizona text-xl font-semibold tracking-[-0.25px] text-black">
        Create your own opportunity
      </p>
    </div>
  )

  const description = (
    <p className="text-[13px] leading-[18px] tracking-[-0.08px] text-black/70">
      Tell CHELCIE who you have in mind, and it drafts the outreach email and lines up the right
      contact.
    </p>
  )

  if (compact) {
    return (
      <div className="relative flex w-full flex-col overflow-hidden rounded-[18px] bg-white/65 p-5 backdrop-blur-md">
        <GrainyGlow
          width={600}
          height={160}
          glowOpacity={0.35}
          className="pointer-events-none absolute top-0 left-0 z-0"
        />

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex min-w-0 max-w-[520px] flex-col gap-1">
            {heading}
            {description}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <OrgInput orgName={orgName} onChange={setOrgName} className="w-[240px]" />
            {draftButton}
            {linkedInButton}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex w-full flex-col gap-4 overflow-hidden rounded-[18px] bg-white/65 p-6 backdrop-blur-md">
      <GrainyGlow
        width={600}
        height={240}
        glowOpacity={0.35}
        className="pointer-events-none absolute top-0 left-0 z-0"
      />

      <div className="relative z-10 flex flex-col gap-1">
        {heading}
        <div className="max-w-[520px]">{description}</div>
      </div>

      <div className="relative z-10 flex w-full max-w-[520px] flex-wrap items-center gap-2">
        <OrgInput orgName={orgName} onChange={setOrgName} className="min-w-[240px] flex-1" />
      </div>

      <div className="relative z-10 flex flex-wrap items-center gap-2">
        {draftButton}
        {linkedInButton}
        <span className="flex items-center gap-1 text-xs text-black/50">
          <Sparkles className="size-3" />
          CHELCIE fills in the pitch, you review and send
        </span>
      </div>
    </div>
  )
}
