import { programs, programBalance, type ProgramCategory } from "./overview-data"
import { discoverOpportunities } from "./discover-data"

const CATEGORIES: ProgramCategory[] = [
  "Individuals",
  "Health care systems",
  "Communities and cities",
  "National and global policy",
]

function parseAmount(value: string): number {
  const num = parseFloat(value.replace(/[^0-9.]/g, "")) || 0
  if (value.includes("M")) return num * 1_000_000
  if (value.includes("K")) return num * 1_000
  return num
}

export function formatUsd(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(2)}M`
  if (amount >= 1_000) return `$${Math.round(amount / 1_000)}K`
  return `$${Math.round(amount)}`
}

export type BoardMemoPillar = {
  category: ProgramCategory
  programTitles: string[]
  commitment: number
  secured: number
  toRebuild: number
  fundedPercent: number | null
}

export type BoardMemoFunder = {
  org: string
  title: string
  fit: number
  ask: string
  deadline: string
  matchedProgram: string
}

export type BoardMemo = {
  dateLabel: string
  goalAmount: number
  securedAmount: number
  underPursuitAmount: number
  unidentifiedAmount: number
  securedPercent: number
  pillars: BoardMemoPillar[]
  matchedFunders: BoardMemoFunder[]
  addressableCapital: number
}

export function buildBoardMemo(): BoardMemo {
  const goalAmount = parseAmount(programBalance.goal)
  const securedAmount = parseAmount(programBalance.total)
  const underPursuitAmount = (goalAmount * programBalance.underPursuitPercent) / 100
  const unidentifiedAmount = Math.max(goalAmount - securedAmount - underPursuitAmount, 0)

  const pillars: BoardMemoPillar[] = CATEGORIES.map((category) => {
    const categoryPrograms = programs.filter((program) => program.category === category)
    const commitment = categoryPrograms.reduce((sum, program) => sum + parseAmount(program.goal), 0)
    const secured = categoryPrograms.reduce((sum, program) => sum + parseAmount(program.secured), 0)
    const toRebuild = categoryPrograms.reduce((sum, program) => sum + parseAmount(program.toGo), 0)
    return {
      category,
      programTitles: categoryPrograms.map((program) => program.title),
      commitment,
      secured,
      toRebuild,
      fundedPercent: commitment > 0 ? Math.round((secured / commitment) * 100) : null,
    }
  })

  const matchedFunders: BoardMemoFunder[] = discoverOpportunities.map((opportunity) => ({
    org: opportunity.org,
    title: opportunity.title,
    fit: opportunity.matchPercent,
    ask: opportunity.amount,
    deadline: opportunity.deadline,
    matchedProgram: opportunity.matchedProgram,
  }))

  const addressableCapital = discoverOpportunities.reduce(
    (sum, opportunity) => sum + parseAmount(opportunity.amount),
    0
  )

  const dateLabel = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return {
    dateLabel,
    goalAmount,
    securedAmount,
    underPursuitAmount,
    unidentifiedAmount,
    securedPercent: goalAmount > 0 ? Math.round((securedAmount / goalAmount) * 100) : 0,
    pillars,
    matchedFunders,
    addressableCapital,
  }
}

export function formatBoardMemoText(memo: BoardMemo): string {
  const lines: string[] = []
  lines.push("To: Trustees and Executive Committee")
  lines.push("From: Harvard Chan C-CHANGE, Office of the Director")
  lines.push("Re: Funding pathway, mandate, and rebuild plan")
  lines.push(`Date: ${memo.dateLabel}`)
  lines.push("")
  lines.push("Mandate")
  lines.push(
    "Put science into climate action through research, education, and outreach that protects the health of people most vulnerable to climate change, across individuals, health care systems, communities and cities, and national and global policy."
  )
  lines.push("")
  lines.push("State of the funded stack")
  lines.push(
    `Our program goal is ${formatUsd(memo.goalAmount)}. ${memo.securedPercent}% is secured (${formatUsd(
      memo.securedAmount
    )}), ${formatUsd(memo.underPursuitAmount)} is under active pursuit, and ${formatUsd(
      memo.unidentifiedAmount
    )} is still to identify.`
  )
  lines.push("")
  lines.push("Pillar by pillar")
  memo.pillars.forEach((pillar) => {
    if (pillar.programTitles.length === 0) {
      lines.push(`${pillar.category}: no active programs in this pillar yet.`)
      return
    }
    lines.push(`${pillar.category}, ${pillar.programTitles.join("; ")}`)
    lines.push(
      `  Commitment ${formatUsd(pillar.commitment)}, funded ${pillar.fundedPercent}%, to rebuild ${formatUsd(
        pillar.toRebuild
      )}`
    )
  })
  lines.push("")
  lines.push("Matched funders in the pipeline")
  lines.push(
    `CHELCIE has identified ${memo.matchedFunders.length} funders representing ${formatUsd(
      memo.addressableCapital
    )} in addressable capital:`
  )
  memo.matchedFunders.forEach((funder) => {
    lines.push(
      `- ${funder.org}, ${funder.title}. Fit ${funder.fit}. Ask ${funder.ask}. Deadline ${funder.deadline}. Matches: ${funder.matchedProgram}.`
    )
  })
  lines.push("")
  lines.push(
    "Editable draft assembled from live pipeline data. Review figures and signatories before circulating to the board."
  )
  return lines.join("\n")
}
