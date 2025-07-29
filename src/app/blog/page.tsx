import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'The Art of Choosing the Perfect Engagement Ring',
    date: 'July 22, 2024',
    excerpt: 'Finding the ring that symbolizes your love is a journey. Here are our tips for making the right choice, from diamond cuts to metal types.',
    image: 'https://placehold.co/800x600',
    aiHint: 'engagement ring'
  },
  {
    id: 2,
    title: 'Caring for Your Handcrafted Jewelry',
    date: 'July 15, 2024',
    excerpt: 'Keep your treasures sparkling for a lifetime. Our guide to cleaning and storing your precious Luna Gems pieces.',
    image: 'https://placehold.co/800x600',
    aiHint: 'jewelry care'
  },
  {
    id: 3,
    title: 'Behind the Scenes: Our Ethical Sourcing Promise',
    date: 'July 8, 2024',
    excerpt: 'Learn about our commitment to sustainability and the journey of our ethically sourced gemstones from the earth to our studio.',
    image: 'https://placehold.co/800x600',
    aiHint: 'gemstones nature'
  },
];

export default function BlogPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">
            From Our Studio
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, stories, and inspiration from the world of Luna Gems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="flex flex-col overflow-hidden">
              <CardHeader className="p-0">
                <div className="aspect-video relative">
                  <Image src={post.image} alt={post.title} fill className="object-cover" data-ai-hint={post.aiHint} />
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                <CardTitle>
                  <Link href="#" className="hover:text-primary transition-colors">{post.title}</Link>
                </CardTitle>
                <p className="text-muted-foreground font-body">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                 <Button asChild variant="link" className="p-0 h-auto text-primary">
                    <Link href="#">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
