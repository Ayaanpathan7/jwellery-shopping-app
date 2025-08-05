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
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex items-center overflow-hidden">
        {/* Background Video */}
        <video
          src="/assets/videos/hero2.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-20">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-medium tracking-[0.2em] text-white/80 uppercase">
                Limited Edition
              </p>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                LUXURY DESIGN<br />
                <span className="text-4xl md:text-6xl">COLLECTIONS</span>
              </h1>
              <p className="text-lg text-white/90 max-w-md">
                Every gemstone has its own beauty and luxury stories, 
                our designers create some outstanding jewelry design 
                for you to look outstanding in any condition.
              </p>
            </div>
            
            <Button asChild className="bg-white text-black px-8 py-6 text-base hover:bg-gray-100">
              <Link href="/gallery">
                Explore More →
              </Link>
            </Button>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-xs text-white/60">Our Trusted Partners:</div>
              <div className="flex items-center space-x-4 text-white/70">
                <span className="font-medium">OpenGate</span>
                <span className="font-medium">shopeey</span>
                <span className="font-medium">bluemarket</span>
              </div>
            </div>
          </div>

          {/* Right - Hero Video */}
          <div className="relative h-full min-h-[600px]">
            <video
              src="/assets/videos/hero_video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">EXCLUSIVE GUARANTEE YOU GET</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Guarantee */}
            <div className="text-center group">
              <div className="relative w-full h-64 mb-6 overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop&q=80"
                  alt="Luxury guarantee - Premium jewelry quality"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Award className="w-16 h-16 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">GUARANTEE</h3>
              <p className="text-gray-300 text-sm">Premium quality you can see</p>
              <p className="text-gray-300 text-sm">all your life and we are sure</p>
              <p className="text-gray-300 text-sm">guaranteed we give the</p>
              <Button variant="link" className="text-white p-0 mt-2">Read More</Button>
            </div>

            {/* Cashback */}
            <div className="text-center group">
              <div className="relative w-full h-64 mb-6 overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=300&fit=crop&q=80"
                  alt="Cashback offer - Gold coins and jewelry"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold">CASHBACK UP TO 80%</div>
                    <div className="text-sm">For Limited Time</div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">CASHBACK UP TO 80%</h3>
              <p className="text-gray-300 text-sm">We offer cash return of up</p>
              <p className="text-gray-300 text-sm">to 80% on every purchase</p>
              <p className="text-gray-300 text-sm">for you</p>
              <Button variant="link" className="text-white p-0 mt-2">Read More</Button>
            </div>

            {/* Free Delivery */}
            <div className="text-center group">
              <div className="relative w-full h-64 mb-6 overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80"
                  alt="Free delivery - Luxury packaging and shipping"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Truck className="w-16 h-16 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">FREE DELIVERY</h3>
              <p className="text-gray-300 text-sm">Free shipping and delivery</p>
              <p className="text-gray-300 text-sm">all over the world, with</p>
              <p className="text-gray-300 text-sm">guaranteed service on time</p>
              <Button variant="link" className="text-white p-0 mt-2">Read More</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Jewelry Categories */}
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
            {/* Show actual product images if available, grouped by category */}
            {featuredProducts.slice(0, 4).map((product, index) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="relative aspect-square overflow-hidden mb-4">
                  <img
                    src={product.images && product.images.length > 0 
                      ? product.images[0] 
                      : 'https://placehold.co/600x600/f3f4f6/9ca3af?text=No+Image'
                    }
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900 text-center">{product.name}</h3>
                <p className="text-sm text-gray-500 text-center">From ₹{product.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Catalogue */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.2em] text-gray-600 uppercase mb-2">Products</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">OUR CATALOGUE</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild className="bg-black text-white hover:bg-gray-800 px-8 py-6">
              <Link href="/gallery">
                View All →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm font-medium tracking-[0.2em] text-gray-600 uppercase mb-2">Stay In Touch</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">SUBSCRIBE TO JOIN NEWSLETTER</h2>
            <p className="text-gray-600 mb-8">
              Get the latest updates on new products and upcoming sales
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <Button className="bg-black text-white hover:bg-gray-800 px-8">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
