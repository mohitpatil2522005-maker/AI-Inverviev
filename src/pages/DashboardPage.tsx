
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const DashboardPage = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8 leading-tight">Dashboard</h1>
        {user ? (
          <div className="space-y-6 bg-white/5 p-6 sm:p-8 lg:p-10 rounded-2xl border border-white/10 shadow-xl">
            <p className="text-xl sm:text-2xl font-medium">Welcome, <span className="text-blue-400">{user.displayName || user.email}</span></p>
            <div className="bg-black/40 p-4 rounded-lg overflow-hidden break-all">
              <p className="text-sm sm:text-base text-gray-400 font-mono">
                Your token: {token?.substring(0, 40) + '...'}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white/5 p-6 sm:p-8 lg:p-10 rounded-2xl border border-white/10 text-center">
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300">Please log in to view the dashboard.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
