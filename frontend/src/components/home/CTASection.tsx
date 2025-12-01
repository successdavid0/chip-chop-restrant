import { memo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Phone, MapPin, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'

const CTASection = memo(function CTASection() {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=70'
    img.onload = () => setImageLoaded(true)
  }, [])

  return (
    <section className="py-20 md:py-28 relative overflow-hidden content-auto">
      {/* Background */}
      <div className="absolute inset-0">
        {imageLoaded && (
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=70"
            alt="Restaurant Interior"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-charcoal-900/90" />
      </div>

      {/* Golden Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-golden-600/10 via-transparent to-golden-600/10" />

      {/* Content */}
      <div className="container-custom section-padding relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream-100 mb-6"
          >
            Ready for a
            <span className="text-gradient block">Taste Adventure?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-lg text-charcoal-200 mb-10 max-w-2xl mx-auto"
          >
            Whether you're dining in or ordering delivery, Chip Chop promises 
            an unforgettable culinary journey. Join us today!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Link to="/menu">
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Order Online
              </Button>
            </Link>
            <a href="tel:+234800CHIPCHOP">
              <Button variant="secondary" size="lg" leftIcon={<Phone className="w-5 h-5" />}>
                Call to Reserve
              </Button>
            </a>
          </motion.div>

          {/* Location Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="inline-flex items-center gap-2 px-6 py-3 glass-card-golden"
          >
            <MapPin className="w-5 h-5 text-golden-400" />
            <span className="text-cream-200">123 Victoria Island, Lagos, Nigeria</span>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements - simplified */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-golden-500/20 rounded-full hidden lg:block" />
      <div className="absolute bottom-10 right-10 w-48 h-48 border border-golden-500/20 rounded-full hidden lg:block" />
    </section>
  )
})

export default CTASection
