/**
 * Login Page
 * Mock login form — real auth via Azure AD B2C comes in WS-5.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('sarah@example.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    // Mock login — accept any credentials
    login(
      {
        id: 'usr-1',
        email,
        firstName: 'Sarah',
        lastName: 'Johnson',
        phone: '(555) 123-4567',
        addresses: [
          {
            id: 'addr-1',
            label: 'Home',
            firstName: 'Sarah',
            lastName: 'Johnson',
            street1: '742 Evergreen Terrace',
            city: 'Portland',
            state: 'OR',
            zipCode: '97201',
            country: 'US',
            phone: '(555) 123-4567',
            isDefault: true,
          },
        ],
        createdAt: '2026-01-01T00:00:00Z',
      },
      'mock-token-12345',
      'mock-refresh-token-67890'
    );

    navigate('/account');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-medium text-gray-900 text-center mb-2 uppercase tracking-[0.15em]">
          Sign In
        </h1>
        <p className="text-sm text-gray-500 text-center mb-10">
          Welcome back to Shop with gAI
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-gray-500 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-gray-500 transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input type="checkbox" className="accent-emerald-600" />
              Remember me
            </label>
            <button type="button" className="text-gray-500 underline hover:text-gray-900">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gray-900 text-white text-sm font-medium uppercase tracking-[0.15em] hover:bg-gray-800 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-emerald-600 hover:text-emerald-700 font-medium">
              Create one
            </Link>
          </p>
        </div>

        {/* Social login placeholder */}
        <div className="mt-8">
          <div className="relative">
            <hr className="border-t border-gray-200" />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs text-gray-400 uppercase tracking-wider">
              or
            </span>
          </div>
          <div className="mt-6 space-y-3">
            <button className="w-full py-3 border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              Continue with Google
            </button>
            <button className="w-full py-3 border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              Continue with Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
