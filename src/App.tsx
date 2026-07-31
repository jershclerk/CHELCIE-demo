import { useState } from "react"
import { TopNav, type Page } from "@/components/overview/TopNav"
import { Dialog, DialogPopup } from "@/components/ui/dialog"
import { ProgramBalanceCard } from "@/components/overview/ProgramBalanceCard"
import { FindFundingCard } from "@/components/overview/FindFundingCard"
import { DiscoverySection } from "@/components/overview/DiscoverySection"
import { LatestUpdatesSection } from "@/components/overview/LatestUpdatesSection"
// import { PrioritiesSection } from "@/components/overview/PrioritiesSection" // hidden on dashboard for now
// import { ActivityFeed } from "@/components/overview/ActivityFeed" // hidden to preview layout without it
import { OpportunityDetailPanel } from "@/components/overview/OpportunityDetailPanel"
import { EmailDraftPanel } from "@/components/overview/EmailDraftPanel"
import { WelcomeTasksPanel } from "@/components/overview/WelcomeTasksPanel"
import { UpcomingDeadlinesCard } from "@/components/overview/UpcomingDeadlinesCard"
import { CreateOpportunityCard } from "@/components/overview/CreateOpportunityCard"
import { YourProgramsPage } from "@/components/programs/YourProgramsPage"
import { BoardMemoPage } from "@/components/programs/BoardMemoPage"
import { DiscoverOpportunitiesPage } from "@/components/discover/DiscoverOpportunitiesPage"
import { TrackOpportunitiesPage } from "@/components/tracking/TrackOpportunitiesPage"
import { greeting, type EmailDraft } from "@/lib/overview-data"

function App() {
  const [activePage, setActivePage] = useState<Page>("home")
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null)
  const [showEmailDraft, setShowEmailDraft] = useState(false)
  const [customDraft, setCustomDraft] = useState<EmailDraft | null>(null)
  const [programToOpen, setProgramToOpen] = useState<string | null>(null)
  const [showDeadlines, setShowDeadlines] = useState(false)
  const [showBanner, setShowBanner] = useState(false)

  return (
    <div className="min-h-screen bg-chelcie-gray6 pb-16">
      <TopNav
        activePage={activePage}
        onNavigate={(page) => {
          setActivePage(page)
          setSelectedOrg(null)
          setShowEmailDraft(false)
          setCustomDraft(null)
          setProgramToOpen(null)
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
      />

      <div className="flex flex-col gap-6 pl-[120px] pr-10 pt-8">
        {activePage === "programs" ? (
          <YourProgramsPage
            initialProgramTitle={programToOpen}
            onNavigateToDiscover={() => {
              setActivePage("discover")
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            onNavigateToBoardMemo={() => {
              setActivePage("memo")
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          />
        ) : activePage === "memo" ? (
          <BoardMemoPage
            onBack={() => {
              setActivePage("programs")
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          />
        ) : activePage === "discover" ? (
          <DiscoverOpportunitiesPage />
        ) : activePage === "tracking" ? (
          <TrackOpportunitiesPage
            onNavigateToProgram={(programTitle) => {
              setProgramToOpen(programTitle)
              setActivePage("programs")
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          />
        ) : (
          <>
            <div className="flex flex-col gap-1 text-black">
              <p className="font-arizona text-[22px] font-normal leading-7 tracking-[-0.06px]">
                Good morning, {greeting.name}
              </p>
              <p className="text-sm tracking-[-0.31px] text-black/80">{greeting.lastLogin}</p>
            </div>

            <div className="flex w-full items-start gap-8">
              <div className="flex w-full max-w-[867px] flex-col gap-8">
                <ProgramBalanceCard
                  onNavigateToPrograms={() => {
                    setActivePage("programs")
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                />
                <DiscoverySection
                  selectedOrg={selectedOrg}
                  onSelect={(org) => {
                    setSelectedOrg(org)
                    setShowEmailDraft(false)
                  }}
                  onSelectEmail={() => setShowEmailDraft(true)}
                  onNavigateToDiscover={() => {
                    setActivePage("discover")
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                />
                {showBanner && (
                  <FindFundingCard
                    onStart={() => {
                      setActivePage("discover")
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                  />
                )}
                <LatestUpdatesSection />
                <CreateOpportunityCard
                  onDraftEmail={(draft) => {
                    setCustomDraft(draft)
                    setShowEmailDraft(true)
                  }}
                />
                {/* Hidden on dashboard for now
                <PrioritiesSection />
                */}
              </div>

              {/* Temporarily hidden to preview the layout without it
              <div className="w-[461px] shrink-0">
                <ActivityFeed />
              </div>
              */}

              {/* Side panel — part of the main content flow, sticky rather than floating */}
              <div className="sticky top-[72px] flex w-[340px] shrink-0 flex-col gap-6">
                <WelcomeTasksPanel
                  onOpenEmailDraft={() => setShowEmailDraft(true)}
                  onSelectOrg={(org) => setSelectedOrg(org)}
                />
                {showDeadlines && <UpcomingDeadlinesCard />}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowDeadlines((prev) => !prev)}
              className="fixed bottom-6 right-6 z-50 rounded-full border border-[#ec4899] bg-white px-4 py-2 font-devtool text-sm font-semibold text-[#ec4899] shadow-md transition-colors hover:bg-[#ec4899]/5 active:scale-95"
            >
              {showDeadlines ? "Hide deadlines" : "Show deadlines"}
            </button>

            <button
              type="button"
              onClick={() => setShowBanner((prev) => !prev)}
              className="fixed bottom-20 right-6 z-50 rounded-full border border-[#ec4899] bg-white px-4 py-2 font-devtool text-sm font-semibold text-[#ec4899] shadow-md transition-colors hover:bg-[#ec4899]/5 active:scale-95"
            >
              {showBanner ? "Hide banner" : "Show banner"}
            </button>

            <Dialog
              open={showEmailDraft || selectedOrg !== null}
              onOpenChange={(open) => {
                if (!open) {
                  setShowEmailDraft(false)
                  setCustomDraft(null)
                  setSelectedOrg(null)
                }
              }}
            >
              <DialogPopup>
                {showEmailDraft ? (
                  <EmailDraftPanel
                    draft={customDraft ?? undefined}
                    onClose={() => {
                      setShowEmailDraft(false)
                      setCustomDraft(null)
                      setSelectedOrg(null)
                    }}
                  />
                ) : selectedOrg ? (
                  <OpportunityDetailPanel
                    selectedOrg={selectedOrg}
                    onClose={() => setSelectedOrg(null)}
                    onStartDraft={() => setShowEmailDraft(true)}
                  />
                ) : null}
              </DialogPopup>
            </Dialog>
          </>
        )}
      </div>
    </div>
  )
}

export default App
