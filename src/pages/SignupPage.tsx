import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { signupWithEmail, loginWithGoogle } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, token, loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signupWithEmail({ email, password }));
  };

  const handleGoogleLogin = async () => {
    dispatch(loginWithGoogle());
  };

  if (user && token) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-purple-900 text-white flex items-center justify-center">
      <div className="bg-black/50 backdrop-blur-sm rounded-xl p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-transform transform hover:scale-105 ${
              loading ? 'opacity-50' : ''
            }`}
          >
            {loading ? 'Processing...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg flex items-center justify-center transition-transform transform hover:scale-105 ${
              loading ? 'opacity-50' : ''
            }`}
          >
            Sign Up with Google
          </button>
        </div>
        {error && (
          <div className="mt-4 p-2 bg-red-600/20 text-red-400 rounded-lg">
            {error}
          </div>
        )}
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-400">
            Already have an account?{' '}
          </span>
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-purple-400 hover:text-purple-300 underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
