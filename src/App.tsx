import type { OrgMember } from "@/pages/LoginPage"
import { DashboardPage } from "@/pages/DashboardPage"

const DEFAULT_MEMBER: OrgMember = {
  name: "Mary Rice",
  initial: "M",
  avatarColor: "#A51C30",
  role: "Admin",
}

function App() {
  return <DashboardPage member={DEFAULT_MEMBER} onLogout={() => {}} />
}

export default App
