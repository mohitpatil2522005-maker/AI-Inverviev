import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ResumeAnalyzerPage from "./pages/ResumeAnalyzerPage";
import InterviewSetupPage from "./pages/InterviewSetupPage";
import LiveInterviewPage from "./pages/LiveInterviewPage";
import AIFeedbackReportPage from "./pages/AIFeedbackReportPage";
import AICoachPage from "./pages/AICoachPage";
import InterviewHistoryPage from "./pages/InterviewHistoryPage";
import BillingPage from "./pages/BillingPage";
import SettingsPage from "./pages/SettingsPage";
import AdminPanelPage from "./pages/AdminPanelPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
          <Route path="/interview-setup" element={<InterviewSetupPage />} />
          <Route path="/live-interview" element={<LiveInterviewPage />} />
          <Route path="/ai-feedback-report" element={<AIFeedbackReportPage />} />
          <Route path="/ai-coach" element={<AICoachPage />} />
          <Route path="/interview-history" element={<InterviewHistoryPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/admin" element={<AdminPanelPage />} />
          {/* Other routes will be added here */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
