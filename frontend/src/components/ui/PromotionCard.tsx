import { motion } from 'framer-motion'
import { Ticket, ArrowRight } from 'lucide-react'
import { Promotion } from '@/lib/supabase'
import { formatPrice } from '@/lib/utils'

interface PromotionCardProps {
  promotion: Promotion
  onApply?: (code: string) => void
}

export default function PromotionCard({ promotion, onApply }: PromotionCardProps) {
  const discountText = promotion.discount_type === 'percentage'
    ? `${promotion.discount_value}% OFF`
    : `${formatPrice(promotion.discount_value)} OFF`

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative overflow-hidden rounded-2xl group"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={promotion.image_url}
          alt={promotion.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/95 via-charcoal-900/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative p-6 md:p-8 min-h-[200px] flex flex-col justify-between">
        <div>
          {/* Discount Badge */}
          <motion.div
            initial={{ rotate: -5 }}
            whileHover={{ rotate: 0, scale: 1.1 }}
            className="inline-block px-4 py-1.5 bg-golden-gradient rounded-full mb-4"
          >
            <span className="text-charcoal-900 font-bold text-sm">{discountText}</span>
          </motion.div>
          
          <h3 className="font-display text-2xl md:text-3xl font-bold text-cream-100 mb-2">
            {promotion.title}
          </h3>
          <p className="text-charcoal-200 text-sm md:text-base max-w-md">
            {promotion.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-6">
          {/* Promo Code */}
          <div className="flex items-center gap-2 px-4 py-2 bg-charcoal-800/60 backdrop-blur-sm rounded-lg border border-dashed border-golden-500/50">
            <Ticket className="w-4 h-4 text-golden-400" />
            <span className="font-mono text-golden-400 font-semibold">{promotion.code}</span>
          </div>

          {/* Apply Button */}
          {onApply && (
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onApply(promotion.code)}
              className="flex items-center gap-2 text-cream-100 hover:text-golden-400 transition-colors"
            >
              <span className="font-medium">Apply Now</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          )}
        </div>

        {/* Minimum Order Note */}
        {promotion.min_order_value > 0 && (
          <p className="text-xs text-charcoal-400 mt-3">
            *Min. order: {formatPrice(promotion.min_order_value)}
          </p>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-20 h-20 border-2 border-golden-500/20 rounded-full" />
      <div className="absolute bottom-4 right-8 w-32 h-32 border-2 border-golden-500/10 rounded-full" />
    </motion.div>
  )
}

