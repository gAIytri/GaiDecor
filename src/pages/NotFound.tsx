/**
 * 404 Not Found Page
 */

import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-medium text-gray-200 mb-4">404</p>
        <h1 className="text-2xl font-medium text-gray-900 mb-2">Page not found</h1>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
