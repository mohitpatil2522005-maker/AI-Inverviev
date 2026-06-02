import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Zap,
  DownloadCloud,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import GlassCard from "@/components/shared/GlassCard"
import ScoreRing from "@/components/shared/ScoreRing"
import PageTransition from "@/components/shared/PageTransition"
import { MagneticButton } from "@/components/shared/AnimatedButtons"
import ScanningLine from "@/components/shared/ScanningLine"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4 },
  }),
}

const mockKeywords = {
  matched: [
    "React",
    "TypeScript",
    "Node.js",
    "REST API",
    "Agile",
    "CI/CD",
    "Docker",
    "PostgreSQL",
    "GraphQL",
    "AWS",
  ],
  missing: ["Kubernetes", "Microservices", "Redis", "Terraform", "Kafka"],
}

const sectionScores = [
  { label: "Work Experience", score: 88, max: 100 },
  { label: "Skills Match", score: 74, max: 100 },
  { label: "Education", score: 92, max: 100 },
  { label: "Keywords", score: 68, max: 100 },
  { label: "Formatting", score: 95, max: 100 },
  { label: "Achievements", score: 71, max: 100 },
]

const strengths = [
  "Strong quantified achievements in work experience section",
  "Consistent formatting and clean visual hierarchy",
  "Good educational credentials clearly presented",
  "Relevant certifications boost ATS score",
]

const weaknesses = [
  "Missing 5 high-frequency keywords from the job description",
  "Summary section lacks targeted role-specific language",
  "Project section could be more detailed",
  "Skills section not optimized for ATS parsing",
]

const suggestions = [
  {
    priority: "high",
    text: 'Add "Kubernetes" and "Microservices" to your skills section — they appear in 78% of matching JDs.',
  },
  {
    priority: "high",
    text: "Rewrite your summary to mirror the job description language more closely.",
  },
  {
    priority: "medium",
    text: "Add 2-3 more bullet points to your most recent role with metrics.",
  },
  {
    priority: "low",
    text: "Consider adding a dedicated certifications section for better ATS parsing.",
  },
]

type UploadState = "idle" | "uploading" | "analyzing" | "done"

export default function ResumeAnalyzerPage() {
  const [uploadState, setUploadState] = useState<UploadState>("idle")
  const [dragging, setDragging] = useState(false)

  const simulate = useCallback(() => {
    setUploadState("uploading")
    setTimeout(() => setUploadState("analyzing"), 1200)
    setTimeout(() => setUploadState("done"), 3000)
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      simulate()
    },
    [simulate]
  )

  return (
    <PageTransition>
      <div className="space-y-6 max-w-6xl">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <h2
            className="text-2xl font-black text-white mb-1"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Resume Analyzer
          </h2>
          <p className="text-sm" style={{ color: "#94a3b8" }}>
            Upload your resume to get an instant ATS score and AI-powered
            suggestions.
          </p>
        </motion.div>

        {uploadState === "idle" && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setDragging(true)
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className="rounded-2xl p-16 relative flex cursor-pointer flex-col items-center text-center transition-all duration-300"
              style={{
                border: `2px dashed ${dragging ? "#8b5cf6" : "rgba(139,92,246,0.25)"}`,
                background: dragging
                  ? "rgba(139,92,246,0.08)"
                  : "rgba(139,92,246,0.03)",
                boxShadow: dragging ? "0 0 40px rgba(139,92,246,0.2)" : "none",
              }}
              onClick={simulate}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-20 h-20 rounded-2xl mb-6 mx-auto flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2))",
                  border: "1px solid rgba(139,92,246,0.3)",
                }}
              >
                <Upload size={36} style={{ color: "#8b5cf6" }} />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">
                Drop your resume here
              </h3>
              <p className="text-sm mb-6" style={{ color: "#94a3b8" }}>
                Supports PDF, DOCX, DOC — up to 5MB
              </p>
              <MagneticButton>
                <Button className="neon-button gap-2 h-12 px-8 rounded-xl">
                  <FileText size={18} /> Browse Files
                </Button>
              </MagneticButton>
              {/* Glowing corner accents */}
              {[
                "top-0 left-0",
                "top-0 right-0",
                "bottom-0 left-0",
                "bottom-0 right-0",
              ].map((pos) => (
                <div
                  key={pos}
                  className={`absolute ${pos} w-4 h-4`}
                  style={{
                    borderColor: "#8b5cf6",
                    borderStyle: "solid",
                    borderWidth: pos.includes("top-0 left-0")
                      ? "2px 0 0 2px"
                      : pos.includes("top-0 right-0")
                        ? "2px 2px 0 0"
                        : pos.includes("bottom-0 left-0")
                          ? "0 0 2px 2px"
                          : "0 2px 2px 0",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {uploadState === "uploading" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GlassCard className="p-8 flex flex-col items-center text-center">
                <div
                  className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center"
                  style={{ background: "rgba(139,92,246,0.15)" }}
                >
                  <Upload
                    size={28}
                    className="animate-bounce"
                    style={{ color: "#8b5cf6" }}
                  />
                </div>
                <p className="font-bold text-white mb-2">Uploading resume...</p>
                <div
                  className="w-64 h-1.5 mt-3 overflow-hidden rounded-full"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #8b5cf6, #3b82f6)",
                    }}
                    animate={{ width: ["0%", "70%"] }}
                    transition={{ duration: 1.2 }}
                  />
                </div>
              </GlassCard>
            </motion.div>
          )}

          {uploadState === "analyzing" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GlassCard className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-4 relative">
                  <motion.div
                    className="inset-0 absolute rounded-full border-2"
                    style={{ borderColor: "rgba(139,92,246,0.3)" }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <motion.div
                    className="inset-0 absolute rounded-full border-t-2"
                    style={{ borderColor: "#8b5cf6" }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <Zap
                    size={20}
                    className="inset-0 absolute m-auto"
                    style={{ color: "#8b5cf6" }}
                  />
                </div>
                <p className="font-bold text-white mb-1">
                  AI analyzing your resume...
                </p>
                <p className="text-sm" style={{ color: "#94a3b8" }}>
                  Checking ATS compatibility, keywords, and formatting
                </p>
                <div className="gap-2 mt-4 flex">
                  {[
                    "Parsing content",
                    "Matching keywords",
                    "Scoring sections",
                  ].map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.5 }}
                      className="px-3 py-1 text-sm rounded-full"
                      style={{
                        background: "rgba(139,92,246,0.15)",
                        color: "#c4b5fd",
                      }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {uploadState === "done" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Score overview */}
            <div className="lg:grid-cols-3 gap-4 grid grid-cols-1">
              <GlassCard
                className="p-6 flex flex-col items-center text-center"
                style={{ border: "1px solid rgba(139,92,246,0.2)" }}
              >
                <ScoreRing
                  score={79}
                  size={140}
                  color="#8b5cf6"
                  label="ATS Score"
                />
                <div className="mt-4 gap-2 flex">
                  <Badge
                    style={{
                      background: "rgba(139,92,246,0.15)",
                      color: "#c4b5fd",
                      border: "1px solid rgba(139,92,246,0.2)",
                    }}
                  >
                    Good
                  </Badge>
                  <Badge
                    style={{
                      background: "rgba(245,158,11,0.15)",
                      color: "#fcd34d",
                      border: "1px solid rgba(245,158,11,0.2)",
                    }}
                  >
                    +8 pts possible
                  </Badge>
                </div>
                <p className="text-sm mt-3" style={{ color: "#64748b" }}>
                  Based on the Software Engineer role at Google
                </p>
              </GlassCard>

              <div className="lg:col-span-2">
                <GlassCard className="p-6 h-full">
                  <h3 className="font-bold text-white text-sm mb-4">
                    Section Scores
                  </h3>
                  <div className="space-y-3">
                    {sectionScores.map((s) => (
                      <div key={s.label}>
                        <div className="mb-1 flex items-center justify-between">
                          <span
                            className="text-sm font-medium"
                            style={{ color: "#94a3b8" }}
                          >
                            {s.label}
                          </span>
                          <span
                            className="text-sm font-bold"
                            style={{
                              color:
                                s.score >= 85
                                  ? "#10b981"
                                  : s.score >= 70
                                    ? "#f59e0b"
                                    : "#ef4444",
                            }}
                          >
                            {s.score}/100
                          </span>
                        </div>
                        <div
                          className="h-1.5 overflow-hidden rounded-full"
                          style={{ background: "rgba(255,255,255,0.06)" }}
                        >
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background:
                                s.score >= 85
                                  ? "#10b981"
                                  : s.score >= 70
                                    ? "#f59e0b"
                                    : "#ef4444",
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${s.score}%` }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Detailed analysis */}
            <div className="lg:grid-cols-3 gap-6 grid grid-cols-1">
              <div className="lg:col-span-2">
                <GlassCard className="p-0 overflow-hidden">
                  <Tabs defaultValue="keywords">
                    <div className="px-5 pt-5 pb-0">
                      <TabsList
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <TabsTrigger value="keywords" className="text-sm">
                          Keywords
                        </TabsTrigger>
                        <TabsTrigger value="strengths" className="text-sm">
                          Strengths
                        </TabsTrigger>
                        <TabsTrigger value="weaknesses" className="text-sm">
                          Weaknesses
                        </TabsTrigger>
                        <TabsTrigger value="suggestions" className="text-sm">
                          Suggestions
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="keywords" className="p-5">
                      <div className="space-y-4">
                        <div>
                          <div className="gap-2 mb-3 flex items-center">
                            <CheckCircle size={14} className="text-green-400" />
                            <span className="text-sm font-medium text-white">
                              Matched Keywords
                            </span>
                            <Badge
                              className="text-sm"
                              style={{
                                background: "rgba(16,185,129,0.15)",
                                color: "#6ee7b7",
                              }}
                            >
                              {mockKeywords.matched.length}
                            </Badge>
                          </div>
                          <div className="gap-2 flex flex-wrap">
                            {mockKeywords.matched.map((kw) => (
                              <span
                                key={kw}
                                className="px-3 py-1 text-sm font-medium rounded-full"
                                style={{
                                  background: "rgba(16,185,129,0.12)",
                                  color: "#6ee7b7",
                                  border: "1px solid rgba(16,185,129,0.2)",
                                }}
                              >
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="gap-2 mb-3 flex items-center">
                            <AlertCircle size={14} className="text-red-400" />
                            <span className="text-sm font-medium text-white">
                              Missing Keywords
                            </span>
                            <Badge
                              className="text-sm"
                              style={{
                                background: "rgba(239,68,68,0.15)",
                                color: "#fca5a5",
                              }}
                            >
                              {mockKeywords.missing.length}
                            </Badge>
                          </div>
                          <div className="gap-2 flex flex-wrap">
                            {mockKeywords.missing.map((kw) => (
                              <span
                                key={kw}
                                className="px-3 py-1 text-sm font-medium rounded-full"
                                style={{
                                  background: "rgba(239,68,68,0.12)",
                                  color: "#fca5a5",
                                  border: "1px solid rgba(239,68,68,0.2)",
                                }}
                              >
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="strengths" className="p-5">
                      <div className="space-y-3">
                        {strengths.map((s, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="gap-3 p-3 rounded-xl flex items-start"
                            style={{
                              background: "rgba(16,185,129,0.06)",
                              border: "1px solid rgba(16,185,129,0.12)",
                            }}
                          >
                            <CheckCircle
                              size={14}
                              className="text-green-400 mt-0.5 shrink-0"
                            />
                            <p className="text-sm" style={{ color: "#94a3b8" }}>
                              {s}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="weaknesses" className="p-5">
                      <div className="space-y-3">
                        {weaknesses.map((w, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="gap-3 p-3 rounded-xl flex items-start"
                            style={{
                              background: "rgba(239,68,68,0.06)",
                              border: "1px solid rgba(239,68,68,0.12)",
                            }}
                          >
                            <AlertCircle
                              size={14}
                              className="text-red-400 mt-0.5 shrink-0"
                            />
                            <p className="text-sm" style={{ color: "#94a3b8" }}>
                              {w}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="suggestions" className="p-5">
                      <div className="space-y-3">
                        {suggestions.map((s, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="gap-3 p-3 rounded-xl flex items-start"
                            style={{
                              background:
                                s.priority === "high"
                                  ? "rgba(239,68,68,0.06)"
                                  : s.priority === "medium"
                                    ? "rgba(245,158,11,0.06)"
                                    : "rgba(59,130,246,0.06)",
                              border: `1px solid ${s.priority === "high" ? "rgba(239,68,68,0.15)" : s.priority === "medium" ? "rgba(245,158,11,0.15)" : "rgba(59,130,246,0.15)"}`,
                            }}
                          >
                            <Badge
                              className="text-sm mt-0.5 shrink-0"
                              style={{
                                background:
                                  s.priority === "high"
                                    ? "rgba(239,68,68,0.2)"
                                    : s.priority === "medium"
                                      ? "rgba(245,158,11,0.2)"
                                      : "rgba(59,130,246,0.2)",
                                color:
                                  s.priority === "high"
                                    ? "#fca5a5"
                                    : s.priority === "medium"
                                      ? "#fcd34d"
                                      : "#93c5fd",
                              }}
                            >
                              {s.priority}
                            </Badge>
                            <p className="text-sm" style={{ color: "#94a3b8" }}>
                              {s.text}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </GlassCard>
              </div>

              {/* Resume Preview */}
              <GlassCard className="p-4 flex flex-col relative overflow-hidden">
                <h3 className="text-sm font-bold text-white mb-4 tracking-widest text-slate-500 uppercase">
                  Resume Preview
                </h3>
                <div className="rounded-lg bg-white/5 border-white/10 p-4 scrollbar-hidden flex-1 overflow-y-auto border relative">
                  <div className="space-y-4">
                    <div className="h-4 bg-white/10 w-1/2 rounded" />
                    <div className="h-2 bg-white/5 w-full rounded" />
                    <div className="h-2 bg-white/5 w-full rounded" />
                    <div className="h-2 bg-white/5 w-3/4 rounded" />
                    <Separator className="bg-white/5" />
                    <div className="h-3 bg-white/10 w-1/3 rounded" />
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="gap-2 flex">
                          <div className="h-2 w-2 mt-1 shrink-0 rounded-full bg-primary/40" />
                          <div className="h-2 bg-white/5 w-full rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Scanning animation overlay */}
                  <ScanningLine color="var(--color-primary)" />
                </div>
              </GlassCard>
            </div>

            {/* Actions */}
            <div className="gap-3 flex">
              <Button className="neon-button gap-2">
                <DownloadCloud size={16} /> Download Report
              </Button>
              <Button
                variant="outline"
                onClick={() => setUploadState("idle")}
                className="gap-2"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  color: "#94a3b8",
                }}
              >
                <RefreshCw size={16} /> Analyze Another
              </Button>
              <Button
                variant="outline"
                className="gap-2 ml-auto"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  color: "#94a3b8",
                }}
              >
                <TrendingUp size={16} /> Compare with Job
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </PageTransition>
  )
}
