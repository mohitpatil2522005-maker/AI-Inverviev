import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { loginWithEmail, loginWithGoogle } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, token, loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginWithEmail({ email, password }));
  };

  const handleGoogleLogin = async () => {
    dispatch(loginWithGoogle());
  };

  if (user && token) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="w-full flex items-center justify-center py-10 sm:py-16">
      <div className="max-w-md w-full bg-white/5 border border-white/10 p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl backdrop-blur-md">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-6 sm:mb-8 text-white tracking-tight">Welcome Back</h2>
        {error && <p className="text-red-400 text-center mb-6 text-sm sm:text-base bg-red-400/10 py-3 px-4 rounded-lg">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-300 mb-2">Email</label>
            <input 
              type="email" 
              className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-base sm:text-lg"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-300 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-base sm:text-lg"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 sm:py-4 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-base sm:text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 sm:mt-8">
          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3 sm:py-4 px-4 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-3" />
            Continue with Google
          </button>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-sm sm:text-base text-gray-400">
            Don't have an account? <button onClick={() => navigate('/signup')} className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">Sign up</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
