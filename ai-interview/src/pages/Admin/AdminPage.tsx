import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import {
  Users, BarChart3, Shield, Zap,
  TrendingUp, TrendingDown, DollarSign,
  Search, Filter, MoreHorizontal,
  Mail, CheckCircle2, AlertCircle,
  Activity, Globe, MessageSquare, PlusCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts"
import GlassCard from "@/components/shared/GlassCard"
import PageTransition from "@/components/shared/PageTransition"
import api from "@/lib/api"
import { toast } from "sonner"

const fadeUp = { hidden: { opacity: 0, y: 10 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }) }

export default function AdminPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: "542,831",
    interviews: "1,204,921",
    revenue: "$142,500",
    successRate: "92.4%"
  })
  
  const [usageData, setUsageData] = useState([
    { name: 'Mon', users: 400, interviews: 240 },
    { name: 'Tue', users: 520, interviews: 310 },
    { name: 'Wed', users: 480, interviews: 290 },
    { name: 'Thu', users: 610, interviews: 450 },
    { name: 'Fri', users: 750, interviews: 580 },
    { name: 'Sat', users: 900, interviews: 620 },
    { name: 'Sun', users: 850, interviews: 590 },
  ])
  
  const [users, setUsers] = useState<any[]>([
    { id: 1, name: "Sarah Chen", email: "sarah@google.com", plan: "Pro", joined: "2h ago", status: "Active" },
    { id: 2, name: "Raj Patel", email: "raj@amazon.com", plan: "Free", joined: "5h ago", status: "Active" },
    { id: 3, name: "Mia Torres", email: "mia@meta.com", plan: "Pro", joined: "1d ago", status: "Inactive" },
    { id: 4, name: "Alex Rivera", email: "alex@netflix.com", plan: "Enterprise", joined: "2d ago", status: "Active" },
    { id: 5, name: "Leo Kim", email: "leo@microsoft.com", plan: "Pro", joined: "3d ago", status: "Active" },
  ])
  
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true)
        // Fetch all data in parallel
        const [statsRes, usageRes, usersRes] = await Promise.all([
          api.get("/admin/stats"),
          api.get("/admin/usage"),
          api.get("/admin/users")
        ])
        
        if (statsRes.data) setStats(statsRes.data)
        if (usageRes.data) setUsageData(usageRes.data)
        if (usersRes.data) setUsers(usersRes.data)
      } catch (err) {
        toast.error("Failed to sync current platform data (using fallback data)")
      } finally {
        setLoading(false)
      }
    }
    fetchAdminData()
  }, [])

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [users, searchQuery])

  const handleSuspend = async (userId: string) => {
    try {
      await api.post(`/admin/users/${userId}/suspend`)
      toast.success("Account status updated")
    } catch (err) {
      toast.error("Operation failed")
    }
  }

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Admin Panel</h2>
            <p className="text-sm text-slate-400">Monitor system performance, user activity, and billing metrics.</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="bg-white/5 border-white/10 text-xs h-10 gap-2">
                <Globe size={14} /> Global Region: US-East
             </Button>
             <Button onClick={() => toast("Feature coming soon: Global Announcements")} className="neon-button text-xs h-10 gap-2">
                <PlusCircle size={14} /> New Announcement
             </Button>
          </div>
        </motion.div>

        {/* System KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Users", val: stats.totalUsers, trend: "+12.5%", color: "#8b5cf6", icon: Users },
            { label: "AI Interviews", val: stats.interviews, trend: "+8.2%", color: "#3b82f6", icon: Activity },
            { label: "Revenue (MRR)", val: stats.revenue, trend: "+24.1%", color: "#10b981", icon: DollarSign },
            { label: "Success Rate", val: stats.successRate, trend: "-0.5%", color: "#ef4444", icon: TrendingUp },
          ].map((kpi, i) => (
            <motion.div key={kpi.label} variants={fadeUp} initial="hidden" animate="visible" custom={i}>
              <GlassCard className="p-6" hover>
                 <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${kpi.color}15` }}>
                       <kpi.icon size={20} style={{ color: kpi.color }} />
                    </div>
                    <Badge className="text-[10px]" style={{ 
                      background: kpi.trend.startsWith("+") ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
                      color: kpi.trend.startsWith("+") ? "#10b981" : "#ef4444"
                    }}>
                      {kpi.trend}
                    </Badge>
                 </div>
                 <p className="text-2xl font-black text-white">{kpi.val}</p>
                 <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{kpi.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <GlassCard className="lg:col-span-2 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                 <div>
                    <h3 className="font-bold text-white text-sm">Platform Usage</h3>
                    <p className="text-xs text-slate-500">Active users vs. Interviews conducted</p>
                 </div>
                 <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-primary" />
                       <span className="text-[10px] text-slate-400 font-bold uppercase">Users</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-accent" />
                       <span className="text-[10px] text-slate-400 font-bold uppercase">Interviews</span>
                    </div>
                 </div>
              </div>
              
              <div className="h-72 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={usageData}>
                       <defs>
                          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                             <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                             <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
</AreaChart>
</ResponsiveContainer>
</div>
</GlassCard>
</div>
</div>
</PageTransition>
)
}