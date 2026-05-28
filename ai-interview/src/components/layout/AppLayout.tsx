import { Outlet } from "react-router-dom"
import AppSidebar from "./AppSidebar"
import AppHeader from "./AppHeader"
import MobileBottomNav from "./MobileBottomNav"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function AppLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden" style={{ background: "#080812" }}>
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 min-w-0 overflow-hidden" style={{ background: "transparent" }}>
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
            <Outlet />
          </main>
          <MobileBottomNav />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
