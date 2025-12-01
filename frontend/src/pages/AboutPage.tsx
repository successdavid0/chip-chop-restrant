import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { Award, Users, Heart, Leaf } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    title: 'Main Dining Hall',
  },
  {
    url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200',
    title: 'Private Lounge',
  },
  {
    url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200',
    title: 'Fine Dining Experience',
  },
  {
    url: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=1200',
    title: 'Bar Area',
  },
]

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for perfection in every dish we create and every service we provide.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Our love for food drives us to innovate and deliver memorable experiences.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We believe in building connections through the shared joy of great food.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'We source locally and responsibly to support our environment and farmers.',
  },
]

const team = [
  {
    name: 'Chef Adaeze Okonkwo',
    role: 'Executive Chef',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400',
    bio: '15+ years of culinary excellence',
  },
  {
    name: 'Chidi Emeka',
    role: 'Operations Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: 'Ensuring seamless experiences',
  },
  {
    name: 'Ngozi Adebayo',
    role: 'Pastry Chef',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    bio: 'Master of sweet creations',
  },
  {
    name: 'Tunde Williams',
    role: 'Head Sommelier',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    bio: 'Curating perfect pairings',
  },
]

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          className="absolute inset-0"
        >
          {galleryImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-charcoal-900/70" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="relative z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-golden-500 font-medium tracking-widest uppercase mb-4"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream-100 mb-6"
          >
            Chip Chop
            <span className="block text-gradient">Food Lounge</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-charcoal-200 max-w-2xl mx-auto"
          >
            Where culinary artistry meets Nigerian hospitality
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28">
        <div className="container-custom section-padding">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading
                subtitle="Since 2015"
                title="A Legacy of Flavor"
                align="left"
              />
              <div className="space-y-4 mt-6 text-charcoal-200 leading-relaxed">
                <p>
                  Chip Chop Food Lounge was born from a simple dream: to create a space 
                  where the rich culinary traditions of Nigeria meet contemporary dining 
                  excellence. What started as a small family kitchen has blossomed into 
                  one of Lagos's most beloved dining destinations.
                </p>
                <p>
                  Our founder, Chef Adaeze Okonkwo, returned from years of training in 
                  Paris and New York with a vision to elevate Nigerian cuisine to new 
                  heights while honoring its authentic roots. Every dish at Chip Chop 
                  tells a story of heritage, innovation, and unwavering quality.
                </p>
                <p>
                  Today, we continue to push boundaries, blending traditional recipes 
                  with modern techniques, and serving each guest with the warmth that 
                  defines Nigerian hospitality.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600"
                      alt="Signature Dish"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600"
                      alt="Chef at work"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600"
                      alt="Restaurant interior"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600"
                      alt="Private dining"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-charcoal-800/30">
        <div className="container-custom section-padding">
          <SectionHeading
            subtitle="What Drives Us"
            title="Our Core Values"
            className="mb-16"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center group hover:border-golden-600/30 transition-colors"
              >
                <div className="w-16 h-16 bg-golden-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-charcoal-900" />
                </div>
                <h3 className="font-display text-xl font-semibold text-cream-100 mb-2">
                  {value.title}
                </h3>
                <p className="text-charcoal-300 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-28">
        <div className="container-custom section-padding">
          <SectionHeading
            subtitle="The Faces Behind"
            title="Meet Our Team"
            className="mb-16"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-lg font-semibold text-cream-100">
                      {member.name}
                    </h3>
                    <p className="text-golden-400 text-sm">{member.role}</p>
                  </div>
                </div>
                <p className="text-charcoal-300 text-sm text-center">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-28 bg-charcoal-800/30">
        <div className="container-custom section-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '8+', label: 'Years of Excellence' },
              { value: '50K+', label: 'Happy Customers' },
              { value: '500+', label: 'Unique Recipes' },
              { value: '12', label: 'Awards Won' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-5xl md:text-6xl font-bold text-golden-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-charcoal-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}

