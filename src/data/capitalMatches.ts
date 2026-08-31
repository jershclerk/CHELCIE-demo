export type Instrument = "Grant" | "Recoverable grant" | "PRI" | "Loan" | "TA" | "Anchor" | "Blended"

export type Confidence = "High" | "Medium" | "Low"

export type EvidenceSpan = {
  label: "Funder guideline" | "NOFO text" | "Program page"
  summary: string
}

export type RubricCriterion = {
  name: string
  points: number
  fullPointsRequirement: string
}

export type ScoringRubric = {
  totalPoints: number
  criteria: RubricCriterion[]
  failureModes: string[]
}

export type ReadinessGap = {
  requiredDocuments: string[]
  missingDocuments: string[]
}

export type PortalProfile = {
  name: string
  prerequisites: string[]
  characterLimits: string
  fileRules: string
  expectedSubmitTime: string
}

export type RequirementType = "Narrative" | "Form" | "Budget" | "Attachment" | "Certification"

export type RequirementItem = {
  section: string
  type: RequirementType
  detail?: string
  weight?: number
  draftable?: boolean
  missing?: boolean
}

export type CapitalMatch = {
  id: string
  funder: string
  programName: string
  instrument: Instrument
  ticketRange: string
  score: number
  confidence: Confidence
  rationale: string
  matchReasons: string[]
  eligibilityCriteria: string[]
  sourceLabel: string
  sourceUrl: string
  evidence: EvidenceSpan[]
  lowConfidenceNote?: string
  scoringRubric?: ScoringRubric
  readinessGap?: ReadinessGap
  portalProfile?: PortalProfile
  requirementsChecklist?: RequirementItem[]
}

export type PortfolioInitiative = {
  id: string
  name: string
  fullTitle: string
  pillar: string
  matches: CapitalMatch[]
}

export const PORTFOLIO_INITIATIVES: PortfolioInitiative[] = [
  {
    id: "apecs",
    name: "APECS",
    fullTitle: "APECS — Air Purification for Eosinophilic COPD",
    pillar: "Individuals",
    matches: [
      {
        id: "apecs-wellcome",
        funder: "Wellcome Trust",
        programName: "Climate & Health Discovery Award",
        instrument: "Grant",
        ticketRange: "$900K–$1.5M",
        score: 92,
        confidence: "High",
        rationale:
          "The Climate & Health Discovery Award prioritizes air-quality interventions with a defined clinical endpoint, matching APECS's COPD patient cohort design and 3-site enrollment plan.",
        matchReasons: [
          "Discovery Award prioritizes air-quality interventions with a defined clinical endpoint.",
          "APECS's COPD cohort and 3-site design meet that bar directly.",
          "Ticket size ($500K–$2M) matches APECS's funding ask.",
        ],
        eligibilityCriteria: [
          "Registered nonprofit or academic research institution",
          "Pre-registered clinical trial protocol in place",
          "Budget within $500K–$2M over 2–3 years",
          "Named PI with prior NIH- or foundation-funded trial experience",
          "IRB / ethics approval obtained or in progress",
        ],
        sourceLabel: "Climate and Health guidelines",
        sourceUrl: "https://wellcome.org/grant-funding/schemes/climate-and-health",
        evidence: [
          {
            label: "Funder guideline",
            summary:
              "Priority is given to interventions with a measurable clinical outcome in populations disproportionately exposed to air pollution — directly aligned with APECS's patient-level endpoints.",
          },
          {
            label: "Program page",
            summary: "Discovery Award cycle funds 2–3 year clinical and translational studies at $500K–$2M.",
          },
        ],
        scoringRubric: {
          totalPoints: 100,
          criteria: [
            {
              name: "Scientific rigor & clinical endpoint design",
              points: 30,
              fullPointsRequirement: "A pre-registered, measurable clinical outcome tied to a defined patient population.",
            },
            {
              name: "Population exposure justification",
              points: 25,
              fullPointsRequirement: "Quantified evidence the target population is disproportionately exposed to air pollution.",
            },
            {
              name: "Budget & timeline fit",
              points: 20,
              fullPointsRequirement: "A 2–3 year budget between $500K–$2M with milestone-linked disbursement.",
            },
            {
              name: "Team & institutional capacity",
              points: 15,
              fullPointsRequirement: "A named PI with prior NIH- or foundation-funded trial experience.",
            },
            {
              name: "Dissemination & policy pathway",
              points: 10,
              fullPointsRequirement: "A named plan to translate findings into public health policy.",
            },
          ],
          failureModes: [
            "Proposals without a pre-registered clinical endpoint are capped at partial credit regardless of scientific merit.",
            "Missing quantified exposure data is the most common reason APECS-type proposals lose points here.",
            "Budgets over $2M or longer than 3 years are returned for revision before review.",
          ],
        },
        readinessGap: {
          requiredDocuments: [
            "Pre-registered clinical trial protocol",
            "IRB / ethics approval letter",
            "3-year budget narrative",
            "PI biosketch & prior funding history",
            "Community exposure data appendix",
          ],
          missingDocuments: ["Community exposure data appendix"],
        },
        portalProfile: {
          name: "Grants.gov Workspace",
          prerequisites: [
            "Active SAM.gov registration",
            "Grants.gov Workspace account linked to your organization's UEI",
            "AOR (Authorized Organization Representative) sign-off before submission",
          ],
          characterLimits: "Project narrative capped at 12,000 characters; abstract capped at 1,500 characters.",
          fileRules: "PDF only, one file per attachment, 25MB max per file.",
          expectedSubmitTime: "Allow 2 full business days for AOR routing and validation before the deadline.",
        },
        requirementsChecklist: [
          { section: "Project Abstract", type: "Narrative", detail: "1,500 characters", draftable: true },
          { section: "Project Narrative", type: "Narrative", detail: "12,000 characters", weight: 55, draftable: true },
          { section: "Grants.gov Workspace Application Form", type: "Form" },
          { section: "Budget & Justification", type: "Budget", detail: "3-year budget narrative", weight: 20, draftable: true },
          { section: "IRB / Ethics Approval Letter", type: "Attachment" },
          { section: "PI Biosketch & Funding History", type: "Attachment", weight: 15 },
          { section: "Community Exposure Data Appendix", type: "Attachment", missing: true },
          { section: "Dissemination & Policy Plan", type: "Narrative", weight: 10, draftable: true },
        ],
      },
      {
        id: "apecs-astrazeneca",
        funder: "AstraZeneca",
        programName: "Investigator Sponsored Study Program",
        instrument: "Grant",
        ticketRange: "$250K–$600K",
        score: 78,
        confidence: "Medium",
        rationale:
          "AstraZeneca's Investigator Sponsored Study program funds respiratory-disease research where the company has an active compound or device interest, which overlaps with APECS's air-purification device arm.",
        matchReasons: [
          "ISS funds respiratory research tied to an active AZ compound or device.",
          "APECS's air-purification device falls within that interest area.",
          "Fast, rolling-style review cycle fits an early-stage device trial.",
        ],
        eligibilityCriteria: [
          "Study ties to an active AstraZeneca compound or device area",
          "Named investigator with no undisclosed competing industry funding",
          "Confirmed patient recruitment capacity at proposed sites",
          "Study falls within a respiratory or cardiovascular indication",
          "Site has an active data safety monitoring plan",
        ],
        sourceLabel: "Investigator Sponsored Study program page",
        sourceUrl: "https://azisstudies.com",
        evidence: [
          {
            label: "Program page",
            summary:
              "ISS proposals are considered for respiratory and cardiovascular indications tied to an active AstraZeneca compound or device area of interest.",
          },
        ],
        scoringRubric: {
          totalPoints: 100,
          criteria: [
            {
              name: "Alignment to active compound/device interest",
              points: 35,
              fullPointsRequirement: "The study tests an AstraZeneca compound or device already in an active therapeutic area.",
            },
            {
              name: "Scientific / clinical rationale",
              points: 25,
              fullPointsRequirement: "A hypothesis-driven design with a clear respiratory or cardiovascular endpoint.",
            },
            {
              name: "Investigator independence & conflict disclosure",
              points: 20,
              fullPointsRequirement: "The investigator holds no other undisclosed industry funding for the same indication.",
            },
            {
              name: "Feasibility & site capacity",
              points: 20,
              fullPointsRequirement: "Confirmed patient recruitment capacity within the proposed device-interest area.",
            },
          ],
          failureModes: [
            "Proposals for compounds or devices outside AstraZeneca's active portfolio are declined at intake, before scoring.",
            "Undisclosed competing industry funding is grounds for disqualification, not partial credit.",
            "Recruitment plans without confirmed site capacity are the most common reason ISS proposals stall in review.",
          ],
        },
        readinessGap: {
          requiredDocuments: [
            "Investigator CV & conflict-of-interest disclosure",
            "Study synopsis (device/compound rationale)",
            "Site recruitment feasibility letter",
            "Data safety monitoring plan",
          ],
          missingDocuments: ["Site recruitment feasibility letter", "Data safety monitoring plan"],
        },
        requirementsChecklist: [
          { section: "Study Synopsis", type: "Narrative", detail: "Device/compound rationale", weight: 25, draftable: true },
          { section: "ISS Program Application Form", type: "Form" },
          { section: "Investigator CV & Conflict-of-Interest Disclosure", type: "Attachment", weight: 20 },
          { section: "Site Recruitment Feasibility Letter", type: "Attachment", weight: 20, missing: true },
          { section: "Data Safety Monitoring Plan", type: "Attachment", missing: true },
        ],
      },
      {
        id: "apecs-novonordisk",
        funder: "Novo Nordisk Foundation",
        programName: "Global Health Grants",
        instrument: "Grant",
        ticketRange: "$400K–$1.0M",
        score: 74,
        confidence: "Medium",
        rationale:
          "The Foundation's chronic-disease portfolio is expanding into environmental drivers of disease, but its historical weighting toward metabolic conditions makes a COPD-focused device trial an adjacent rather than core fit.",
        matchReasons: [
          "Portfolio is expanding into environmental disease drivers.",
          "Historical focus on metabolic disease makes this adjacent, not core.",
          "No named air-quality or respiratory program exists yet.",
        ],
        eligibilityCriteria: [
          "Registered nonprofit engaged in chronic-disease research",
          "Project addresses an environmental or metabolic disease driver",
          "No geographic restriction for this program",
          "Registered nonprofit or academic institution",
          "Project has a defined chronic-disease outcome measure",
        ],
        sourceLabel: "Global health grants overview",
        sourceUrl: "https://novonordiskfonden.dk/en/grants/",
        evidence: [
          {
            label: "Funder guideline",
            summary: "Grants target chronic disease broadly, with a stated interest in environmental risk factors as an emerging area.",
          },
        ],
      },
      {
        id: "apecs-google",
        funder: "Google.org",
        programName: "Climate & Community Grants",
        instrument: "Blended",
        ticketRange: "$150K–$400K + sensor hardware",
        score: 69,
        confidence: "Medium",
        rationale:
          "Google.org's climate-health portfolio funds community air-quality sensor networks and data infrastructure, a plausible in-kind and grant match for APECS's device-monitoring data pipeline.",
        matchReasons: [
          "Climate-health grants fund community air-quality sensor networks.",
          "APECS's device-monitoring pipeline fits that in-kind + grant model.",
          "Google.org has funded similar pilots in other metro areas.",
        ],
        eligibilityCriteria: [
          "US-based 501(c)(3) or fiscally sponsored nonprofit",
          "Project includes a data or sensor-technology component",
          "Willing to accept blended cash + in-kind hardware funding",
          "Project has a defined community air-quality outcome",
          "Organization can host or maintain sensor hardware",
        ],
        sourceLabel: "Climate & community program page",
        sourceUrl: "https://google.org/our-work/climate/",
        evidence: [
          {
            label: "Program page",
            summary: "Funding combines cash grants with in-kind cloud credits and hardware for data-driven climate-health projects.",
          },
        ],
      },
      {
        id: "apecs-kresge",
        funder: "Kresge Foundation",
        programName: "Environment Program",
        instrument: "PRI",
        ticketRange: "$150K–$400K",
        score: 52,
        confidence: "Low",
        rationale:
          "Kresge's PRI capital is structured for community-development projects with a revenue or cost-recovery component, which APECS's clinical trial design does not currently have.",
        matchReasons: [
          "PRI capital requires a revenue or cost-recovery component.",
          "APECS's trial has no repayment mechanism today.",
          "Kresge's health-related PRIs are rare outside its home region.",
        ],
        eligibilityCriteria: [
          "Organization has a revenue or cost-recovery mechanism",
          "Project is health- or environment-related",
          "PRI capital must be repayable on defined terms",
          "Organization is a registered nonprofit or mission-aligned entity",
          "Project has a defined community benefit",
        ],
        sourceLabel: "Environment Program guidelines",
        sourceUrl: "https://kresge.org/program/environment/",
        evidence: [
          {
            label: "Funder guideline",
            summary: "PRI capital requires a repayment or revenue mechanism tied to the funded activity.",
          },
        ],
        lowConfidenceNote:
          "No repayment mechanism is defined for APECS today — this match is exploratory until a cost-recovery structure exists.",
      },
    ],
  },
  {
    id: "climate-md",
    name: "Climate MD",
    fullTitle: "Climate MD — Frontline Clinic Resilience",
    pillar: "Health care systems",
    matches: [
      {
        id: "climatemd-bloomberg",
        funder: "Bloomberg Philanthropies",
        programName: "Public Health Systems Initiative",
        instrument: "Anchor",
        ticketRange: "$600K–$1.2M",
        score: 91,
        confidence: "High",
        rationale:
          "Bloomberg's public health systems program anchors climate-resilient care delivery infrastructure, a direct match for Climate MD's frontline clinic resilience work.",
        matchReasons: [
          "Anchors climate-resilient care delivery infrastructure.",
          "Climate MD's clinic resilience work fits that anchor focus directly.",
          "Bloomberg has funded comparable health-system anchors before.",
        ],
        eligibilityCriteria: [
          "Applicant operates within a public health care delivery system",
          "Project scales climate-resilient care infrastructure",
          "Multi-year anchor commitment accepted",
          "Registered nonprofit or public health entity",
          "Project has a named climate-adaptation outcome",
        ],
        sourceLabel: "Public Health program page",
        sourceUrl: "https://bloomberg.org/public-health/",
        evidence: [
          {
            label: "Program page",
            summary: "Anchor commitments back multi-year public health systems infrastructure, including climate adaptation.",
          },
        ],
      },
      {
        id: "climatemd-rwjf",
        funder: "Robert Wood Johnson Foundation",
        programName: "Health Systems Resilience Track",
        instrument: "Grant",
        ticketRange: "$400K–$900K",
        score: 87,
        confidence: "High",
        rationale:
          "RWJF's health systems resilience track funds frontline clinic adaptation in climate-vulnerable communities, aligning closely with Climate MD's clinic-level scope.",
        matchReasons: [
          "Health Systems Resilience Track funds clinic climate adaptation.",
          "Climate MD's clinic-level scope aligns closely with that track.",
          "RWJF names this exact fit as an active grantmaking area.",
        ],
        eligibilityCriteria: [
          "US-based health system or clinic network",
          "Project targets climate-vulnerable communities",
          "Named in RWJF's active grantmaking priorities",
          "Registered nonprofit health system or clinic network",
          "Project has a defined resilience outcome",
        ],
        sourceLabel: "Funding priorities page",
        sourceUrl: "https://www.rwjf.org/en/grants.html",
        evidence: [
          {
            label: "Funder guideline",
            summary: "Funding priorities name climate resilience in health care delivery as an active grantmaking area.",
          },
        ],
      },
      {
        id: "climatemd-kresge",
        funder: "Kresge Foundation",
        programName: "Environment Program",
        instrument: "PRI",
        ticketRange: "$350K–$800K",
        score: 80,
        confidence: "Medium",
        rationale:
          "Kresge's Environment Program offers PRI capital for clinic-level retrofits (backup power, cooling) tied to measurable community resilience outcomes.",
        matchReasons: [
          "Environment Program funds clinic-level retrofits like backup power.",
          "Funding ties to measurable resilience outcomes Climate MD can report.",
          "Retrofit grants typically pair with multi-year monitoring.",
        ],
        eligibilityCriteria: [
          "Facility-level retrofit with a measurable resilience outcome",
          "Organization can report on multi-year monitoring data",
          "PRI capital must be repayable on defined terms",
          "Facility is owned or long-term leased by the applicant",
          "Organization is a registered nonprofit or mission-aligned entity",
        ],
        sourceLabel: "Environment Program guidelines",
        sourceUrl: "https://kresge.org/program/environment/",
        evidence: [
          {
            label: "Funder guideline",
            summary: "PRI capital is available for facility retrofits that reduce climate-related service disruption.",
          },
        ],
      },
      {
        id: "climatemd-wellcome",
        funder: "Wellcome Trust",
        programName: "Climate & Health Discovery Award",
        instrument: "Grant",
        ticketRange: "$500K–$1.0M",
        score: 76,
        confidence: "Medium",
        rationale:
          "Wellcome's climate-health mandate overlaps with Climate MD's mission, but the current cycle favors research-output-heavy proposals over direct clinic infrastructure spending.",
        matchReasons: [
          "Climate-health mandate overlaps with Climate MD's mission.",
          "Current cycle favors research output over clinic infrastructure spend.",
          "A research-framed version of this ask would likely score higher.",
        ],
        eligibilityCriteria: [
          "Registered nonprofit or academic research institution",
          "Proposal generates new research evidence, not just infrastructure spend",
          "Budget within current cycle's funding band",
          "Named PI with prior research funding experience",
          "Project generates a measurable research outcome",
        ],
        sourceLabel: "Climate and Health guidelines",
        sourceUrl: "https://wellcome.org/grant-funding/schemes/climate-and-health",
        evidence: [
          {
            label: "NOFO text",
            summary: "Current cycle guidance emphasizes generating new evidence over funding operational infrastructure.",
          },
        ],
      },
      {
        id: "climatemd-barr",
        funder: "Barr Foundation",
        programName: "Climate Resilience Loan Fund",
        instrument: "Loan",
        ticketRange: "$200K–$500K",
        score: 61,
        confidence: "Low",
        rationale:
          "Barr's regional climate resilience loan fund could finance clinic energy retrofits, but eligibility is geographically limited to New England and unconfirmed for all Climate MD sites.",
        matchReasons: [
          "Regional loan fund could finance clinic energy retrofits.",
          "Eligibility is limited to New England, unconfirmed for all sites.",
          "Loan terms require a revenue stream clinics may not have.",
        ],
        eligibilityCriteria: [
          "Organization operates within Massachusetts / Greater Boston",
          "Revenue stream available to service loan repayment",
          "Project reduces climate-related service disruption",
          "Registered nonprofit or mission-aligned entity",
          "Loan repayment terms are financially feasible",
        ],
        sourceLabel: "Climate program guidelines",
        sourceUrl: "https://www.barrfoundation.org/strategies/climate",
        evidence: [
          {
            label: "Funder guideline",
            summary: "Climate strategy funding is scoped to organizations operating within Massachusetts and Greater Boston.",
          },
        ],
        lowConfidenceNote:
          "Geographic eligibility hasn't been confirmed for every Climate MD site — verify site locations before pursuing.",
      },
    ],
  },
  {
    id: "acres",
    name: "ACRES · Mystic River Watershed",
    fullTitle: "ACRES · Mystic River Watershed — C-EARTH Heat Interventions",
    pillar: "Communities and cities",
    matches: [
      {
        id: "acres-kresge",
        funder: "Kresge Foundation",
        programName: "Climate Resilience & Urban Opportunity Practice",
        instrument: "PRI",
        ticketRange: "$400K–$1.0M",
        score: 90,
        confidence: "High",
        rationale:
          "Kresge's Climate Resilience & Urban Opportunity practice funds exactly this profile — community-led watershed and heat-adaptation infrastructure with a PRI-eligible capital stack.",
        matchReasons: [
          "Climate Resilience & Urban Opportunity funds exactly this profile.",
          "ACRES fits the PRI-eligible capital stack the practice is built for.",
          "Kresge has funded comparable watershed projects elsewhere.",
        ],
        eligibilityCriteria: [
          "Community-led watershed or heat-adaptation project",
          "Organization has a revenue or cost-recovery mechanism",
          "PRI capital must be repayable on defined terms",
          "Registered nonprofit or municipal partner",
          "Project has a defined community benefit",
        ],
        sourceLabel: "Environment Program guidelines",
        sourceUrl: "https://kresge.org/program/environment/",
        evidence: [
          {
            label: "Program page",
            summary: "Named priority areas include urban watershed restoration and community heat-mitigation infrastructure.",
          },
        ],
      },
      {
        id: "acres-bloomberg",
        funder: "Bloomberg Philanthropies",
        programName: "American Cities Climate Challenge",
        instrument: "Anchor",
        ticketRange: "$500K–$1.1M",
        score: 85,
        confidence: "High",
        rationale:
          "Bloomberg's municipal climate work supports heat-mitigation and green-infrastructure anchor grants, consistent with ACRES's city-partnership model.",
        matchReasons: [
          "Municipal climate work funds heat-mitigation, green-infrastructure grants.",
          "ACRES's city-partnership model fits that anchor-grant structure.",
          "Bloomberg's American Cities Climate Challenge lineage matches directly.",
        ],
        eligibilityCriteria: [
          "Municipal or city-partnership green-infrastructure project",
          "Demonstrated public health co-benefit",
          "Multi-year anchor commitment accepted",
          "Registered municipal or nonprofit partner",
          "Project has a named climate-adaptation outcome",
        ],
        sourceLabel: "Public Health program page",
        sourceUrl: "https://bloomberg.org/public-health/",
        evidence: [
          {
            label: "Funder guideline",
            summary: "Anchor grants back municipal-scale green infrastructure with a public health co-benefit.",
          },
        ],
      },
      {
        id: "acres-barr",
        funder: "Barr Foundation",
        programName: "Climate Resilience Loan Fund",
        instrument: "Loan",
        ticketRange: "$250K–$600K",
        score: 82,
        confidence: "Medium",
        rationale:
          "Barr's New England footprint matches the Mystic River Watershed's Boston-area geography directly, and the loan structure fits a revenue-bearing green-infrastructure component.",
        matchReasons: [
          "New England footprint matches Mystic River's Boston-area geography.",
          "Loan structure fits a revenue-bearing green-infrastructure component.",
          "Barr has financed similar watershed infrastructure regionally.",
        ],
        eligibilityCriteria: [
          "Organization operates within Greater Boston",
          "Revenue-bearing green-infrastructure component",
          "Loan repayment terms are financially feasible",
          "Registered nonprofit or mission-aligned entity",
          "Project reduces climate-related service disruption",
        ],
        sourceLabel: "Climate program guidelines",
        sourceUrl: "https://www.barrfoundation.org/strategies/climate",
        evidence: [
          {
            label: "Funder guideline",
            summary: "Climate lending is available to Greater Boston organizations for green-infrastructure projects.",
          },
        ],
      },
      {
        id: "acres-google",
        funder: "Google.org",
        programName: "Climate & Community Grants",
        instrument: "Blended",
        ticketRange: "$200K–$450K + sensor hardware",
        score: 71,
        confidence: "Medium",
        rationale:
          "Sensor- and data-driven heat-mapping tools align with Google.org's community climate-tech grants, which typically pair a cash grant with hardware and cloud credits.",
        matchReasons: [
          "Climate-tech grants pair a cash grant with hardware and cloud credits.",
          "ACRES's heat-mapping tools align with that funding shape.",
          "Google.org has backed similar sensor-network pilots elsewhere.",
        ],
        eligibilityCriteria: [
          "US-based 501(c)(3) or fiscally sponsored nonprofit",
          "Project includes environmental monitoring technology",
          "Willing to accept blended cash + in-kind hardware funding",
          "Project has a defined community heat or environmental outcome",
          "Organization can host or maintain sensor hardware",
        ],
        sourceLabel: "Climate & community program page",
        sourceUrl: "https://google.org/our-work/climate/",
        evidence: [
          {
            label: "Program page",
            summary: "Grants support community-scale environmental monitoring paired with in-kind technology.",
          },
        ],
      },
      {
        id: "acres-salesforce",
        funder: "Salesforce.org",
        programName: "Nonprofit Cloud Grant Program",
        instrument: "Recoverable grant",
        ticketRange: "$100K–$250K",
        score: 58,
        confidence: "Low",
        rationale:
          "Recoverable-grant funding is available but scoped to nonprofits already using the Salesforce platform; fit depends on ACRES adopting that CRM stack, which hasn't been confirmed.",
        matchReasons: [
          "Recoverable-grant funding is scoped to Salesforce-platform nonprofits.",
          "ACRES's use of that CRM stack hasn't been confirmed.",
          "Eligibility would require adopting Salesforce Nonprofit Cloud first.",
        ],
        eligibilityCriteria: [
          "Active or planned use of Salesforce Nonprofit Cloud",
          "Registered nonprofit organization",
          "Recoverable-grant terms are acceptable",
          "Organization is a registered nonprofit",
          "Project has a defined community benefit",
        ],
        sourceLabel: "Nonprofit grants page",
        sourceUrl: "https://www.salesforce.org/nonprofit/",
        evidence: [
          {
            label: "Funder guideline",
            summary: "Grant eligibility is tied to active or planned use of Salesforce nonprofit products.",
          },
        ],
        lowConfidenceNote: "ACRES's current data stack hasn't been confirmed as Salesforce-compatible.",
      },
    ],
  },
  {
    id: "chair-india",
    name: "CHAIR-India",
    fullTitle: "CHAIR-India — Climate-Smart Public Health",
    pillar: "National and global policy",
    matches: [
      {
        id: "chairindia-novonordisk",
        funder: "Novo Nordisk Foundation",
        programName: "Global Health Grants",
        instrument: "Grant",
        ticketRange: "$700K–$1.5M",
        score: 88,
        confidence: "High",
        rationale:
          "Novo Nordisk's global health portfolio funds chronic-disease-and-climate policy work in South Asia, aligning with CHAIR-India's national health-system scope.",
        matchReasons: [
          "Global health portfolio funds chronic-disease-and-climate work in South Asia.",
          "CHAIR-India's national scope aligns with that regional focus.",
          "Novo Nordisk has an active India-region grantmaking presence.",
        ],
        eligibilityCriteria: [
          "Registered nonprofit or institution operating in South Asia",
          "Project links chronic disease to climate exposure",
          "National- or system-level scope",
          "Named PI or institutional lead based in the region",
          "Project has a defined chronic-disease outcome measure",
        ],
        sourceLabel: "Global health grants overview",
        sourceUrl: "https://novonordiskfonden.dk/en/grants/",
        evidence: [
          {
            label: "Funder guideline",
            summary: "South Asia is named as a priority geography for chronic disease and climate-linked health grants.",
          },
        ],
      },
      {
        id: "chairindia-wellcome",
        funder: "Wellcome Trust",
        programName: "Climate & Health Discovery Award",
        instrument: "Grant",
        ticketRange: "$800K–$1.6M",
        score: 86,
        confidence: "High",
        rationale:
          "Wellcome's Climate & Health track explicitly prioritizes policy-translation projects in low- and middle-income countries, matching CHAIR-India's national policy mandate.",
        matchReasons: [
          "Climate & Health track prioritizes LMIC policy-translation projects.",
          "CHAIR-India's national policy mandate matches that priority directly.",
          "Wellcome has funded comparable India-based policy work before.",
        ],
        eligibilityCriteria: [
          "Project translates climate-health evidence into national policy",
          "Based in a low- or middle-income country",
          "Registered nonprofit or academic research institution",
          "Named PI with prior policy-translation experience",
          "Project has a defined national policy outcome",
        ],
        sourceLabel: "Climate and Health guidelines",
        sourceUrl: "https://wellcome.org/grant-funding/schemes/climate-and-health",
        evidence: [
          {
            label: "NOFO text",
            summary: "Applications translating climate-health evidence into national policy in LMICs are named as a funding priority.",
          },
        ],
      },
      {
        id: "chairindia-astrazeneca",
        funder: "AstraZeneca",
        programName: "Young Health Programme",
        instrument: "Grant",
        ticketRange: "$300K–$700K",
        score: 70,
        confidence: "Medium",
        rationale:
          "AstraZeneca's Young Health Programme has existing India-based public-health infrastructure, but its focus on non-communicable disease is narrower than CHAIR-India's full climate-health policy scope.",
        matchReasons: [
          "Young Health Programme has existing India public-health infrastructure.",
          "Its non-communicable-disease focus is narrower than CHAIR-India's scope.",
          "Overlap exists only where climate and NCD priorities intersect.",
        ],
        eligibilityCriteria: [
          "Program operates within existing India-based infrastructure",
          "Focus intersects non-communicable disease and climate",
          "Named investigator with no undisclosed competing industry funding",
          "Program has existing local infrastructure and staff",
          "Confirmed patient recruitment capacity at proposed sites",
        ],
        sourceLabel: "Investigator Sponsored Study program page",
        sourceUrl: "https://azisstudies.com",
        evidence: [
          {
            label: "Program page",
            summary: "India program activity centers on non-communicable disease prevention rather than climate policy.",
          },
        ],
      },
      {
        id: "chairindia-apple",
        funder: "Apple · Health Research",
        programName: "Health Research Program",
        instrument: "TA",
        ticketRange: "Device + technical assistance (non-cash)",
        score: 63,
        confidence: "Low",
        rationale:
          "Apple's health-research device donations could support field data collection for CHAIR-India, but the program has no track record of funding international policy work directly.",
        matchReasons: [
          "Device donations could support CHAIR-India's field data collection.",
          "No track record of funding international policy work directly.",
          "Best used as an in-kind supplement, not a primary funding source.",
        ],
        eligibilityCriteria: [
          "Project requires field data-collection hardware",
          "Study protocol compatible with Apple health-research devices",
          "No cash grant required for this program",
          "Study protocol includes a defined data-collection plan",
          "Organization can support device deployment and maintenance",
        ],
        sourceLabel: "Health research program page",
        sourceUrl: "https://www.apple.com/health-research/",
        evidence: [
          {
            label: "Program page",
            summary: "Support is limited to devices and technical assistance for study data collection, not policy grants.",
          },
        ],
        lowConfidenceNote: "No cash component — only useful if CHAIR-India needs field data-collection hardware.",
      },
      {
        id: "chairindia-rwjf",
        funder: "Robert Wood Johnson Foundation",
        programName: "Grantmaking Program",
        instrument: "Grant",
        ticketRange: "$250K–$550K",
        score: 55,
        confidence: "Low",
        rationale:
          "RWJF's charter restricts funding to U.S.-domestic work, making this a stretch match that depends on a rare international carve-out.",
        matchReasons: [
          "RWJF's charter restricts funding to U.S.-domestic work.",
          "This match depends on a rare international carve-out.",
          "No precedent exists for RWJF funding India-based programs.",
        ],
        eligibilityCriteria: [
          "US-domestic organization or fiscal sponsor",
          "Qualifies for a rare international-work exception",
          "Named in RWJF's active grantmaking priorities",
          "Registered nonprofit or fiscal sponsor",
          "Project has a defined domestic health outcome supporting the exception",
        ],
        sourceLabel: "Funding priorities page",
        sourceUrl: "https://www.rwjf.org/en/grants.html",
        evidence: [
          {
            label: "Funder guideline",
            summary: "Grantmaking is scoped to U.S. health and health care, with international work funded only in rare exceptions.",
          },
        ],
        lowConfidenceNote: "RWJF funds U.S.-domestic work almost exclusively — confirm an international exception exists before pursuing.",
      },
    ],
  },
]

export const CONFIDENCE_STYLES: Record<Confidence, string> = {
  High: "bg-emerald-50 text-emerald-700",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-[#f0f0f5] text-[#666673]",
}

export const SCORE_TEXT_STYLES: Record<Confidence, string> = {
  High: "text-emerald-600",
  Medium: "text-amber-600",
  Low: "text-[#8f8f9c]",
}

export const SCORE_BADGE_STYLES: Record<Confidence, string> = {
  High: "bg-emerald-600",
  Medium: "bg-amber-500",
  Low: "bg-[#8f8f9c]",
}

export const MATRIX_CELL_STYLES: Record<Confidence, string> = {
  High: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  Medium: "bg-amber-50 text-amber-700 hover:bg-amber-100",
  Low: "bg-[#f0f0f5] text-[#666673] hover:bg-[#e5e5eb]",
}

export type FunderMatrixRow = {
  funder: string
  matches: Partial<Record<string, CapitalMatch>>
}

function buildFunderMatrix(): FunderMatrixRow[] {
  const byFunder = new Map<string, Partial<Record<string, CapitalMatch>>>()
  for (const initiative of PORTFOLIO_INITIATIVES) {
    for (const match of initiative.matches) {
      if (!byFunder.has(match.funder)) byFunder.set(match.funder, {})
      byFunder.get(match.funder)![initiative.id] = match
    }
  }
  return Array.from(byFunder.entries())
    .map(([funder, matches]) => ({ funder, matches }))
    .sort((a, b) => {
      const aMatches = Object.values(a.matches) as CapitalMatch[]
      const bMatches = Object.values(b.matches) as CapitalMatch[]
      if (bMatches.length !== aMatches.length) return bMatches.length - aMatches.length
      const aAvg = aMatches.reduce((sum, m) => sum + m.score, 0) / aMatches.length
      const bAvg = bMatches.reduce((sum, m) => sum + m.score, 0) / bMatches.length
      return bAvg - aAvg
    })
}

export const FUNDER_MATCH_MATRIX = buildFunderMatrix()

export type Sector = "Fast Capital" | "Corporate" | "Foundation" | "Family Office" | "Gov / Multilateral" | "Global"

export const SECTOR_OPTIONS: Sector[] = [
  "Fast Capital",
  "Corporate",
  "Foundation",
  "Family Office",
  "Gov / Multilateral",
  "Global",
]

const FUNDER_SECTORS: Record<string, Sector> = {
  "Wellcome Trust": "Fast Capital",
  AstraZeneca: "Corporate",
  "Novo Nordisk Foundation": "Foundation",
  "Google.org": "Corporate",
  "Kresge Foundation": "Foundation",
  "Bloomberg Philanthropies": "Foundation",
  "Robert Wood Johnson Foundation": "Foundation",
  "Barr Foundation": "Foundation",
  "Salesforce.org": "Fast Capital",
  "Apple · Health Research": "Corporate",
}

export function getFunderSector(funder: string): Sector {
  return FUNDER_SECTORS[funder] ?? "Foundation"
}

export type Cycle = "Rolling" | "Fast Capital" | "Standard Cycle" | "Long Cycle"

const FUNDER_CYCLES: Record<string, Cycle> = {
  "Wellcome Trust": "Fast Capital",
  AstraZeneca: "Standard Cycle",
  "Novo Nordisk Foundation": "Standard Cycle",
  "Google.org": "Long Cycle",
  "Kresge Foundation": "Long Cycle",
  "Bloomberg Philanthropies": "Standard Cycle",
  "Robert Wood Johnson Foundation": "Standard Cycle",
  "Barr Foundation": "Rolling",
  "Salesforce.org": "Fast Capital",
  "Apple · Health Research": "Long Cycle",
}

export function getFunderCycle(funder: string): Cycle {
  return FUNDER_CYCLES[funder] ?? "Rolling"
}

const FUNDER_DEADLINES: Record<string, string> = {
  "Wellcome Trust": "Rolling deadline",
  AstraZeneca: "Closes 15 Nov 2026",
  "Novo Nordisk Foundation": "Closes 1 Dec 2026",
  "Google.org": "Opens Q2 2027",
  "Kresge Foundation": "Closes 30 Jan 2027",
  "Bloomberg Philanthropies": "Closes 10 Oct 2026",
  "Robert Wood Johnson Foundation": "Closes 5 Nov 2026",
  "Barr Foundation": "Rolling deadline",
  "Salesforce.org": "Rolling deadline",
  "Apple · Health Research": "Closes Q1 2027",
}

export function getFunderDeadline(funder: string): string {
  return FUNDER_DEADLINES[funder] ?? "Rolling deadline"
}
