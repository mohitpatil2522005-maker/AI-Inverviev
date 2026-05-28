import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const DashboardPage = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        {user ? (
          <div className="space-y-4">
            <p className="text-lg">Welcome, {user.displayName || user.email}</p>
            <p className="text-gray-400">Your token: {token?.substring(0, 20) + '...'}</p>
          </div>
        ) : (
          <p className="text-gray-400">Please log in to view the dashboard.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
