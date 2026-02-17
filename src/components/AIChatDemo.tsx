"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, X, MessageSquare } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIChatDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm here to help you learn about our website packages and system integrations. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulated AI logic - will be replaced with API call later
  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Check for unrelated questions
    const unrelatedKeywords = [
      "weather",
      "sports",
      "news",
      "movie",
      "recipe",
      "joke",
      "game",
    ];
    if (unrelatedKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return "I can only answer questions about our website packages and system integrations. How can I help you with your website needs?";
    }

    // Package-related responses
    if (
      lowerMessage.includes("package") ||
      lowerMessage.includes("plan") ||
      lowerMessage.includes("pricing")
    ) {
      return "We offer three monthly plans:\n\n1. **Website Care** ($169/month) - Essential maintenance and updates\n2. **Revenue Optimisation** ($279/month) - Growth-focused improvements with A/B testing and SEO\n3. **Done-For-You Digital Team** ($449/month) - Complete digital management with dedicated support\n\nWould you like to know more about any specific plan?";
    }

    if (lowerMessage.includes("website care")) {
      return "The **Website Care** plan ($169/month) includes:\n- Monthly website updates\n- Security monitoring\n- Performance optimization\n- Backup & recovery\n- Technical support\n- Bug fixes\n- Content updates (2 hours/month)\n- Monthly performance report\n\nThis is perfect for businesses that need reliable maintenance.";
    }

    if (lowerMessage.includes("revenue") || lowerMessage.includes("optimization")) {
      return "The **Revenue Optimisation** plan ($279/month) includes everything in Website Care plus:\n- A/B testing implementation\n- Conversion rate optimization\n- Analytics & reporting\n- SEO improvements\n- Lead capture optimization\n- Content updates (4 hours/month)\n- Quarterly strategy sessions\n\nThis plan is ideal for growing businesses focused on results.";
    }

    if (lowerMessage.includes("done-for-you") || lowerMessage.includes("digital team")) {
      return "The **Done-For-You Digital Team** plan ($449/month) includes everything in Revenue Optimisation plus:\n- Dedicated account manager\n- Content creation & publishing\n- Social media management\n- Email marketing campaigns\n- Advanced AI integrations\n- Custom feature development\n- Unlimited support & updates\n- Weekly strategy calls\n\nThis is our premium option for businesses wanting full digital management.";
    }

    if (
      lowerMessage.includes("difference") ||
      lowerMessage.includes("compare")
    ) {
      return "The main differences between our plans:\n\n**Website Care**: Basic maintenance and security\n**Revenue Optimisation**: Adds growth features like A/B testing and SEO\n**Done-For-You**: Full digital management with dedicated team\n\nEach tier builds on the previous one. Which business goals are most important to you?";
    }

    if (
      lowerMessage.includes("onboarding") ||
      lowerMessage.includes("process") ||
      lowerMessage.includes("start") ||
      lowerMessage.includes("begin")
    ) {
      return "Our onboarding process is simple:\n\n1. **Choose Plan** - Select the right package for your needs\n2. **Upload Assets** - Share your logo and brand materials\n3. **Select Layout** - Pick your preferred design style\n4. **Choose Features** - Customize functionality\n5. **Launch** - Go live with ongoing support\n\nThe entire process typically takes 2-3 weeks. Ready to get started?";
    }

    if (lowerMessage.includes("template") || lowerMessage.includes("design") || lowerMessage.includes("style")) {
      return "We offer multiple design templates and styles:\n- Modern & Clean\n- Luxury Premium\n- Bold & Dynamic\n- Minimal Elegant\n\nAll designs are customized to match your brand identity. During onboarding, you'll choose your preferred style and we'll tailor it to your needs.";
    }

    if (lowerMessage.includes("feature") || lowerMessage.includes("functionality")) {
      return "Common features we integrate include:\n- AI chatbots\n- Contact forms\n- Booking systems\n- E-commerce\n- Blog/News sections\n- Gallery/Portfolio\n- Analytics\n- Custom integrations\n\nThe available features depend on your chosen plan. What functionality are you looking for?";
    }

    if (lowerMessage.includes("ai") || lowerMessage.includes("intelligent")) {
      return "Our intelligent systems can include:\n- AI-powered chatbots for customer service\n- Automated lead qualification\n- Smart content recommendations\n- Predictive analytics\n- Process automation\n- Custom AI integrations\n\nThese are available with our higher-tier plans. Would you like to know more about specific AI capabilities?";
    }

    // Default response
    return "I'd be happy to help! I can answer questions about:\n- Our monthly plans and pricing\n- Package differences and comparisons\n- The onboarding process\n- Website templates and design options\n- Available features and integrations\n\nWhat would you like to know?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate API delay
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="py-32 px-6 relative" id="ai-demo">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-medium tracking-widest text-silver-dark uppercase mb-4 block">
              AI Assistant Demo
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Experience Intelligent Support
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Try our AI chatbot to learn about packages, features, and onboarding.
              This demo showcases how we integrate intelligent systems into your
              website.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="max-w-3xl mx-auto">
            {/* Chat Widget */}
            <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-foreground text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-silver flex items-center justify-center">
                    <Bot size={20} className="text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Assistant</h3>
                    <p className="text-xs text-white/70">Always ready to help</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow" />
                  <span className="text-xs text-white/70">Online</span>
                </div>
              </div>

              {/* Messages */}
              <div className="h-[500px] overflow-y-auto p-6 bg-white space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-foreground text-white"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {message.content}
                      </p>
                      <span className="text-xs opacity-60 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-silver-dark animate-bounce" />
                        <span
                          className="w-2 h-2 rounded-full bg-silver-dark animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <span
                          className="w-2 h-2 rounded-full bg-silver-dark animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-border p-4 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about our packages..."
                    className="flex-1 px-4 py-3 rounded-xl border border-border focus:outline-none focus:border-silver bg-white text-foreground placeholder:text-muted-foreground"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="px-6 py-3 rounded-xl bg-foreground text-white hover:bg-silver-dark transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  This is a demo. The chatbot can answer questions about packages,
                  onboarding, and features.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
