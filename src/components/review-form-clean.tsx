'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ReviewFormProps = {
  productId: number;
};

export function ReviewForm({ productId }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    rating: 0,
    comment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          product_id: productId,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Review submitted!',
          description: 'Thank you for your review.',
        });
        setFormData({
          user_name: '',
          user_email: '',
          rating: 0,
          comment: '',
        });
      } else {
        throw new Error('Failed to submit review');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit review. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
        <CardDescription>
          Share your experience with this product
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="user_name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="user_name"
              name="user_name"
              type="text"
              value={formData.user_name}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="user_email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="user_email"
              name="user_email"
              type="email"
              value={formData.user_email}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="p-1"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= formData.rating
                        ? 'text-yellow-500 fill-current'
                        : 'text-gray-300'
                    } transition-colors hover:text-yellow-500`}
                    suppressHydrationWarning
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium">
              Review
            </label>
            <Textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
              className="w-full min-h-[120px]"
              placeholder="Share your thoughts about this product..."
            />
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting || formData.rating === 0}
            className="w-full"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
