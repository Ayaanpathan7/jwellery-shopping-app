# Environment Variables for Vercel Deployment

## Required for Full Functionality

### Supabase Configuration (for products/admin/orders)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

### Cloudinary Configuration (for image uploads in admin)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name_here
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset_here

### Admin Authentication (for admin panel)
ADMIN_PASSWORD_HASH=your_bcrypt_hashed_password_here

## For Cache-Only Deployment (Cart/Wishlist work without database)

If you only want to deploy with cache-based cart/wishlist (no admin panel, no products database):

1. The app will work with placeholder values for Supabase
2. Cart and Wishlist will use localStorage (cache memory)
3. Admin panel and products will not function without real Supabase credentials

## How to Set in Vercel

1. Go to your Vercel project dashboard
2. Click on "Settings" 
3. Click on "Environment Variables"
4. Add each variable with its value
5. Redeploy your application

## Cache-Only Mode

The current implementation will work partially without environment variables:
✅ Homepage, About, Contact pages
✅ Cart functionality (localStorage)  
✅ Wishlist functionality (localStorage)
❌ Products gallery (requires Supabase)
❌ Admin panel (requires Supabase + admin password)
❌ Orders system (requires Supabase)

For full functionality, add the environment variables above to Vercel.
