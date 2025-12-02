import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ChevronRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'

const MobileCartBar = memo(function MobileCartBar() {
  const { itemCount, total } = useCart()
  const location = useLocation()

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
          <div className="bg-charcoal-800/95 backdrop-blur-xl border-t border-golden-600/20 shadow-elegant">
            <Link
              to="/cart"
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="p-2.5 bg-golden-gradient rounded-xl">
                    <ShoppingBag className="w-5 h-5 text-charcoal-900" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 text-xs font-bold rounded-full flex items-center justify-center bg-cream-100 text-charcoal-900">
                    {itemCount}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-cream-100">View Cart</p>
                  <p className="text-sm text-golden-400">{formatPrice(total)}</p>
                </div>
              </div>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ChevronRight className="w-6 h-6 text-golden-400" />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

export default MobileCartBar
