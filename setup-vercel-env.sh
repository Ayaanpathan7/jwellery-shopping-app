#!/bin/bash

echo "🚀 Setting up Vercel Environment Variables for Luna Gems"
echo ""
echo "Make sure you have Vercel CLI installed: npm i -g vercel"
echo "And you're logged in: vercel login"
echo ""
echo "Adding environment variables..."

# Add environment variables to Vercel
vercel env add NEXT_PUBLIC_SUPABASE_URL production <<< "https://idqqihwzydypupkgfuoh.supabase.co"
vercel env add NEXT_PUBLIC_SUPABASE_URL preview <<< "https://idqqihwzydypupkgfuoh.supabase.co"  
vercel env add NEXT_PUBLIC_SUPABASE_URL development <<< "https://idqqihwzydypupkgfuoh.supabase.co"

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production <<< "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkcXFpaHd6eWR5cHVwa2dmdW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NTEzNTAsImV4cCI6MjA2OTUyNzM1MH0.NFTokaGzh6e68g81q02iL7-p45T8dEZAuMJawu1sPkk"
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview <<< "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkcXFpaHd6eWR5cHVwa2dmdW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NTEzNTAsImV4cCI6MjA2OTUyNzM1MH0.NFTokaGzh6e68g81q02iL7-p45T8dEZAuMJawu1sPkk"
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development <<< "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkcXFpaHd6eWR5cHVwa2dmdW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NTEzNTAsImV4cCI6MjA2OTUyNzM1MH0.NFTokaGzh6e68g81q02iL7-p45T8dEZAuMJawu1sPkk"

vercel env add SUPABASE_SERVICE_ROLE_KEY production <<< "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkcXFpaHd6eWR5cHVwa2dmdW9oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzk1MTM1MCwiZXhwIjoyMDY5NTI3MzUwfQ.L3i4CopDMqS7-N8gTYem5uWSPdESUV8HiMkrj_UwDpQ"
vercel env add SUPABASE_SERVICE_ROLE_KEY preview <<< "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkcXFpaHd6eWR5cHVwa2dmdW9oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzk1MTM1MCwiZXhwIjoyMDY5NTI3MzUwfQ.L3i4CopDMqS7-N8gTYem5uWSPdESUV8HiMkrj_UwDpQ"
vercel env add SUPABASE_SERVICE_ROLE_KEY development <<< "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkcXFpaHd6eWR5cHVwa2dmdW9oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzk1MTM1MCwiZXhwIjoyMDY5NTI3MzUwfQ.L3i4CopDMqS7-N8gTYem5uWSPdESUV8HiMkrj_UwDpQ"

vercel env add ADMIN_EMAIL production <<< "singhanubhav7456@gmail.com"
vercel env add ADMIN_EMAIL preview <<< "singhanubhav7456@gmail.com"
vercel env add ADMIN_EMAIL development <<< "singhanubhav7456@gmail.com"

echo ""
echo "✅ Environment variables added!"
echo "Now run: vercel deploy --prod"
echo "Or push your changes to GitHub to trigger automatic deployment"
