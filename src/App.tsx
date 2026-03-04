import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LandingConcept1 from '@/pages/LandingConcept1';
import Category from '@/pages/Category';
import AllProductsCategory from '@/pages/category/all/AllProductsCategory';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import About from '@/pages/About';

import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import ToastContainer from '@/components/common/Toast';
import ScrollToTop from '@/components/common/ScrollToTop';
import CartDrawer from '@/components/cart/CartDrawer';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingConcept1 />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/category/:category/:subcategory" element={<Category />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<AllProductsCategory />} />
          </Route>
        </Routes>
        <CartDrawer />
        <ToastContainer />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
