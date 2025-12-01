import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { 
  Package, 
  ChefHat, 
  Bike, 
  CheckCircle, 
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  Search,
  Star
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

type OrderStatus = 'confirmed' | 'preparing' | 'on_the_way' | 'delivered'

const statusSteps = [
  { id: 'confirmed', label: 'Order Confirmed', icon: Package },
  { id: 'preparing', label: 'Preparing', icon: ChefHat },
  { id: 'on_the_way', label: 'On the Way', icon: Bike },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle },
]

export default function TrackingPage() {
  const { orderId } = useParams()
  const [searchOrderId, setSearchOrderId] = useState('')
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('preparing')
  const [eta, setEta] = useState(25)

  // Simulate status updates
  useEffect(() => {
    if (!orderId) return

    const statusSequence: OrderStatus[] = ['confirmed', 'preparing', 'on_the_way', 'delivered']
    let currentIndex = statusSequence.indexOf(currentStatus)

    const interval = setInterval(() => {
      if (currentIndex < statusSequence.length - 1) {
        currentIndex++
        setCurrentStatus(statusSequence[currentIndex])
        setEta(prev => Math.max(0, prev - 10))
      } else {
        clearInterval(interval)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [orderId])

  const getStatusIndex = (status: OrderStatus) => {
    return statusSteps.findIndex(step => step.id === status)
  }

  const currentStatusIndex = getStatusIndex(currentStatus)

  // If no order ID, show search form
  if (!orderId) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen pt-24 flex items-center justify-center"
      >
        <div className="container-custom section-padding max-w-md text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="w-24 h-24 bg-golden-gradient rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <MapPin className="w-12 h-12 text-charcoal-900" />
          </motion.div>

          <h1 className="font-display text-3xl font-bold text-cream-100 mb-4">
            Track Your Order
          </h1>
          <p className="text-charcoal-300 mb-8">
            Enter your order ID to see real-time delivery updates
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (searchOrderId) {
                window.location.href = `/tracking/${searchOrderId}`
              }
            }}
            className="space-y-4"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
              <input
                type="text"
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value.toUpperCase())}
                placeholder="e.g. CC-ABC123-XYZ"
                className="input-field pl-12 text-center uppercase tracking-wider"
              />
            </div>
            <Button type="submit" className="w-full">
              Track Order
            </Button>
          </form>

          <p className="text-sm text-charcoal-400 mt-6">
            Check your email or SMS for your order ID
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12"
    >
      <div className="container-custom section-padding py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl font-bold text-cream-100 mb-2">
            Order Tracking
          </h1>
          <p className="text-charcoal-300">
            Order ID: <span className="text-golden-400 font-mono">{orderId}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Status Section */}
          <div className="glass-card p-6 md:p-8">
            {/* ETA Card */}
            <div className="flex items-center justify-between p-4 bg-golden-500/10 rounded-xl border border-golden-500/30 mb-8">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-golden-400" />
                <div>
                  <p className="text-sm text-charcoal-300">Estimated Arrival</p>
                  <p className="text-xl font-display font-bold text-cream-100">
                    {currentStatus === 'delivered' ? 'Delivered!' : `${eta} minutes`}
                  </p>
                </div>
              </div>
              <motion.div
                animate={currentStatus !== 'delivered' ? { rotate: 360 } : {}}
                transition={{ duration: 2, repeat: currentStatus !== 'delivered' ? Infinity : 0, ease: 'linear' }}
                className="w-12 h-12 border-4 border-golden-500/30 border-t-golden-500 rounded-full"
              />
            </div>

            {/* Progress Steps */}
            <div className="space-y-0">
              {statusSteps.map((step, index) => {
                const isCompleted = index <= currentStatusIndex
                const isCurrent = index === currentStatusIndex
                const StepIcon = step.icon

                return (
                  <div key={step.id} className="flex gap-4">
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isCurrent ? 1.1 : 1,
                          backgroundColor: isCompleted ? '#D4A528' : '#424242',
                        }}
                        className={cn(
                          'w-12 h-12 rounded-full flex items-center justify-center',
                          isCurrent && 'ring-4 ring-golden-500/30'
                        )}
                      >
                        <StepIcon className={cn(
                          'w-6 h-6',
                          isCompleted ? 'text-charcoal-900' : 'text-charcoal-400'
                        )} />
                      </motion.div>
                      {index < statusSteps.length - 1 && (
                        <div className={cn(
                          'w-0.5 h-16',
                          index < currentStatusIndex ? 'bg-golden-500' : 'bg-charcoal-700'
                        )} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-grow pb-8">
                      <h3 className={cn(
                        'font-semibold mb-1',
                        isCompleted ? 'text-cream-100' : 'text-charcoal-400'
                      )}>
                        {step.label}
                      </h3>
                      <p className="text-sm text-charcoal-400">
                        {isCurrent && step.id === 'confirmed' && 'Your order has been received'}
                        {isCurrent && step.id === 'preparing' && 'Chef is preparing your meal'}
                        {isCurrent && step.id === 'on_the_way' && 'Rider is heading to your location'}
                        {isCurrent && step.id === 'delivered' && 'Order delivered successfully!'}
                        {!isCurrent && isCompleted && 'Completed'}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Map & Rider Section */}
          <div className="space-y-6">
            {/* Map Placeholder */}
            <div className="glass-card p-4 h-64 relative overflow-hidden">
              <div className="absolute inset-0 bg-charcoal-800">
                <img
                  src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800"
                  alt="Map"
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-golden-500 mx-auto mb-2" />
                    <p className="text-cream-200 font-medium">Live map tracking</p>
                    <p className="text-sm text-charcoal-400">Coming soon</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rider Info */}
            {(currentStatus === 'on_the_way' || currentStatus === 'delivered') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card-golden p-6"
              >
                <h3 className="font-display font-semibold text-cream-100 mb-4">
                  Your Rider
                </h3>
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
                    alt="Rider"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-grow">
                    <h4 className="font-semibold text-cream-100">Emeka Johnson</h4>
                    <div className="flex items-center gap-1 text-sm text-charcoal-300">
                      <Star className="w-4 h-4 text-golden-400 fill-golden-400" />
                      <span>4.9</span>
                      <span className="text-charcoal-500">•</span>
                      <span>500+ deliveries</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <a href="tel:+2348000000000" className="flex-1">
                    <Button variant="secondary" className="w-full" leftIcon={<Phone className="w-4 h-4" />}>
                      Call
                    </Button>
                  </a>
                  <Button variant="secondary" className="flex-1" leftIcon={<MessageCircle className="w-4 h-4" />}>
                    Message
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Delivery Address */}
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-cream-100 mb-3">
                Delivery Address
              </h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-golden-400 mt-0.5" />
                <p className="text-charcoal-200">
                  123 Victoria Island, Lagos, Nigeria
                </p>
              </div>
            </div>

            {/* Need Help */}
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-cream-100 mb-3">
                Need Help?
              </h3>
              <p className="text-sm text-charcoal-300 mb-4">
                Contact our support team for any issues with your order
              </p>
              <Link to="/contact">
                <Button variant="ghost" className="w-full">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

