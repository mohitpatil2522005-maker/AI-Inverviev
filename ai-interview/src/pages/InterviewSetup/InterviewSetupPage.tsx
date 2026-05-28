import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight, ChevronLeft, Zap, Target, Globe, Clock,
  Briefcase, Building2, TrendingUp, Sparkles, Bot, Brain
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import GlassCard from "@/components/shared/GlassCard"
import PageTransition from "@/components/shared/PageTransition"

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }) }

const steps = ["Role & Company", "Interview Mode", "Preferences"]

const roleRecommendations = [
  "Software Engineer (Frontend)",
  "Product Manager",
  "Data Scientist",
  "UX Designer",
  "DevOps Engineer"
]

export default function InterviewSetupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    difficulty: "Medium",
    type: "Technical",
    duration: "30",
    language: "English"
  })
  const navigate = useNavigate()

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
    else navigate("/interview/live")
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto py-6">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10 text-center">
          <Badge className="mb-4" style={{ background: "rgba(139,92,246,0.15)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.3)" }}>
            Setup Wizard
          </Badge>
          <h2 className="text-3xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Configure Your <span className="gradient-text">Interview</span>
          </h2>
          <p className="text-sm mt-2" style={{ color: "#94a3b8" }}>Customize your AI interviewer to match your target job profile.</p>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                currentStep > i + 1 ? "bg-green-500 text-white" :
                currentStep === i + 1 ? "bg-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]" :
                "bg-white/5 text-slate-500 border border-white/10"
              }`}>
                {currentStep > i + 1 ? <TrendingUp size={14} /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${currentStep === i + 1 ? "text-white" : "text-slate-500"}`}>{step}</span>
              {i < steps.length - 1 && <div className="w-8 h-px bg-white/10 mx-2" />}
            </div>
          ))}
        </div>

        <GlassCard className="p-8 min-h-[400px] flex flex-col justify-between" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-slate-400">Job Role</Label>
                    <div className="relative">
                      <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <Input
                        placeholder="e.g. Senior Frontend Engineer"
                        className="pl-10 h-12 bg-white/5 border-white/10 text-white"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-400">Target Company</Label>
                    <div className="relative">
                      <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <Input
                        placeholder="e.g. Google"
                        className="pl-10 h-12 bg-white/5 border-white/10 text-white"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500 mb-3 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-violet-400" /> AI Recommendations
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {roleRecommendations.map((role) => (
                      <button
                        key={role}
                        onClick={() => setFormData({ ...formData, role })}
                        className="px-4 py-1.5 rounded-full text-xs transition-all hover:bg-primary/20"
                        style={{
                          background: formData.role === role ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.03)",
                          color: formData.role === role ? "#c4b5fd" : "#94a3b8",
                          border: `1px solid ${formData.role === role ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.06)"}`
                        }}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl flex items-start gap-4" style={{ background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.1)" }}>
                  <Bot size={20} className="text-violet-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white">AI Setup Advice</p>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: "#94a3b8" }}>
                      Specifying a target company helps me tailor questions to their specific interview culture and values (e.g., Amazon's Leadership Principles).
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { title: "Technical", icon: Brain, desc: "Data structures, algorithms, and system design." },
                    { title: "Behavioral", icon: Target, desc: "STAR method, leadership, and soft skills." },
                    { title: "HR", icon: Bot, desc: "Culture fit, expectations, and introduction." }
                  ].map((item) => (
                    <button
                      key={item.title}
                      onClick={() => setFormData({ ...formData, type: item.title })}
                      className="p-6 rounded-2xl text-left transition-all duration-300 group"
                      style={{
                        background: formData.type === item.title ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${formData.type === item.title ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.06)"}`,
                        boxShadow: formData.type === item.title ? "0 0 30px rgba(139,92,246,0.15)" : "none"
                      }}
                    >
                      <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ background: formData.type === item.title ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.06)" }}>
                        <item.icon size={20} className={formData.type === item.title ? "text-white" : "text-slate-500"} />
                      </div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-xs leading-relaxed" style={{ color: "#64748b" }}>{item.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <Label className="text-slate-400">Difficulty Level</Label>
                  <div className="flex gap-4">
                    {["Easy", "Medium", "Hard", "Expert"].map((level) => (
                      <button
                        key={level}
                        onClick={() => setFormData({ ...formData, difficulty: level })}
                        className="flex-1 py-3 rounded-xl text-sm font-bold transition-all"
                        style={{
                          background: formData.difficulty === level ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.03)",
                          color: formData.difficulty === level ? "white" : "#475569",
                          border: `1px solid ${formData.difficulty === level ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.06)"}`
                        }}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-slate-400 flex items-center gap-2">
                      <Clock size={16} className="text-violet-400" /> Duration
                    </Label>
                    <Select value={formData.duration} onValueChange={(val) => setFormData({ ...formData, duration: val })}>
                      <SelectTrigger className="h-12 bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10 text-white">
                        <SelectItem value="15">15 Minutes (Express)</SelectItem>
                        <SelectItem value="30">30 Minutes (Standard)</SelectItem>
                        <SelectItem value="60">60 Minutes (Deep Dive)</SelectItem>
                        <SelectItem value="90">90 Minutes (Marathon)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-[10px]" style={{ color: "#475569" }}>Shorter sessions focus on core concepts, longer sessions include deep dives.</p>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-slate-400 flex items-center gap-2">
                      <Globe size={16} className="text-violet-400" /> Language
                    </Label>
                    <Select value={formData.language} onValueChange={(val) => setFormData({ ...formData, language: val })}>
                      <SelectTrigger className="h-12 bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10 text-white">
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                        <SelectItem value="Hindi">Hindi</SelectItem>
                        <SelectItem value="Chinese">Mandarin</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-[10px]" style={{ color: "#475569" }}>I will communicate and analyze your response in the selected language.</p>
                  </div>
                </div>

                <div className="mt-8 p-6 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.1))", border: "1px solid rgba(139,92,246,0.2)" }}>
                  <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Zap size={18} className="text-violet-400" /> Configuration Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    {[
                      ["Role", formData.role || "Not specified"],
                      ["Company", formData.company || "Not specified"],
                      ["Mode", formData.type],
                      ["Difficulty", formData.difficulty],
                      ["Duration", `${formData.duration} mins`],
                      ["Language", formData.language]
                    ].map(([label, val]) => (
                      <div key={label}>
                        <p className="text-[10px] uppercase tracking-wider font-bold mb-1" style={{ color: "#475569" }}>{label}</p>
                        <p className="text-sm font-medium text-white">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="text-slate-400 hover:text-white hover:bg-white/5"
            >
              <ChevronLeft size={18} className="mr-1" /> Back
            </Button>
            <Button
              onClick={handleNext}
              className="neon-button min-w-[140px] gap-2"
            >
              {currentStep === 3 ? "Start Session" : "Continue"} <ChevronRight size={18} />
            </Button>
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  )
}
