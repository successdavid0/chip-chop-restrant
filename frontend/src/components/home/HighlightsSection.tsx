import { memo } from 'react'
import { motion } from 'framer-motion'
import { UtensilsCrossed, Clock, Truck, Award } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

const highlights = [
  {
    icon: UtensilsCrossed,
    title: 'Premium Ingredients',
    description: 'We source only the finest, freshest ingredients for every dish we prepare.',
  },
  {
    icon: Clock,
    title: 'Fast Preparation',
    description: 'Our expert chefs prepare your meals with speed without compromising quality.',
  },
  {
    icon: Truck,
    title: 'Swift Delivery',
    description: 'Hot, fresh food delivered to your doorstep in 30 minutes or less.',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized for culinary excellence and outstanding customer service.',
  },
]

// Memoized highlight card
const HighlightCard = memo(function HighlightCard({ 
  item, 
  index 
}: { 
  item: typeof highlights[0]
  index: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: Math.min(index * 0.1, 0.3), duration: 0.3 }}
      whileHover={{ y: -10 }}
      className="group text-center"
    >
      {/* Icon */}
      <motion.div
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ duration: 0.2 }}
        className="inline-flex items-center justify-center w-20 h-20 bg-golden-gradient rounded-2xl shadow-golden mb-6 mx-auto"
      >
        <item.icon className="w-10 h-10 text-charcoal-900" />
      </motion.div>

      {/* Content */}
      <h3 className="font-display text-xl font-semibold text-cream-100 mb-3 group-hover:text-golden-400 transition-colors duration-200">
        {item.title}
      </h3>
      <p className="text-charcoal-300 leading-relaxed">
        {item.description}
      </p>
    </motion.div>
  )
})

const HighlightsSection = memo(function HighlightsSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden content-auto">
      {/* Background Pattern - simplified */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #D4A528 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-custom section-padding relative z-10">
        <SectionHeading
          subtitle="Why Choose Us"
          title="The Chip Chop Difference"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <HighlightCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
})

export default HighlightsSection
