'use client';

import SectionReveal from '@/components/section-reveal';
import FeatureCard from '@/components/feature-card';
import { features } from '@/lib/data';

// Realistic UI Mockups
const AIChatMockup = () => (
  <div className="space-y-3">
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-accent flex-shrink-0" />
      <div className="flex-1 bg-secondary/50 rounded-lg p-3 text-xs">
        Hi! How can I help you today?
      </div>
    </div>
    <div className="flex items-start gap-3 justify-end">
      <div className="flex-1 bg-accent/20 rounded-lg p-3 text-xs text-right">
        I'd like to book an appointment
      </div>
      <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0" />
    </div>
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-accent flex-shrink-0" />
      <div className="flex-1 bg-secondary/50 rounded-lg p-3 text-xs">
        Great! What day works best for you?
      </div>
    </div>
  </div>
);

const EmailCaptureMockup = () => (
  <div className="space-y-4">
    <div className="text-center mb-4">
      <h4 className="font-bold text-sm mb-1">Get 20% Off Your First Order</h4>
      <p className="text-xs text-muted-foreground">Subscribe to our newsletter</p>
    </div>
    <div className="space-y-2">
      <div className="h-9 bg-secondary/50 rounded border border-border px-3 flex items-center text-xs text-muted-foreground">
        your@email.com
      </div>
      <button className="w-full h-9 bg-accent text-background rounded font-semibold text-xs">
        Subscribe Now
      </button>
    </div>
  </div>
);

const CTABlockMockup = () => (
  <div className="bg-gradient-to-br from-accent/20 to-primary/10 rounded-lg p-6 text-center">
    <h4 className="font-bold mb-2 text-sm">Ready to Get Started?</h4>
    <p className="text-xs text-muted-foreground mb-4">Join thousands of satisfied customers</p>
    <button className="px-6 py-2 bg-accent text-background rounded font-semibold text-xs">
      Start Free Trial
    </button>
  </div>
);

const BookingMockup = () => (
  <div className="space-y-3">
    <div className="grid grid-cols-7 gap-1 text-center">
      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
        <div key={i} className="text-[10px] text-muted-foreground">{day}</div>
      ))}
    </div>
    <div className="grid grid-cols-7 gap-1">
      {[...Array(35)].map((_, i) => (
        <div
          key={i}
          className={`aspect-square rounded text-[10px] flex items-center justify-center ${
            i === 15 ? 'bg-accent text-background' : 'bg-secondary/30'
          }`}
        >
          {i + 1}
        </div>
      ))}
    </div>
    <div className="text-xs text-center text-muted-foreground">Select a date to book</div>
  </div>
);

const MapsMockup = () => (
  <div className="relative h-40 bg-gradient-to-br from-primary/20 to-accent/10 rounded overflow-hidden">
    <div className="absolute inset-0 opacity-20">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M10,50 Q30,30 50,50 T90,50" stroke="currentColor" fill="none" strokeWidth="2" />
        <path d="M20,30 Q40,50 60,30 T100,30" stroke="currentColor" fill="none" strokeWidth="2" />
      </svg>
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-8 h-8 bg-accent rounded-full border-4 border-background" />
    </div>
    <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur px-2 py-1 rounded text-[10px]">
      📍 Melbourne CBD
    </div>
  </div>
);

const GalleryMockup = () => (
  <div className="grid grid-cols-3 gap-2">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="aspect-square bg-gradient-to-br from-accent/20 to-primary/10 rounded"
      />
    ))}
  </div>
);

const TestimonialsMockup = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-accent" />
      <div>
        <div className="h-2 w-20 bg-secondary/50 rounded mb-1" />
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-accent text-xs">★</span>
          ))}
        </div>
      </div>
    </div>
    <div className="space-y-1">
      <div className="h-2 bg-secondary/50 rounded" />
      <div className="h-2 bg-secondary/50 rounded w-5/6" />
    </div>
  </div>
);

const SEOMockup = () => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold">Performance</span>
      <span className="text-accent font-bold">98</span>
    </div>
    <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
      <div className="h-full w-[98%] bg-accent rounded-full" />
    </div>
    <div className="grid grid-cols-3 gap-2 text-center">
      <div>
        <div className="text-accent font-bold text-sm">95</div>
        <div className="text-[10px] text-muted-foreground">SEO</div>
      </div>
      <div>
        <div className="text-accent font-bold text-sm">100</div>
        <div className="text-[10px] text-muted-foreground">Access</div>
      </div>
      <div>
        <div className="text-accent font-bold text-sm">92</div>
        <div className="text-[10px] text-muted-foreground">Best Practices</div>
      </div>
    </div>
  </div>
);

export default function FeaturesPage() {
  const mockups: Record<string, React.ReactElement> = {
    'ai-chat': <AIChatMockup />,
    'email-capture': <EmailCaptureMockup />,
    'cta-blocks': <CTABlockMockup />,
    'booking': <BookingMockup />,
    'maps': <MapsMockup />,
    'gallery': <GalleryMockup />,
    'testimonials': <TestimonialsMockup />,
    'seo': <SEOMockup />,
  };

  return (
    <div className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">Premium Features</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful, conversion-focused components designed to elevate your website
            </p>
          </div>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <SectionReveal key={feature.id} delay={0.1 * (index + 1)}>
              <FeatureCard feature={feature} mockup={mockups[feature.id]} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
