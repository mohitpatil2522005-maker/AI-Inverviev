import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/api';
import { updateCreditsLocally, updatePlanLocally } from '../../redux/authSlice';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  requiredCredits?: number;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, requiredCredits }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState(false);

  const handlePayment = async (packageId: string) => {
    setLoading(true);
    try {
      const { data: orderData } = await api.post('/payments/create-order', { packageId });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'dummy_key',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'AI Interview SaaS',
        description: 'Upgrade your plan or buy credits',
        order_id: orderData.orderId,
        handler: async function (response: any) {
          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            packageId
          };
          
          try {
            const { data: verifyResponse } = await api.post('/payments/verify', verifyData);
            if (verifyResponse.success) {
              if (verifyResponse.plan === 'premium') {
                dispatch(updatePlanLocally('premium'));
              } else {
                dispatch(updateCreditsLocally(verifyResponse.credits));
              }
              onClose();
            }
          } catch (err) {
            console.error('Payment verification failed', err);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          email: user?.email || '',
        },
        theme: {
          color: '#3B82F6'
        }
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Payment initialization failed', error);
      alert('Failed to initialize payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full"
          >
            <div className="p-8 text-center bg-gradient-to-r from-blue-50 to-indigo-50">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Unlock More Power 🚀</h2>
              {requiredCredits && (
                <p className="text-red-600 font-medium mb-4">
                  You need {requiredCredits} credits to perform this action.
                </p>
              )}
              <p className="text-gray-600">Choose a plan that fits your needs and ace your next interview.</p>
            </div>

            <div className="p-8 grid md:grid-cols-2 gap-6">
              {/* Credits Package */}
              <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow border-gray-200">
                <div className="text-xl font-bold text-gray-900 mb-2">Credit Pack</div>
                <div className="text-3xl font-extrabold text-blue-600 mb-4">₹499</div>
                <ul className="text-gray-600 space-y-2 mb-6 text-sm">
                  <li>✅ 5,000 Credits</li>
                  <li>✅ Good for ~50 resume analyzes</li>
                  <li>✅ Good for ~16 live interviews</li>
                  <li>✅ Never expires</li>
                </ul>
                <button
                  onClick={() => handlePayment('credits_5000')}
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-blue-100 text-blue-700 font-semibold rounded-lg hover:bg-blue-200 transition-colors"
                >
                  Buy Credits
                </button>
              </div>

              {/* Premium Plan */}
              <div className="border-2 border-blue-500 rounded-xl p-6 relative shadow-md">
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-3">
                  <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
                </div>
                <div className="text-xl font-bold text-gray-900 mb-2">Premium Pass</div>
                <div className="text-3xl font-extrabold text-blue-600 mb-4">₹999 <span className="text-sm text-gray-500 font-normal">/mo</span></div>
                <ul className="text-gray-600 space-y-2 mb-6 text-sm">
                  <li>✨ Unlimited Credits</li>
                  <li>✨ Priority AI Generation</li>
                  <li>✨ Detailed PDF Reports</li>
                  <li>✨ Advanced Mock Scenarios</li>
                </ul>
                <button
                  onClick={() => handlePayment('premium_plan')}
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Go Premium
                </button>
              </div>
            </div>

            <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium"
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UpgradeModal;
