/**
 * Account Layout
 * Left sidebar nav + right content area via <Outlet />.
 */

import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { User, MapPin, Package, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Profile', href: '/account', icon: User },
  { label: 'Addresses', href: '/account/addresses', icon: MapPin },
  { label: 'Orders', href: '/account/orders', icon: Package },
];

export default function Account() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuthStore();

  // If not logged in, redirect
  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <User className="w-12 h-12 text-gray-300 mb-4" />
        <h1 className="text-2xl font-medium text-gray-900 mb-2">Sign in to view your account</h1>
        <p className="text-gray-500 mb-8">Access your orders, addresses, and profile settings.</p>
        <Link
          to="/login"
          className="px-8 py-3 bg-gray-900 text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 lg:py-12">
        <h1 className="text-2xl lg:text-3xl font-medium text-gray-900 uppercase tracking-[0.15em] mb-10 lg:mb-14">
          My Account
        </h1>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          {/* Sidebar Nav */}
          <nav className="flex md:flex-col gap-2 md:w-52 flex-shrink-0">
            {/* User greeting */}
            {user && (
              <div className="hidden md:block mb-4 pb-4 border-b border-gray-200">
                <p className="text-sm text-gray-500">Welcome back,</p>
                <p className="text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            )}

            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/account'
                  ? location.pathname === '/account'
                  : location.pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors',
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-400 hover:text-red-500 transition-colors mt-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </nav>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
