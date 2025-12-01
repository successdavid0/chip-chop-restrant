import { forwardRef, ButtonHTMLAttributes, memo } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === 'dark'
    const isDisabled = disabled || isLoading

    const variants = {
      primary: 'bg-golden-gradient text-charcoal-900 shadow-golden hover:shadow-golden-lg',
      secondary: isDark
        ? 'bg-transparent border-2 border-golden-500 text-golden-400 hover:bg-golden-500/10'
        : 'bg-transparent border-2 border-golden-600 text-golden-700 hover:bg-golden-500/10',
      ghost: isDark
        ? 'bg-transparent text-cream-200 hover:text-golden-400 hover:bg-golden-500/5'
        : 'bg-transparent text-charcoal-600 hover:text-golden-700 hover:bg-golden-500/10',
      danger: 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30',
    }

    return (
      <motion.button
        ref={ref}
        whileHover={isDisabled ? undefined : { scale: 1.02, y: -2 }}
        whileTap={isDisabled ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold rounded-xl',
          'transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
          'will-change-transform',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </motion.button>
    )
  }
))

Button.displayName = 'Button'

export default Button
