import { NavLink, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard, FileText, Play, BarChart3, MessageSquare,
  History, CreditCard, Settings, Shield, Zap, ChevronRight
} from "lucide-react"
import {
  Sidebar, SidebarContent, SidebarHeader, SidebarFooter,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Interviews", href: "/interview/setup", icon: Play, badge: "New" },
  { label: "Resume Analyzer", href: "/resume", icon: FileText },
  { label: "AI Coach", href: "/coach", icon: MessageSquare },
  { label: "Reports", href: "/report", icon: BarChart3 },
  { label: "History", href: "/history", icon: History },
  { label: "Billing", href: "/billing", icon: CreditCard },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Admin", href: "/admin", icon: Shield },
]

export default function AppSidebar() {
  const location = useLocation()
  const { open } = useSidebar()

  return (
    <Sidebar collapsible="icon" className="border-r" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      {/* Header */}
      <SidebarHeader className="p-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}>
            <Zap size={16} className="text-white" />
          </div>
          <AnimatePresence>
            {open && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <p className="font-bold text-white text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>InterviewAI</p>
                <p className="text-xs" style={{ color: "#94a3b8" }}>Pro Plan</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SidebarHeader>

      {/* Nav */}
      <SidebarContent className="py-2">
        <SidebarMenu>
          {navItems.map((item) => {
            const active = location.pathname === item.href || location.pathname.startsWith(item.href + "/")
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
                  <NavLink
                    to={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 relative group"
                    style={{
                      color: active ? "#c4b5fd" : "#94a3b8",
                      background: active ? "rgba(139,92,246,0.15)" : "transparent",
                    }}
                  >
                    {active && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.2)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                    <item.icon size={18} className="relative z-10 shrink-0" />
                    <AnimatePresence>
                      {open && (
                        <motion.span
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="relative z-10 text-sm font-medium flex-1"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {open && item.badge && (
                      <Badge className="text-xs px-1.5 py-0 relative z-10"
                        style={{ background: "rgba(139,92,246,0.3)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.3)" }}>
                        {item.badge}
                      </Badge>
                    )}
                    {open && active && <ChevronRight size={14} className="relative z-10 text-violet-400 ml-auto" />}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8 shrink-0">
            <AvatarImage src="https://i.pravatar.cc/32?u=user1" />
            <AvatarFallback style={{ background: "rgba(139,92,246,0.2)", color: "#c4b5fd" }}>JD</AvatarFallback>
          </Avatar>
          <AnimatePresence>
            {open && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-w-0">
                <p className="text-sm font-medium text-white truncate">John Doe</p>
                <p className="text-xs truncate" style={{ color: "#94a3b8" }}>john@example.com</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
