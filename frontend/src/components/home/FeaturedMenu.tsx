import { useRef, memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import MenuCard from '../ui/MenuCard'
import { menuItems } from '@/data/menuData'

const FeaturedMenu = memo(function FeaturedMenu() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }, [])

  const scrollLeft = useCallback(() => scroll('left'), [scroll])
  const scrollRight = useCallback(() => scroll('right'), [scroll])

  // Get featured items (first 6)
  const featuredItems = menuItems.slice(0, 6)

  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeading
            subtitle="Our Menu"
            title="Featured Dishes"
            align="left"
          />
          
          <div className="flex items-center gap-4">
            {/* Navigation Buttons */}
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={scrollLeft}
                className="p-3 bg-charcoal-800 rounded-xl border border-charcoal-700 hover:border-golden-600/50 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-cream-200" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={scrollRight}
                className="p-3 bg-charcoal-800 rounded-xl border border-charcoal-700 hover:border-golden-600/50 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-cream-200" />
              </motion.button>
            </div>

            {/* View All Link */}
            <Link
              to="/menu"
              className="hidden md:flex items-center gap-2 text-golden-400 hover:text-golden-300 transition-colors font-medium"
            >
              View Full Menu
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Menu Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: Math.min(index * 0.1, 0.3), duration: 0.3 }}
              className="flex-shrink-0 w-[300px] snap-start"
            >
              <MenuCard item={item} />
            </motion.div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-golden-400 hover:text-golden-300 transition-colors font-medium"
          >
            View Full Menu
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
})

export default FeaturedMenu
