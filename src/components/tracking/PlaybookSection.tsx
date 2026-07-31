import { useState, type ReactNode } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LinkedInIcon } from "@/components/LinkedInIcon"
import { cn } from "@/lib/utils"
import type { TrackingStatus } from "@/lib/tracking-data"

type PlaybookMode = "diy" | "complete"

type PlaybookStep = {
  title: string
  description: string
}

const STEPS: Record<PlaybookMode, PlaybookStep[]> = {
  diy: [
    {
      title: "Frame the ask in their language",
      description:
        "CHELCIE drafts a one-page fit brief mapped to the funder's stated priorities — yours to edit and finalize.",
    },
    {
      title: "Prepare the direct submission",
      description: "CHELCIE drafts the full application against the funder's rubric; you review and hit submit.",
    },
    {
      title: "Land the meeting before submission",
      description:
        "CHELCIE drafts the leave-behind — executive summary, budget narrative, and the two questions this program officer always asks.",
    },
  ],
  complete: [
    {
      title: "Frame the ask in their language",
      description: "CHELCIE writes the complete fit brief for you, sourced and ready to go.",
    },
    {
      title: "Prepare the direct submission",
      description: "CHELCIE completes the full application draft — you just review and hit submit.",
    },
    {
      title: "Land the meeting before submission",
      description:
        "CHELCIE preps the full leave-behind — executive summary, budget narrative, likely questions; you request and run the meeting.",
    },
  ],
}

const WAITING_STEPS: PlaybookStep[] = [
  {
    title: "Track review signals",
    description:
      "CHELCIE scans 990 filings, program officer LinkedIn moves, and funder newsroom pages for anything that could shift your odds.",
  },
  {
    title: "Prep for a decision either way",
    description: "A one-page brief is ready so you can move fast whether it's a yes or a no.",
  },
  {
    title: "Stay warm with the funder",
    description:
      "CHELCIE flags natural touchpoints — a relevant publication, a conference — so you're not silent while you wait.",
  },
]

type PlaybookSectionProps = {
  status: TrackingStatus
}

type PlaybookContent = {
  body: ReactNode
  footer: ReactNode
}

export function usePlaybookSection({ status }: PlaybookSectionProps): PlaybookContent {
  const [mode, setMode] = useState<PlaybookMode>("diy")

  if (status === "Awarded" || status === "Declined") {
    return { body: null, footer: null }
  }

  if (status === "Submitted" || status === "Under Review") {
    return {
      body: (
        <div className="flex flex-col gap-4">
          <p className="text-[17px] font-semibold tracking-[-0.43px] text-black">Playbook</p>

          <div className="flex flex-col gap-2.5">
            {WAITING_STEPS.map((step, index) => (
              <div key={step.title} className="flex gap-3 rounded-[18px] bg-chelcie-gray6 p-4">
                <span className="shrink-0 text-xs font-semibold text-black/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1">
                  <p className="text-[15px] font-semibold tracking-[-0.23px] text-black">{step.title}</p>
                  <p className="text-[13px] leading-[18px] tracking-[-0.08px] text-black/60">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      footer: (
        <div className="flex flex-wrap items-center gap-2">
          <Button className="gap-1.5 rounded-full bg-chelcie-primary-button text-white hover:bg-chelcie-primary-button/90 active:scale-95">
            <Send className="size-3.5" />
            Prep decision brief
          </Button>
          <Button
            variant="outline"
            className="gap-1.5 rounded-full border-chelcie-primary-button bg-transparent text-chelcie-primary-button hover:bg-chelcie-primary-button/5 active:scale-95"
          >
            <LinkedInIcon className="size-4 rounded-[3px]" />
            Check in with program officer
          </Button>
        </div>
      ),
    }
  }

  const steps = STEPS[mode]

  return {
    body: (
      <div className="flex flex-col gap-4">
        <p className="text-[17px] font-semibold tracking-[-0.43px] text-black">Playbook</p>

        <div className="inline-flex w-fit items-center gap-1 rounded-full bg-chelcie-gray6 p-1">
          <button
            type="button"
            onClick={() => setMode("diy")}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium tracking-[-0.08px] transition-all",
              mode === "diy" ? "bg-white text-black shadow-[0_1px_3px_rgba(0,0,0,0.12)]" : "text-black/60 hover:text-black"
            )}
          >
            Do it yourself
          </button>
          <button
            type="button"
            onClick={() => setMode("complete")}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium tracking-[-0.08px] transition-all",
              mode === "complete" ? "bg-white text-black shadow-[0_1px_3px_rgba(0,0,0,0.12)]" : "text-black/60 hover:text-black"
            )}
          >
            Chelcie complete
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {steps.map((step, index) => (
            <div key={step.title} className="flex gap-3 rounded-[18px] bg-chelcie-gray6 p-4">
              <span className="shrink-0 text-xs font-semibold text-black/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-[15px] font-semibold tracking-[-0.23px] text-black">{step.title}</p>
                <p className="text-[13px] leading-[18px] tracking-[-0.08px] text-black/60">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    footer: (
      <div className="flex flex-wrap items-center gap-2">
        <Button className="gap-1.5 rounded-full bg-chelcie-primary-button text-white hover:bg-chelcie-primary-button/90 active:scale-95">
          <Send className="size-3.5" />
          Draft with Chelcie
        </Button>
        <Button
          variant="outline"
          className="gap-1.5 rounded-full border-chelcie-primary-button bg-transparent text-chelcie-primary-button hover:bg-chelcie-primary-button/5 active:scale-95"
        >
          <LinkedInIcon className="size-4 rounded-[3px]" />
          Request warm intro
        </Button>
      </div>
    ),
  }
}
