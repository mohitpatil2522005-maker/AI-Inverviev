import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Zap, Mail, Lock, User, ArrowRight, Chrome, Check, Code, Users, Mic, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { GradientOrbs } from "@/components/shared/AnimatedBackground"
import GradientText from "@/components/shared/GradientText"
import { auth, googleProvider } from "@/lib/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth"
import { toast } from "sonner"

const roles = [
  { id: "swe", label: "Software Engineer", icon: Code },
  { id: "pm", label: "Product Manager", icon: Users },
  { id: "ds", label: "Data Scientist", icon: BarChart3 },
  { id: "other", label: "Other", icon: User },
]

const levels = ["Entry Level (0-2 yrs)", "Mid Level (2-5 yrs)", "Senior (5-10 yrs)", "Staff / Principal (10+ yrs)"]
const interviewTypes = [
  { id: "technical", label: "Technical" },
  { id: "behavioral", label: "Behavioral" },
  { id: "hr", label: "HR Rounds" },
  { id: "coding", label: "Coding" },
  { id: "system", label: "System Design" },
]

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  
  // Auth state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const navigate = useNavigate()

  const toggleType = (id: string) => {
    setSelectedTypes((prev) => prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id])
  }

  const handleFinish = async () => {
    setLoading(true)
    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Update profile
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name
        })
        
        // Save token
        const token = await userCredential.user.getIdToken()
        localStorage.setItem("token", token)
      }
      
      toast.success("Account created successfully!")
      navigate("/dashboard")
    } catch (error: any) {
      toast.error(error.message || "Failed to create account")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const token = await result.user.getIdToken()
      localStorage.setItem("token", token)
      navigate("/dashboard")
    } catch (error) {
      toast.error("Google sign-in failed")
    }
  }

  const stepVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
    exit: { opacity: 0, x: -30, transition: { duration: 0.25 } },
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#080812" }}>
      {/* Left */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden items-center justify-center p-12"
        style={{ background: "linear-gradient(135deg, #0d0d1f 0%, #100a20 100%)" }}>
        <GradientOrbs />
        <div className="relative z-10 max-w-xs text-center">
          <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", boxShadow: "0 0 50px rgba(139,92,246,0.35)" }}>
            <Zap size={36} className="text-white" />
          </div>
          <h2 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Start your journey to <GradientText>your dream job</GradientText>
          </h2>
          <p className="text-sm" style={{ color: "#94a3b8" }}>Join 500,000+ candidates who prep smarter with AI.</p>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                  style={{
                    background: step >= s ? "linear-gradient(135deg,#8b5cf6,#3b82f6)" : "rgba(255,255,255,0.06)",
                    color: step >= s ? "white" : "#475569",
                    boxShadow: step === s ? "0 0 15px rgba(139,92,246,0.5)" : "none"
                  }}>
                  {step > s ? <Check size={14} /> : s}
                </div>
                {s < 3 && <div className="w-8 h-0.5" style={{ background: step > s ? "#8b5cf6" : "rgba(255,255,255,0.06)" }} />}
              </div>
            ))}
          </div>
          <div className="flex justify-around mt-2">
            {["Account", "Profile", "Preferences"].map((l, i) => (
              <span key={l} className="text-xs" style={{ color: step >= i + 1 ? "#94a3b8" : "#374151" }}>{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#8b5cf6,#3b82f6)" }}>
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-white text-lg" style={{ fontFamily: "Space Grotesk, sans-serif" }}>InterviewAI</span>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                <h1 className="text-3xl font-black text-white mb-2">Create account</h1>
                <p className="text-sm mb-8" style={{ color: "#94a3b8" }}>Start free — no credit card required.</p>

                <Button variant="outline" className="w-full h-11 gap-3 mb-6" onClick={handleGoogleSignIn}
                  style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#e2e8f0" }}>
                  <Chrome size={18} /> Continue with Google
                </Button>

                <div className="flex items-center gap-4 mb-6">
                  <Separator style={{ background: "rgba(255,255,255,0.06)" }} />
                  <span className="text-xs whitespace-nowrap" style={{ color: "#475569" }}>or with email</span>
                  <Separator style={{ background: "rgba(255,255,255,0.06)" }} />
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm mb-1.5 block" style={{ color: "#94a3b8" }}>Full Name</Label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#475569" }} />
                      <Input placeholder="John Doe" className="pl-9 h-11" value={name} onChange={(e) => setName(e.target.value)}
                        style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)", color: "#f8fafc" }} />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm mb-1.5 block" style={{ color: "#94a3b8" }}>Email</Label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#475569" }} />
                      <Input type="email" placeholder="you@example.com" className="pl-9 h-11" value={email} onChange={(e) => setEmail(e.target.value)}
                        style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)", color: "#f8fafc" }} />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm mb-1.5 block" style={{ color: "#94a3b8" }}>Password</Label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#475569" }} />
                      <Input type={showPass ? "text" : "password"} placeholder="Min. 8 characters" className="pl-9 pr-10 h-11" value={password} onChange={(e) => setPassword(e.target.value)}
                        style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)", color: "#f8fafc" }} />
                      <button type="button" onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#475569" }}>
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <Button onClick={() => setStep(2)} className="w-full h-11 neon-button gap-2 mt-2">
                    Continue <ArrowRight size={16} />
                  </Button>
                </div>

                <p className="text-center text-sm mt-6" style={{ color: "#64748b" }}>
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium hover:text-violet-300 transition-colors" style={{ color: "#8b5cf6" }}>Sign in</Link>
                </p>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                <h1 className="text-3xl font-black text-white mb-2">Your role</h1>
                <p className="text-sm mb-6" style={{ color: "#94a3b8" }}>Tell us what you're interviewing for.</p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {roles.map((role) => (
                    <button key={role.id} onClick={() => setSelectedRole(role.id)}
                      className="p-4 rounded-xl text-left transition-all duration-200"
                      style={{
                        background: selectedRole === role.id ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.03)",
                        border: selectedRole === role.id ? "1px solid rgba(139,92,246,0.4)" : "1px solid rgba(255,255,255,0.06)",
                      }}>
                      <role.icon size={20} className="mb-2" style={{ color: selectedRole === role.id ? "#c4b5fd" : "#64748b" }} />
                      <p className="text-sm font-medium" style={{ color: selectedRole === role.id ? "#c4b5fd" : "#94a3b8" }}>{role.label}</p>
                    </button>
                  ))}
                </div>

                <div className="mb-6">
                  <Label className="text-sm mb-3 block font-medium" style={{ color: "#94a3b8" }}>Experience Level</Label>
                  <div className="space-y-2">
                    {levels.map((lvl) => (
                      <button key={lvl} onClick={() => setSelectedLevel(lvl)}
                        className="w-full p-3 rounded-xl text-left text-sm transition-all duration-200 flex items-center gap-3"
                        style={{
                          background: selectedLevel === lvl ? "rgba(139,92,246,0.1)" : "rgba(255,255,255,0.02)",
                          border: selectedLevel === lvl ? "1px solid rgba(139,92,246,0.3)" : "1px solid rgba(255,255,255,0.04)",
                          color: selectedLevel === lvl ? "#c4b5fd" : "#94a3b8",
                        }}>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${selectedLevel === lvl ? "border-violet-500" : "border-slate-600"}`}>
                          {selectedLevel === lvl && <div className="w-2 h-2 rounded-full bg-violet-500" />}
                        </div>
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-11"
                    style={{ borderColor: "rgba(255,255,255,0.08)", color: "#94a3b8" }}>Back</Button>
                  <Button onClick={() => setStep(3)} className="flex-1 h-11 neon-button gap-2">
                    Continue <ArrowRight size={16} />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                <h1 className="text-3xl font-black text-white mb-2">Preferences</h1>
                <p className="text-sm mb-6" style={{ color: "#94a3b8" }}>What types of interviews do you want to practice?</p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {interviewTypes.map((type) => {
                    const selected = selectedTypes.includes(type.id)
                    return (
                      <button key={type.id} onClick={() => toggleType(type.id)}
                        className="p-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2"
                        style={{
                          background: selected ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.03)",
                          border: selected ? "1px solid rgba(139,92,246,0.4)" : "1px solid rgba(255,255,255,0.06)",
                          color: selected ? "#c4b5fd" : "#94a3b8",
                        }}>
                        {selected ? <Check size={14} className="text-violet-400" /> : <div className="w-3.5 h-3.5 rounded border border-slate-600" />}
                        {type.label}
                      </button>
                    )
                  })}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1 h-11"
                    style={{ borderColor: "rgba(255,255,255,0.08)", color: "#94a3b8" }}>Back</Button>
                  <Button onClick={handleFinish} className="flex-1 h-11 neon-button gap-2" disabled={loading}>
                    {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Setting up...</> : <>Finish Setup <ArrowRight size={16} /></>}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
