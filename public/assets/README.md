# Assets Folder Structure

This folder contains local assets for the jewelry shopping application.

## Directory Structure

- **`images/`** - Product images, gallery photos, and general images
- **`videos/`** - Video content, promotional videos, product demos
- **`icons/`** - UI icons, SVG icons, and small graphic elements
- **`logos/`** - Brand logos, partner logos, and branding assets
- **`banners/`** - Hero banners, promotional banners, and marketing images

## Usage

Assets can be referenced in Next.js components using:

```jsx
import Image from 'next/image'

// For images
<Image src="/assets/images/your-image.jpg" alt="Description" width={400} height={300} />

// For videos
<video src="/assets/videos/your-video.mp4" controls />

// For icons (if using as images)
<Image src="/assets/icons/icon.svg" alt="Icon" width={24} height={24} />
```

## Guidelines

- Use descriptive filenames
- Optimize images for web (WebP format recommended)
- Keep file sizes reasonable for web performance
- Organize files in appropriate subdirectories
- Use consistent naming conventions (kebab-case recommended)

## Notes

- All files in this folder are publicly accessible
- Database images from Cloudinary should continue to be used for dynamic product content
- Local assets are best for static branding, UI elements, and fixed content
