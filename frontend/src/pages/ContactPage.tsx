import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['123 Victoria Island', 'Lagos, Nigeria'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+234 800 CHIPCHOP', '+234 901 234 5678'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['hello@chipchop.ng', 'support@chipchop.ng'],
  },
  {
    icon: Clock,
    title: 'Opening Hours',
    details: ['Mon - Fri: 7AM - 11PM', 'Sat - Sun: 8AM - 12AM'],
  },
]

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram', handle: '@chipchop.ng' },
  { icon: Facebook, href: '#', label: 'Facebook', handle: 'ChipChopFoodLounge' },
  { icon: Twitter, href: '#', label: 'Twitter', handle: '@chipchop_ng' },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast.success('Message sent successfully! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24"
    >
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container-custom section-padding">
          <SectionHeading
            subtitle="Get in Touch"
            title="We'd Love to Hear From You"
          />
          <p className="text-center text-charcoal-200 mt-4 max-w-2xl mx-auto">
            Have a question, feedback, or want to make a reservation? 
            Reach out to us and our team will respond promptly.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-16">
        <div className="container-custom section-padding">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center group hover:border-golden-600/30 transition-colors"
              >
                <div className="w-14 h-14 bg-golden-gradient rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <info.icon className="w-7 h-7 text-charcoal-900" />
                </div>
                <h3 className="font-display text-lg font-semibold text-cream-100 mb-2">
                  {info.title}
                </h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-charcoal-300 text-sm">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Map Section */}
      <section className="py-16 bg-charcoal-800/30">
        <div className="container-custom section-padding">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card-golden p-6 md:p-8"
            >
              <h2 className="font-display text-2xl font-semibold text-cream-100 mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-charcoal-300 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-charcoal-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-charcoal-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="+234 000 000 0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-charcoal-300 mb-2">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input-field"
                    >
                      <option value="">Select a subject</option>
                      <option value="reservation">Table Reservation</option>
                      <option value="feedback">Feedback</option>
                      <option value="order">Order Issue</option>
                      <option value="catering">Catering Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-charcoal-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="input-field resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  isLoading={isSubmitting}
                  rightIcon={!isSubmitting && <Send className="w-5 h-5" />}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>

            {/* Map & Social */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Map Placeholder */}
              <div className="glass-card h-64 md:h-80 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800"
                  alt="Location Map"
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-golden-500 mx-auto mb-2" />
                    <p className="text-cream-200 font-medium">123 Victoria Island</p>
                    <p className="text-charcoal-400 text-sm">Lagos, Nigeria</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="glass-card-golden p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-display text-lg font-semibold text-cream-100">
                      Chat on WhatsApp
                    </h3>
                    <p className="text-sm text-charcoal-300">
                      Quick response for orders & support
                    </p>
                  </div>
                  <a
                    href="https://wa.me/2348000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm">Chat Now</Button>
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass-card p-6">
                <h3 className="font-display text-lg font-semibold text-cream-100 mb-4">
                  Follow Us
                </h3>
                <div className="space-y-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-charcoal-800/50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-charcoal-800 rounded-lg flex items-center justify-center group-hover:bg-golden-500/20 transition-colors">
                        <social.icon className="w-5 h-5 text-cream-200 group-hover:text-golden-400 transition-colors" />
                      </div>
                      <div>
                        <p className="text-cream-100 font-medium">{social.label}</p>
                        <p className="text-sm text-charcoal-400">{social.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-16">
        <div className="container-custom section-padding text-center">
          <h2 className="font-display text-2xl font-semibold text-cream-100 mb-4">
            Have Questions?
          </h2>
          <p className="text-charcoal-300 mb-6 max-w-xl mx-auto">
            Check out our frequently asked questions or reach out to us directly. 
            We're here to help!
          </p>
          <Button variant="secondary">View FAQs</Button>
        </div>
      </section>
    </motion.div>
  )
}

