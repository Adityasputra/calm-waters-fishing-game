import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import api from '../api/api';

export default function ConvertToUser({ currentUser, onClose }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/convert-guest', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      // Update token
      login(response.data.token);

      // Navigate to verification page
      navigate('/verify', { 
        state: { 
          email: response.data.email,
          fromConversion: true
        } 
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to convert account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-white to-teal-50 rounded-3xl p-8 max-w-lg w-full shadow-2xl border-4 border-teal-400 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-7xl mb-4">🎣</div>
          <h2 className="text-3xl font-bold text-teal-800 mb-2">
            Save Your Progress!
          </h2>
          <p className="text-teal-600">
            Convert your guest account to keep all your achievements
          </p>
        </div>

        {/* Current progress display */}
        {currentUser && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 mb-6">
            <p className="text-amber-900 font-bold mb-3 flex items-center gap-2">
              <span className="text-xl">💾</span>
              <span>Your Progress to Save:</span>
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white/60 rounded-lg p-3">
                <div className="text-2xl mb-1">💰</div>
                <div className="text-xs text-amber-700 font-medium">Gold</div>
                <div className="text-lg font-bold text-amber-900">{currentUser.gold}</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="text-2xl mb-1">⭐</div>
                <div className="text-xs text-amber-700 font-medium">Points</div>
                <div className="text-lg font-bold text-amber-900">{currentUser.points}</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="text-2xl mb-1">🎣</div>
                <div className="text-xs text-amber-700 font-medium">Rod Level</div>
                <div className="text-lg font-bold text-amber-900">{currentUser.rodLevel}</div>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          <div>
            <label className="block text-teal-700 font-semibold mb-2 text-sm">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={20}
              pattern="[a-zA-Z0-9_]+"
              className="w-full px-4 py-3 rounded-xl border-2 border-teal-200 focus:border-teal-400 focus:outline-none transition-colors bg-white"
              placeholder="Choose a username"
            />
            <p className="text-xs text-teal-600 mt-1">3-20 characters, letters, numbers, and underscores only</p>
          </div>

          {/* 
          {/* Email field */}
          <div>
            <label className="block text-teal-700 font-semibold mb-2 text-sm">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-teal-200 focus:border-teal-400 focus:outline-none transition-colors bg-white"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Password field */}
          <div>
            <label className="block text-teal-700 font-semibold mb-2 text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              className="w-full px-4 py-3 rounded-xl border-2 border-teal-200 focus:border-teal-400 focus:outline-none transition-colors bg-white"
              placeholder="Minimum 8 characters"
            />
          </div>

          {/* Confirm Password field */}
          <div>
            <label className="block text-teal-700 font-semibold mb-2 text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={8}
              className="w-full px-4 py-3 rounded-xl border-2 border-teal-200 focus:border-teal-400 focus:outline-none transition-colors bg-white"
              placeholder="Re-enter your password"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full font-semibold text-lg py-4 px-6 rounded-2xl 
              transition-all duration-300 transform shadow-lg
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 hover:scale-[1.02] hover:shadow-xl hover:shadow-teal-500/30'
              }
              text-white
            `}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Converting...</span>
              </span>
            ) : (
              'Convert to Full Account'
            )}
          </button>
        </form>

        {/* Footer note */}
        <p className="text-center text-teal-600 text-xs mt-6">
          You'll receive a verification email to confirm your account
        </p>
      </div>
    </div>
  );
}
