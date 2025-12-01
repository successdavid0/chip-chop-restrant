import { useState, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Heart, Flame, Info } from 'lucide-react'
import { MenuItem } from '@/lib/supabase'
import { useCart } from '@/context/CartContext'
import { useTheme } from '@/context/ThemeContext'
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
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

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
        isDark 
          ? 'bg-charcoal-800/40 backdrop-blur-xl border border-charcoal-700/50 hover:border-golden-600/30'
          : 'bg-white/90 border border-golden-200/50 shadow-card-light hover:shadow-card-hover-light hover:border-golden-400/40',
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
          className={cn(
            "absolute top-3 right-3 p-2 backdrop-blur-sm rounded-full transition-colors",
            isDark ? "bg-charcoal-800/60" : "bg-white/80 shadow-soft"
          )}
        >
          <Heart
            className={cn(
              'w-5 h-5 transition-colors',
              isLiked ? 'fill-red-500 text-red-500' : isDark ? 'text-cream-200' : 'text-charcoal-500'
            )}
          />
        </motion.button>

        <DietaryTags tags={item.dietary_tags} />

        {/* Info Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleDetails}
          className={cn(
            "absolute bottom-3 right-3 p-2 backdrop-blur-sm rounded-full transition-colors",
            isDark ? "bg-charcoal-800/60" : "bg-white/80 shadow-soft"
          )}
        >
          <Info className={cn(
            "w-4 h-4",
            isDark ? "text-cream-200" : "text-charcoal-500"
          )} />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className={cn(
              "font-display font-semibold line-clamp-1",
              isDark ? "text-cream-100" : "text-charcoal-800"
            )}>
              {item.name}
            </h3>
            <p className={cn(
              "text-sm line-clamp-2 mt-1",
              isDark ? "text-charcoal-300" : "text-charcoal-500"
            )}>
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
              <div className={cn(
                "pt-3 border-t space-y-2",
                isDark ? "border-charcoal-700" : "border-charcoal-200"
              )}>
                <p className={cn(
                  "text-xs",
                  isDark ? "text-charcoal-400" : "text-charcoal-500"
                )}>
                  <span className={isDark ? "text-golden-400" : "text-golden-600"}>{item.calories}</span> calories
                </p>
                <p className={cn(
                  "text-xs",
                  isDark ? "text-charcoal-400" : "text-charcoal-500"
                )}>
                  <span className={cn(
                    "font-medium",
                    isDark ? "text-cream-300" : "text-charcoal-700"
                  )}>Ingredients: </span>
                  {item.ingredients.join(', ')}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Price & Actions */}
        <div className="flex items-center justify-between pt-2">
          <span className={cn(
            "text-xl font-display font-bold",
            isDark ? "text-golden-400" : "text-golden-700"
          )}>
            {formatPrice(item.price)}
          </span>
          
          {item.is_available && (
            <div className="flex items-center gap-2">
              {/* Quantity Selector */}
              <div className={cn(
                "flex items-center gap-1 rounded-lg p-1",
                isDark ? "bg-charcoal-800" : "bg-warm-100"
              )}>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={decrementQuantity}
                  className={cn(
                    "p-1.5 rounded-md transition-colors",
                    isDark ? "hover:bg-charcoal-700" : "hover:bg-warm-200"
                  )}
                >
                  <Minus className={cn(
                    "w-4 h-4",
                    isDark ? "text-cream-200" : "text-charcoal-600"
                  )} />
                </motion.button>
                <span className={cn(
                  "w-8 text-center font-semibold",
                  isDark ? "text-cream-100" : "text-charcoal-800"
                )}>{quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={incrementQuantity}
                  className={cn(
                    "p-1.5 rounded-md transition-colors",
                    isDark ? "hover:bg-charcoal-700" : "hover:bg-warm-200"
                  )}
                >
                  <Plus className={cn(
                    "w-4 h-4",
                    isDark ? "text-cream-200" : "text-charcoal-600"
                  )} />
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
