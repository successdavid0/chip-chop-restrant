import { memo, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'

const themes = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
] as const

interface ThemeToggleProps {
  variant?: 'icon' | 'dropdown'
  className?: string
}

export const ThemeToggle = memo(function ThemeToggle({ 
  variant = 'icon',
  className 
}: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const CurrentIcon = resolvedTheme === 'dark' ? Moon : Sun

  if (variant === 'icon') {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className={cn(
          'p-2.5 rounded-xl border transition-all duration-200',
          isDark
            ? 'bg-charcoal-800/60 border-charcoal-700 hover:border-golden-600/50'
            : 'bg-white/80 border-golden-200/50 hover:border-golden-400/50 shadow-soft hover:shadow-medium',
          className
        )}
        aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={resolvedTheme}
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <CurrentIcon className={cn(
              'w-5 h-5',
              isDark ? 'text-cream-200' : 'text-golden-600'
            )} />
          </motion.div>
        </AnimatePresence>
      </motion.button>
    )
  }

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'p-2.5 rounded-xl border transition-all duration-200',
          isDark
            ? 'bg-charcoal-800/60 border-charcoal-700 hover:border-golden-600/50'
            : 'bg-white/80 border-golden-200/50 hover:border-golden-400/50 shadow-soft'
        )}
        aria-label="Theme settings"
      >
        <CurrentIcon className={cn(
          'w-5 h-5',
          isDark ? 'text-cream-200' : 'text-golden-600'
        )} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute right-0 mt-2 w-40 py-2 rounded-xl z-50",
              isDark
                ? "bg-charcoal-800/95 backdrop-blur-xl border border-charcoal-700 shadow-elegant"
                : "bg-white/95 backdrop-blur-xl border border-golden-200/50 shadow-lifted"
            )}
          >
            {themes.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => {
                  setTheme(value)
                  setIsOpen(false)
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                  theme === value
                    ? isDark
                      ? 'text-golden-400 bg-golden-500/10'
                      : 'text-golden-700 bg-golden-100/50'
                    : isDark
                      ? 'text-cream-200 hover:bg-charcoal-700/50'
                      : 'text-charcoal-600 hover:bg-warm-100'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                {theme === value && (
                  <motion.div
                    layoutId="theme-indicator"
                    className="ml-auto w-1.5 h-1.5 bg-golden-500 rounded-full"
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

export default ThemeToggle
