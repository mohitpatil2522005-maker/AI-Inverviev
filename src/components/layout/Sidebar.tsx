import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className="fixed z-20 inset-x-0 top-16 bg-black/80 backdrop-blur-sm border-r border-white/10 md:relative md:inset-0 md:h-auto md:border-0">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="flex-shrink-0 flex items-center">
          <a href="#" className="text-xl font-bold text-white">
            AI Interview SaaS
          </a>
        </div>
        <div className="hidden md:flex md:items-center md:ml-6">
          <button className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-md">
            Sign In
          </button>
        </div>
      </div>
      <nav className="mt-2 space-y-1">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center px-3 py-2 text-sm font-medium text-white/75 hover:text-white hover:bg-white/10"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate('/interview-setup')}
          className="flex items-center px-3 py-2 text-sm font-medium text-white/75 hover:text-white hover:bg-white/10"
        >
          Interviews
        </button>
        <button
          onClick={() => navigate('/resume-analyzer')}
          className="flex items-center px-3 py-2 text-sm font-medium text-white/75 hover:text-white hover:bg-white/10"
        >
          Resume Analyzer
        </button>
        <button
          onClick={() => navigate('/ai-coach')}
          className="flex items-center px-3 py-2 text-sm font-medium text-white/75 hover:text-white hover:bg-white/10"
        >
          AI Coach
        </button>
        <button
          onClick={() => navigate('/ai-feedback-report')}
          className="flex items-center px-3 py-2 text-sm font-medium text-white/75 hover:text-white hover:bg-white/10"
        >
          Reports
        </button>
        <button
          onClick={() => navigate('/billing')}
          className="flex items-center px-3 py-2 text-sm font-medium text-white/75 hover:text-white hover:bg-white/10"
        >
          Billing
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="flex items-center px-3 py-2 text-sm font-medium text-white/75 hover:text-white hover:bg-white/10"
        >
          Settings
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
