import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import {
  Users,
  Shield,
  TrendingUp,
  DollarSign,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Activity,
  Globe,
  PlusCircle,
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
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import GlassCard from "@/components/shared/GlassCard"
import PageTransition from "@/components/shared/PageTransition"
import api from "@/lib/api"
import { toast } from "sonner"

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
}

type User = {
  id: number
  name: string
  email: string
  plan: string
  joined: string
  status: string
}

export default function AdminPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: "542,831",
    interviews: "1,204,921",
    revenue: "$142,500",
    successRate: "92.4%",
  })

  const [usageData, setUsageData] = useState([
    { name: "Mon", users: 400, interviews: 240 },
    { name: "Tue", users: 520, interviews: 310 },
    { name: "Wed", users: 480, interviews: 290 },
    { name: "Thu", users: 610, interviews: 450 },
    { name: "Fri", users: 750, interviews: 580 },
    { name: "Sat", users: 900, interviews: 620 },
    { name: "Sun", users: 850, interviews: 590 },
  ])

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah@google.com",
      plan: "Pro",
      joined: "2h ago",
      status: "Active",
    },
    {
      id: 2,
      name: "Raj Patel",
      email: "raj@amazon.com",
      plan: "Free",
      joined: "5h ago",
      status: "Active",
    },
    {
      id: 3,
      name: "Mia Torres",
      email: "mia@meta.com",
      plan: "Pro",
      joined: "1d ago",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Alex Rivera",
      email: "alex@netflix.com",
      plan: "Enterprise",
      joined: "2d ago",
      status: "Active",
    },
    {
      id: 5,
      name: "Leo Kim",
      email: "leo@microsoft.com",
      plan: "Pro",
      joined: "3d ago",
      status: "Active",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true)
        const [statsRes, usageRes, usersRes] = await Promise.all([
          api.get("/admin/stats"),
          api.get("/admin/usage"),
          api.get("/admin/users"),
        ])

        if (statsRes.data) setStats(statsRes.data)
        if (usageRes.data) setUsageData(usageRes.data)
        if (usersRes.data) setUsers(usersRes.data)
      } catch {
        toast.error("Failed to sync current platform data (using fallback data)")
      } finally {
        setLoading(false)
      }
    }

    fetchAdminData()
  }, [])

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [users, searchQuery])

  const handleSuspend = async (userId: string) => {
    try {
      await api.post(`/admin/users/${userId}/suspend`)
      toast.success("Account status updated")
    } catch {
      toast.error("Operation failed")
    }
  }

  if (loading) {
    return (
      <PageTransition>
        <div className="max-w-7xl space-y-8 pb-12 mx-auto">
          <GlassCard className="p-6">
            <p className="text-sm text-slate-400">Loading admin data...</p>
          </GlassCard>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="max-w-7xl space-y-8 pb-12 mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="sm:flex-row sm:items-center gap-6 flex flex-col justify-between"
        >
          <div>
            <h2
              className="text-2xl font-black text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Admin Panel
            </h2>
            <p className="text-sm text-slate-400">
              Monitor system performance, user activity, and billing metrics.
            </p>
          </div>
          <div className="gap-3 flex items-center">
            <Button
              variant="outline"
              className="bg-white/5 border-white/10 text-sm h-10 gap-2"
            >
              <Globe size={14} /> Global Region: US-East
            </Button>
            <Button
              onClick={() => toast("Feature coming soon: Global Announcements")}
              className="neon-button text-sm h-10 gap-2"
            >
              <PlusCircle size={14} /> New Announcement
            </Button>
          </div>
        </motion.div>

        <div className="md:grid-cols-2 lg:grid-cols-4 gap-4 grid grid-cols-1">
          {[
            {
              label: "Total Users",
              val: stats.totalUsers,
              trend: "+12.5%",
              color: "#8b5cf6",
              icon: Users,
            },
            {
              label: "AI Interviews",
              val: stats.interviews,
              trend: "+8.2%",
              color: "#3b82f6",
              icon: Activity,
            },
            {
              label: "Revenue (MRR)",
              val: stats.revenue,
              trend: "+24.1%",
              color: "#10b981",
              icon: DollarSign,
            },
            {
              label: "Success Rate",
              val: stats.successRate,
              trend: "-0.5%",
              color: "#ef4444",
              icon: TrendingUp,
            },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              <GlassCard className="p-6" hover>
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${kpi.color}15` }}
                  >
                    <kpi.icon size={20} style={{ color: kpi.color }} />
                  </div>
                  <Badge
                    className="text-sm"
                    style={{
                      background: kpi.trend.startsWith("+")
                        ? "rgba(16,185,129,0.15)"
                        : "rgba(239,68,68,0.15)",
                      color: kpi.trend.startsWith("+") ? "#10b981" : "#ef4444",
                    }}
                  >
                    {kpi.trend}
                  </Badge>
                </div>
                <p className="text-2xl font-black text-white">{kpi.val}</p>
                <p className="text-sm text-slate-500 font-medium tracking-wider uppercase">
                  {kpi.label}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="lg:grid-cols-3 gap-6 grid grid-cols-1">
          <GlassCard className="lg:col-span-2 p-6 flex flex-col">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-sm">Platform Usage</h3>
                <p className="text-sm text-slate-500">
                  Active users vs. Interviews conducted
                </p>
              </div>
              <div className="gap-4 flex">
                <div className="gap-2 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-slate-400 font-bold text-sm uppercase">
                    Users
                  </span>
                </div>
                <div className="gap-2 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-slate-400 font-bold text-sm uppercase">
                    Interviews
                  </span>
                </div>
              </div>
            </div>

            <div className="min-h-[18rem] h-auto md:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorInterviews"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.03)"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#475569", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#475569", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0d0d1f",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                    }}
                    itemStyle={{ fontSize: "12px" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fill="url(#colorUsers)"
                  />
                  <Area
                    type="monotone"
                    dataKey="interviews"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fill="url(#colorInterviews)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="font-bold text-white text-sm mb-6">
              AI Node Status
            </h3>
            <div className="space-y-6">
              {[
                {
                  label: "GPT-4 Engine",
                  status: "Operational",
                  load: 42,
                  color: "#10b981",
                },
                {
                  label: "Claude 3.5 Sonnet",
                  status: "Operational",
                  load: 68,
                  color: "#10b981",
                },
                {
                  label: "Voice Synthesis v2",
                  status: "Operational",
                  load: 15,
                  color: "#10b981",
                },
                {
                  label: "Vector Database",
                  status: "High Load",
                  load: 89,
                  color: "#f59e0b",
                },
                {
                  label: "Razorpay Gateway",
                  status: "Operational",
                  load: 5,
                  color: "#10b981",
                },
              ].map((node, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">
                      {node.label}
                    </span>
                    <span
                      className="font-bold text-sm"
                      style={{ color: node.color }}
                    >
                      {node.status}
                    </span>
                  </div>
                  <div className="gap-3 flex items-center">
                    <Progress
                      value={node.load}
                      className="h-1 flex-1"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    />
                    <span className="text-slate-500 text-sm">
                      {node.load}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="mt-8 bg-white/5 border-white/10 text-sm gap-2 w-full"
            >
              <Activity size={14} /> Full System Health
            </Button>
          </GlassCard>
        </div>

        <div className="space-y-4">
          <div className="sm:flex-row sm:items-center gap-4 flex flex-col justify-between">
            <h3 className="font-bold text-white text-sm">User Management</h3>
            <div className="gap-3 flex items-center">
              <div className="relative">
                <Search
                  size={14}
                  className="left-3 text-slate-500 absolute top-1/2 -translate-y-1/2"
                />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="pl-9 h-9 text-sm bg-white/5 border-white/10 w-[200px]"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-9 bg-white/5 border-white/10 text-sm"
              >
                <Filter size={14} className="mr-2" /> Filter
              </Button>
            </div>
          </div>

          <GlassCard className="p-0 overflow-hidden">
            <Table>
              <TableHeader className="bg-white/[0.02]">
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-sm font-bold text-slate-500 tracking-widest uppercase">
                    User
                  </TableHead>
                  <TableHead className="text-sm font-bold text-slate-500 tracking-widest uppercase">
                    Plan
                  </TableHead>
                  <TableHead className="text-sm font-bold text-slate-500 tracking-widest uppercase">
                    Joined
                  </TableHead>
                  <TableHead className="text-sm font-bold text-slate-500 tracking-widest uppercase">
                    Status
                  </TableHead>
                  <TableHead className="text-sm font-bold text-slate-500 tracking-widest text-right uppercase">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user, i) => (
                  <TableRow
                    key={user.id || i}
                    className="border-white/5 hover:bg-white/[0.01] transition-colors"
                  >
                    <TableCell>
                      <div className="gap-3 flex items-center">
                        <div className="w-8 h-8 rounded-lg font-black flex items-center justify-center bg-primary/10 text-sm text-primary">
                          {user.name
                            ?.split(" ")
                            .map((n: string) => n[0])
                            .join("") || "?"}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">
                            {user.name}
                          </p>
                          <p className="text-slate-500 text-sm">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`px-1.5 py-0 text-sm ${
                          user.plan === "Enterprise"
                            ? "border-primary/30 text-primary"
                            : "border-white/10 text-slate-400"
                        }`}
                      >
                        {user.plan}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-slate-400">
                      {user.joined}
                    </TableCell>
                    <TableCell>
                      <div className="gap-1.5 flex items-center">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-green-500" : "bg-slate-600"}`}
                        />
                        <span className="font-medium text-slate-400 text-sm">
                          {user.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="h-8 w-8 rounded-md text-slate-500 hover:text-white hover:bg-white/5 inline-flex items-center justify-center">
                          <MoreHorizontal size={16} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-slate-900 border-white/10 text-white"
                        >
                          <DropdownMenuItem className="text-sm gap-2">
                            <Mail size={14} /> Email User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-sm gap-2">
                            <Shield size={14} /> Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleSuspend(user.id)}
                            className="text-sm gap-2 text-red-400"
                          >
                            Suspend Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  )
}
