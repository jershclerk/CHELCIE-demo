export type Category =
  | "Climate & Health"
  | "Health Systems"
  | "Corporate"
  | "Policy & Government"
  | "Research Consortium"

export type Opportunity = {
  id: string
  funder: string
  program: string
  amount: string
  cycle: string
  deadline: string
  fit: number
  category: Category
  matchReasons: string[]
}

export const opportunities: Opportunity[] = [
  {
    id: "wellcome-discovery",
    funder: "Wellcome Trust",
    program: "Climate & Health Discovery Award",
    amount: "$1.45M",
    cycle: "Rolling cycle",
    deadline: "Rolling",
    fit: 97,
    category: "Climate & Health",
    matchReasons: ["Mission alignment on climate-health evidence", "Existing program officer relationship"],
  },
  {
    id: "nih-niehs",
    funder: "NIH NIEHS",
    program: "Climate Change & Human Health",
    amount: "$2.1M",
    cycle: "Federal cycle",
    deadline: "1 Mar 2027",
    fit: 89,
    category: "Policy & Government",
    matchReasons: ["Prior R01 track record", "Named priority research area"],
  },
  {
    id: "bloomberg-resilient",
    funder: "Bloomberg Philanthropies",
    program: "Climate-Resilient Health Systems RFP",
    amount: "$900K",
    cycle: "Standard cycle",
    deadline: "22 Aug 2026",
    fit: 91,
    category: "Health Systems",
    matchReasons: ["Named priority applicant in the RFP", "Urban resilience focus overlap"],
  },
  {
    id: "google-org",
    funder: "Google.org",
    program: "AI for Climate Adaptation",
    amount: "$650K",
    cycle: "Long cycle",
    deadline: "14 Oct 2026",
    fit: 88,
    category: "Research Consortium",
    matchReasons: ["Data infrastructure fit", "Prior AI-for-good cohort alignment"],
  },
  {
    id: "rockefeller",
    funder: "Rockefeller Foundation",
    program: "Climate Resilience for Health Systems",
    amount: "$1.2M",
    cycle: "Standard cycle",
    deadline: "9 Nov 2026",
    fit: 87,
    category: "Climate & Health",
    matchReasons: ["Prior resilience-planning grant", "Regional health system partners"],
  },
  {
    id: "kresge",
    funder: "Kresge Foundation",
    program: "Environment Program Renewal",
    amount: "$750K",
    cycle: "Standard cycle",
    deadline: "5 Sep 2026",
    fit: 84,
    category: "Policy & Government",
    matchReasons: ["Existing grantee in good standing", "Environmental justice overlap"],
  },
  {
    id: "astrazeneca",
    funder: "AstraZeneca",
    program: "Healthy Heart Africa Extension",
    amount: "$1.1M",
    cycle: "Standard cycle",
    deadline: "30 Sep 2026",
    fit: 82,
    category: "Corporate",
    matchReasons: ["Respiratory + cardiovascular overlap", "Existing clinical trial infrastructure"],
  },
  {
    id: "wellcome-leap",
    funder: "Wellcome Leap",
    program: "1kD Health Breakthrough",
    amount: "$3.0M",
    cycle: "Program cycle",
    deadline: "20 Jan 2027",
    fit: 81,
    category: "Research Consortium",
    matchReasons: ["Breakthrough-stage research fit", "Multi-site consortium ready"],
  },
  {
    id: "rwjf",
    funder: "Robert Wood Johnson Foundation",
    program: "Health Equity & Climate",
    amount: "$500K",
    cycle: "Standard cycle",
    deadline: "18 Nov 2026",
    fit: 79,
    category: "Health Systems",
    matchReasons: ["Equity-first framing match", "Community-based delivery model"],
  },
  {
    id: "microsoft-ai-health",
    funder: "Microsoft",
    program: "AI for Health Initiative",
    amount: "$400K",
    cycle: "Rolling cycle",
    deadline: "Rolling",
    fit: 77,
    category: "Corporate",
    matchReasons: ["Cloud + compute credits available", "Health data pipeline in place"],
  },
  {
    id: "novo-nordisk",
    funder: "Novo Nordisk Foundation",
    program: "Global Health Innovation",
    amount: "$1.8M",
    cycle: "Long cycle",
    deadline: "Q1 2027",
    fit: 76,
    category: "Research Consortium",
    matchReasons: ["Metabolic + climate comorbidity angle", "International consortium eligible"],
  },
  {
    id: "cdc-foundation",
    funder: "CDC Foundation",
    program: "Public Health Infrastructure Modernization",
    amount: "$600K",
    cycle: "Standard cycle",
    deadline: "12 Dec 2026",
    fit: 74,
    category: "Health Systems",
    matchReasons: ["Infrastructure gap directly addressed", "State health dept partnership"],
  },
  {
    id: "apple-health",
    funder: "Apple",
    program: "Health Research Access Fund",
    amount: "$300K",
    cycle: "Rolling cycle",
    deadline: "Rolling",
    fit: 73,
    category: "Corporate",
    matchReasons: ["Device-in-kind synergy", "Consumer health data pipeline"],
  },
  {
    id: "commonwealth-fund",
    funder: "Commonwealth Fund",
    program: "Health System Resilience",
    amount: "$700K",
    cycle: "Standard cycle",
    deadline: "8 Feb 2027",
    fit: 69,
    category: "Health Systems",
    matchReasons: ["Resilience-metrics track record", "Cross-sector coalition in place"],
  },
  {
    id: "salesforce-org",
    funder: "Salesforce.org",
    program: "Net Zero Cloud Partnership",
    amount: "$200K",
    cycle: "Standard cycle",
    deadline: "5 Dec 2026",
    fit: 68,
    category: "Corporate",
    matchReasons: ["Existing in-kind license", "Emissions telemetry pilot fit"],
  },
  {
    id: "chan-zuckerberg",
    funder: "Chan Zuckerberg Initiative",
    program: "Rare As One Climate Health",
    amount: "$900K",
    cycle: "Cohort cycle",
    deadline: "3 Mar 2027",
    fit: 70,
    category: "Research Consortium",
    matchReasons: ["Cohort model fit", "Patient-community partnership"],
  },
  {
    id: "horizon-europe",
    funder: "Horizon Europe",
    program: "Health & Climate Adaptation",
    amount: "€5.0M",
    cycle: "Consortium call",
    deadline: "17 May 2027",
    fit: 66,
    category: "Policy & Government",
    matchReasons: ["Consortium lead eligible", "Two EU co-PI relationships"],
  },
  {
    id: "ministry-research",
    funder: "Ministry of Higher Education and Research",
    program: "Health Adaptation Tools & Technologies",
    amount: "€20M",
    cycle: "Consortium call",
    deadline: "13 Apr 2027",
    fit: 65,
    category: "Policy & Government",
    matchReasons: ["Consortium lead eligible", "Two EU co-PI relationships"],
  },
  {
    id: "simons",
    funder: "Simons Foundation",
    program: "Climate Modeling for Health",
    amount: "$550K",
    cycle: "Standard cycle",
    deadline: "9 Jul 2027",
    fit: 62,
    category: "Research Consortium",
    matchReasons: ["Modeling capability match", "Open-data commitment aligned"],
  },
  {
    id: "doris-duke",
    funder: "Doris Duke Foundation",
    program: "Climate & Health Equity",
    amount: "$450K",
    cycle: "Standard cycle",
    deadline: "21 Aug 2027",
    fit: 63,
    category: "Health Systems",
    matchReasons: ["Equity-metrics reporting ready", "Prior program-related investment"],
  },
  {
    id: "barr-foundation",
    funder: "Barr Foundation",
    program: "Climate Program Renewal",
    amount: "$400K",
    cycle: "Standard cycle",
    deadline: "26 Sep 2026",
    fit: 61,
    category: "Health Systems",
    matchReasons: ["Renewal-track relationship", "Regional climate focus"],
  },
  {
    id: "unilever",
    funder: "Unilever",
    program: "Climate & Health Partnership",
    amount: "$250K",
    cycle: "Standard cycle",
    deadline: "4 Oct 2027",
    fit: 60,
    category: "Corporate",
    matchReasons: ["Consumer-health brand tie-in", "Supply-chain climate data"],
  },
  {
    id: "usaid",
    funder: "USAID",
    program: "Global Health Security",
    amount: "$1.5M",
    cycle: "Federal cycle",
    deadline: "30 Nov 2027",
    fit: 58,
    category: "Policy & Government",
    matchReasons: ["Global health security mandate fit", "Existing field-site network"],
  },
  {
    id: "dyson-partnership",
    funder: "Dyson",
    program: "Indoor Air Science Partnership",
    amount: "$150K–$400K",
    cycle: "Unrestricted gift",
    deadline: "Rolling",
    fit: 58,
    category: "Corporate",
    matchReasons: ["Respiratory trial credibility hook", "Global Comms fast-track"],
  },
  {
    id: "ikea-foundation",
    funder: "IKEA Foundation",
    program: "Renewable Energy & Health Co-benefits",
    amount: "$850K",
    cycle: "Standard cycle",
    deadline: "15 Dec 2027",
    fit: 71,
    category: "Climate & Health",
    matchReasons: ["Co-benefits framing match", "Household-energy pilot ready"],
  },
  {
    id: "heising-simons",
    funder: "Heising-Simons Foundation",
    program: "Climate & Clean Energy",
    amount: "$350K",
    cycle: "Standard cycle",
    deadline: "22 Jan 2028",
    fit: 51,
    category: "Climate & Health",
    matchReasons: ["Clean-energy health angle", "West Coast grantee network"],
  },
  {
    id: "grantham",
    funder: "Grantham Foundation",
    program: "Climate Science Communication",
    amount: "$180K",
    cycle: "Standard cycle",
    deadline: "6 Feb 2028",
    fit: 54,
    category: "Climate & Health",
    matchReasons: ["Public-facing communication track record", "Media partnership in place"],
  },
  {
    id: "3m-community",
    funder: "3M",
    program: "Community Health Innovation",
    amount: "$180K",
    cycle: "Standard cycle",
    deadline: "19 Mar 2028",
    fit: 48,
    category: "Corporate",
    matchReasons: ["Local manufacturing footprint overlap", "STEM workforce pipeline"],
  },
  {
    id: "epa-ej",
    funder: "EPA",
    program: "Environmental Justice Small Grants",
    amount: "$100K",
    cycle: "Federal cycle",
    deadline: "2 Apr 2028",
    fit: 52,
    category: "Policy & Government",
    matchReasons: ["Community-based org partner", "Direct environmental-justice mandate"],
  },
  {
    id: "templeton",
    funder: "Templeton Foundation",
    program: "Interdisciplinary Health Research",
    amount: "$400K",
    cycle: "Standard cycle",
    deadline: "11 May 2028",
    fit: 50,
    category: "Research Consortium",
    matchReasons: ["Interdisciplinary team structure fit", "Big-question framing match"],
  },
  {
    id: "schmidt-family",
    funder: "Schmidt Family Foundation",
    program: "11th Hour Project",
    amount: "$400K",
    cycle: "Standard cycle",
    deadline: "28 Jun 2028",
    fit: 47,
    category: "Climate & Health",
    matchReasons: ["Systems-change framing match", "Prior 11th Hour grantee network"],
  },
  {
    id: "ford-foundation",
    funder: "Ford Foundation",
    program: "Just Transition Health",
    amount: "$300K",
    cycle: "Standard cycle",
    deadline: "14 Jul 2028",
    fit: 45,
    category: "Policy & Government",
    matchReasons: ["Just-transition framing overlap", "Labor-health coalition partner"],
  },
  {
    id: "draper-richards",
    funder: "Draper Richards Kaplan",
    program: "Early Stage Health Ventures",
    amount: "$300K",
    cycle: "Rolling cycle",
    deadline: "Rolling",
    fit: 44,
    category: "Corporate",
    matchReasons: ["Early-stage venture model fit", "Scalable-delivery thesis match"],
  },
  {
    id: "macarthur",
    funder: "MacArthur Foundation",
    program: "Climate Solutions",
    amount: "$500K",
    cycle: "Standard cycle",
    deadline: "9 Sep 2028",
    fit: 42,
    category: "Climate & Health",
    matchReasons: ["Big-bets framing overlap", "Systemic-solution scale match"],
  },
  {
    id: "william-penn",
    funder: "William Penn Foundation",
    program: "Regional Health Resilience",
    amount: "$200K",
    cycle: "Standard cycle",
    deadline: "23 Oct 2028",
    fit: 40,
    category: "Health Systems",
    matchReasons: ["Regional footprint overlap", "Community-resilience metrics ready"],
  },
  {
    id: "skoll",
    funder: "Skoll Foundation",
    program: "Social Entrepreneurship for Health",
    amount: "$250K",
    cycle: "Standard cycle",
    deadline: "5 Dec 2028",
    fit: 38,
    category: "Research Consortium",
    matchReasons: ["Social-entrepreneurship framing fit", "Systems-level theory of change"],
  },
]

export type LayoutNode = Opportunity & {
  x: number
  y: number
  cardWidth: number
  ringIndex: number
}

// Cards are static and sit exactly on one of a small set of concentric orbit
// rings — stronger matches land on inner (closer) rings, weaker ones further
// out. Card *size* still reads continuously off the exact fit score.
const MIN_RADIUS = 320
const MAX_RADIUS = 960
const RING_COUNT: number = 6
const MIN_CARD_WIDTH = 116
const MAX_CARD_WIDTH = 152

// Rings are faceted polygons (per the Figma "Polygon" radar rings), not
// circles — ORBIT_SIDES/ORBIT_ROTATION are shared with OrbitRings.tsx so the
// drawn lines and the cards placed "on" them use the exact same geometry.
export const ORBIT_SIDES = 9
export const ORBIT_ROTATION = -90

function hash(seed: string): number {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return ((h >>> 0) % 100000) / 100000
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

/** Distance from center to a regular N-gon's boundary at a given angle —
 * R at each vertex, tapering to R*cos(π/sides) at each edge's midpoint. */
export function polygonRadiusAtAngle(
  circumradius: number,
  sides: number,
  angleDeg: number,
  rotationDeg = ORBIT_ROTATION
): number {
  const sector = 360 / sides
  const midOffset = rotationDeg + sector / 2
  let psi = (angleDeg - midOffset) % sector
  if (psi < -sector / 2) psi += sector
  if (psi > sector / 2) psi -= sector
  const psiRad = (psi * Math.PI) / 180
  const halfSectorRad = ((sector / 2) * Math.PI) / 180
  return (circumradius * Math.cos(halfSectorRad)) / Math.cos(psiRad)
}

const fitValues = opportunities.map((o) => o.fit)
const minFit = Math.min(...fitValues)
const maxFit = Math.max(...fitValues)

export const orbitRings: number[] = Array.from({ length: RING_COUNT }, (_, i) =>
  lerp(MIN_RADIUS, MAX_RADIUS, RING_COUNT === 1 ? 0 : i / (RING_COUNT - 1))
)

const sortedByFit = [...opportunities].sort((a, b) => b.fit - a.fit)
const perRing = Math.ceil(sortedByFit.length / RING_COUNT)

export const layout: LayoutNode[] = sortedByFit.map((o, index) => {
  const ringIndex = Math.min(RING_COUNT - 1, Math.floor(index / perRing))
  const ringStart = ringIndex * perRing
  const countInRing = Math.min(perRing, sortedByFit.length - ringStart)
  const indexInRing = index - ringStart

  // Evenly space cards around their ring, then nudge with a small hash-based
  // jitter so it reads as organic rather than mechanically spoked — and
  // stagger each ring's starting angle so rings don't line up radially.
  const baseAngle = (360 / countInRing) * indexInRing + ringIndex * 17
  const jitter = (hash(o.id + "|angle") - 0.5) * (360 / countInRing) * 0.4
  const angleDeg = baseAngle + jitter
  const angleRad = (angleDeg * Math.PI) / 180

  // Radius follows the ring's actual polygon boundary at this angle, not a
  // constant — otherwise cards between vertices would float outside the line.
  const radius = polygonRadiusAtAngle(orbitRings[ringIndex], ORBIT_SIDES, angleDeg)
  const x = radius * Math.cos(angleRad)
  const y = radius * Math.sin(angleRad)

  const t = (o.fit - minFit) / (maxFit - minFit || 1)
  const cardWidth = lerp(MIN_CARD_WIDTH, MAX_CARD_WIDTH, t)
  return { ...o, x, y, cardWidth, ringIndex }
})

export type ScoreFactor = { label: string; weight: number; color: string; detail: string }

export const CHELCIE_SCORE = 89

export const scoreBreakdown: ScoreFactor[] = [
  {
    label: "Mission alignment",
    weight: 34,
    color: "#50DBBD",
    detail: "How closely your focus areas match each funder's stated priorities.",
  },
  {
    label: "Relationship strength",
    weight: 24,
    color: "#6e56cf",
    detail: "Existing program officer contact, prior awards, or warm introductions.",
  },
  {
    label: "Application readiness",
    weight: 22,
    color: "#f76b15",
    detail: "Whether your materials, budget, and compliance docs are submit-ready.",
  },
  {
    label: "Timing fit",
    weight: 20,
    color: "#006dff",
    detail: "How well your ask lines up with each funder's open cycle and deadline.",
  },
]
