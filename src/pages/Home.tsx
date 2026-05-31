
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 sm:p-8 lg:p-12 text-center">
      <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight lg:leading-tight">
        Master Your Next <span className="text-blue-500">Interview</span>
      </h1>
      <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
        AI-powered mock interviews, instant resume analysis, and personalized coaching to help you land your dream job.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
        <button
          onClick={() => navigate('/signup')}
          className="px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-base sm:text-lg transition-colors shadow-lg"
        >
          Get Started for Free
        </button>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 sm:px-8 sm:py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg text-base sm:text-lg transition-colors border border-white/20"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Home;
