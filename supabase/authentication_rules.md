# Supabase Authentication Configuration

## Authentication Providers

### 1. Email/Password (Default)
- **Status**: Enabled
- **Confirm email**: Optional (for smoother onboarding)
- **Password requirements**: Minimum 8 characters

### 2. Phone (SMS OTP) - Future
- **Status**: To be enabled
- **Provider**: Twilio
- **Use case**: Nigerian phone number verification

### 3. Google OAuth - Future
- **Status**: Optional
- **Use case**: Quick sign-in for users

---

## Auth Settings

```json
{
  "site_url": "https://chipchop.ng",
  "additional_redirect_urls": [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://chipchop.ng/auth/callback"
  ],
  "jwt_expiry": 3600,
  "enable_signup": true,
  "email_confirm": false,
  "phone_confirm": false,
  "mailer": {
    "autoconfirm": true
  }
}
```

---

## Email Templates

### Welcome Email
```html
<h1>Welcome to Chip Chop Food Lounge! 🍽️</h1>
<p>Hi {{ .Email }},</p>
<p>Thank you for joining Chip Chop Food Lounge! We're excited to have you.</p>
<p>Start exploring our delicious menu and enjoy premium dining delivered to your doorstep.</p>
<p>
  <a href="{{ .SiteURL }}/menu" style="background: linear-gradient(135deg, #D4A528, #B8860B); color: #1F1F1F; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
    Browse Menu
  </a>
</p>
<p>Bon appétit!</p>
<p>— The Chip Chop Team</p>
```

### Password Reset
```html
<h1>Reset Your Password</h1>
<p>Hi,</p>
<p>We received a request to reset your password for your Chip Chop account.</p>
<p>
  <a href="{{ .ConfirmationURL }}" style="background: linear-gradient(135deg, #D4A528, #B8860B); color: #1F1F1F; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
    Reset Password
  </a>
</p>
<p>If you didn't request this, please ignore this email.</p>
<p>— The Chip Chop Team</p>
```

---

## Security Settings

1. **Rate Limiting**
   - Login attempts: 5 per minute per IP
   - Signup attempts: 3 per minute per IP
   - Password reset: 2 per hour per email

2. **Session Management**
   - JWT expiry: 1 hour
   - Refresh token rotation: Enabled
   - Multiple sessions: Allowed

3. **Security Headers**
   - CORS origins: Whitelist only
   - Secure cookies: Production only

---

## User Roles

### Customer (Default)
- Can view menu
- Can create orders
- Can track own orders
- Can manage own profile
- Can write reviews

### Admin
- All customer permissions
- Can manage menu items
- Can manage orders
- Can manage promotions
- Can view analytics

### Rider
- Can view assigned orders
- Can update delivery status
- Can update location

---

## Implementation Notes

1. **Guest Checkout**: Allow orders without authentication
2. **Save Address**: Prompt to save address after first order
3. **Order History**: Only available to authenticated users
4. **Favorites**: Requires authentication
5. **Reviews**: Requires authentication + completed order

