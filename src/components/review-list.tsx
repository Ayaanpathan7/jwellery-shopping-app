import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';

export type Review = {
  id: number;
  name: string;
  rating: number;
  review: string;
  date: string;
};

type ReviewListProps = {
  reviews: Review[];
};

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return <p className="text-muted-foreground">Be the first to review this product.</p>;
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <Card key={review.id} className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base font-semibold">{review.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{review.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    'h-4 w-4',
                    review.rating >= star ? 'text-primary fill-current' : 'text-muted-foreground/50'
                  )}
                />
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground font-body">{review.review}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
