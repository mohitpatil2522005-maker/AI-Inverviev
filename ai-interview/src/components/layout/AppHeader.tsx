import { Bell, Search } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useLocation } from "react-router-dom"

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/resume": "Resume Analyzer",
  "/interview/setup": "Interview Setup",
  "/interview/live": "Live Interview",
  "/report": "Feedback Report",
  "/coach": "AI Career Coach",
  "/history": "Interview History",
  "/billing": "Billing",
  "/settings": "Settings",
  "/admin": "Admin Panel",
}

export default function AppHeader() {
  const location = useLocation()
  const title = pageTitles[location.pathname] ?? "InterviewAI"

  return (
    <header
      className="gap-4 px-4 md:px-6 h-14 flex shrink-0 items-center border-b"
      style={{
        borderColor: "rgba(255,255,255,0.06)",
        background: "rgba(8,8,18,0.8)",
        backdropFilter: "blur(20px)",
      }}
    >
      <SidebarTrigger className="text-slate-400 hover:text-white transition-colors" />
      <div className="flex-1">
        <h1
          className="text-base font-semibold text-white"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          {title}
        </h1>
      </div>
      <div
        className="md:flex gap-2 px-3 py-1.5 rounded-lg hidden items-center"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Search size={14} style={{ color: "#94a3b8" }} />
        <span className="text-sm" style={{ color: "#475569" }}>
          Search...
        </span>
        <kbd
          className="text-sm px-1 rounded"
          style={{ background: "rgba(255,255,255,0.06)", color: "#475569" }}
        >
          ⌘K
        </kbd>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-slate-400 hover:text-white relative"
      >
        <Bell size={18} />
        <span
          className="top-1.5 right-1.5 w-2 h-2 absolute rounded-full"
          style={{ background: "#8b5cf6" }}
        />
      </Button>
    </header>
  )
}
