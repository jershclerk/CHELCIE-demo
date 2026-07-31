import { useState } from "react"
import { ArrowLeft, Check, Copy, Download, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { buildBoardMemo, formatBoardMemoText, formatUsd } from "@/lib/board-memo"

type BoardMemoPageProps = {
  onBack: () => void
}

export function BoardMemoPage({ onBack }: BoardMemoPageProps) {
  const [copied, setCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState<string | null>(null)
  const memo = buildBoardMemo()
  const generatedText = formatBoardMemoText(memo)
  const displayText = editedText ?? generatedText

  const copyMemo = async () => {
    await navigator.clipboard.writeText(displayText)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const downloadMemo = () => {
    const blob = new Blob([displayText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "board-memo.txt"
    link.click()
    URL.revokeObjectURL(url)
  }

  const startEditing = () => {
    setEditedText((current) => current ?? generatedText)
    setIsEditing(true)
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[22px] font-bold leading-7 tracking-[-0.26px] text-black">Board memo</p>
        <Button
          variant="outline"
          onClick={onBack}
          className="gap-1.5 rounded-full border-chelcie-primary-button bg-transparent text-chelcie-primary-button hover:bg-chelcie-primary-button/5 active:scale-95"
        >
          <ArrowLeft className="size-3.5" />
          Back to programs
        </Button>
      </div>

      <div className="flex w-full max-w-[820px] flex-col overflow-hidden rounded-[20px] bg-white">
        <div className="flex items-center justify-between gap-4 p-6">
          <div className="flex flex-col gap-1.5">
            <span className="flex w-fit items-center gap-1 whitespace-nowrap text-[11px] font-semibold tracking-[0.02em] text-black/50 uppercase">
              Draft by Chelcie
            </span>
            <p className="text-[20px] font-semibold tracking-[-0.45px] text-black">
              Funding pathway · board memo
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {isEditing ? (
              <Button
                onClick={() => setIsEditing(false)}
                className="gap-1.5 rounded-full bg-chelcie-primary-button text-white hover:bg-chelcie-primary-button/90 active:scale-95"
              >
                <Check className="size-3.5" />
                Done editing
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={startEditing}
                className="gap-1.5 rounded-full border-chelcie-primary-button bg-transparent text-chelcie-primary-button hover:bg-chelcie-primary-button/5 active:scale-95"
              >
                <Pencil className="size-3.5" />
                Edit
              </Button>
            )}
            <Button
              variant="outline"
              onClick={copyMemo}
              className="gap-1.5 rounded-full border-chelcie-primary-button bg-transparent text-chelcie-primary-button hover:bg-chelcie-primary-button/5 active:scale-95"
            >
              <Copy className="size-3.5" />
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button
              onClick={downloadMemo}
              className="gap-1.5 rounded-full bg-chelcie-primary-button text-white hover:bg-chelcie-primary-button/90 active:scale-95"
            >
              <Download className="size-3.5" />
              Download draft
            </Button>
          </div>
        </div>

        {isEditing ? (
          <div className="border-t border-chelcie-separator p-6">
            <textarea
              value={displayText}
              onChange={(event) => setEditedText(event.target.value)}
              rows={24}
              className="w-full resize-y rounded-[14px] border border-chelcie-separator bg-[#fafafc] p-4 font-mono text-[13px] leading-[19px] text-black focus:ring-2 focus:ring-chelcie-primary-button/30 focus:outline-none"
            />
          </div>
        ) : editedText !== null ? (
          <div className="border-t border-chelcie-separator p-6">
            <p className="whitespace-pre-line text-[13px] leading-[19px] tracking-[-0.08px] text-black/80">
              {displayText}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 border-t border-chelcie-separator p-6">
            <div className="flex flex-col gap-1 text-[13px] tracking-[-0.08px] text-black/70">
              <p>To: Trustees and Executive Committee</p>
              <p>From: Harvard Chan C-CHANGE, Office of the Director</p>
              <p>Re: Funding pathway, mandate, and rebuild plan</p>
              <p>Date: {memo.dateLabel}</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[17px] font-semibold tracking-[-0.43px] text-black">Mandate</p>
              <p className="text-[14px] leading-[20px] tracking-[-0.08px] text-black/80">
                Put science into climate action through research, education, and outreach that protects
                the health of people most vulnerable to climate change, across individuals, health care
                systems, communities and cities, and national and global policy.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[17px] font-semibold tracking-[-0.43px] text-black">
                State of the funded stack
              </p>
              <p className="text-[14px] leading-[20px] tracking-[-0.08px] text-black/80">
                Our program goal is {formatUsd(memo.goalAmount)}. {memo.securedPercent}% is secured (
                {formatUsd(memo.securedAmount)}), {formatUsd(memo.underPursuitAmount)} is under active
                pursuit, and {formatUsd(memo.unidentifiedAmount)} is still to identify.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1 rounded-[14px] bg-chelcie-gray6 p-3">
                  <p className="text-xs text-black/60">Secured</p>
                  <p className="text-[17px] font-semibold text-black">{formatUsd(memo.securedAmount)}</p>
                </div>
                <div className="flex flex-col gap-1 rounded-[14px] bg-chelcie-gray6 p-3">
                  <p className="text-xs text-black/60">Under pursuit</p>
                  <p className="text-[17px] font-semibold text-black">
                    {formatUsd(memo.underPursuitAmount)}
                  </p>
                </div>
                <div className="flex flex-col gap-1 rounded-[14px] bg-chelcie-gray6 p-3">
                  <p className="text-xs text-black/60">To identify</p>
                  <p className="text-[17px] font-semibold text-black">
                    {formatUsd(memo.unidentifiedAmount)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[17px] font-semibold tracking-[-0.43px] text-black">Pillar by pillar</p>
              <div className="flex flex-col gap-2">
                {memo.pillars.map((pillar) => (
                  <div
                    key={pillar.category}
                    className="flex flex-col gap-1 rounded-[14px] bg-chelcie-gray6 p-3.5"
                  >
                    <p className="text-[14px] font-semibold tracking-[-0.15px] text-black">
                      {pillar.category}
                    </p>
                    {pillar.programTitles.length === 0 ? (
                      <p className="text-[13px] tracking-[-0.08px] text-black/50">
                        No active programs in this pillar yet.
                      </p>
                    ) : (
                      <>
                        <p className="text-[13px] tracking-[-0.08px] text-black/60">
                          {pillar.programTitles.join(" · ")}
                        </p>
                        <p className="text-[13px] tracking-[-0.08px] text-black/80">
                          Commitment {formatUsd(pillar.commitment)} · Funded {pillar.fundedPercent}% · To
                          rebuild {formatUsd(pillar.toRebuild)}
                        </p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[17px] font-semibold tracking-[-0.43px] text-black">
                Matched funders in the pipeline
              </p>
              <p className="text-[13px] tracking-[-0.08px] text-black/60">
                CHELCIE has identified {memo.matchedFunders.length} funders representing{" "}
                {formatUsd(memo.addressableCapital)} in addressable capital.
              </p>
              <div className="flex flex-col gap-2">
                {memo.matchedFunders.map((funder) => (
                  <div
                    key={`${funder.org}-${funder.title}`}
                    className="flex items-center justify-between gap-4 rounded-[14px] bg-chelcie-gray6 p-3.5"
                  >
                    <div className="flex min-w-0 flex-col">
                      <p className="truncate text-[14px] font-semibold tracking-[-0.15px] text-black">
                        {funder.org} · {funder.title}
                      </p>
                      <p className="truncate text-xs text-black/60">
                        Ask {funder.ask} · Deadline {funder.deadline} · Matches {funder.matchedProgram}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-[6px] bg-chelcie-blue1/10 px-2 py-1 text-xs font-semibold text-chelcie-blue1">
                      Fit {funder.fit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="border-t border-chelcie-separator pt-4 text-xs text-black/40">
              Editable draft assembled from live pipeline data. Review figures and signatories before
              circulating to the board.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
