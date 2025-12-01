import { memo } from 'react'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import OptimizedImage from '../ui/OptimizedImage'

const ChefSection = memo(function ChefSection() {
  return (
    <section className="py-20 md:py-28 bg-charcoal-800/30 relative overflow-hidden content-auto">
      {/* Decorative Elements - simplified */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-golden-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-golden-500/5 rounded-full blur-3xl" />

      <div className="container-custom section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800"
                alt="Head Chef"
                className="w-full h-full"
                wrapperClassName="w-full h-full"
              />
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="absolute -bottom-6 -right-6 md:right-6 glass-card-golden p-6 max-w-xs"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-golden-gradient rounded-full flex items-center justify-center">
                  <span className="text-2xl font-display font-bold text-charcoal-900">15+</span>
                </div>
                <div>
                  <p className="text-cream-100 font-semibold">Years of</p>
                  <p className="text-golden-400">Experience</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative Border */}
            <div className="absolute -inset-4 border-2 border-golden-500/20 rounded-3xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <SectionHeading
              subtitle="Meet Our Chef"
              title="Crafting Culinary Masterpieces"
              align="left"
            />

            <p className="text-charcoal-200 leading-relaxed text-lg">
              Chef Adaeze Okonkwo brings over 15 years of culinary expertise, 
              blending traditional Nigerian flavors with modern international techniques. 
              Every dish at Chip Chop is a testament to her passion for excellence.
            </p>

            {/* Quote */}
            <div className="relative pl-6 border-l-2 border-golden-500">
              <Quote className="absolute -left-3 -top-1 w-6 h-6 text-golden-500 fill-golden-500/20" />
              <blockquote className="font-accent text-xl text-cream-100 italic">
                "Food is not just nourishment; it's an experience that brings people together. 
                Every plate we serve carries a piece of our soul."
              </blockquote>
              <cite className="block mt-4 text-golden-400 not-italic font-medium">
                — Chef Adaeze Okonkwo
              </cite>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              {[
                { value: '500+', label: 'Recipes' },
                { value: '50K+', label: 'Happy Customers' },
                { value: '12', label: 'Awards' },
              ].map((stat) => (
                <div key={stat.label} className="text-center glass-card p-4">
                  <div className="text-2xl font-display font-bold text-golden-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-charcoal-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

export default ChefSection
