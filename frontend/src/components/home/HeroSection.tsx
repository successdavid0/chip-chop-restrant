import { memo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Clock, Star } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'
import Button from '../ui/Button'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80'

const HeroSection = memo(function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

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
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            imageLoaded ? 'opacity-0' : 'opacity-100',
            isDark ? 'bg-charcoal-900' : 'bg-warm-50'
          )}
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
        {/* Gradient overlays */}
        <div className={cn(
          "absolute inset-0",
          isDark 
            ? "bg-gradient-to-r from-charcoal-900/95 via-charcoal-900/80 to-charcoal-900/60"
            : "bg-gradient-to-r from-warm-50/[0.97] via-warm-50/90 to-warm-50/70"
        )} />
        
        {/* Light mode: warm accent glow */}
        {!isDark && (
          <div className="absolute inset-0 bg-gradient-to-br from-golden-400/5 via-transparent to-golden-500/10" />
        )}
      </div>

      {/* Decorative Elements */}
      <div className={cn(
        "absolute top-20 right-20 w-96 h-96 border rounded-full hidden lg:block",
        isDark ? "border-golden-500/10" : "border-golden-500/15"
      )} />
      <div className={cn(
        "absolute bottom-20 left-20 w-64 h-64 border rounded-full hidden lg:block",
        isDark ? "border-golden-500/10" : "border-golden-500/15"
      )} />

      {/* Content */}
      <div className="container-custom section-padding relative z-10 pt-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6",
              isDark 
                ? "bg-golden-500/10 border-golden-500/30"
                : "bg-gradient-to-r from-golden-100 to-golden-50 border-golden-300 shadow-soft"
            )}
          >
            <Star className={cn(
              "w-4 h-4 fill-current",
              isDark ? "text-golden-400" : "text-golden-600"
            )} />
            <span className={cn(
              "text-sm font-medium",
              isDark ? "text-golden-400" : "text-golden-800"
            )}>Premium Dining Experience</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className={cn(
              "font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6",
              isDark ? "text-cream-100" : "text-charcoal-800"
            )}
          >
            Savor the
            <span className="block text-gradient">Extraordinary</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className={cn(
              "text-lg md:text-xl leading-relaxed mb-8 max-w-xl",
              isDark ? "text-charcoal-200" : "text-charcoal-600"
            )}
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
              <div key={index} className={cn(
                "text-center p-3 rounded-xl",
                !isDark && "bg-white/50 shadow-soft"
              )}>
                <div className={cn(
                  "text-2xl md:text-3xl font-display font-bold",
                  isDark ? "text-golden-400" : "text-golden-600"
                )}>
                  {stat.value}
                </div>
                <div className={cn(
                  "text-sm",
                  isDark ? "text-charcoal-300" : "text-charcoal-500"
                )}>{stat.label}</div>
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
          <span className={cn(
            "text-xs uppercase tracking-widest",
            isDark ? "text-charcoal-400" : "text-charcoal-500"
          )}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className={cn(
              "w-6 h-10 rounded-full border-2 flex justify-center pt-2",
              isDark ? "border-charcoal-600" : "border-golden-400/50"
            )}
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
        <div className={cn(
          "glass-card-golden p-4 space-y-2",
          !isDark && "shadow-lifted"
        )}>
          <div className={cn(
            "flex items-center gap-2",
            isDark ? "text-golden-400" : "text-golden-700"
          )}>
            <Clock className="w-4 h-4" />
            <span className="text-sm font-semibold">Open Now</span>
          </div>
          <p className={cn(
            "text-sm",
            isDark ? "text-cream-200" : "text-charcoal-600"
          )}>7:00 AM - 11:00 PM</p>
        </div>
      </motion.div>
    </section>
  )
})

export default HeroSection
