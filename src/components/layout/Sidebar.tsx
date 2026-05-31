
import { useNavigate } from "react-router-dom";

const Sidebar = ({ className = '' }: { className?: string }) => {
  const navigate = useNavigate();
  return (
    <aside className={`bg-black/80 backdrop-blur-sm border-r border-white/10 ${className}`}>
      <div className="md:hidden flex h-16 items-center justify-between px-4">
        <div className="flex-shrink-0 flex items-center">
          <a href="#" className="text-xl font-bold text-white">
            AI Interview SaaS
          </a>
        </div>
      </div>
      <nav className="mt-4 px-2 space-y-2">
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full flex items-center px-4 py-3 text-base lg:text-lg font-medium text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate('/interview-setup')}
          className="w-full flex items-center px-4 py-3 text-base lg:text-lg font-medium text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          Interviews
        </button>
        <button
          onClick={() => navigate('/resume-analyzer')}
          className="w-full flex items-center px-4 py-3 text-base lg:text-lg font-medium text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          Resume Analyzer
        </button>
        <button
          onClick={() => navigate('/ai-coach')}
          className="w-full flex items-center px-4 py-3 text-base lg:text-lg font-medium text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          AI Coach
        </button>
        <button
          onClick={() => navigate('/ai-feedback-report')}
          className="w-full flex items-center px-4 py-3 text-base lg:text-lg font-medium text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          Reports
        </button>
        <button
          onClick={() => navigate('/billing')}
          className="w-full flex items-center px-4 py-3 text-base lg:text-lg font-medium text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          Billing
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="w-full flex items-center px-4 py-3 text-base lg:text-lg font-medium text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          Settings
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
