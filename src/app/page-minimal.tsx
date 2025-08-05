import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { getFeaturedProductsServer } from '@/lib/products-server';
import { ArrowRight, Award, Truck, Shield } from 'lucide-react';

export default async function Home() {
  const featuredProducts = await getFeaturedProductsServer();

  return (
    <div className="flex flex-col">
      {/* Clean Hero Section */}
      <section className="relative min-h-screen flex items-center bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                Handcrafted Excellence
              </p>
              <h1 className="text-6xl md:text-8xl font-light text-gray-900 leading-tight">
                Creations
                <br />
                <span className="font-medium text-rose-600">by Shubhi</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Discover timeless elegance in every piece. Our jewelry collection celebrates 
                the art of fine craftsmanship and sophisticated design.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-none">
                Explore Collection
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 px-8 py-4 rounded-none hover:bg-gray-50">
                View Catalog
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal About Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-light text-gray-900">
              Crafted with <span className="italic text-rose-600">Passion</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Each piece in our collection is meticulously crafted by skilled artisans who understand 
              that jewelry is more than an accessory—it's a reflection of your unique story and style.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
              <div className="text-center space-y-3">
                <Award className="w-8 h-8 text-rose-600 mx-auto" />
                <h3 className="font-medium text-gray-900">Premium Quality</h3>
                <p className="text-sm text-gray-600">Only the finest materials and craftsmanship</p>
              </div>
              <div className="text-center space-y-3">
                <Truck className="w-8 h-8 text-rose-600 mx-auto" />
                <h3 className="font-medium text-gray-900">Free Delivery</h3>
                <p className="text-sm text-gray-600">Complimentary shipping on all orders</p>
              </div>
              <div className="text-center space-y-3">
                <Shield className="w-8 h-8 text-rose-600 mx-auto" />
                <h3 className="font-medium text-gray-900">Lifetime Warranty</h3>
                <p className="text-sm text-gray-600">Complete protection for your investment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Product Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">Our Collections</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated categories, each designed to celebrate different moments and styles.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Necklaces */}
            <Link href="/products?category=necklaces" className="group">
              <div className="relative aspect-square overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Necklaces"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center">Necklaces</h3>
              <p className="text-sm text-gray-500 text-center">From ₹15,000</p>
            </Link>

            {/* Rings */}
            <Link href="/products?category=rings" className="group">
              <div className="relative aspect-square overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Rings"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center">Rings</h3>
              <p className="text-sm text-gray-500 text-center">From ₹25,000</p>
            </Link>

            {/* Bracelets */}
            <Link href="/products?category=bracelets" className="group">
              <div className="relative aspect-square overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1611652022313-8884af72ae72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Bracelets"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center">Bracelets</h3>
              <p className="text-sm text-gray-500 text-center">From ₹8,000</p>
            </Link>

            {/* Earrings */}
            <Link href="/products?category=earrings" className="group">
              <div className="relative aspect-square overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Earrings"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center">Earrings</h3>
              <p className="text-sm text-gray-500 text-center">From ₹12,000</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">Featured Pieces</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked selections that showcase the pinnacle of our craftsmanship and design excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 6).map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" className="border-gray-300 text-gray-700 px-8 py-3 rounded-none hover:bg-gray-50">
              <Link href="/products">
                View All Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Clean Newsletter */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div>
              <h2 className="text-4xl font-light text-gray-900 mb-4">Stay Connected</h2>
              <p className="text-gray-600">
                Be the first to discover new collections and receive exclusive offers.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              />
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
