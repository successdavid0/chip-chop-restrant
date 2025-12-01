import { useState, useEffect, useCallback, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, MapPin, User } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'
import ThemeToggle from '../ui/ThemeToggle'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const NavLink = memo(function NavLink({ 
  href, 
  label, 
  isActive 
}: { 
  href: string
  label: string
  isActive: boolean 
}) {
  return (
    <Link
      to={href}
      className={cn(
        'nav-link text-sm font-medium tracking-wide',
        isActive && 'active'
      )}
    >
      {label}
    </Link>
  )
})

const CartBadge = memo(function CartBadge({ count }: { count: number }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-golden-500 text-charcoal-900 text-xs font-bold rounded-full flex items-center justify-center"
        >
          {count > 9 ? '9+' : count}
        </motion.span>
      )}
    </AnimatePresence>
  )
})

const Navbar = memo(function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { itemCount } = useCart()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? isDark
              ? 'bg-charcoal-900/95 backdrop-blur-lg shadow-elegant border-b border-golden-600/10'
              : 'bg-white/90 backdrop-blur-lg shadow-medium border-b border-golden-500/10'
            : 'bg-transparent'
        )}
      >
        <div className="container-custom section-padding">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ duration: 0.2 }}
                className="w-12 h-12 bg-golden-gradient rounded-xl flex items-center justify-center shadow-golden"
              >
                <span className="text-2xl font-display font-bold text-charcoal-900">CC</span>
              </motion.div>
              <div className="hidden sm:block">
                <h1 className={cn(
                  "font-display text-xl font-bold transition-colors duration-200",
                  isDark 
                    ? "text-cream-100 group-hover:text-golden-400" 
                    : "text-charcoal-800 group-hover:text-golden-700"
                )}>
                  Chip Chop
                </h1>
                <p className={cn(
                  "text-xs tracking-widest uppercase",
                  isDark ? "text-golden-500" : "text-golden-600"
                )}>Food Lounge</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={location.pathname === link.href}
                />
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Track Order */}
              <Link
                to="/tracking"
                className="hidden md:flex items-center gap-2 btn-ghost text-sm"
              >
                <MapPin className="w-4 h-4" />
                <span>Track Order</span>
              </Link>

              {/* Theme Toggle */}
              <ThemeToggle variant="icon" />

              {/* Cart */}
              <Link to="/cart" className="relative p-2 group">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "p-2.5 rounded-xl border transition-all duration-200",
                    isDark 
                      ? "bg-charcoal-800/60 border-charcoal-700 group-hover:border-golden-600/50"
                      : "bg-white/80 border-charcoal-200 group-hover:border-golden-500/50 shadow-soft group-hover:shadow-medium"
                  )}
                >
                  <ShoppingBag className={cn(
                    "w-5 h-5 transition-colors duration-200",
                    isDark
                      ? "text-cream-200 group-hover:text-golden-400"
                      : "text-charcoal-600 group-hover:text-golden-700"
                  )} />
                </motion.div>
                <CartBadge count={itemCount} />
              </Link>

              {/* Account */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex p-2.5 bg-golden-gradient rounded-xl shadow-golden"
              >
                <User className="w-5 h-5 text-charcoal-900" />
              </motion.button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className={cn(
                  "lg:hidden p-2.5 rounded-xl border transition-all",
                  isDark
                    ? "bg-charcoal-800/60 border-charcoal-700"
                    : "bg-white/80 border-charcoal-200 shadow-soft"
                )}
              >
                {isMobileMenuOpen ? (
                  <X className={cn("w-5 h-5", isDark ? "text-cream-200" : "text-charcoal-600")} />
                ) : (
                  <Menu className={cn("w-5 h-5", isDark ? "text-cream-200" : "text-charcoal-600")} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 lg:hidden"
          >
            <div className={cn(
              "backdrop-blur-xl border-b",
              isDark
                ? "bg-charcoal-900/98 border-golden-600/10 shadow-elegant"
                : "bg-white/98 border-golden-500/10 shadow-lifted"
            )}>
              <div className="container-custom section-padding py-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className={cn(
                        'block py-3 px-4 rounded-xl text-lg font-medium transition-all duration-200',
                        location.pathname === link.href
                          ? isDark
                            ? 'bg-golden-500/10 text-golden-400'
                            : 'bg-gradient-to-r from-golden-100 to-golden-50 text-golden-800 shadow-soft'
                          : isDark
                            ? 'text-cream-200 hover:bg-charcoal-800 hover:text-golden-400'
                            : 'text-charcoal-600 hover:bg-warm-100 hover:text-golden-800'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    to="/tracking"
                    className={cn(
                      "flex items-center gap-3 py-3 px-4 rounded-xl text-lg font-medium transition-all duration-200",
                      isDark
                        ? "text-cream-200 hover:bg-charcoal-800 hover:text-golden-400"
                        : "text-charcoal-600 hover:bg-warm-100 hover:text-golden-800"
                    )}
                  >
                    <MapPin className="w-5 h-5" />
                    Track Order
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})

export default Navbar
