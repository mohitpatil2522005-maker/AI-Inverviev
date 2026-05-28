import { useState } from "react"
import { motion } from "framer-motion"
import {
  User, Shield, Bell, Zap,
  Monitor, Mic, Globe, Camera,
  Lock, Mail, Smartphone, Eye,
  EyeOff, ChevronRight, Moon,
  Sun, CheckCircle2, Save, Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import GlassCard from "@/components/shared/GlassCard"
import PageTransition from "@/components/shared/PageTransition"

const fadeUp = { hidden: { opacity: 0, y: 10 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }) }

export default function SettingsPage() {
  const [showPass, setShowPass] = useState(false)

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto space-y-8 pb-12">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <h2 className="text-2xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Settings</h2>
          <p className="text-sm text-slate-400">Manage your profile, security, and application preferences.</p>
        </motion.div>

        <GlassCard className="p-0 overflow-hidden">
          <Tabs defaultValue="profile" className="flex flex-col md:flex-row min-h-[600px]">
            {/* Sidebar Tabs */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-white/[0.01] p-4">
              <TabsList className="flex flex-col h-auto bg-transparent border-0 gap-1 p-0">
                {[
                  { value: "profile", label: "Profile", icon: User },
                  { value: "security", label: "Security", icon: Shield },
                  { value: "notifications", label: "Notifications", icon: Bell },
                  { value: "ai-prefs", label: "AI Preferences", icon: Zap },
                  { value: "appearance", label: "Appearance", icon: Monitor },
                  { value: "voice", label: "Voice & Audio", icon: Mic },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="w-full justify-start gap-3 px-4 py-3 rounded-xl text-xs font-medium transition-all data-[state=active]:bg-primary/20 data-[state=active]:text-primary hover:bg-white/5"
                  >
                    <tab.icon size={16} /> {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8">
              {/* Profile Tab */}
              <TabsContent value="profile" className="m-0 space-y-8">
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <Avatar className="w-24 h-24 border-2 border-primary/20">
                      <AvatarImage src="https://i.pravatar.cc/96?u=user1" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <button className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={20} className="text-white" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">John Doe</h3>
                    <p className="text-xs text-slate-500">Professional Plan • Member since Jan 2024</p>
                    <Button variant="outline" size="sm" className="mt-3 h-8 bg-white/5 border-white/10 text-xs">
                      Remove Photo
                    </Button>
                  </div>
                </div>

                <Separator className="bg-white/5" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-400">Full Name</Label>
                    <Input defaultValue="John Doe" className="bg-white/5 border-white/10 text-white h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-400">Email Address</Label>
                    <Input defaultValue="john@example.com" className="bg-white/5 border-white/10 text-white h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-400">Current Role</Label>
                    <Input defaultValue="Senior Frontend Engineer" className="bg-white/5 border-white/10 text-white h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-400">Target Company</Label>
                    <Input defaultValue="Google" className="bg-white/5 border-white/10 text-white h-11" />
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="neon-button gap-2">
                    <Save size={16} /> Save Changes
                  </Button>
                </div>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="m-0 space-y-8">
                 <div>
                    <h3 className="text-lg font-bold text-white mb-6">Change Password</h3>
                    <div className="space-y-4 max-w-md">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-400">Current Password</Label>
                        <div className="relative">
                           <Input type={showPass ? "text" : "password"} className="bg-white/5 border-white/10 text-white h-11 pr-10" />
                           <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                             {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                           </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-400">New Password</Label>
                        <Input type="password" className="bg-white/5 border-white/10 text-white h-11" />
                      </div>
                      <Button className="neon-button gap-2">Update Password</Button>
                    </div>
                 </div>

                 <Separator className="bg-white/5" />

                 <div className="space-y-6">
                    <h3 className="text-lg font-bold text-white">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                       <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
                            <Smartphone size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">SMS Authentication</p>
                            <p className="text-xs text-slate-500">Verified • ••• ••• 42</p>
                          </div>
                       </div>
                       <Switch checked />
                    </div>
                 </div>
              </TabsContent>

              {/* AI Preferences Tab */}
              <TabsContent value="ai-prefs" className="m-0 space-y-8">
                 <div className="space-y-6">
                    <h3 className="text-lg font-bold text-white">AI Interviewer Settings</h3>
                    
                    <div className="space-y-4">
                       <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-white">Adaptive Difficulty</p>
                            <p className="text-xs text-slate-500">Adjusts question difficulty based on your answers</p>
                          </div>
                          <Switch checked />
                       </div>
                       <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-white">Emotional Intelligence</p>
                            <p className="text-xs text-slate-500">AI analyzes your confidence and sentiment</p>
                          </div>
                          <Switch checked />
                       </div>
                    </div>

                    <div className="space-y-3">
                       <Label className="text-xs font-bold text-slate-400">Preferred AI Personality</Label>
                       <Select defaultValue="professional">
                         <SelectTrigger className="bg-white/5 border-white/10 text-white h-11">
                           <SelectValue />
                         </SelectTrigger>
                         <SelectContent className="bg-slate-900 border-white/10 text-white">
                           <SelectItem value="professional">Professional & Direct</SelectItem>
                           <SelectItem value="casual">Casual & Encouraging</SelectItem>
                           <SelectItem value="hard">Hard-hitting & Strict</SelectItem>
                         </SelectContent>
                       </Select>
                    </div>
                 </div>
              </TabsContent>

              {/* Appearance Tab */}
              <TabsContent value="appearance" className="m-0 space-y-8">
                 <div className="space-y-6">
                    <h3 className="text-lg font-bold text-white">Theme & UI</h3>
                    
                    <div className="grid grid-cols-3 gap-4">
                       {[
                         { id: "dark", label: "Dark", icon: Moon, active: true },
                         { id: "light", label: "Light", icon: Sun, active: false },
                         { id: "system", label: "System", icon: Monitor, active: false }
                       ].map((theme) => (
                         <button
                           key={theme.id}
                           className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-3 ${
                             theme.active ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(139,92,246,0.2)]" : "bg-white/5 border-white/10 hover:border-white/20"
                           }`}
                         >
                           <theme.icon size={24} className={theme.active ? "text-primary" : "text-slate-500"} />
                           <span className={`text-xs font-bold ${theme.active ? "text-white" : "text-slate-500"}`}>{theme.label}</span>
                         </button>
                       ))}
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                       <div>
                          <p className="text-sm font-bold text-white">High Contrast</p>
                          <p className="text-xs text-slate-500">Improves readability for text elements</p>
                       </div>
                       <Switch />
                    </div>
                 </div>
              </TabsContent>
            </div>
          </Tabs>
        </GlassCard>

        {/* Danger Zone */}
        <GlassCard className="p-6 border-red-500/20 bg-red-500/5">
           <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-red-400 mb-1">Danger Zone</h3>
                <p className="text-xs text-slate-500">Permanently delete your account and all data. This action is irreversible.</p>
              </div>
              <Button variant="ghost" className="text-red-400 hover:bg-red-500/10 hover:text-red-300 gap-2">
                 <Trash2 size={16} /> Delete Account
              </Button>
           </div>
        </GlassCard>
      </div>
    </PageTransition>
  )
}
