# 🚀 Vercel Deployment Fix

## Error: `supabaseUrl is required`

The build is failing because Vercel doesn't have access to your environment variables.

## ✅ **Solution: Add Environment Variables to Vercel**

### **Method 1: Via Vercel Dashboard (Recommended)**

1. **Go to**: https://vercel.com/anubhavsingh99/jwellery-shopping-app/settings/environment-variables
2. **Add these variables one by one:**

```bash
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://idqqihwzydypupkgfuoh.supabase.co
Environment: Production, Preview, Development

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY  
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkcXFpaHd6eWR5cHVwa2dmdW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NTEzNTAsImV4cCI6MjA2OTUyNzM1MH0.NFTokaGzh6e68g81q02iL7-p45T8dEZAuMJawu1sPkk
Environment: Production, Preview, Development

Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkcXFpaHd6eWR5cHVwa2dmdW9oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzk1MTM1MCwiZXhwIjoyMDY5NTI3MzUwfQ.L3i4CopDMqS7-N8gTYem5uWSPdESUV8HiMkrj_UwDpQ
Environment: Production, Preview, Development

Name: ADMIN_EMAIL
Value: singhanubhav7456@gmail.com
Environment: Production, Preview, Development
```

### **Method 2: Via Vercel CLI**

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Enter: https://idqqihwzydypupkgfuoh.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Enter the anon key

vercel env add SUPABASE_SERVICE_ROLE_KEY
# Enter the service role key

vercel env add ADMIN_EMAIL
# Enter: singhanubhav7456@gmail.com
```

## 🔄 **After Adding Environment Variables:**

1. **Redeploy**: Go to Vercel dashboard → Deployments → Click "Redeploy"
2. **Or Push Code**: Make any small change and push to GitHub

## ✅ **Fixed Issues:**
- ✅ Added fallback values for missing environment variables
- ✅ Build won't crash if env vars are temporarily missing
- ✅ Graceful handling of Supabase connection errors

## 🌐 **Expected Result:**
After adding the environment variables, your deployment should succeed and your jewelry website will be live on Vercel!
