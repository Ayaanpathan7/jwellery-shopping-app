import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Gem } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] bg-background text-center px-4">
      <Gem className="w-24 h-24 text-primary opacity-30 mb-4" />
      <h1 className="text-6xl font-headline font-bold text-primary-foreground">404</h1>
      <h2 className="text-2xl font-headline mt-4 mb-2 text-primary-foreground">Page Not Found</h2>
      <p className="text-muted-foreground max-w-sm">
        It seems the page you are looking for is a hidden gem that we haven't uncovered yet.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Return to Homepage</Link>
      </Button>
    </div>
  )
}
