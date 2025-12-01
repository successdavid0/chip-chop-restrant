import { memo, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import HeroSection from '@/components/home/HeroSection'
import { Skeleton } from '@/components/ui/Skeleton'

// Lazy load below-the-fold components
const FeaturedMenu = lazy(() => import('@/components/home/FeaturedMenu'))
const PromotionsSection = lazy(() => import('@/components/home/PromotionsSection'))
const HighlightsSection = lazy(() => import('@/components/home/HighlightsSection'))
const ChefSection = lazy(() => import('@/components/home/ChefSection'))
const CTASection = lazy(() => import('@/components/home/CTASection'))

// Section loading placeholder
const SectionLoader = memo(function SectionLoader() {
  return (
    <div className="py-20 md:py-28">
      <div className="container-custom section-padding">
        <div className="space-y-4 mb-12">
          <Skeleton className="h-6 w-32 mx-auto" />
          <Skeleton className="h-10 w-64 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
})

const HomePage = memo(function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero loads immediately */}
      <HeroSection />
      
      {/* Below-the-fold content loads lazily */}
      <Suspense fallback={<SectionLoader />}>
        <FeaturedMenu />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <PromotionsSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <HighlightsSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ChefSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <CTASection />
      </Suspense>
    </motion.div>
  )
})

export default HomePage
