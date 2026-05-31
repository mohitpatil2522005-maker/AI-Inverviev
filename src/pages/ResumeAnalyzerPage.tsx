
import { useCredits } from "../hooks/useCredits";
import UpgradeModal from "../components/modals/UpgradeModal";

const ResumeAnalyzerPage = () => {
  const { checkAndConsume, isUpgradeModalOpen, closeUpgradeModal, requiredCreditsForAction } = useCredits();

  const handleAnalyzeResume = async () => {
    // 100 credits for Resume Analysis
    const canProceed = await checkAndConsume('resume_analysis', 100);
    if (canProceed) {
      // Proceed with actual resume analysis logic
      alert('Analyzing resume... (Cost: 100 credits)');
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto text-center py-6 sm:py-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight">Resume Analyzer</h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
          Upload your resume to get AI-powered feedback instantly and improve your chances of getting hired.
        </p>
        
        <div className="bg-white/5 border border-white/10 p-8 sm:p-12 rounded-2xl shadow-xl flex flex-col items-center">
          <button 
            onClick={handleAnalyzeResume}
            className="px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-base sm:text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Analyze Resume (100 Credits)
          </button>
        </div>
      </div>

      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={closeUpgradeModal} 
        requiredCredits={requiredCreditsForAction} 
      />
    </div>
  );
};

export default ResumeAnalyzerPage;
