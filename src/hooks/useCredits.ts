import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCreditsLocally } from '../redux/authSlice';
import api from '../lib/api';


export const useCredits = () => {
  const dispatch = useDispatch();
  const { credits, plan } = useSelector((state: any) => state.auth); // use RootState if correctly typed
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [requiredCreditsForAction, setRequiredCreditsForAction] = useState(0);

  const checkAndConsume = useCallback(async (actionType: 'resume_analysis' | 'interview', requiredCredits: number): Promise<boolean> => {
    if (plan === 'premium') return true;

    if (credits < requiredCredits) {
      setRequiredCreditsForAction(requiredCredits);
      setIsUpgradeModalOpen(true);
      return false;
    }

    try {
      const response = await api.post('/actions/consume', { actionType });
      if (response.data.success) {
        dispatch(updateCreditsLocally(response.data.remainingCredits));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to consume credits', error);
      // If backend says insufficient credits or other error
      setRequiredCreditsForAction(requiredCredits);
      setIsUpgradeModalOpen(true);
      return false;
    }
  }, [credits, plan, dispatch]);

  const closeUpgradeModal = () => setIsUpgradeModalOpen(false);

  return {
    credits,
    plan,
    isUpgradeModalOpen,
    closeUpgradeModal,
    checkAndConsume,
    requiredCreditsForAction
  };
};
