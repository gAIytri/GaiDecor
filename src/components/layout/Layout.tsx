import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { FloatingNewsletter } from '@/design-system';

export default function Layout() {
  const location = useLocation();

  // Show newsletter popup only on home page and category pages
  const showNewsletter = location.pathname === '/' || location.pathname.startsWith('/category');

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="min-h-[calc(100vh-14rem)]">
        <Outlet />
      </main>

      <Footer />

      {showNewsletter && <FloatingNewsletter />}
    </div>
  );
}
