import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth, googleProvider } from "@/lib/firebase"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { Eye, EyeOff, Zap, Mail, Lock, ArrowRight, Chrome } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { GradientOrbs } from "@/components/shared/AnimatedBackground"
import WaveformBars from "@/components/shared/WaveformBars"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45 },
  }),
}

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const target = e.target as typeof e.target & {
      email: { value: string }
      password: { value: string }
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        target.email.value,
        target.password.value
      )
      const token = await userCredential.user.getIdToken()
      localStorage.setItem("token", token)
      toast.success("Welcome back!")
      navigate("/dashboard")
    } catch (error: unknown) {
      toast.error((error as Error).message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider)
      const token = await res.user.getIdToken()
      localStorage.setItem("token", token)
      navigate("/dashboard")
    } catch {
      toast.error("Google login failed")
    }
  }

  return (
    <div className="flex min-h-screen" style={{ background: "#080812" }}>
      {/* Left Panel */}
      <div
        className="lg:flex p-12 relative hidden flex-1 items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0d0d1f 0%, #100a20 100%)",
        }}
      >
        <GradientOrbs />
        <div className="max-w-sm relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-24 h-24 rounded-3xl mb-8 mx-auto flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
              boxShadow: "0 0 60px rgba(139,92,246,0.4)",
            }}
          >
            <Zap size={40} className="text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-black text-white mb-4"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Your AI Interview Coach
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm leading-relaxed mb-8"
            style={{ color: "#94a3b8" }}
          >
            Practice with real AI interviewers, get instant feedback, and land
            your dream job faster.
          </motion.p>

          {/* Animated stats */}
          <div className="gap-8 flex justify-center">
            {[
              ["92%", "Success"],
              ["500K+", "Users"],
              ["4.9★", "Rating"],
            ].map(([val, label]) => (
              <motion.div
                key={label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-center"
              >
                <p className="text-xl font-black text-white">{val}</p>
                <p className="text-sm" style={{ color: "#64748b" }}>
                  {label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Live mock */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-10 p-4 rounded-2xl text-left"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(139,92,246,0.15)",
            }}
          >
            <div className="gap-2 mb-3 flex items-center">
              <div className="w-2 h-2 bg-green-400 animate-pulse rounded-full" />
              <span
                className="text-sm font-medium"
                style={{ color: "#94a3b8" }}
              >
                Live Interview Session
              </span>
              <WaveformBars active bars={6} className="ml-auto" />
            </div>
            <p className="text-sm text-slate-300">
              "Explain the difference between TCP and UDP. When would you use
              each?"
            </p>
            <div className="mt-2 gap-2 flex">
              <span
                className="px-2 py-0.5 text-sm rounded"
                style={{
                  background: "rgba(139,92,246,0.15)",
                  color: "#c4b5fd",
                }}
              >
                Technical
              </span>
              <span
                className="px-2 py-0.5 text-sm rounded"
                style={{
                  background: "rgba(16,185,129,0.15)",
                  color: "#6ee7b7",
                }}
              >
                Networking
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="p-6 md:p-12 flex flex-1 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="gap-2.5 mb-10 lg:hidden flex items-center">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#8b5cf6,#3b82f6)" }}
            >
              <Zap size={16} className="text-white" />
            </div>
            <span
              className="font-bold text-white text-lg"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              InterviewAI
            </span>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="mb-8"
          >
            <h1 className="text-3xl font-black text-white mb-2">
              Welcome back
            </h1>
            <p className="text-sm" style={{ color: "#94a3b8" }}>
              Sign in to continue your interview prep journey.
            </p>
          </motion.div>

          {/* Google OAuth */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <Button
              variant="outline"
              className="h-11 gap-3 mb-6 w-full"
              onClick={handleGoogleLogin}
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.03)",
                color: "#e2e8f0",
              }}
            >
              <Chrome size={18} />
              Continue with Google
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="gap-4 mb-6 flex items-center"
          >
            <Separator style={{ background: "rgba(255,255,255,0.06)" }} />
            <span
              className="text-sm whitespace-nowrap"
              style={{ color: "#475569" }}
            >
              or continue with email
            </span>
            <Separator style={{ background: "rgba(255,255,255,0.06)" }} />
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-4">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <Label
                htmlFor="email"
                className="text-sm mb-1.5 block"
                style={{ color: "#94a3b8" }}
              >
                Email
              </Label>
              <div className="relative">
                <Mail
                  size={16}
                  className="left-3 pointer-events-none absolute top-1/2 -translate-y-1/2"
                  style={{ color: "#475569" }}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-9 h-11"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.08)",
                    color: "#f8fafc",
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <div className="mb-1.5 flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm"
                  style={{ color: "#94a3b8" }}
                >
                  Password
                </Label>
                <a
                  href="#"
                  className="text-sm hover:text-violet-400 transition-colors"
                  style={{ color: "#8b5cf6" }}
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock
                  size={16}
                  className="left-3 pointer-events-none absolute top-1/2 -translate-y-1/2"
                  style={{ color: "#475569" }}
                />
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-9 pr-10 h-11"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.08)",
                    color: "#f8fafc",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="right-3 hover:text-white absolute top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#475569" }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className="pt-2"
            >
              <Button
                type="submit"
                className="h-11 neon-button gap-2 w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-white/30 border-t-white animate-spin rounded-full border-2" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={6}
            className="text-sm mt-6 text-center"
            style={{ color: "#64748b" }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium hover:text-violet-300 transition-colors"
              style={{ color: "#8b5cf6" }}
            >
              Sign up free <ArrowRight size={12} className="inline" />
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
