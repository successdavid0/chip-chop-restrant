import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import SectionHeading from '../ui/SectionHeading'
import PromotionCard from '../ui/PromotionCard'
import { promotions } from '@/data/menuData'
import toast from 'react-hot-toast'

const PromotionsSection = memo(function PromotionsSection() {
  const handleApplyPromo = useCallback((code: string) => {
    navigator.clipboard.writeText(code)
    toast.success(`Code ${code} copied to clipboard!`)
  }, [])

  return (
    <section className="py-20 md:py-28 bg-charcoal-800/30 content-auto">
      <div className="container-custom section-padding">
        <SectionHeading
          subtitle="Special Offers"
          title="Hot Deals & Promotions"
          className="mb-12"
        />

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2 },
          }}
          className="promotions-swiper"
        >
          {promotions.map((promo, index) => (
            <SwiperSlide key={promo.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: Math.min(index * 0.1, 0.2), duration: 0.3 }}
              >
                <PromotionCard promotion={promo} onApply={handleApplyPromo} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .promotions-swiper .swiper-pagination {
          position: relative;
          margin-top: 2rem;
        }
        .promotions-swiper .swiper-pagination-bullet {
          background: #424242;
          opacity: 1;
          width: 12px;
          height: 12px;
        }
        .promotions-swiper .swiper-pagination-bullet-active {
          background: linear-gradient(135deg, #D4A528, #B8860B);
          width: 32px;
          border-radius: 6px;
        }
      `}</style>
    </section>
  )
})

export default PromotionsSection
