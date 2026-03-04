import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LandingConcept1 from '@/pages/LandingConcept1';
import Category from '@/pages/Category';
import AllProductsCategory from '@/pages/category/all/AllProductsCategory';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import About from '@/pages/About';
import Checkout from '@/pages/Checkout';
import Wishlist from '@/pages/Wishlist';
import Account from '@/pages/Account';
import Profile from '@/pages/account/Profile';
import Addresses from '@/pages/account/Addresses';
import Orders from '@/pages/account/Orders';
import OrderDetail from '@/pages/account/OrderDetail';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import OrderConfirmation from '@/pages/OrderConfirmation';
import SearchResults from '@/pages/SearchResults';
import NotFound from '@/pages/NotFound';

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
            <Route path="category/:category" element={<Category />} />
            <Route path="category/:category/:subcategory" element={<Category />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="about" element={<About />} />
            <Route path="products" element={<AllProductsCategory />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="order-confirmation/:orderNumber" element={<OrderConfirmation />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="account" element={<Account />}>
              <Route index element={<Profile />} />
              <Route path="addresses" element={<Addresses />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:orderNumber" element={<OrderDetail />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <CartDrawer />
        <ToastContainer />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
