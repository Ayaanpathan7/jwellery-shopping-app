// Utility function to validate and get safe image URLs
export const getValidImageUrl = (imageUrl: string | null | undefined): string => {
  const fallbackImage = 'https://placehold.co/600x600/f3f4f6/9ca3af?text=No+Image'
  
  if (!imageUrl || imageUrl.trim() === '') {
    return fallbackImage
  }
  
  // List of allowed domains for Next.js Image component
  const allowedDomains = [
    'placehold.co',
    'images.unsplash.com',
    'res.cloudinary.com',
    'via.placeholder.com',
    'picsum.photos'
  ]
  
  try {
    const url = new URL(imageUrl)
    
    // Check if the hostname is in the allowed list or is a Cloudinary subdomain
    const isAllowed = allowedDomains.some(domain => 
      url.hostname === domain || 
      url.hostname.endsWith('.cloudinary.com')
    )
    
    if (isAllowed) {
      return imageUrl
    }
    
    // If not allowed, return fallback
    return fallbackImage
  } catch (error) {
    // If URL is invalid, return fallback
    return fallbackImage
  }
}

// Check if an image URL is valid for Next.js Image component
export const isValidImageUrl = (imageUrl: string | null | undefined): boolean => {
  return getValidImageUrl(imageUrl) !== 'https://placehold.co/600x600/f3f4f6/9ca3af?text=No+Image'
}
