import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'

export default function CartPage() {
  const {
    items,
    subtotal,
    deliveryFee,
    discount,
    discountCode,
    total,
    updateQuantity,
    removeItem,
    clearCart,
    itemCount,
  } = useCart()

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen pt-24 flex items-center justify-center"
      >
        <div className="text-center px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="w-32 h-32 bg-charcoal-800 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <ShoppingBag className="w-16 h-16 text-charcoal-500" />
          </motion.div>
          <h2 className="font-display text-3xl font-bold text-cream-100 mb-3">
            Your cart is empty
          </h2>
          <p className="text-charcoal-300 mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. 
            Explore our menu and find something delicious!
          </p>
          <Link to="/menu">
            <Button rightIcon={<ArrowRight className="w-5 h-5" />}>
              Browse Menu
            </Button>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-32 lg:pb-12"
    >
      <div className="container-custom section-padding py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/menu" className="p-2 hover:bg-charcoal-800 rounded-lg transition-colors">
              <ChevronLeft className="w-6 h-6 text-cream-200" />
            </Link>
            <div>
              <h1 className="font-display text-3xl font-bold text-cream-100">
                Your Cart
              </h1>
              <p className="text-charcoal-300">{itemCount} items</p>
            </div>
          </div>
          <button
            onClick={clearCart}
            className="text-red-400 hover:text-red-300 text-sm font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  className="glass-card p-4 flex gap-4"
                >
                  {/* Image */}
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.menuItem.image_url}
                      alt={item.menuItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-grow min-w-0">
                    <h3 className="font-display font-semibold text-cream-100 truncate">
                      {item.menuItem.name}
                    </h3>
                    <p className="text-sm text-charcoal-300 line-clamp-1 mt-1">
                      {item.menuItem.description}
                    </p>
                    <p className="text-golden-400 font-semibold mt-2">
                      {formatPrice(item.menuItem.price)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end justify-between">
                    {/* Remove Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-red-500/10 rounded-lg text-charcoal-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 bg-charcoal-800 rounded-lg p-1">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-1.5 hover:bg-charcoal-700 rounded-md transition-colors disabled:opacity-50"
                      >
                        <Minus className="w-4 h-4 text-cream-200" />
                      </motion.button>
                      <span className="w-8 text-center text-cream-100 font-medium">
                        {item.quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-charcoal-700 rounded-md transition-colors"
                      >
                        <Plus className="w-4 h-4 text-cream-200" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card-golden p-6 sticky top-28">
              <h2 className="font-display text-xl font-semibold text-cream-100 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-charcoal-200">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-charcoal-200">
                  <span>Delivery Fee</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({discountCode})</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="h-px bg-charcoal-700" />
                <div className="flex justify-between text-cream-100 font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-golden-400">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <p className="text-sm text-charcoal-300 mb-2">Have a promo code?</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="input-field text-sm flex-grow"
                  />
                  <Button variant="secondary" size="sm">
                    Apply
                  </Button>
                </div>
              </div>

              <Link to="/checkout" className="block">
                <Button className="w-full" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Proceed to Checkout
                </Button>
              </Link>

              <Link
                to="/menu"
                className="block text-center text-golden-400 hover:text-golden-300 text-sm mt-4 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
