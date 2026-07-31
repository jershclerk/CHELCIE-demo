export type TrackingStatus =
  | "Shortlisted"
  | "In Progress"
  | "Drafting"
  | "Submitted"
  | "Under Review"
  | "Awarded"
  | "Declined"

export const TRACKING_STATUSES: { status: TrackingStatus; color: string }[] = [
  { status: "Shortlisted", color: "#50dbbd" },
  { status: "In Progress", color: "#8e8e93" },
  { status: "Drafting", color: "#f76b15" },
  { status: "Submitted", color: "#0066cc" },
  { status: "Under Review", color: "#6e56cf" },
  { status: "Awarded", color: "#34c759" },
  { status: "Declined", color: "#ff383c" },
]

export function statusColor(status: TrackingStatus) {
  return TRACKING_STATUSES.find((entry) => entry.status === status)?.color ?? "#8e8e93"
}

export const TRACKING_STATUS_BADGE_STYLES: Record<TrackingStatus, string> = {
  Shortlisted: "bg-chelcie-teal/10 text-chelcie-teal-text",
  "In Progress": "bg-chelcie-gray6 text-black/60",
  Drafting: "bg-[#fff4e6] text-[#e8590c]",
  Submitted: "bg-chelcie-blue1/10 text-chelcie-blue1",
  "Under Review": "bg-[#f3f0ff] text-[#6e56cf]",
  Awarded: "bg-[#ebfbee] text-[#2b8a3e]",
  Declined: "bg-[#fff0f0] text-[#e03131]",
}

export const NEEDS_ASSIGNEE_OWNER = "Needs assignee"

export const ASSIGNABLE_TEAM = ["Dr. Alvarez", "Dr. Bernstein", "Dr. Chen", "Dr. Lefebvre", "Dr. Torres"]

export type ScoreHistoryEntry = {
  date: string
  label: string
  delta: number
  note: string
}

export type CoverageItem = {
  category: string
  title: string
  gap: string
}

export type TrackedOpportunity = {
  org: string
  logoKey?: "wellcome" | "bloomberg" | "ministry"
  avatarColor?: string
  title: string
  amount: string
  deadline: string
  owner: string
  status: TrackingStatus
  attentionReason?: string
  fitScore?: number
  gapCoveragePercent?: number
  totalGap?: string
  window?: string
  readyToApply?: boolean
  blockerNote?: string
  scoreHistory?: ScoreHistoryEntry[]
  covers?: CoverageItem[]
}

export const trackedOpportunities: TrackedOpportunity[] = [
  {
    org: "Barr Foundation",
    avatarColor: "#0066cc",
    title: "Climate & Health Renewal",
    amount: "$400K",
    deadline: "26 September 2026",
    owner: NEEDS_ASSIGNEE_OWNER,
    status: "In Progress",
    attentionReason: "Needs an owner assigned",
  },
  {
    org: "Kresge Foundation",
    avatarColor: "#f76b15",
    title: "Coastal Resilience Renewal",
    amount: "$180K",
    deadline: "22 October 2026",
    owner: "Dr. Alvarez",
    status: "In Progress",
  },
  {
    org: "Wellcome Trust",
    logoKey: "wellcome",
    title: "Discovery Award",
    amount: "$1.45M",
    deadline: "31 July 2026",
    owner: "Dr. Bernstein",
    status: "Drafting",
    attentionReason: "Submission window closes tomorrow",
    fitScore: 96,
    gapCoveragePercent: 56,
    totalGap: "$2.58M",
    window: "Rolling · next review Mar 2026",
    readyToApply: true,
    blockerNote: "Nothing is blocking a submission this cycle. The path is clear.",
    scoreHistory: [
      {
        date: "22 Oct 2025",
        label: "Strategy refresh",
        delta: 5,
        note: "Climate & Health elevated to a standing program area — no longer a discretionary sub-line.",
      },
      {
        date: "30 Jan 2026",
        label: "Public commitment",
        delta: 4,
        note: "£100M multi-year envelope announced for climate-health infrastructure through 2030.",
      },
      {
        date: "8 Apr 2026",
        label: "Personnel move",
        delta: 4,
        note: "Program officer moved from Discovery to Climate & Health desk — she chaired your 2022 review.",
      },
    ],
    covers: [
      { category: "Individuals", title: "APECS · Air Purification for Eosinophilic COPD", gap: "$1.45M" },
      {
        category: "National and global policy",
        title: "CHAIR-India + Climate-Smart Public Health (Madagascar/Nepal)",
        gap: "$1.13M",
      },
    ],
  },
  {
    org: "Bloomberg Philanthropies",
    logoKey: "bloomberg",
    title: "Climate-Resilient Health Systems RFP",
    amount: "$900K",
    deadline: "22 August 2026",
    owner: "Dr. Bernstein",
    status: "Drafting",
    fitScore: 72,
    gapCoveragePercent: 38,
    totalGap: "$2.37M",
    window: "Fixed deadline · 22 August 2026",
    readyToApply: false,
    blockerNote: "Budget narrative still needs sign-off from finance before submission.",
    scoreHistory: [
      {
        date: "14 Jun 2026",
        label: "Portfolio match",
        delta: 12,
        note: "Bloomberg's Public Health division flagged Harvard Chan as a priority applicant.",
      },
    ],
    covers: [{ category: "Health care systems", title: "Climate-Resilient FQHC Operating Playbook", gap: "$1.30M" }],
  },
  {
    org: "Ministry of Higher Education and Research",
    logoKey: "ministry",
    title: "Tools & Technologies for Health Adaptation",
    amount: "€20M",
    deadline: "13 April 2027",
    owner: "Dr. Lefebvre",
    status: "Submitted",
    fitScore: 55,
    gapCoveragePercent: 65,
    totalGap: "€4.20M",
    window: "Fixed deadline · 13 April 2027",
    readyToApply: false,
    blockerNote: "Submitted — awaiting consortium partner confirmation before funder review.",
    scoreHistory: [
      {
        date: "2 Mar 2026",
        label: "Consortium formed",
        delta: 8,
        note: "Two EU-based co-PIs joined the application, satisfying the multi-institution requirement.",
      },
    ],
    covers: [{ category: "National and global policy", title: "WHO Climate & Health Adaptation Framework", gap: "€2.10M" }],
  },
  {
    org: "Bloomberg Philanthropies",
    logoKey: "bloomberg",
    title: "Rapid Response Grant",
    amount: "$200K",
    deadline: "14 November 2026",
    owner: "Dr. Torres",
    status: "Submitted",
  },
  {
    org: "WHO",
    avatarColor: "#6e56cf",
    title: "Climate & Health Adaptation Framework",
    amount: "$300K",
    deadline: "13 April 2027",
    owner: "Dr. Lefebvre",
    status: "Under Review",
  },
  {
    org: "CDC",
    avatarColor: "#6e56cf",
    title: "Community Health Training Grant",
    amount: "$150K",
    deadline: "30 January 2027",
    owner: "Dr. Bernstein",
    status: "Under Review",
  },
  {
    org: "Wellcome Trust",
    logoKey: "wellcome",
    title: "Climate-Health Award",
    amount: "$180K",
    deadline: "24 July 2026",
    owner: "Dr. Bernstein",
    status: "Awarded",
    covers: [
      {
        category: "National and global policy",
        title: "CHAIR-India + Climate-Smart Public Health (Madagascar/Nepal)",
        gap: "$180K",
      },
    ],
  },
  {
    org: "Kresge Foundation",
    avatarColor: "#f76b15",
    title: "Sub-Award Lane RFP",
    amount: "$750K",
    deadline: "closed",
    owner: "Dr. Chen",
    status: "Declined",
  },
]

export type PartnershipStatus = "Active" | "In discussion" | "Renewal due"

export type Partnership = {
  org: string
  avatarColor: string
  status: PartnershipStatus
  note: string
  contact: string
  ctaLabel: string
}

export const partnerships: Partnership[] = [
  {
    org: "Salesforce.org",
    avatarColor: "#0066cc",
    status: "In discussion",
    note: "CHELCIE drafted an intro note to Salesforce.org · Net Zero Cloud — give it a read and send when ready.",
    contact: "Amy Wildermuth",
    ctaLabel: "Draft with CHELCIE",
  },
  {
    org: "Americares",
    avatarColor: "#34c759",
    status: "Active",
    note: "In-kind + cash partnership supporting CHAIR-India frontline clinic resilience work.",
    contact: "Dr. Bernstein",
    ctaLabel: "View partnership",
  },
  {
    org: "Google.org",
    avatarColor: "#f76b15",
    status: "Renewal due",
    note: "AI for Climate Adaptation grant renewal window opens next quarter — start scoping the proposal.",
    contact: "Dr. Torres",
    ctaLabel: "Start renewal",
  },
]
