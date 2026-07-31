export type DiscoverOpportunity = {
  org: string
  logoKey?: "wellcome" | "bloomberg" | "ministry"
  avatarColor?: string
  title: string
  amount: string
  deadline: string
  tag: string
  matchPercent: number
  matchedProgram: string
  note: string
}

export const discoverOpportunities: DiscoverOpportunity[] = [
  {
    org: "Wellcome Trust",
    logoKey: "wellcome",
    title: "Climate & Mental Health Innovation Award",
    amount: "$650K",
    deadline: "12 October 2026",
    tag: "Climate",
    matchPercent: 81,
    matchedProgram: "Climate-Resilient FQHC Operating Playbook",
    note: "New funding line for the mental-health impacts of climate change, a niche Wellcome hasn't funded from Harvard before, and one your FQHC playbook data already speaks to directly.",
  },
  {
    org: "Robert Wood Johnson Foundation",
    avatarColor: "#34c759",
    title: "Health Equity & Extreme Heat Initiative",
    amount: "$500K",
    deadline: "5 November 2026",
    tag: "Health Equity",
    matchPercent: 74,
    matchedProgram: "Net Zero Cloud Emissions Telemetry Pilot",
    note: "RWJF is prioritizing frontline heat-exposure data this cycle, and your emissions telemetry work is an unusually strong technical fit for a foundation that isn't typically climate-data focused.",
  },
  {
    org: "Bloomberg Philanthropies",
    logoKey: "bloomberg",
    title: "Data for Health Systems Challenge",
    amount: "$1.20M",
    deadline: "3 December 2026",
    tag: "Data & Systems",
    matchPercent: 68,
    matchedProgram: "Climate-Resilient FQHC Operating Playbook",
    note: "A large, multi-year award aimed at health systems modernization. It's competitive, but Harvard Chan's existing Bloomberg relationship should help the application stand out early.",
  },
  {
    org: "Skoll Foundation",
    avatarColor: "#6e56cf",
    title: "Emerging Leaders in Climate Health Fellowship",
    amount: "$300K",
    deadline: "18 January 2027",
    tag: "Fellowship",
    matchPercent: 63,
    matchedProgram: "Early-Career Climate & Health Fellowship",
    note: "Skoll is expanding into individual fellowships for the first time, a good early-mover opportunity for your fellowship program before the applicant pool grows.",
  },
]
