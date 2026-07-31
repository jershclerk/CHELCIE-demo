import { useState } from "react"
import { Sparkles, X, Copy, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { dysonEmailDraft, type EmailDraft } from "@/lib/overview-data"

type EmailDraftPanelProps = {
  onClose: () => void
  draft?: EmailDraft
}

export function EmailDraftPanel({ onClose, draft = dysonEmailDraft }: EmailDraftPanelProps) {
  const { stagedLabel, readNote, title, to, subject, body } = draft
  const [copied, setCopied] = useState<"email" | "body" | null>(null)

  const fullEmail = `To: ${to}\nSubject: ${subject}\n\n${body}`

  const copy = async (text: string, which: "email" | "body") => {
    await navigator.clipboard.writeText(text)
    setCopied(which)
    setTimeout(() => setCopied(null), 1500)
  }

  const openInMailApp = () => {
    const href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = href
  }

  return (
    <div className="relative flex max-h-[85vh] w-full flex-col overflow-hidden rounded-[18px] bg-white">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/80 text-black/40 backdrop-blur-sm transition-colors hover:bg-muted hover:text-black"
      >
        <X className="size-4" />
      </button>

      <div className="flex flex-col gap-5 overflow-y-auto p-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-[-0.12px]">
          <span className="flex items-center gap-1 rounded-[11px] border border-chelcie-blue1/30 bg-chelcie-blue1/10 px-2 py-1 text-chelcie-blue1">
            <Sparkles className="size-3" />
            {stagedLabel.toUpperCase()}
          </span>
          <span className="text-black/40">·</span>
          <span className="text-black/60">{readNote}</span>
        </div>
      </div>

      <p className="text-[17px] font-semibold tracking-[-0.43px] text-black">{title}</p>

      <div className="h-px w-full bg-chelcie-separator" />

      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-semibold text-black/60">To</p>
        <div className="rounded-[11px] border border-chelcie-separator bg-[#fafafc] px-3 py-2 text-[13px] tracking-[-0.08px] text-black">
          {to}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-semibold text-black/60">Subject</p>
        <div className="rounded-[11px] border border-chelcie-separator bg-[#fafafc] px-3 py-2 text-[13px] tracking-[-0.08px] text-black">
          {subject}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-semibold text-black/60">Body</p>
        <div className="whitespace-pre-line rounded-[11px] border border-chelcie-separator bg-[#fafafc] px-3 py-2 text-[13px] leading-[18px] tracking-[-0.08px] text-black">
          {body}
        </div>
      </div>

      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2 border-t border-chelcie-separator p-6 pt-4">
        <Button
          variant="outline"
          className="gap-1.5 rounded-full border-chelcie-primary-button bg-transparent text-chelcie-primary-button hover:bg-chelcie-primary-button/5 active:scale-95"
          onClick={() => copy(fullEmail, "email")}
        >
          <Copy className="size-3.5" />
          {copied === "email" ? "Copied!" : "Copy email"}
        </Button>
        <Button
          variant="outline"
          className="gap-1.5 rounded-full border-chelcie-primary-button bg-transparent text-chelcie-primary-button hover:bg-chelcie-primary-button/5 active:scale-95"
          onClick={() => copy(body, "body")}
        >
          <Copy className="size-3.5" />
          {copied === "body" ? "Copied!" : "Copy body only"}
        </Button>
        <Button
          className="gap-1.5 rounded-full bg-chelcie-primary-button text-white hover:bg-chelcie-primary-button/90 active:scale-95"
          onClick={openInMailApp}
        >
          <Mail className="size-3.5" />
          Open in mail app
        </Button>
      </div>
    </div>
  )
}
