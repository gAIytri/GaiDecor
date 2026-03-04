/**
 * Register Page
 * Mock registration form — real auth via Azure AD B2C comes in WS-5.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

export default function Register() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    // Mock registration — create user and log in
    login(
      {
        id: `usr-${Date.now()}`,
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        addresses: [],
        createdAt: new Date().toISOString(),
      },
      `mock-token-${Date.now()}`,
      `mock-refresh-${Date.now()}`
    );

    navigate('/account');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-medium text-gray-900 text-center mb-2 uppercase tracking-[0.15em]">
          Create Account
        </h1>
        <p className="text-sm text-gray-500 text-center mb-10">
          Join Shop with gAI for a personalized experience
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm text-gray-600 mb-1">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={form.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-gray-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm text-gray-600 mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={form.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-gray-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
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
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-gray-500 transition-colors"
              placeholder="At least 8 characters"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-gray-500 transition-colors"
              placeholder="Repeat your password"
            />
          </div>

          <div className="text-sm text-gray-500">
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="accent-emerald-600 mt-0.5" />
              <span>
                I agree to the{' '}
                <button type="button" className="text-emerald-600 underline">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="text-emerald-600 underline">
                  Privacy Policy
                </button>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gray-900 text-white text-sm font-medium uppercase tracking-[0.15em] hover:bg-gray-800 transition-colors"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
