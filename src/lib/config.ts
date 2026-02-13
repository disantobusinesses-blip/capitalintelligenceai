export const siteConfig = {
  name: "Capital Intelligence Group",
  shortName: "CIG",
  description:
    "Premium web development studio crafting high-end, AI-integrated digital experiences.",
  url: "https://capitalintelligence.com.au",
  tiers: [
    {
      id: "landing" as const,
      name: "Landing Page Website",
      price: "$2,300",
      currency: "AUD",
      description:
        "A stunning single-page experience designed to convert visitors into clients.",
      features: [
        "Custom responsive design",
        "Premium animations & transitions",
        "Mobile-first approach",
        "SEO optimised",
        "Contact form integration",
        "Fast-loading performance",
        "SSL & security setup",
        "1 round of revisions",
      ],
    },
    {
      id: "ai-integrated" as const,
      name: "AI Integrated Website",
      price: "from $3,300",
      currency: "AUD",
      description:
        "A full-featured website powered by AI, designed to automate and scale your business.",
      features: [
        "Everything in Landing Page",
        "AI chatbot integration",
        "Multi-page architecture",
        "Advanced SEO strategy",
        "Lead capture automation",
        "Analytics dashboard",
        "CMS integration",
        "3 rounds of revisions",
        "Priority support",
      ],
      popular: true,
    },
  ],
  addOns: [
    { id: "ai-chatbot", label: "AI Chatbot", icon: "Bot" },
    { id: "email-capture", label: "Email Capture", icon: "Mail" },
    { id: "booking-form", label: "Booking Form", icon: "Calendar" },
    { id: "maps", label: "Maps Integration", icon: "MapPin" },
    { id: "extra-pages", label: "Extra Pages", icon: "FileText" },
    { id: "gallery", label: "Gallery", icon: "Image" },
    { id: "seo-suburbs", label: "SEO Suburbs/Locations", icon: "Search" },
    { id: "testimonials", label: "Testimonials", icon: "Quote" },
    { id: "social-links", label: "Social Links", icon: "Share2" },
    { id: "video-section", label: "Video Section", icon: "Video" },
  ],
  styles: [
    { id: "modern", label: "Modern", color: "#a78bfa" },
    { id: "luxury", label: "Luxury", color: "#f59e0b" },
    { id: "bold", label: "Bold", color: "#ef4444" },
    { id: "minimal", label: "Minimal", color: "#6b7280" },
  ],
  palettes: [
    {
      id: "violet",
      label: "Violet Night",
      colors: ["#09090b", "#a78bfa", "#c4b5fd", "#fafafa"],
    },
    {
      id: "emerald",
      label: "Emerald Dark",
      colors: ["#09090b", "#34d399", "#6ee7b7", "#fafafa"],
    },
    {
      id: "amber",
      label: "Gold Rush",
      colors: ["#09090b", "#f59e0b", "#fbbf24", "#fafafa"],
    },
    {
      id: "rose",
      label: "Rose Premium",
      colors: ["#09090b", "#f43f5e", "#fb7185", "#fafafa"],
    },
    {
      id: "cyan",
      label: "Cyber Blue",
      colors: ["#09090b", "#06b6d4", "#22d3ee", "#fafafa"],
    },
    {
      id: "neutral",
      label: "Monochrome",
      colors: ["#09090b", "#d4d4d8", "#e4e4e7", "#fafafa"],
    },
  ],
  projects: [
    {
      id: "project-1",
      title: "Luxe Property Group",
      tier: "ai-integrated" as const,
      description: "AI-powered real estate platform with virtual tours",
      image: "/projects/placeholder.svg",
      url: "#",
      tags: ["AI Chatbot", "Gallery", "Maps"],
    },
    {
      id: "project-2",
      title: "Pulse Fitness Studio",
      tier: "landing" as const,
      description: "High-converting landing page for boutique fitness",
      image: "/projects/placeholder.svg",
      url: "#",
      tags: ["Booking Form", "Testimonials"],
    },
    {
      id: "project-3",
      title: "Vertex Legal",
      tier: "ai-integrated" as const,
      description: "Full-service law firm site with AI-powered intake",
      image: "/projects/placeholder.svg",
      url: "#",
      tags: ["AI Chatbot", "Email Capture", "SEO"],
    },
    {
      id: "project-4",
      title: "Ember Restaurant",
      tier: "landing" as const,
      description: "Elegant single-page restaurant experience",
      image: "/projects/placeholder.svg",
      url: "#",
      tags: ["Gallery", "Booking Form", "Maps"],
    },
    {
      id: "project-5",
      title: "Nova Digital Agency",
      tier: "ai-integrated" as const,
      description: "Multi-page agency site with AI client onboarding",
      image: "/projects/placeholder.svg",
      url: "#",
      hasVideo: true,
      tags: ["AI Chatbot", "Video Section", "Gallery"],
    },
    {
      id: "project-6",
      title: "Alpine Dental Care",
      tier: "landing" as const,
      description: "Clean, trustworthy dental practice landing page",
      image: "/projects/placeholder.svg",
      url: "#",
      tags: ["Booking Form", "Testimonials", "Maps"],
    },
  ],
  features: [
    {
      id: "ai-chat",
      title: "AI Chat Widget",
      description:
        "Intelligent chatbot that handles enquiries 24/7, qualifies leads, and books appointments automatically.",
      category: "AI-Powered",
    },
    {
      id: "email-capture-feature",
      title: "Email Capture & Lead Forms",
      description:
        "Beautiful opt-in forms that integrate with your CRM and email marketing platform.",
      category: "Lead Generation",
    },
    {
      id: "cta-blocks",
      title: "Strong CTA Blocks",
      description:
        "Conversion-optimised call-to-action sections designed to drive action at every scroll point.",
      category: "Conversion",
    },
    {
      id: "booking-feature",
      title: "Booking & Scheduling",
      description:
        "Integrated booking system that syncs with your calendar and sends automated confirmations.",
      category: "Automation",
    },
    {
      id: "maps-feature",
      title: "Maps & Service Areas",
      description:
        "Interactive maps showing your service locations, coverage areas, and office directions.",
      category: "Location",
    },
    {
      id: "gallery-feature",
      title: "Gallery & Portfolio",
      description:
        "Stunning image galleries with lightbox, lazy loading, and optional video integration.",
      category: "Visual",
    },
    {
      id: "testimonials-feature",
      title: "Testimonials & Reviews",
      description:
        "Social proof sections with animated testimonial carousels and star ratings.",
      category: "Trust",
    },
    {
      id: "seo-feature",
      title: "SEO-Optimised Layout",
      description:
        "Lightning-fast, search-engine friendly architecture that ranks you higher on Google.",
      category: "Performance",
    },
  ],
};
