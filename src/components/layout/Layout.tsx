import { useRef, useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import { PromoBar } from '@/components/common/PromoBar';
import { FloatingNewsletter } from '@/design-system';

export default function Layout() {
  const location = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setHeaderHeight(entry.contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Show newsletter popup only on home page and category pages
  const showNewsletter = location.pathname === '/' || location.pathname.startsWith('/category');

  return (
    <div className="min-h-screen flex flex-col">
      <div ref={headerRef} className="sticky top-0 z-50">
        <PromoBar message="Free shipping on all orders over $50 — Shop Now" />
        <Navbar headerHeight={headerHeight} />
      </div>
      <MobileMenu />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {showNewsletter && <FloatingNewsletter />}
    </div>
  );
}
