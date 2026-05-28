import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-black bg-opacity-50 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <a href="#" className="text-xl font-bold text-white">
                AI Interview SaaS
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white/75 hover:text-white hover:bg-white/10"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/interview-setup')}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white/75 hover:text-white hover:bg-white/10"
                >
                  Interviews
                </button>
                <button
                  onClick={() => navigate('/resume-analyzer')}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white/75 hover:text-white hover:bg-white/10"
                >
                  Resume Analyzer
                </button>
                <button
                  onClick={() => navigate('/ai-coach')}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white/75 hover:text-white hover:bg-white/10"
                >
                  AI Coach
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-md">
                Sign In
              </button>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:mb-0">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Main menu"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
