import { ChelcieActivitySummary } from "./ChelcieActivitySummary"
import { OpportunityBoard } from "./OpportunityBoard"
import { PartnershipsSection } from "./PartnershipsSection"

export function TrackOpportunitiesPage({
  onNavigateToProgram,
}: {
  onNavigateToProgram?: (programTitle: string) => void
}) {
  return (
    <div className="flex w-full flex-col gap-8">
      <ChelcieActivitySummary />

      <div className="mx-auto flex w-full max-w-[900px] flex-col gap-4">
        <OpportunityBoard onNavigateToProgram={onNavigateToProgram} />
      </div>

      <div className="mx-auto w-full max-w-[900px]">
        <PartnershipsSection />
      </div>
    </div>
  )
}
