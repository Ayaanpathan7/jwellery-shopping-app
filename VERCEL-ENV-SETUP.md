# 🔑 Vercel Environment Variables Setup

## Admin Login Issue Fix

Your admin password is: **LunaGems2024!**

But Vercel needs the **hashed version** of this password.

## Required Environment Variables for Vercel

Go to your Vercel project dashboard → Settings → Environment Variables and add these:

### 1. Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=https://idqqihwzydypupkgfuoh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkcXFpaHd6eWR5cHVwa2dmdW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NTEzNTAsImV4cCI6MjA2OTUyNzM1MH0.NFTokaGzh6e68g81q02iL7-p45T8dEZAuMJawu1sPkk
```

### 2. Admin Authentication (CRITICAL for admin login)
```
ADMIN_PASSWORD_HASH=$2b$10$PGzgiX.GBXnvRXTKicMyEOxxvQDXMGFzOVlibrFgZvXNuvU2bY.fu
```

### 3. Cloudinary Configuration (for image uploads)
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=teravexsoftwares
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=luna_gems_products
```

## Step-by-Step Instructions

1. **Go to Vercel Dashboard**
   - Open your project in Vercel
   - Click on "Settings" tab
   - Click on "Environment Variables"

2. **Add Each Variable**
   - Click "Add New"
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://idqqihwzydypupkgfuoh.supabase.co`
   - Environment: Production, Preview, Development
   - Click "Save"

3. **Repeat for each variable above**

4. **Redeploy**
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"

## ⚠️ Important Notes

- **Admin Password**: Still use `LunaGems2024!` to login
- **Hash Required**: Vercel needs `ADMIN_PASSWORD_HASH` with the hashed value
- **Case Sensitive**: Environment variable names are case-sensitive
- **No Quotes**: Don't add quotes around the values in Vercel

## Test After Deployment

1. Go to `yoursite.vercel.app/admin`
2. Enter password: `LunaGems2024!`
3. Should work now! ✅

## Alternative: Use Plain Password in Development

If you want to use plain password for development, the system also checks for `ADMIN_PASSWORD` as fallback.
