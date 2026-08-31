import { useState } from "react"
import {
  Bell,
  ChevronDown,
  FolderKanban,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Search,
  UserPlus,
} from "lucide-react"
import type { OrgMember } from "@/pages/LoginPage"
import { FundingPrioritiesPage } from "@/pages/FundingPrioritiesPage"
import { InitiativesPage } from "@/pages/InitiativesPage"
import { ManageMembersPage } from "@/pages/ManageMembersPage"
import { cn } from "@/lib/utils"
import { AddMemberDialog } from "@/components/AddMemberDialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: LayoutDashboard },
  { key: "funding-priorities", label: "Funding Priorities", icon: ListChecks },
  { key: "initiatives", label: "Initiatives", icon: FolderKanban },
]

const NOTIFICATIONS = [
  {
    id: 1,
    title: "New funder interest",
    description: "The Awesome Foundation showed interest in your Community Health Grant application.",
    time: "2h ago",
    read: false,
  },
  {
    id: 2,
    title: "New funder interest",
    description: "Wellcome Trust flagged your profile as a strong match for their Climate & Health track.",
    time: "5h ago",
    read: false,
  },
  {
    id: 3,
    title: "Application submitted",
    description: "Your application to the Local Chapter Micro-Grant was successfully submitted.",
    time: "Yesterday",
    read: true,
  },
]

type View = "home" | "members" | "funding-priorities" | "initiatives"

const PAGE_TITLES: Partial<Record<View, string>> = {
  members: "Manage Members",
  "funding-priorities": "Funding Priorities",
  initiatives: "Initiatives",
}

export function DashboardPage({ member, onLogout }: { member: OrgMember; onLogout: () => void }) {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [view, setView] = useState<View>("home")

  return (
    <SidebarProvider>
      <Sidebar className="border-none">
        <SidebarHeader className="px-6 pt-8 pb-0">
          <span className="text-xl font-extrabold leading-7 tracking-normal text-sidebar-foreground">
            CHELCIE
          </span>
        </SidebarHeader>
        <SidebarContent className="mt-8">
          <SidebarGroup className="px-6 py-0">
            <SidebarMenu className="gap-1.5">
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    isActive={view === item.key}
                    onClick={() => setView(item.key as View)}
                    className="h-auto rounded-lg px-4 py-2.5 text-sm hover:rounded-full data-[active=true]:rounded-full data-[active=true]:font-semibold"
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="px-6 pb-8">
          <div className="flex items-center gap-3 rounded-xl border border-sidebar-border bg-white/5 p-3">
            <Avatar className="size-8 shrink-0">
              <AvatarFallback className="bg-[#A51C30] text-sm font-semibold text-white">H</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col">
              <p className="truncate text-sm font-medium text-sidebar-foreground">Harvard C-Change</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex flex-col gap-6 px-4 py-4 sm:px-8 sm:py-6">
          <div className="flex items-center">
            <SidebarTrigger className="md:hidden" />
            <div className="ml-auto flex items-center gap-2 sm:gap-[26px]">
            <button
              type="button"
              aria-label="Search"
              className="flex size-9 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent"
            >
              <Search className="size-5" />
            </button>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-label="Notifications"
                  className="relative flex size-9 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent"
                >
                  <Bell className="size-5" />
                  <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-[#A51C30] text-[10px] font-semibold text-white ring-2 ring-background">
                    3
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 max-w-[calc(100vw-2rem)] p-0">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <p className="text-sm font-semibold text-foreground">Notifications</p>
                  <span className="text-xs text-muted-foreground">2 new</span>
                </div>
                <div className="flex flex-col">
                  {NOTIFICATIONS.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "flex gap-3 border-b border-border px-4 py-3 last:border-b-0",
                        !notification.read && "bg-accent/40",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-1.5 size-2 shrink-0 rounded-full",
                          notification.read ? "bg-transparent" : "bg-[#A51C30]",
                        )}
                      />
                      <div className="flex flex-col gap-0.5">
                        <p
                          className={cn(
                            "text-sm",
                            notification.read ? "font-medium text-muted-foreground" : "font-semibold text-foreground",
                          )}
                        >
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{notification.description}</p>
                        <p className="text-[11px] text-muted-foreground/70">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full bg-secondary py-1.5 pl-1.5 pr-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                >
                  <Avatar className="size-6 shrink-0">
                    <AvatarFallback
                      className="text-[11px] font-semibold text-white"
                      style={{ backgroundColor: member.avatarColor }}
                    >
                      {member.initial}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">{member.name}</span>
                  <ChevronDown className="size-3.5 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-2">
                <DropdownMenuItem className="gap-3 py-3">
                  <Avatar className="size-8 shrink-0">
                    <AvatarFallback
                      className="text-xs font-semibold text-white"
                      style={{ backgroundColor: member.avatarColor }}
                    >
                      {member.initial}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-1 flex-col gap-0">
                    <span className="text-sm font-medium text-foreground">{member.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {member.name.toLowerCase().replace(" ", ".")}@harvard.edu
                    </span>
                  </div>
                  <span className="shrink-0 rounded-xl bg-[#f0f0f5] px-2.5 py-1 text-xs font-medium text-[#666673]">
                    {member.role}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2.5" onClick={() => setView("members")}>
                  <UserPlus />
                  Manage members
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem className="py-2.5" onClick={onLogout}>
                  <LogOut />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          </div>

          <h1 className="text-xl font-bold text-foreground sm:text-2xl">
            {PAGE_TITLES[view] ?? `Welcome to CHELCIE, ${member.name.split(" ")[0]}`}
          </h1>
        </header>

        {view === "home" && (
          <div className="flex flex-col gap-6 px-4 pb-12 sm:px-8">
            <div className="h-40 rounded-2xl border border-dashed border-border" />
            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="h-64 rounded-2xl border border-dashed border-border sm:flex-[2]" />
              <div className="h-64 rounded-2xl border border-dashed border-border sm:flex-1" />
            </div>
          </div>
        )}

        {view !== "home" && (
          <div className="min-w-0 px-4 pb-12 sm:px-8">
            {view === "members" && <ManageMembersPage onAddMember={() => setIsAddMemberOpen(true)} />}
            {view === "funding-priorities" && <FundingPrioritiesPage />}
            {view === "initiatives" && <InitiativesPage />}
          </div>
        )}
      </SidebarInset>

      <AddMemberDialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen} />
    </SidebarProvider>
  )
}
