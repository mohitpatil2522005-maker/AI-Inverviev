
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreditBadge from "../common/CreditBadge";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);

  return (
    <nav className="bg-black bg-opacity-50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
              <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                AI Interview SaaS
              </span>
            </div>
            <div className="hidden lg:block ml-10">
              <div className="flex items-baseline space-x-6">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 rounded-lg text-base lg:text-lg font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/interview-setup')}
                  className="px-4 py-2 rounded-lg text-base lg:text-lg font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
                >
                  Interviews
                </button>
                <button
                  onClick={() => navigate('/resume-analyzer')}
                  className="px-4 py-2 rounded-lg text-base lg:text-lg font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
                >
                  Resume Analyzer
                </button>
                <button
                  onClick={() => navigate('/ai-coach')}
                  className="px-4 py-2 rounded-lg text-base lg:text-lg font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
                >
                  AI Coach
                </button>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            {user && <CreditBadge />}
            {!user ? (
              <button 
                onClick={() => navigate('/login')}
                className="bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 px-6 rounded-lg text-base lg:text-lg transition-all"
              >
                Sign In
              </button>
            ) : (
              <button className="bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 px-6 rounded-lg text-base lg:text-lg transition-all">
                Sign Out
              </button>
            )}
          </div>
          <div className="flex items-center lg:hidden space-x-4">
            {user && <CreditBadge />}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Main menu"
            >
              <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
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
