import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ChevronRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useTheme } from '@/context/ThemeContext'
import { formatPrice, cn } from '@/lib/utils'

const MobileCartBar = memo(function MobileCartBar() {
  const { itemCount, total } = useCart()
  const { resolvedTheme } = useTheme()
  const location = useLocation()
  const isDark = resolvedTheme === 'dark'

  // Don't show on cart or checkout pages
  const hiddenPaths = ['/cart', '/checkout']
  const isHidden = hiddenPaths.some(path => location.pathname.startsWith(path))

  return (
    <AnimatePresence>
      {itemCount > 0 && !isHidden && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
        >
          <div className={cn(
            "backdrop-blur-xl border-t shadow-elegant",
            isDark 
              ? "bg-charcoal-800/95 border-golden-600/20"
              : "bg-white/95 border-golden-500/30"
          )}>
            <Link
              to="/cart"
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="p-2.5 bg-golden-gradient rounded-xl">
                    <ShoppingBag className="w-5 h-5 text-charcoal-900" />
                  </div>
                  <span className={cn(
                    "absolute -top-1 -right-1 w-5 h-5 text-xs font-bold rounded-full flex items-center justify-center",
                    isDark 
                      ? "bg-cream-100 text-charcoal-900"
                      : "bg-charcoal-800 text-cream-100"
                  )}>
                    {itemCount}
                  </span>
                </div>
                <div>
                  <p className={cn(
                    "font-semibold",
                    isDark ? "text-cream-100" : "text-charcoal-800"
                  )}>View Cart</p>
                  <p className={cn(
                    "text-sm",
                    isDark ? "text-golden-400" : "text-golden-600"
                  )}>{formatPrice(total)}</p>
                </div>
              </div>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ChevronRight className={cn(
                  "w-6 h-6",
                  isDark ? "text-golden-400" : "text-golden-600"
                )} />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

export default MobileCartBar
