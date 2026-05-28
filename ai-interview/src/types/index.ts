export type InterviewType = "technical" | "behavioral" | "hr" | "coding" | "system-design"
export type DifficultyLevel = "easy" | "medium" | "hard"
export type InterviewStatus = "completed" | "in-progress" | "scheduled" | "cancelled"
export type SubscriptionPlan = "free" | "pro" | "enterprise"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  plan: SubscriptionPlan
  credits: number
}

export interface Interview {
  id: string
  role: string
  company: string
  type: InterviewType
  difficulty: DifficultyLevel
  status: InterviewStatus
  score?: number
  date: string
  duration: number
}

export interface Message {
  id: string
  role: "ai" | "user"
  content: string
  timestamp: string
}

export interface ResumeAnalysis {
  atsScore: number
  keywords: string[]
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
}

export interface FeedbackReport {
  overallScore: number
  technical: number
  communication: number
  confidence: number
  fluency: number
  hrReadiness: number
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
}

export interface NavItem {
  label: string
  href: string
  icon: React.ElementType // eslint-disable-line @typescript-eslint/no-explicit-any
  badge?: string | number
}
