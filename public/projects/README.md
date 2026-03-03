# Project Images Guide

This directory contains images for the projects displayed in the portfolio carousel.

## How to Add Images

### 1. Image Requirements
- **Format**: JPG, PNG, or WebP
- **Recommended Size**: 1200x675 pixels (16:9 aspect ratio)
- **File Size**: Keep under 500KB for optimal loading
- **Naming**: Use lowercase with hyphens (e.g., `my-project.jpg`)

### 2. Adding a New Project Image

1. **Place your image** in this `/public/projects/` directory
2. **Update the project** in `components/ProjectsCarousel.tsx`:

```typescript
{
  id: 1,
  title: 'Your Project Name',
  industry: 'Industry',
  description: 'Project description...',
  image: '/projects/your-image-name.jpg', // Update this path
  url: 'https://your-project-url.com', // Optional
}
```

### 3. Image Optimization Tips

- Use tools like [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/) to compress images
- Convert to WebP format for better compression
- Ensure images are high quality but not excessively large

### 4. Fallback Behavior

If an image fails to load or doesn't exist:
- The carousel will display a gradient background with the project title
- This ensures the carousel always looks good even without images

## Current Project Images

- `eay-electrical.jpg` - EAY Electrical project
- `ecommerce.jpg` - E-Commerce Platform project
- `healthcare.jpg` - Healthcare Portal project
- `fintech.jpg` - FinTech Dashboard project
- `property.jpg` - Property Management project
- `manufacturing.jpg` - Manufacturing ERP project

## Example Image Naming Convention

```
/public/projects/
  ├── eay-electrical.jpg
  ├── ecommerce.jpg
  ├── healthcare.jpg
  ├── fintech.jpg
  ├── property.jpg
  └── manufacturing.jpg
```

## Taking Screenshots for Projects

If you need to create images from live websites:

1. Use browser screenshot tools or services like:
   - [Screely](https://www.screely.com/) - Add browser mockup
   - [Screenshot.rocks](https://screenshot.rocks/) - Beautiful website screenshots
   - Browser DevTools (F12) → Device toolbar → Take screenshot

2. Crop to 16:9 aspect ratio
3. Optimize the image
4. Place in `/public/projects/`
5. Update the project configuration

## Need Help?

If you have questions about adding images, check:
- Next.js Image documentation: https://nextjs.org/docs/api-reference/next/image
- The project uses automatic image optimization through Next.js
