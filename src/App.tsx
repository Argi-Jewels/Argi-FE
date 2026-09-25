import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { MobileBottomBar } from './components/common/MobileBottomBar';
import { CartDrawer } from './components/cart/CartDrawer';
import { ToastContainer } from './components/common/ToastContainer';
import { FloatingWhatsAppButton } from './components/common/FloatingWhatsAppButton';
import { CustomerLoginModal } from './components/common/CustomerLoginModal';

import { HomePage } from './pages/HomePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CustomDesignPage } from './pages/CustomDesignPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { PolicyPage } from './pages/PolicyPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

// Scroll to top on route transition
const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className={`flex flex-col min-h-screen font-sans ${isAdminRoute ? 'bg-[#F4F1EA]' : 'selection:bg-[#DFC168]/30 selection:text-[#1A1A1A]'}`}>
      <ScrollToTop />
      {!isAdminRoute && <Header />}
      {!isAdminRoute && <CartDrawer />}
      <ToastContainer />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/custom-design" element={<CustomDesignPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/policies/:policyType" element={<PolicyPage />} />
          <Route path="/policies" element={<PolicyPage />} />
          <Route path="/hallmarking" element={<PolicyPage forcedTab="hallmarking" />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <MobileBottomBar />}
      {!isAdminRoute && <FloatingWhatsAppButton />}
      {!isAdminRoute && <CustomerLoginModal />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <AppContent />
      </Router>
    </StoreProvider>
  );
};

export default App;
