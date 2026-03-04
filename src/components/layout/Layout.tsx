import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import { PromoBar } from '@/components/common/PromoBar';
import { FloatingNewsletter } from '@/design-system';

export default function Layout() {
  const location = useLocation();

  // Show newsletter popup only on home page and category pages
  const showNewsletter = location.pathname === '/' || location.pathname.startsWith('/category');

  return (
    <div className="min-h-screen">
      <PromoBar message="Free shipping on all orders over $50 — Shop Now" />
      <Navbar />
      <MobileMenu />

      <main className="min-h-[calc(100vh-14rem)]">
        <Outlet />
      </main>

      <Footer />

      {showNewsletter && <FloatingNewsletter />}
    </div>
  );
}
