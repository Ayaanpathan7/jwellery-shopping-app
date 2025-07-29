import { ContactForm } from '@/components/contact-form';
import { InstagramFeed } from '@/components/instagram-feed';
import { Mail, Instagram } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">
            Get In Touch
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We would love to hear from you. For custom orders, questions, or just to say hello, please use the form below.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-16">
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><Mail className="h-6 w-6 text-primary"/> Send Us a Message</h2>
            <ContactForm />
          </div>
          <div className="md:col-span-2">
             <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><Instagram className="h-6 w-6 text-primary"/> Follow Our Journey</h2>
            <InstagramFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
