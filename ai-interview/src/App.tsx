import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

import LandingPage from "@/pages/Landing/LandingPage"
import LoginPage from "@/pages/Auth/LoginPage"
import SignupPage from "@/pages/Auth/SignupPage"
import DashboardPage from "@/pages/Dashboard/DashboardPage"
import ResumeAnalyzerPage from "@/pages/ResumeAnalyzer/ResumeAnalyzerPage"
import InterviewSetupPage from "@/pages/InterviewSetup/InterviewSetupPage"
import LiveInterviewPage from "@/pages/LiveInterview/LiveInterviewPage"
import FeedbackReportPage from "@/pages/FeedbackReport/FeedbackReportPage"
import CareerCoachPage from "@/pages/CareerCoach/CareerCoachPage"
import InterviewHistoryPage from "@/pages/InterviewHistory/InterviewHistoryPage"
import BillingPage from "@/pages/Billing/BillingPage"
import SettingsPage from "@/pages/Settings/SettingsPage"
import AdminPage from "@/pages/Admin/AdminPage"
import AppLayout from "@/components/layout/AppLayout"
import ProtectedLayout from "@/components/auth/ProtectedLayout"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* App */}
            <Route element={<ProtectedLayout />}>
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/resume" element={<ResumeAnalyzerPage />} />
                <Route path="/interview/setup" element={<InterviewSetupPage />} />
                <Route path="/interview/live" element={<LiveInterviewPage />} />
                <Route path="/report" element={<FeedbackReportPage />} />
                <Route path="/coach" element={<CareerCoachPage />} />
                <Route path="/history" element={<InterviewHistoryPage />} />
                <Route path="/billing" element={<BillingPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster richColors position="top-right" />
      </TooltipProvider>
    </ThemeProvider>
  )
}
