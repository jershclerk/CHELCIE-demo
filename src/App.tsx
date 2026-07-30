import { TopNav } from "@/components/overview/TopNav"
import { ProgramBalanceCard } from "@/components/overview/ProgramBalanceCard"
// import { FindFundingCard } from "@/components/overview/FindFundingCard" // hidden per request
import { DiscoverySection } from "@/components/overview/DiscoverySection"
import { LatestUpdatesSection } from "@/components/overview/LatestUpdatesSection"
import { PrioritiesSection } from "@/components/overview/PrioritiesSection"
// import { ActivityFeed } from "@/components/overview/ActivityFeed" // hidden to preview layout without it
import { greeting } from "@/lib/overview-data"

function App() {
  return (
    <div className="min-h-screen bg-chelcie-gray6 pb-16">
      <TopNav />

      <div className="flex flex-col gap-6 pl-[120px] pr-10 pt-8">
        <div className="flex flex-col gap-1 text-black">
          <p className="text-[22px] font-bold leading-7 tracking-[-0.26px]">
            Good morning, {greeting.name}
          </p>
          <p className="text-base tracking-[-0.31px] text-black/80">{greeting.lastLogin}</p>
        </div>

        <div className="flex w-full items-start gap-8">
          <div className="flex w-full max-w-[867px] flex-1 flex-col gap-8">
            <ProgramBalanceCard />
            {/* Hidden per request
            <FindFundingCard />
            */}
            <DiscoverySection />
            <LatestUpdatesSection />
            <PrioritiesSection />
          </div>

          {/* Temporarily hidden to preview the layout without it
          <div className="w-[461px] shrink-0">
            <ActivityFeed />
          </div>
          */}
        </div>
      </div>
    </div>
  )
}

export default App
