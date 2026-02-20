# Intelligent Systems - Capital Intelligence Group

Premium business landing page showcasing intelligent system integration services. Built with Next.js 14, TypeScript, and Tailwind CSS.

**Slogan:** *Systems That Think. Businesses That Scale.*

## Features

### Core Sections
- **Hero Section** - Prominent brand display with compelling headline and dual CTAs
- **Package Selection** - Three monthly subscription tiers ($169, $279, $449)
  - Website Care - Essential maintenance
  - Revenue Optimisation (Recommended) - Conversion & SEO
  - Done-For-You Digital Team - Full-service management
- **Projects Carousel** - Smooth horizontal slider showcasing 5 industry projects
- **AI Chatbot Demo** - Interactive assistant that answers service-related questions
  - Currently simulated, ready for API integration
  - Intelligently restricts responses to package/pricing/onboarding topics
- **Onboarding Flow** - Visual 5-step process from plan selection to launch
- **Pricing Details** - Comprehensive breakdown of features per plan
- **Professional Footer** - Quick links, legal pages, ABN display

### Legal Pages
- **Privacy Policy** - Complete professional content covering:
  - Data collection and usage
  - AI integrations and processing
  - Hosting and security measures
  - User rights under Australian law
  - Cookie policies
- **Terms & Conditions** - Comprehensive legal coverage including:
  - Subscription billing and cancellation
  - Intellectual property rights
  - Liability limitations
  - Service guarantees

## Design System

- **Theme**: White + Silver luxury aesthetic
- **Typography**: Modern, bold, confident system fonts
- **Colors**: 
  - White backgrounds (#FFFFFF)
  - Silver accents (#C0C0C0, #E8E8E8)
  - Charcoal text (#2C2C2C)
- **Spacing**: Generous whitespace for premium feel
- **Effects**: Subtle shadows, smooth transitions, elegant hover states
- **Responsive**: Mobile-first design

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- n8n webhook URL (for form submission handling)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your n8n webhook URL

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Webhook Setup

The contact form sends submissions to an n8n webhook for automation:

1. Set up an n8n workflow with a Webhook trigger node
2. Copy the webhook URL
3. Add it to your `.env.local` as `N8N_WEBHOOK_URL`

**Note**: The `N8N_WEBHOOK_URL` environment variable must be configured for form submissions to work.

## Project Structure

```
├── app/
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Homepage
│   ├── globals.css                   # Global styles
│   ├── privacy-policy/
│   │   └── page.tsx                  # Privacy Policy page
│   └── terms-and-conditions/
│       └── page.tsx                  # Terms & Conditions page
├── components/
│   ├── Hero.tsx                      # Hero section with CTAs
│   ├── PackageSection.tsx            # Monthly plan cards
│   ├── ProjectsCarousel.tsx          # Project showcase slider
│   ├── AIChatDemo.tsx                # Interactive AI chatbot
│   ├── OnboardingSection.tsx         # 5-step onboarding visual
│   ├── PricingDetails.tsx            # Detailed feature breakdown
│   └── Footer.tsx                    # Footer with legal links
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Dependencies
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **UI Patterns**: Client/Server Component architecture

## AI Chatbot Integration

The AI chatbot component is structured for easy API integration:

```typescript
// Currently uses simulated responses via getSimulatedResponse()
// To integrate with an API:
// 1. Replace getSimulatedResponse() with API call
// 2. Add your API endpoint and authentication
// 3. The component already handles loading states and error handling
```

## Business Information

- **Business Name**: Intelligent Systems
- **Trading As**: Capital Intelligence Group  
- **ABN**: 38 693 023 371
- **Services**: Intelligent system integration for business operations

## License

All rights reserved © 2026 Capital Intelligence Group
