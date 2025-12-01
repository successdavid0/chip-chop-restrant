import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'

export default function PageLoader() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center",
      isDark 
        ? "bg-charcoal-900" 
        : "bg-gradient-to-b from-warm-50 to-warm-100"
    )}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        {/* Animated Logo */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-20 h-20 bg-golden-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-golden"
        >
          <span className="text-3xl font-display font-bold text-charcoal-900">CC</span>
        </motion.div>
        
        {/* Loading Bar */}
        <div className={cn(
          "w-48 h-1 rounded-full overflow-hidden mx-auto",
          isDark ? "bg-charcoal-800" : "bg-golden-100"
        )}>
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1/2 h-full bg-golden-gradient"
          />
        </div>
        
        <p className={cn(
          "text-sm mt-4",
          isDark ? "text-charcoal-400" : "text-charcoal-500"
        )}>
          Loading deliciousness...
        </p>
      </motion.div>
    </div>
  )
}
