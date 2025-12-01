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
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'
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
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const handleSubscribe = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success('Thanks for subscribing!')
      setEmail('')
    }
  }, [email])

  return (
    <footer className={cn(
      "border-t",
      isDark 
        ? "bg-charcoal-900 border-charcoal-800" 
        : "bg-gradient-to-b from-warm-50 to-warm-100 border-golden-200/50"
    )}>
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
                <h3 className={cn(
                  "font-display text-xl font-bold",
                  isDark ? "text-cream-100" : "text-charcoal-800"
                )}>Chip Chop</h3>
                <p className={cn(
                  "text-xs tracking-widest uppercase",
                  isDark ? "text-golden-500" : "text-golden-600"
                )}>Food Lounge</p>
              </div>
            </Link>
            <p className={cn(
              "leading-relaxed",
              isDark ? "text-charcoal-300" : "text-charcoal-600"
            )}>
              Experience culinary excellence with every bite. Premium dining and delivery 
              service bringing you the finest flavors of Lagos and beyond.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "p-3 rounded-xl border transition-all duration-200",
                    isDark
                      ? "bg-charcoal-800 border-charcoal-700 hover:border-golden-600/50 hover:bg-golden-500/10"
                      : "bg-white border-golden-200/50 hover:border-golden-400/50 hover:bg-golden-50 shadow-soft hover:shadow-medium"
                  )}
                  aria-label={social.label}
                >
                  <social.icon className={cn(
                    "w-5 h-5",
                    isDark ? "text-cream-200" : "text-golden-700"
                  )} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={cn(
              "font-display text-lg font-semibold mb-6",
              isDark ? "text-cream-100" : "text-charcoal-800"
            )}>Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={cn(
                      "transition-colors duration-200",
                      isDark 
                        ? "text-charcoal-300 hover:text-golden-400" 
                        : "text-charcoal-600 hover:text-golden-700"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={cn(
              "font-display text-lg font-semibold mb-6",
              isDark ? "text-cream-100" : "text-charcoal-800"
            )}>Contact Us</h4>
            <ul className="space-y-4">
              {contactInfo.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <item.icon className={cn(
                    "w-5 h-5 mt-0.5 flex-shrink-0",
                    isDark ? "text-golden-500" : "text-golden-600"
                  )} />
                  <span className={isDark ? "text-charcoal-300" : "text-charcoal-600"}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className={cn(
              "font-display text-lg font-semibold mb-6",
              isDark ? "text-cream-100" : "text-charcoal-800"
            )}>Newsletter</h4>
            <p className={cn(
              "mb-4",
              isDark ? "text-charcoal-300" : "text-charcoal-600"
            )}>
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
      <div className={cn(
        "border-t",
        isDark ? "border-charcoal-800" : "border-golden-200/50"
      )}>
        <div className="container-custom section-padding py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={cn(
              "text-sm",
              isDark ? "text-charcoal-400" : "text-charcoal-500"
            )}>
              © {new Date().getFullYear()} Chip Chop Food Lounge. All rights reserved.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-sm transition-colors duration-200",
                    isDark 
                      ? "text-charcoal-400 hover:text-golden-400" 
                      : "text-charcoal-500 hover:text-golden-700"
                  )}
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
