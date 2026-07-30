export const greeting = {
  name: "Sam",
  lastLogin: "Last logged in: 28 July 2026 13:30",
}

export const programBalance = {
  total: "$2.15M",
  goal: "$8,000,000",
  fundedPercent: 27,
}

export type RecommendedOpportunity = {
  logoKey: "wellcome" | "bloomberg" | "ministry"
  org: string
  title: string
  amount: string
  percent: number
  submissionDate: string
  tag: string
}

export const recommendedOpportunities: RecommendedOpportunity[] = [
  {
    logoKey: "wellcome",
    org: "Wellcome Trust",
    title: "Discovery Award",
    amount: "$1.5M / 3 years",
    percent: 96,
    submissionDate: "26 September 2026",
    tag: "Climate",
  },
  {
    logoKey: "bloomberg",
    org: "Bloomberg Philanthropies",
    title: "Climate-resilient health systems RFP",
    amount: "$900k",
    percent: 72,
    submissionDate: "22 August 2026",
    tag: "Climate",
  },
  {
    logoKey: "ministry",
    org: "Ministry of Higher Education and Research",
    title: "Tools and technologies to support health adaptation to climate change",
    amount: "€20M",
    percent: 55,
    submissionDate: "13 April 2027",
    tag: "Climate",
  },
]

export type LatestUpdate = {
  score: number
  delta: number
  color: "blue" | "orange"
  org: string
  amount: string
  description: string
}

export const latestUpdates: LatestUpdate[] = [
  {
    score: 77,
    delta: 7,
    color: "blue",
    org: "Barr Foundation",
    amount: "$400K",
    description:
      "New 990 shows climate-health line item up 38% YoY; two of your co-PIs match their 2025 grantee cohort.",
  },
  {
    score: 54,
    delta: 3,
    color: "blue",
    org: "Wellcome Trust",
    amount: "$1.45M",
    description:
      "Program officer moved from Discovery to Climate & Health desk last week — she chaired your 2022 review.",
  },
  {
    score: 49,
    delta: -5,
    color: "orange",
    org: "Kresge Foundation",
    amount: "$750K",
    description:
      "RFP language tightened to prioritize community-based orgs as prime; Harvard now fits the sub-award lane, not the lead.",
  },
]

export type Priority = {
  title: string
  amount: string
  owner: string
  deadline: string
  tag: string
}

export const priorities: Priority[] = [
  {
    title: "Wellcome Discovery Awards",
    amount: "$1.45M",
    owner: "Dr. Bernstein",
    deadline: "31 July 2026",
    tag: "Drafts",
  },
  {
    title: "Bloomberg Philanthropies",
    amount: "$900K",
    owner: "Dr. Bernstein",
    deadline: "28 July 2026",
    tag: "Drafts",
  },
  {
    title: "Barr Foundation",
    amount: "$400K",
    owner: "Needs assignee",
    deadline: "26 September 2026",
    tag: "Needs assignee",
  },
]

export type ActivityRow = {
  title: string
  date: string
  amount?: string
  amountColor?: "green" | "muted"
  chevron?: boolean
}

export const activityFeed: ActivityRow[] = [
  { title: "Wellcome climate-health award", date: "24 July 2026", amount: "+$180K", amountColor: "green", chevron: true },
  { title: "NIH NHLBI R01...", date: "20 July 2026", amount: "−$1.10M", amountColor: "muted", chevron: true },
  { title: "Wellcome climate-health award", date: "24 July 2026", amount: "+$180K", amountColor: "green", chevron: true },
  { title: "Wellcome CHAIR-India changed to Submitted", date: "19 June 2026" },
  { title: "New initiative added - APECS Y3-Y5", date: "17 June 2026", chevron: true },
  { title: "Escalated", date: "24 July 2026", chevron: true },
  { title: "Wellcome climate-health award", date: "24 July 2026", amount: "+$180K", amountColor: "green", chevron: true },
  { title: "New assignee for Barr Project", date: "10 July 2026", chevron: true },
]
