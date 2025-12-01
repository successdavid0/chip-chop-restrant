# 🍽️ Chip Chop Food Lounge

**Premium Dining & Delivery Platform**

A beautiful, high-performance restaurant ordering and delivery platform built with React, FastAPI, and Supabase. Features real-time order tracking, smooth animations, and a luxurious GoldenBrown–Black–White design aesthetic.

![Chip Chop Preview](https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200)

---

## ✨ Features

### Customer Features
- 🍔 **Beautiful Menu** - Browse dishes with filters, categories, and dietary tags
- 🛒 **Smart Cart** - Easy cart management with quantity updates and promo codes
- 💳 **Secure Checkout** - Multiple payment options (Paystack, Flutterwave, Wallet)
- 📍 **Real-time Tracking** - Live order and rider location tracking
- ⏰ **Scheduled Orders** - Pre-order for specific delivery times
- ❤️ **Favorites** - Save your favorite dishes
- 📱 **Mobile-First** - Optimized for all devices

### Restaurant Features
- 📋 **Order Management** - Real-time order notifications
- 📊 **Analytics Dashboard** - Track sales and popular items
- 🎫 **Promotions** - Create and manage discount codes
- 📦 **Inventory Management** - Track availability

### Technical Features
- ⚡ **Lightning Fast** - Optimized React + Vite frontend
- 🎨 **Stunning Animations** - Framer Motion for smooth interactions
- 🔐 **Secure Auth** - JWT + Supabase authentication
- 🔄 **Real-time Updates** - WebSocket for live tracking
- 📱 **PWA Ready** - Installable on mobile devices

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **React Router v6** - Routing
- **Swiper** - Carousels

### Backend
- **FastAPI** - Python web framework
- **Pydantic** - Data validation
- **Supabase** - Database & Auth
- **Celery** - Background tasks
- **Redis** - Caching & queues

### Infrastructure
- **Supabase** - PostgreSQL + Auth + Storage + Realtime
- **Paystack/Flutterwave** - Payment processing
- **Google Maps API** - Delivery tracking

---

## 📁 Project Structure

```
chipchop-app/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── home/         # Home page components
│   │   │   ├── layout/       # Layout components
│   │   │   └── ui/           # Core UI components
│   │   ├── pages/            # Page components
│   │   ├── context/          # React context providers
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utilities & Supabase client
│   │   ├── data/             # Static data & types
│   │   └── styles/           # Global styles
│   └── package.json
│
├── backend/                  # FastAPI backend
│   ├── app/
│   │   ├── api/              # API routes
│   │   ├── models/           # Pydantic models
│   │   ├── services/         # Business logic
│   │   └── main.py           # App entry point
│   └── requirements.txt
│
├── supabase/                 # Database & config
│   ├── db.sql                # Database schema
│   ├── storage_buckets.md    # Storage configuration
│   └── authentication_rules.md
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- Supabase account
- Paystack account (for payments)

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your credentials
# Then start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Update .env with your credentials
# Then start development server
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`
API documentation at `http://localhost:8000/docs`

### Database Setup

1. Create a new project in [Supabase](https://supabase.com)
2. Run the SQL in `supabase/db.sql` in the Supabase SQL editor
3. Configure storage buckets as described in `supabase/storage_buckets.md`
4. Update your environment files with Supabase credentials

---

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Golden | `#D4A528` | Primary accent, CTAs |
| Dark Golden | `#B8860B` | Hover states |
| Charcoal | `#1F1F1F` | Background |
| Cream | `#FFF8F0` | Text, cards |

### Typography

- **Display**: Playfair Display (headings)
- **Body**: DM Sans (content)
- **Accent**: Cormorant Garamond (quotes)

### Animation Guidelines

- Use Framer Motion for all UI animations
- Page transitions: Fade + slide up
- Hover effects: Scale + shadow
- Keep animations under 300ms for responsiveness

---

## 📱 Responsive Design

- **Mobile First**: All designs start from mobile
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Sticky cart bar**: Always visible on mobile
- **Touch-friendly**: Large tap targets, swipe gestures

---

## 🔐 Security

- JWT-based authentication
- Row Level Security (RLS) on all database tables
- CORS configured for allowed origins
- Input validation with Pydantic
- Secure payment processing via Paystack

---

## 📡 API Endpoints

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get specific item
- `POST /api/menu` - Create item (admin)
- `PATCH /api/menu/:id` - Update item (admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PATCH /api/orders/:id` - Update order status

### Payments
- `POST /api/payments/initialize` - Initialize payment
- `GET /api/payments/verify/:ref` - Verify payment

### Tracking
- `GET /api/tracking/:orderId` - Get tracking info
- `WS /api/tracking/ws/:orderId` - Real-time updates

---

## 🚢 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the `dist` folder
```

### Backend (Railway/Render)
```bash
# Set environment variables in platform
# Deploy from GitHub repository
```

---

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

---

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com) for beautiful food photography
- [Lucide](https://lucide.dev) for icons
- [Framer Motion](https://framer.com/motion) for animations
- [Supabase](https://supabase.com) for backend services

---

## 📞 Support

For support, email hello@chipchop.ng or join our Slack channel.

---

**Built with ❤️ for Chip Chop Food Lounge**

