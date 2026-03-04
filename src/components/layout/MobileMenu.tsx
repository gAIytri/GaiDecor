import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import navigationData from '@/data/navigationData.json';

export default function MobileMenu() {
  const { isMobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  // Close on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedMenu(null);
  }, [location.pathname, setMobileMenuOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [setMobileMenuOpen]);

  const toggleAccordion = (slug: string) => {
    setExpandedMenu(prev => (prev === slug ? null : slug));
  };

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-[9998]"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer - slides from left */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white shadow-2xl z-[9999] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-bold tracking-widest text-gray-900"
              >
                gAI DECOR
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-2">
              {navigationData.megaMenus.map((menu) => (
                <div key={menu.categorySlug} className="border-b border-gray-100">
                  {/* Category Header - Accordion Toggle */}
                  <button
                    onClick={() => toggleAccordion(menu.categorySlug)}
                    className="w-full flex items-center justify-between px-6 py-4 text-sm font-medium text-gray-900 uppercase tracking-wider"
                  >
                    <span>{menu.title}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                        expandedMenu === menu.categorySlug ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence>
                    {expandedMenu === menu.categorySlug && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 space-y-4">
                          {/* Shop All link */}
                          <Link
                            to={`/category/${menu.categorySlug}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-sm font-medium text-gray-900 py-1"
                          >
                            Shop All {menu.title}
                          </Link>

                          {/* Subcategory columns */}
                          {menu.columns.map((column, colIdx) => (
                            <div key={colIdx}>
                              <h4 className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                                {column.title}
                              </h4>
                              <ul className="space-y-1.5">
                                {column.links.map((link, linkIdx) => (
                                  <li key={linkIdx}>
                                    <Link
                                      to={link.path}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="block text-sm text-gray-600 hover:text-gray-900 py-0.5"
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Additional Links */}
              <div className="px-6 py-4 space-y-3">
                <Link
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium text-gray-900 uppercase tracking-wider py-2"
                >
                  All Products
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium text-gray-900 uppercase tracking-wider py-2"
                >
                  About
                </Link>
              </div>
            </nav>

            {/* Footer */}
            <div className="border-t px-6 py-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Free shipping on orders over $50
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
