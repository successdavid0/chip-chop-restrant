import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { useLocation } from 'react-router-dom'

// Layout
import Layout from './components/layout/Layout'

// Loading Component
import PageLoader from './components/ui/PageLoader'

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'))
const MenuPage = lazy(() => import('./pages/MenuPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const TrackingPage = lazy(() => import('./pages/TrackingPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

// Context
import { CartProvider } from './context/CartContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'

// Toast wrapper that uses theme
function ThemedToaster() {
  const { resolvedTheme } = useTheme()
  
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: resolvedTheme === 'dark' ? '#2D2D2D' : '#FFFFFF',
          color: resolvedTheme === 'dark' ? '#FFF8F0' : '#1F1F1F',
          border: `1px solid ${resolvedTheme === 'dark' ? 'rgba(212, 165, 40, 0.3)' : 'rgba(212, 165, 40, 0.5)'}`,
          borderRadius: '12px',
          boxShadow: resolvedTheme === 'dark' 
            ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
            : '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
        success: {
          iconTheme: {
            primary: '#D4A528',
            secondary: resolvedTheme === 'dark' ? '#1F1F1F' : '#FFFFFF',
          },
        },
      }}
    />
  )
}

function AppContent() {
  const location = useLocation()

  return (
    <>
      <ThemedToaster />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/tracking/:orderId" element={<TrackingPage />} />
              <Route path="/tracking" element={<TrackingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </Layout>
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
