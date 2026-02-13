# Capital Intelligence Group - Premium Website

A modern, premium website for Capital Intelligence Group - an Australian-based web development studio. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Premium Dark Aesthetic** - High-end design with refined gold accent colors
- **Smooth Animations** - Framer Motion powered scroll-triggered reveals and transitions
- **Multi-Step Intake Form** - 7-step form with validation using React Hook Form + Zod
- **Responsive Design** - Mobile-first approach for all devices
- **TypeScript** - Full type safety throughout the application
- **Modern Stack** - Next.js 14 App Router, Tailwind CSS v3, Framer Motion

## 📦 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Radix UI primitives
- **Notifications**: React Hot Toast

## 🎨 Design System

- Dark premium aesthetic with subtle gradients
- Gold/amber accent color (#f59e0b)
- System font stack for optimal performance
- Subtle grain texture overlay
- Generous modern spacing
- Smooth scroll behavior

## 📄 Pages

1. **Homepage** (`/`)
   - Hero section with animated logo
   - Tier selection cards
   - About section
   - Featured projects preview
   - Add-ons showcase
   - CTA section

2. **Get Started** (`/get-started`)
   - Multi-step intake form with progress indicator
   - Step 1: Choose tier
   - Step 2: Select style
   - Step 3: Choose color palette
   - Step 4: Upload logo (optional)
   - Step 5: Project details
   - Step 6: Select add-ons
   - Step 7: Contact information & submit

3. **Projects** (`/projects`)
   - Grid layout with filter options
   - Project cards with tier badges
   - 6 placeholder projects

4. **Features** (`/features`)
   - Feature cards with realistic UI mockups
   - Interactive demonstrations of capabilities
   - 8 core features showcased

5. **Pricing** (`/pricing`)
   - Tier comparison table
   - Add-ons pricing grid
   - Feature comparison matrix

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/disantobusinesses-blip/capitalintelligenceai.git
cd capitalintelligenceai
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
/
├── app/                      # Next.js app directory
│   ├── features/            # Features page
│   ├── get-started/         # Intake form page
│   ├── pricing/             # Pricing page
│   ├── projects/            # Projects gallery page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── intake-form/         # Multi-step form components
│   ├── feature-card.tsx
│   ├── footer.tsx
│   ├── grain-overlay.tsx
│   ├── header.tsx
│   ├── project-card.tsx
│   ├── section-reveal.tsx
│   └── tier-card.tsx
├── lib/                     # Utility functions
│   ├── data.ts             # Static data
│   └── schemas.ts          # Zod validation schemas
└── public/                  # Static assets
```

## 🎯 Key Components

### Header
Sticky navigation with blur backdrop effect, responsive mobile menu, and active state indicators.

### Tier Cards
Reusable pricing tier cards with feature lists, hover effects, and selection functionality.

### Multi-Step Form
Complete intake form with:
- Step indicator showing progress
- Form validation with Zod
- Smooth transitions between steps
- File upload with drag-and-drop
- Toast notifications on submission

### Feature Cards
Showcase cards with embedded UI mockups demonstrating each feature's functionality.

### Section Reveal
Scroll-triggered animation wrapper for smooth reveal effects throughout the site.

## 🎨 Customization

### Colors
Edit color variables in `app/globals.css`:
```css
--background: 222.2 84% 4.9%;
--foreground: 210 40% 98%;
--accent: 45 93% 47%;
```

### Content
Update static data in `lib/data.ts` for:
- Pricing tiers
- Add-ons
- Projects
- Features
- Color palettes
- Style options

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📝 License

Copyright © 2026 Capital Intelligence Group. All rights reserved.

## 👥 Contact

For inquiries:
- Email: hello@capitalintelligence.com.au
- Phone: +61 400 000 000

---

Built with ❤️ by Capital Intelligence Group
