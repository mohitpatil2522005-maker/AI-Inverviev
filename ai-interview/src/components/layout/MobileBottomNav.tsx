import { NavLink, useLocation } from "react-router-dom"
import { LayoutDashboard, Play, FileText, MessageSquare, Settings } from "lucide-react"

const mobileNav = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Interview", href: "/interview/setup", icon: Play },
  { label: "Resume", href: "/resume", icon: FileText },
  { label: "Coach", href: "/coach", icon: MessageSquare },
  { label: "Settings", href: "/settings", icon: Settings },
]

export default function MobileBottomNav() {
  const location = useLocation()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex border-t"
      style={{
        background: "rgba(8,8,18,0.95)", backdropFilter: "blur(20px)",
        borderColor: "rgba(255,255,255,0.08)"
      }}>
      {mobileNav.map((item) => {
        const active = location.pathname.startsWith(item.href)
        return (
          <NavLink
            key={item.href}
            to={item.href}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-all"
            style={{ color: active ? "#8b5cf6" : "#475569" }}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium">{item.label}</span>
            {active && (
              <span className="absolute bottom-0 w-8 h-0.5 rounded-t-full" style={{ background: "#8b5cf6" }} />
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}
