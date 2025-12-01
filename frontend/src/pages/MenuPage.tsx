import { useState, useMemo, useCallback, memo, startTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import MenuCard from '@/components/ui/MenuCard'
import { MenuGridSkeleton } from '@/components/ui/Skeleton'
import { menuItems, categories, dietaryFilters } from '@/data/menuData'
import { cn } from '@/lib/utils'

// Memoized category button
const CategoryButton = memo(function CategoryButton({ 
  cat, 
  isActive, 
  onClick 
}: { 
  cat: { id: string; name: string; icon: string }
  isActive: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all',
        isActive
          ? 'bg-golden-gradient text-charcoal-900 shadow-golden'
          : 'bg-charcoal-800 text-cream-200 hover:bg-charcoal-700'
      )}
    >
      <span>{cat.icon}</span>
      <span className="font-medium">{cat.name}</span>
    </motion.button>
  )
})

// Memoized dietary filter button
const DietaryButton = memo(function DietaryButton({
  filter,
  isActive,
  onClick
}: {
  filter: { id: string; name: string; icon: string }
  isActive: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-xl text-sm whitespace-nowrap transition-all',
        isActive
          ? 'bg-golden-500/20 text-golden-400 border border-golden-500/50'
          : 'bg-charcoal-800/50 text-charcoal-300 border border-charcoal-700 hover:border-charcoal-600'
      )}
    >
      <span>{filter.icon}</span>
      <span>{filter.name}</span>
    </motion.button>
  )
})

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeDietary, setActiveDietary] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [isFiltering, setIsFiltering] = useState(false)

  // Optimized filtering with useMemo
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false
      }

      // Dietary filter
      if (activeDietary.length > 0) {
        const hasAllTags = activeDietary.every((tag) =>
          item.dietary_tags.includes(tag)
        )
        if (!hasAllTags) return false
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.ingredients.some((ing) => ing.toLowerCase().includes(query))
        )
      }

      return true
    })
  }, [activeCategory, activeDietary, searchQuery])

  // Callbacks with startTransition for smoother updates
  const handleCategoryChange = useCallback((catId: string) => {
    setIsFiltering(true)
    startTransition(() => {
      setActiveCategory(catId)
      setIsFiltering(false)
    })
  }, [])

  const toggleDietary = useCallback((tag: string) => {
    setIsFiltering(true)
    startTransition(() => {
      setActiveDietary((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      )
      setIsFiltering(false)
    })
  }, [])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    startTransition(() => {
      setSearchQuery(value)
    })
  }, [])

  const clearSearch = useCallback(() => {
    setSearchQuery('')
  }, [])

  const clearFilters = useCallback(() => {
    startTransition(() => {
      setActiveCategory('all')
      setActiveDietary([])
      setSearchQuery('')
    })
  }, [])

  const toggleFiltersPanel = useCallback(() => {
    setShowFilters(prev => !prev)
  }, [])

  const hasActiveFilters = activeCategory !== 'all' || activeDietary.length > 0 || searchQuery

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-24"
    >
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-800/50 to-transparent" />
        <div className="container-custom section-padding relative z-10">
          <SectionHeading
            subtitle="Explore Our"
            title="Culinary Collection"
          />
          <p className="text-center text-charcoal-200 mt-4 max-w-2xl mx-auto">
            Discover a world of flavors crafted with passion. From traditional favorites 
            to innovative creations, every dish tells a story.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="sticky top-20 z-30 bg-charcoal-900/95 backdrop-blur-xl border-b border-charcoal-800 py-4">
        <div className="container-custom section-padding">
          {/* Search & Filter Toggle */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
              <input
                type="text"
                placeholder="Search dishes, ingredients..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="input-field pl-12"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <X className="w-5 h-5 text-charcoal-400 hover:text-cream-200" />
                </button>
              )}
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleFiltersPanel}
              className={cn(
                'p-3 rounded-xl border transition-colors lg:hidden',
                showFilters
                  ? 'bg-golden-500/20 border-golden-500/50 text-golden-400'
                  : 'bg-charcoal-800 border-charcoal-700 text-cream-200'
              )}
            >
              <Filter className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Category Tabs - Desktop */}
          <div className="hidden lg:flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <CategoryButton
                key={cat.id}
                cat={cat}
                isActive={activeCategory === cat.id}
                onClick={() => handleCategoryChange(cat.id)}
              />
            ))}

            {/* Dietary Filters - Desktop */}
            <div className="h-8 w-px bg-charcoal-700 mx-2" />
            {dietaryFilters.map((filter) => (
              <DietaryButton
                key={filter.id}
                filter={filter}
                isActive={activeDietary.includes(filter.id)}
                onClick={() => toggleDietary(filter.id)}
              />
            ))}

            {hasActiveFilters && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2 text-sm text-red-400 hover:text-red-300"
              >
                <X className="w-4 h-4" />
                Clear
              </motion.button>
            )}
          </div>

          {/* Mobile Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden lg:hidden"
              >
                <div className="space-y-4 pt-4 border-t border-charcoal-800">
                  {/* Categories */}
                  <div>
                    <p className="text-sm text-charcoal-400 mb-2">Categories</p>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryChange(cat.id)}
                          className={cn(
                            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all',
                            activeCategory === cat.id
                              ? 'bg-golden-500/20 text-golden-400 border border-golden-500/50'
                              : 'bg-charcoal-800 text-cream-200'
                          )}
                        >
                          <span>{cat.icon}</span>
                          <span>{cat.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dietary */}
                  <div>
                    <p className="text-sm text-charcoal-400 mb-2">Dietary</p>
                    <div className="flex flex-wrap gap-2">
                      {dietaryFilters.map((filter) => (
                        <button
                          key={filter.id}
                          onClick={() => toggleDietary(filter.id)}
                          className={cn(
                            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all',
                            activeDietary.includes(filter.id)
                              ? 'bg-golden-500/20 text-golden-400 border border-golden-500/50'
                              : 'bg-charcoal-800/50 text-charcoal-300'
                          )}
                        >
                          <span>{filter.icon}</span>
                          <span>{filter.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="container-custom section-padding py-12">
        {/* Results Info */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-charcoal-300">
            Showing <span className="text-golden-400 font-semibold">{filteredItems.length}</span> items
          </p>
        </div>

        {/* Grid */}
        {isFiltering ? (
          <MenuGridSkeleton count={8} />
        ) : filteredItems.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-6xl mb-4">🍽️</p>
            <h3 className="text-xl font-display font-semibold text-cream-100 mb-2">
              No dishes found
            </h3>
            <p className="text-charcoal-300 mb-6">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={clearFilters}
              className="text-golden-400 hover:text-golden-300 font-medium"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
