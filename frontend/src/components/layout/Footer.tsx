import { memo, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react'
import toast from 'react-hot-toast'

const footerLinks = {
  quickLinks: [
    { label: 'Menu', href: '/menu' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Track Order', href: '/tracking' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Refund Policy', href: '#' },
  ],
}

const contactInfo = [
  { icon: MapPin, text: '123 Victoria Island, Lagos, Nigeria' },
  { icon: Phone, text: '+234 800 CHIPCHOP' },
  { icon: Mail, text: 'hello@chipchop.ng' },
  { icon: Clock, text: 'Mon - Sun: 7AM - 11PM' },
]

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
]

const Footer = memo(function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success('Thanks for subscribing!')
      setEmail('')
    }
  }, [email])

  return (
    <footer className="bg-charcoal-900 border-t border-charcoal-800">
      {/* Main Footer */}
      <div className="container-custom section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-golden-gradient rounded-xl flex items-center justify-center shadow-golden">
                <span className="text-2xl font-display font-bold text-charcoal-900">CC</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-cream-100">Chip Chop</h3>
                <p className="text-xs tracking-widest uppercase text-golden-500">Food Lounge</p>
              </div>
            </Link>
            <p className="text-charcoal-300 leading-relaxed">
              Experience culinary excellence with every bite. Premium dining and delivery 
              service bringing you the finest flavors of Lagos and beyond.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl border bg-charcoal-800 border-charcoal-700 hover:border-golden-600/50 hover:bg-golden-500/10 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-cream-200" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-cream-100 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-charcoal-300 hover:text-golden-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold text-cream-100 mb-6">Contact Us</h4>
            <ul className="space-y-4">
              {contactInfo.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 mt-0.5 flex-shrink-0 text-golden-500" />
                  <span className="text-charcoal-300">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-lg font-semibold text-cream-100 mb-6">Newsletter</h4>
            <p className="text-charcoal-300 mb-4">
              Subscribe to get exclusive offers and updates on new dishes.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input-field text-sm"
              />
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full btn-primary text-sm"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-800">
        <div className="container-custom section-padding py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-charcoal-400">
              © {new Date().getFullYear()} Chip Chop Food Lounge. All rights reserved.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-charcoal-400 hover:text-golden-400 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
})

export default Footer
