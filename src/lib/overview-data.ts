export const greeting = {
  name: "Sam",
  lastLogin: "Last logged in: 28 July 2026 13:30",
}

export const programBalance = {
  total: "$99M",
  goal: "$8,000,000",
  fundedPercent: 27,
  underPursuitPercent: 42,
}

export type OpportunityDetails = {
  description: string
  focusAreas: string[]
  programOfficer: string
  fundingType: string
  matchReasons: string[]
}

export type RecommendedOpportunity =
  | {
      kind: "match"
      hidden?: boolean
      logoKey: "wellcome" | "bloomberg" | "ministry"
      org: string
      title: string
      amount: string
      percent: number
      submissionDate: string
      tag: string
      details: OpportunityDetails
    }
  | {
      kind: "promo"
      hidden?: boolean
      heading: string
      body: string
      points?: string[]
      ctaLabel: string
    }

export const recommendedOpportunities: RecommendedOpportunity[] = [
  {
    kind: "promo",
    heading: "Partner with Dyson",
    body: "CHELCIE flagged a strong corporate fit. Here's why.",
    points: [
      "A peer-reviewed respiratory trial adds real credibility to Dyson's indoor air science marketing",
      "In-kind hardware plus an unrestricted gift can route through Global Comms, skipping the grant queue",
    ],
    ctaLabel: "Let's start",
  },
  {
    kind: "match",
    logoKey: "bloomberg",
    org: "Bloomberg Philanthropies",
    title: "Climate-resilient health systems RFP",
    amount: "$900k",
    percent: 86,
    submissionDate: "22 August 2026",
    tag: "Climate",
    details: {
      description:
        "A request for proposals supporting health systems that can withstand climate-driven shocks — extreme heat, flooding, and vector-borne disease surges — in underserved urban areas.",
      focusAreas: ["Climate & Health", "Urban Resilience", "Health Systems Strengthening"],
      programOfficer: "Dr. Elena Torres, Senior Program Officer",
      fundingType: "Grant, single disbursement",
      matchReasons: [
        "Aligns with your Climate & Health portfolio",
        "Prior relationship with Bloomberg's Public Health division",
        "Harvard Chan C-CHANGE named as a priority applicant in the RFP's eligible-institutions list",
      ],
    },
  },
  {
    kind: "match",
    logoKey: "ministry",
    org: "Ministry of Higher Education and Research",
    title: "Tools and technologies to support health adaptation to climate change",
    amount: "€20M",
    percent: 84,
    submissionDate: "13 April 2027",
    tag: "Climate",
    details: {
      description:
        "A large-scale research and innovation call funding the development of tools, sensors, and digital technologies that help health systems adapt to climate change impacts.",
      focusAreas: ["Climate Adaptation", "Health Technology", "International Research Consortia"],
      programOfficer: "Dr. Mathieu Lefebvre, Research Directorate",
      fundingType: "Multi-year consortium grant (EU-aligned)",
      matchReasons: [
        "Requires a multi-institution consortium — Harvard can lead the health-systems work package",
        "Matches existing collaboration with two EU-based co-PIs",
        "High award ceiling relative to comparable US federal mechanisms",
      ],
    },
  },
  // Replacement for the old Wellcome Trust card — hidden until content is finalized.
  {
    kind: "match",
    hidden: true,
    logoKey: "wellcome",
    org: "TBD",
    title: "New opportunity placeholder",
    amount: "TBD",
    percent: 0,
    submissionDate: "TBD",
    tag: "Climate",
    details: {
      description: "TBD",
      focusAreas: [],
      programOfficer: "TBD",
      fundingType: "TBD",
      matchReasons: [],
    },
  },
]

export type EmailDraft = {
  stagedLabel: string
  readNote: string
  title: string
  to: string
  subject: string
  body: string
}

export const dysonEmailDraft: EmailDraft = {
  stagedLabel: "Staged by Chelcie",
  readNote: "Read before it ships",
  title: "Partnership intro · Dyson",
  to: "Dyson, VP of Global Communications & Sustainability",
  subject: "Harvard Chan C-CHANGE × Dyson: a partnership hook for indoor air science",
  body: `Hi [Name],

I lead partnerships for Harvard Chan C-CHANGE. We're running a trial testing whether HEPA air purification reduces COPD exacerbations and ER visits across our Boston clinical network.

Dyson has built a strong public narrative around indoor air science, and a peer-reviewed respiratory trial using your tech is credibility your marketing team can't easily buy. I'd propose in-kind hardware plus an unrestricted gift ($150K to $400K) routed through Global Comms, skipping the grant queue.

Worth a 20-minute call?

[Your name]
Harvard T.H. Chan School of Public Health · C-CHANGE`,
}

export type PickUpTask = {
  tag: string
  title: string
  description: string
  ctaLabel: string
  action: "email" | "opportunity" | "none"
  org?: string
}

export const pickUpTasks: PickUpTask[] = [
  {
    tag: "Fast · ~14 days",
    title: "Read the Salesforce.org · Sustainability email before it ships",
    description:
      "CHELCIE drafted the first note to Salesforce.org + Net Zero Cloud product team. Give it a read, edit if needed, copy — you send.",
    ctaLabel: "Read it before it ships",
    action: "email",
  },
  {
    tag: "Due soon · 22 August",
    title: "Review the Bloomberg Philanthropies RFP",
    description:
      "CHELCIE flagged an 86% match based on your Climate & Health portfolio — the submission window closes in a few weeks.",
    ctaLabel: "Review opportunity",
    action: "opportunity",
    org: "Bloomberg Philanthropies",
  },
  {
    tag: "Needs owner",
    title: "Assign a lead for the Barr Foundation priority",
    description:
      "This priority still shows \"Needs assignee,\" with a deadline of 26 September 2026.",
    ctaLabel: "View priorities",
    action: "none",
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

export type ProgramCategory =
  | "Individuals"
  | "Health care systems"
  | "Communities and cities"
  | "National and global policy"

export type SecuredFundColor = "coral" | "yellow" | "blue"

export type SecuredFund = {
  color: SecuredFundColor
  label: string
  amount: string
  percentOfGoal: number
}

export type ProgramOpportunityStatus = "Drafting" | "Submitted" | "In review"

export type ProgramOpportunity = {
  logoKey: "wellcome" | "bloomberg" | "ministry"
  org: string
  awardName: string
  amount: string
  submissionDate: string
  owner: string
  status: ProgramOpportunityStatus
}

export type Program = {
  category: ProgramCategory
  title: string
  secured: string
  goal: string
  toGo: string
  underPursuit: string
  percent: number
  securedFunds: SecuredFund[]
  opportunities: ProgramOpportunity[]
}

export const programs: Program[] = [
  {
    category: "Health care systems",
    title: "Climate-Resilient FQHC Operating Playbook",
    secured: "$1.20M",
    goal: "$2.00M",
    toGo: "$800K",
    underPursuit: "$450K",
    percent: 60,
    securedFunds: [
      { color: "coral", label: "HRSA base award", amount: "$700K", percentOfGoal: 35 },
      { color: "yellow", label: "Net Zero Cloud in-kind", amount: "$300K", percentOfGoal: 15 },
      { color: "blue", label: "Regional health system co-investment", amount: "$200K", percentOfGoal: 10 },
    ],
    opportunities: [
      {
        logoKey: "wellcome",
        org: "Kresge Foundation",
        awardName: "Renewal Grant",
        amount: "$250K / 2 years",
        submissionDate: "10 October 2026",
        owner: "Dr. Chen",
        status: "Drafting",
      },
      {
        logoKey: "bloomberg",
        org: "Salesforce.org",
        awardName: "Net Zero Cloud Partnership",
        amount: "$200K / 1 year",
        submissionDate: "5 December 2026",
        owner: "Amy Wildermuth",
        status: "In review",
      },
    ],
  },
  {
    category: "Individuals",
    title: "Early-Career Climate & Health Fellowship",
    secured: "$500K",
    goal: "$750K",
    toGo: "$250K",
    underPursuit: "$100K",
    percent: 67,
    securedFunds: [
      { color: "coral", label: "Endowment payout", amount: "$300K", percentOfGoal: 40 },
      { color: "yellow", label: "Departmental match", amount: "$200K", percentOfGoal: 27 },
    ],
    opportunities: [
      {
        logoKey: "wellcome",
        org: "Wellcome Trust",
        awardName: "Fellowship Top-Up",
        amount: "$100K / 1 year",
        submissionDate: "15 February 2027",
        owner: "Dr. Bernstein",
        status: "Drafting",
      },
    ],
  },
  {
    category: "Health care systems",
    title: "Net Zero Cloud Emissions Telemetry Pilot",
    secured: "$450K",
    goal: "$900K",
    toGo: "$450K",
    underPursuit: "$200K",
    percent: 50,
    securedFunds: [
      { color: "coral", label: "Salesforce.org in-kind license", amount: "$250K", percentOfGoal: 28 },
      { color: "yellow", label: "C-CHANGE operating fund", amount: "$200K", percentOfGoal: 22 },
    ],
    opportunities: [
      {
        logoKey: "bloomberg",
        org: "Bloomberg Philanthropies",
        awardName: "Climate Tech Grant",
        amount: "$200K / 1 year",
        submissionDate: "8 December 2026",
        owner: "Dr. Torres",
        status: "In review",
      },
    ],
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
