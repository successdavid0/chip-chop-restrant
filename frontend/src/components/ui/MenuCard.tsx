import { useState, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Heart, Flame, Info } from 'lucide-react'
import { MenuItem } from '@/lib/supabase'
import { useCart } from '@/context/CartContext'
import { formatPrice, cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import OptimizedImage from './OptimizedImage'

interface MenuCardProps {
  item: MenuItem
}

const SpicyIndicator = memo(function SpicyIndicator({ level }: { level: number }) {
  if (level === 0) return null
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: Math.min(level, 5) }).map((_, i) => (
        <Flame key={i} className="w-3 h-3 text-orange-500 fill-orange-500" />
      ))}
    </div>
  )
})

const DietaryTags = memo(function DietaryTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null
  return (
    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span key={tag} className="badge badge-dietary text-[10px]">
          {tag}
        </span>
      ))}
    </div>
  )
})

const MenuCard = memo(function MenuCard({ item }: MenuCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = useCallback(() => {
    if (!item.is_available) return
    addItem(item, quantity)
    toast.success(`Added ${quantity}x ${item.name} to cart`)
    setQuantity(1)
  }, [item, quantity, addItem])

  const handleLike = useCallback(() => {
    setIsLiked(prev => !prev)
  }, [])

  const handleToggleDetails = useCallback(() => {
    setShowDetails(prev => !prev)
  }, [])

  const incrementQuantity = useCallback(() => {
    setQuantity(prev => prev + 1)
  }, [])

  const decrementQuantity = useCallback(() => {
    setQuantity(prev => Math.max(1, prev - 1))
  }, [])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl will-change-transform',
        'bg-charcoal-800/40 backdrop-blur-xl border border-charcoal-700/50 hover:border-golden-600/30',
        !item.is_available && 'opacity-60'
      )}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <OptimizedImage
          src={item.image_url}
          alt={item.name}
          className="transition-transform duration-300 group-hover:scale-105"
          wrapperClassName="w-full h-full"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 to-transparent pointer-events-none" />
        
        {/* Status Badge */}
        {!item.is_available && (
          <div className="absolute top-3 left-3">
            <span className="badge badge-unavailable">Out of Stock</span>
          </div>
        )}
        
        {/* Like Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className="absolute top-3 right-3 p-2 backdrop-blur-sm rounded-full bg-charcoal-800/60 transition-colors"
        >
          <Heart
            className={cn(
              'w-5 h-5 transition-colors',
              isLiked ? 'fill-red-500 text-red-500' : 'text-cream-200'
            )}
          />
        </motion.button>

        <DietaryTags tags={item.dietary_tags} />

        {/* Info Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleDetails}
          className="absolute bottom-3 right-3 p-2 backdrop-blur-sm rounded-full bg-charcoal-800/60 transition-colors"
        >
          <Info className="w-4 h-4 text-cream-200" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display font-semibold text-cream-100 line-clamp-1">
              {item.name}
            </h3>
            <p className="text-sm text-charcoal-300 line-clamp-2 mt-1">
              {item.description}
            </p>
          </div>
          <SpicyIndicator level={item.spicy_level} />
        </div>

        {/* Expandable Details */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-charcoal-700 space-y-2">
                <p className="text-xs text-charcoal-400">
                  <span className="text-golden-400">{item.calories}</span> calories
                </p>
                <p className="text-xs text-charcoal-400">
                  <span className="font-medium text-cream-300">Ingredients: </span>
                  {item.ingredients.join(', ')}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Price & Actions */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-display font-bold text-golden-400">
            {formatPrice(item.price)}
          </span>
          
          {item.is_available && (
            <div className="flex items-center gap-2">
              {/* Quantity Selector */}
              <div className="flex items-center gap-1 rounded-lg p-1 bg-charcoal-800">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={decrementQuantity}
                  className="p-1.5 rounded-md hover:bg-charcoal-700 transition-colors"
                >
                  <Minus className="w-4 h-4 text-cream-200" />
                </motion.button>
                <span className="w-8 text-center font-semibold text-cream-100">{quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={incrementQuantity}
                  className="p-1.5 rounded-md hover:bg-charcoal-700 transition-colors"
                >
                  <Plus className="w-4 h-4 text-cream-200" />
                </motion.button>
              </div>
              
              {/* Add Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="p-2.5 bg-golden-gradient rounded-xl shadow-golden active:shadow-none transition-shadow"
              >
                <Plus className="w-5 h-5 text-charcoal-900" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
})

export default MenuCard
