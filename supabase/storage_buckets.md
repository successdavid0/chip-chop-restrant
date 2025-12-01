# Supabase Storage Buckets Configuration

## Required Buckets

### 1. `menu-images`
- **Purpose**: Store menu item images
- **Public**: Yes (for CDN delivery)
- **File size limit**: 5MB
- **Allowed MIME types**: `image/jpeg`, `image/png`, `image/webp`
- **Naming convention**: `{category}/{item-id}.webp`

### 2. `promotions`
- **Purpose**: Store promotional banner images
- **Public**: Yes
- **File size limit**: 2MB
- **Allowed MIME types**: `image/jpeg`, `image/png`, `image/webp`
- **Naming convention**: `{promo-id}.webp`

### 3. `user-avatars`
- **Purpose**: Store user profile pictures
- **Public**: Yes
- **File size limit**: 2MB
- **Allowed MIME types**: `image/jpeg`, `image/png`, `image/webp`
- **Naming convention**: `{user-id}.webp`
- **RLS**: Users can only upload to their own folder

### 4. `rider-photos`
- **Purpose**: Store rider profile photos
- **Public**: Yes
- **File size limit**: 2MB
- **Allowed MIME types**: `image/jpeg`, `image/png`

### 5. `receipts`
- **Purpose**: Store order receipts/invoices
- **Public**: No (private)
- **File size limit**: 1MB
- **Allowed MIME types**: `application/pdf`
- **RLS**: Users can only access their own receipts

---

## SQL to Create Buckets

```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('menu-images', 'menu-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('promotions', 'promotions', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('user-avatars', 'user-avatars', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('rider-photos', 'rider-photos', true, 2097152, ARRAY['image/jpeg', 'image/png']),
  ('receipts', 'receipts', false, 1048576, ARRAY['application/pdf']);

-- Storage policies for menu-images (public read, admin write)
CREATE POLICY "Public read access for menu images"
ON storage.objects FOR SELECT
USING (bucket_id = 'menu-images');

-- Storage policies for user-avatars
CREATE POLICY "Users can upload own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'user-avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Public read access for avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'user-avatars');

-- Storage policies for receipts (private)
CREATE POLICY "Users can access own receipts"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'receipts' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

---

## Image Optimization Guidelines

1. **Convert to WebP**: All uploaded images should be converted to WebP format for optimal delivery
2. **Resize**: Menu images should be resized to max 800x800px
3. **Quality**: Use 80% quality for good balance between size and quality
4. **CDN**: Enable Supabase CDN for faster global delivery
5. **Lazy Loading**: Implement lazy loading on the frontend

---

## URL Structure

Base URL: `https://{project-ref}.supabase.co/storage/v1/object/public/`

Examples:
- Menu image: `https://xxx.supabase.co/storage/v1/object/public/menu-images/breakfast/golden-sunrise.webp`
- Promo banner: `https://xxx.supabase.co/storage/v1/object/public/promotions/weekend-special.webp`
- User avatar: `https://xxx.supabase.co/storage/v1/object/public/user-avatars/{user-id}.webp`

