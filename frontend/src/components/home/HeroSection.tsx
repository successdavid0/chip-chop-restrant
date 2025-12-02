import { memo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Clock, Star } from 'lucide-react'
import Button from '../ui/Button'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80'

const HeroSection = memo(function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = HERO_IMAGE
    img.onload = () => setImageLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with loading state */}
      <div className="absolute inset-0">
        <div 
          className={`absolute inset-0 transition-opacity duration-500 bg-charcoal-900 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}
        />
        {imageLoaded && (
          <img
            src={HERO_IMAGE}
            alt="Restaurant ambiance"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/95 via-charcoal-900/80 to-charcoal-900/60" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-96 h-96 border border-golden-500/10 rounded-full hidden lg:block" />
      <div className="absolute bottom-20 left-20 w-64 h-64 border border-golden-500/10 rounded-full hidden lg:block" />

      {/* Content */}
      <div className="container-custom section-padding relative z-10 pt-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-golden-500/10 border-golden-500/30 mb-6"
          >
            <Star className="w-4 h-4 text-golden-400 fill-current" />
            <span className="text-sm font-medium text-golden-400">Premium Dining Experience</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-cream-100 mb-6"
          >
            Savor the
            <span className="block text-gradient">Extraordinary</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-lg md:text-xl leading-relaxed text-charcoal-200 mb-8 max-w-xl"
          >
            Experience culinary artistry at Chip Chop Food Lounge. From traditional Nigerian 
            delicacies to international fusion, every dish tells a story of passion and perfection.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link to="/menu">
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Order Now
              </Button>
            </Link>
            <Link to="/tracking">
              <Button variant="secondary" size="lg" leftIcon={<MapPin className="w-5 h-5" />}>
                Track Delivery
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="grid grid-cols-3 gap-8 max-w-md"
          >
            {[
              { value: '50+', label: 'Menu Items' },
              { value: '4.9', label: 'Rating' },
              { value: '30min', label: 'Delivery' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-golden-400">
                  {stat.value}
                </div>
                <div className="text-sm text-charcoal-300">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-charcoal-400">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-charcoal-600 flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-golden-500 rounded-full" />
          </motion.div>
        </div>
      </motion.div>

      {/* Opening Hours Badge */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block"
      >
        <div className="glass-card-golden p-4 space-y-2">
          <div className="flex items-center gap-2 text-golden-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-semibold">Open Now</span>
          </div>
          <p className="text-sm text-cream-200">7:00 AM - 11:00 PM</p>
        </div>
      </motion.div>
    </section>
  )
})

export default HeroSection
