# Luna Gems - Jewelry E-commerce Platform

A modern, full-stack jewelry e-commerce application built with Next.js 15, Supabase, and TypeScript. Features an admin dashboard for product management, customer reviews, contact forms, and a beautiful, responsive design.

## ✨ Features

### 🛍️ Customer Features
- **Product Catalog**: Browse and filter jewelry by material, gemstone, and price
- **Product Details**: High-quality image galleries with zoom functionality
- **Wishlist**: Save favorite items for later
- **Reviews**: Read and write product reviews
- **Contact Form**: Get in touch with the store
- **Responsive Design**: Optimized for all devices

### 👑 Admin Features
- **Product Management**: Create, edit, and delete products
- **Image Management**: Multiple image uploads per product
- **Inventory Control**: Track stock status and featured items
- **Review Monitoring**: View all customer reviews
- **Contact Management**: Access customer inquiries

### 🎨 Design Features
- **Luxury Aesthetic**: Soft gold, cream, and elegant typography
- **Professional UI**: Built with Radix UI and shadcn/ui components
- **Smooth Animations**: Tailwind CSS animations and transitions
- **Accessibility**: WCAG compliant design patterns

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui, Radix UI
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI Integration**: Google Genkit (ready for future features)
- **Deployment**: Vercel/Firebase ready

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Git

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd jwellery-shopping-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin Configuration
ADMIN_EMAIL=admin@lunagems.com
```

### 4. Supabase Setup

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Get your project URL and anon key from Settings > API

2. **Set up the Database**:
   - Open the SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `supabase-schema.sql`
   - Execute the SQL to create tables, policies, and sample data

3. **Configure Authentication**:
   - Go to Authentication > Settings
   - Configure your site URL
   - Enable email authentication

### 5. Run the Development Server
```bash
npm run dev
```

The app will be available at [http://localhost:9002](http://localhost:9002)

## 🔑 Admin Access

To access the admin dashboard:

1. **Create Admin User**:
   - Go to `/login`
   - Sign up with the email you set as `ADMIN_EMAIL`
   - Verify your email through Supabase

2. **Access Dashboard**:
   - Navigate to `/admin`
   - Manage products, view reviews, and handle contact submissions

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (pages)/           # Main application pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   └── login/             # Authentication
├── components/            # Reusable UI components
│   └── ui/               # shadcn/ui components
├── context/              # React context providers
├── hooks/                # Custom React hooks
└── lib/                  # Utility functions and configurations
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript checking

## 🎨 Customization

### Design System
The app uses a custom design system based on the Luna Gems brand:

- **Primary Color**: Soft Gold (#D4AF37)
- **Background**: Light Cream (#F5F5DC)
- **Accent**: Light Gray (#D3D3D3)
- **Typography**: Playfair Display (headings) + PT Sans (body)

### Adding Products
Products can be added through:
1. **Admin Dashboard**: Use the web interface at `/admin`
2. **Direct Database**: Insert into the `products` table
3. **API**: POST to `/api/products` (requires authentication)

### Image Management
Currently uses placeholder images. To use real images:
1. **Upload to Supabase Storage**: Set up a storage bucket
2. **CDN Integration**: Use services like Cloudinary or Vercel Blob
3. **Update Image URLs**: Modify the image fields in products

## 🚢 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The app is compatible with:
- Netlify
- Railway
- Digital Ocean App Platform
- Any Node.js hosting service

## 🔒 Security Features

- **Row Level Security**: Supabase RLS policies protect data
- **Input Validation**: Zod schemas validate all inputs
- **Authentication**: Secure admin access with Supabase Auth
- **CORS Protection**: API routes are properly secured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@lunagems.com or create an issue in the repository.

---

**Luna Gems** - Handcrafted Elegance for Every Moment ✨
