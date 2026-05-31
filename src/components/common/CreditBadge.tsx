import React from 'react';
import { useSelector } from 'react-redux';

const CreditBadge: React.FC = () => {
  const { credits, plan } = useSelector((state: any) => state.auth);

  if (plan === 'premium') {
    return (
      <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-md">
        <span className="text-white font-semibold text-sm">Premium 👑</span>
      </div>
    );
  }

  const isLow = credits < 200;

  return (
    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full shadow-sm border ${isLow ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
      <div className="flex items-center justify-center bg-white rounded-full p-1 shadow-inner">
        <span className="text-xs">🪙</span>
      </div>
      <span className={`font-semibold text-sm ${isLow ? 'text-red-700' : 'text-blue-700'}`}>
        {credits} Credits
      </span>
    </div>
  );
};

export default CreditBadge;
