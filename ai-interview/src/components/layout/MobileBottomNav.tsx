import { NavLink, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Play,
  FileText,
  MessageSquare,
  Settings,
} from "lucide-react"

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
    <nav
      className="md:hidden bottom-0 left-0 right-0 fixed z-50 flex border-t"
      style={{
        background: "rgba(8,8,18,0.95)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      {mobileNav.map((item) => {
        const active = location.pathname.startsWith(item.href)
        return (
          <NavLink
            key={item.href}
            to={item.href}
            className="gap-1 py-3 flex flex-1 flex-col items-center justify-center transition-all"
            style={{ color: active ? "#8b5cf6" : "#475569" }}
          >
            <item.icon size={20} />
            <span className="font-medium text-sm">{item.label}</span>
            {active && (
              <span
                className="bottom-0 w-8 h-0.5 absolute rounded-t-full"
                style={{ background: "#8b5cf6" }}
              />
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}
