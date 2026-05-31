
import { useCredits } from "../hooks/useCredits";
import UpgradeModal from "../components/modals/UpgradeModal";

const LiveInterviewPage = () => {
  const { checkAndConsume, isUpgradeModalOpen, closeUpgradeModal, requiredCreditsForAction } = useCredits();

  const handleStartInterview = async () => {
    // 300 credits for Live Interview
    const canProceed = await checkAndConsume('interview', 300);
    if (canProceed) {
      // Proceed with actual live interview logic
      alert('Starting live AI interview... (Cost: 300 credits)');
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto text-center py-6 sm:py-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight">Live Interview</h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
          Experience a realistic AI interview with voice and real-time feedback designed to boost your confidence.
        </p>

        <div className="bg-white/5 border border-white/10 p-8 sm:p-12 rounded-2xl shadow-xl flex flex-col items-center">
          <button 
            onClick={handleStartInterview}
            className="px-6 py-3 sm:px-8 sm:py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-base sm:text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Start Interview (300 Credits)
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

export default LiveInterviewPage;
