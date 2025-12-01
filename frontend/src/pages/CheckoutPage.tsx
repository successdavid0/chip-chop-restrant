import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { 
  ChevronLeft, 
  MapPin, 
  Clock, 
  CreditCard, 
  Wallet,
  Check,
  ArrowRight
} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice, generateOrderId } from '@/lib/utils'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'

const steps = [
  { id: 1, name: 'Delivery' },
  { id: 2, name: 'Schedule' },
  { id: 3, name: 'Payment' },
]

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
  { id: 'wallet', name: 'Wallet', icon: Wallet },
]

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, subtotal, deliveryFee, discount, total, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Lagos',
    landmark: '',
    scheduleType: 'asap',
    scheduleDate: '',
    scheduleTime: '',
    paymentMethod: 'card',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const orderId = generateOrderId()
    clearCart()
    toast.success('Order placed successfully!')
    navigate(`/tracking/${orderId}`)
  }

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pt-24 flex items-center justify-center"
      >
        <div className="text-center px-4">
          <h2 className="font-display text-3xl font-bold text-cream-100 mb-4">
            Your cart is empty
          </h2>
          <Link to="/menu">
            <Button>Go to Menu</Button>
          </Link>
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
        <div className="flex items-center gap-4 mb-8">
          <Link to="/cart" className="p-2 hover:bg-charcoal-800 rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6 text-cream-200" />
          </Link>
          <h1 className="font-display text-3xl font-bold text-cream-100">
            Checkout
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all',
                    currentStep > step.id
                      ? 'bg-emerald-500 text-white'
                      : currentStep === step.id
                      ? 'bg-golden-gradient text-charcoal-900'
                      : 'bg-charcoal-800 text-charcoal-400'
                  )}
                >
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={cn(
                    'hidden sm:block font-medium',
                    currentStep >= step.id ? 'text-cream-100' : 'text-charcoal-400'
                  )}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'w-16 sm:w-24 h-0.5 mx-2 sm:mx-4',
                    currentStep > step.id ? 'bg-emerald-500' : 'bg-charcoal-700'
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-6 md:p-8"
            >
              {/* Step 1: Delivery Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-6 h-6 text-golden-400" />
                    <h2 className="font-display text-xl font-semibold text-cream-100">
                      Delivery Details
                    </h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-charcoal-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-charcoal-300 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="+234 800 000 0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-charcoal-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-charcoal-300 mb-2">Delivery Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="123 Main Street, Victoria Island"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-charcoal-300 mb-2">City</label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="Lagos">Lagos</option>
                        <option value="Abuja">Abuja</option>
                        <option value="Port Harcourt">Port Harcourt</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-charcoal-300 mb-2">Landmark (Optional)</label>
                      <input
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Near GTBank"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Schedule */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="w-6 h-6 text-golden-400" />
                    <h2 className="font-display text-xl font-semibold text-cream-100">
                      Delivery Schedule
                    </h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({ ...formData, scheduleType: 'asap' })}
                      className={cn(
                        'p-4 rounded-xl border-2 text-left transition-all',
                        formData.scheduleType === 'asap'
                          ? 'border-golden-500 bg-golden-500/10'
                          : 'border-charcoal-700 bg-charcoal-800/50 hover:border-charcoal-600'
                      )}
                    >
                      <h3 className="font-semibold text-cream-100">As Soon As Possible</h3>
                      <p className="text-sm text-charcoal-300 mt-1">Delivery in 30-45 minutes</p>
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({ ...formData, scheduleType: 'scheduled' })}
                      className={cn(
                        'p-4 rounded-xl border-2 text-left transition-all',
                        formData.scheduleType === 'scheduled'
                          ? 'border-golden-500 bg-golden-500/10'
                          : 'border-charcoal-700 bg-charcoal-800/50 hover:border-charcoal-600'
                      )}
                    >
                      <h3 className="font-semibold text-cream-100">Schedule for Later</h3>
                      <p className="text-sm text-charcoal-300 mt-1">Choose date and time</p>
                    </motion.button>
                  </div>

                  {formData.scheduleType === 'scheduled' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="grid sm:grid-cols-2 gap-4"
                    >
                      <div>
                        <label className="block text-sm text-charcoal-300 mb-2">Date</label>
                        <input
                          type="date"
                          name="scheduleDate"
                          value={formData.scheduleDate}
                          onChange={handleInputChange}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-charcoal-300 mb-2">Time</label>
                        <input
                          type="time"
                          name="scheduleTime"
                          value={formData.scheduleTime}
                          onChange={handleInputChange}
                          className="input-field"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-6 h-6 text-golden-400" />
                    <h2 className="font-display text-xl font-semibold text-cream-100">
                      Payment Method
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <motion.button
                        key={method.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                        className={cn(
                          'w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all',
                          formData.paymentMethod === method.id
                            ? 'border-golden-500 bg-golden-500/10'
                            : 'border-charcoal-700 bg-charcoal-800/50 hover:border-charcoal-600'
                        )}
                      >
                        <div className={cn(
                          'p-3 rounded-xl',
                          formData.paymentMethod === method.id
                            ? 'bg-golden-gradient'
                            : 'bg-charcoal-700'
                        )}>
                          <method.icon className={cn(
                            'w-6 h-6',
                            formData.paymentMethod === method.id
                              ? 'text-charcoal-900'
                              : 'text-cream-200'
                          )} />
                        </div>
                        <span className="font-medium text-cream-100">{method.name}</span>
                        {formData.paymentMethod === method.id && (
                          <Check className="w-5 h-5 text-golden-400 ml-auto" />
                        )}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-charcoal-800/50 rounded-xl border border-charcoal-700">
                    <p className="text-sm text-charcoal-300">
                      Your payment will be securely processed through Paystack. 
                      We never store your card details.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-charcoal-700">
                {currentStep > 1 ? (
                  <Button variant="ghost" onClick={prevStep}>
                    Back
                  </Button>
                ) : (
                  <div />
                )}
                
                {currentStep < 3 ? (
                  <Button onClick={nextStep} rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Continue
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    isLoading={isProcessing}
                    rightIcon={!isProcessing && <ArrowRight className="w-5 h-5" />}
                  >
                    {isProcessing ? 'Processing...' : `Pay ${formatPrice(total)}`}
                  </Button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-28">
              <h2 className="font-display text-xl font-semibold text-cream-100 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.menuItem.image_url}
                        alt={item.menuItem.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm text-cream-100 truncate">{item.menuItem.name}</p>
                      <p className="text-xs text-charcoal-400">x{item.quantity}</p>
                    </div>
                    <p className="text-sm text-golden-400 font-medium">
                      {formatPrice(item.menuItem.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-charcoal-700">
                <div className="flex justify-between text-charcoal-200">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-charcoal-200">
                  <span>Delivery Fee</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="h-px bg-charcoal-700" />
                <div className="flex justify-between text-cream-100 font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-golden-400">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

