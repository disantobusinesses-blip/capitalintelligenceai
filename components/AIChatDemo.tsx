'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, X, MessageCircle } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

// Simulated AI responses - will be replaced with API later
const getSimulatedResponse = (userMessage: string): string => {
  const messageLower = userMessage.toLowerCase()

  // Website template questions
  if (messageLower.includes('template') || messageLower.includes('design') || messageLower.includes('layout')) {
    return "We offer multiple premium website templates designed for different industries. Each template is fully customizable and includes modern features like responsive design, smooth animations, and optimized performance. During onboarding, you'll be able to preview and select the template that best fits your brand."
  }

  // Monthly plan questions
  if (messageLower.includes('plan') || messageLower.includes('pricing') || messageLower.includes('cost') || messageLower.includes('monthly')) {
    return "We have three monthly plans:\n\n• Website Care ($169/month) - Essential maintenance and updates\n• Revenue Optimisation ($279/month) - Includes optimization and SEO\n• Done-For-You Digital Team ($449/month) - Full-service digital management\n\nAll plans are month-to-month with no long-term contracts required."
  }

  // Package differences
  if (messageLower.includes('difference') || messageLower.includes('compare') || messageLower.includes('between')) {
    return "The main differences are:\n\n• Website Care: Basic maintenance and security\n• Revenue Optimisation: Adds conversion optimization, A/B testing, and SEO\n• Done-For-You: Includes a dedicated strategist, custom development, and marketing automation\n\nEach tier builds upon the previous one with more advanced features and support."
  }

  // Onboarding questions
  if (messageLower.includes('onboard') || messageLower.includes('start') || messageLower.includes('process') || messageLower.includes('begin')) {
    return "Our onboarding process is simple:\n\n1. Choose your plan\n2. Upload your logo and brand assets\n3. Select your preferred layout style\n4. Choose features and integrations\n5. Launch with your chosen monthly plan\n\nThe entire process typically takes 2-3 business days."
  }

  // Features questions
  if (messageLower.includes('feature') || messageLower.includes('include') || messageLower.includes('what')) {
    return "Each plan includes different features. Website Care covers basics like security and updates. Revenue Optimisation adds SEO, analytics, and conversion tools. Done-For-You includes everything plus custom development, marketing automation, and a dedicated team. Would you like details on a specific plan?"
  }

  // Default response for unrelated questions
  return "I can only answer questions about our website packages, monthly plans, template choices, and onboarding process. Please ask me about our services, pricing, or how to get started with Intelligent Systems."
}

export default function AIChatDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m here to help you learn about our website packages and monthly plans. What would you like to know?',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    setInputValue('')

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])

    // Simulate typing delay
    setIsTyping(true)
    
    setTimeout(() => {
      const response = getSimulatedResponse(userMessage)
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
      setIsTyping(false)
    }, 800)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <section className="py-24 px-6 bg-luxury-off-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-luxury-charcoal mb-4">
            AI Assistant Demo
          </h2>
          <p className="text-xl text-luxury-silver-dark max-w-2xl mx-auto">
            Ask questions about our packages, pricing, and onboarding process
          </p>
        </div>

        {/* Chatbox Container */}
        <div className="max-w-3xl mx-auto">
          {isOpen ? (
            <div className="bg-white rounded-2xl luxury-shadow overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-silver p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <Bot className="w-6 h-6 text-luxury-charcoal" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AI Assistant</h3>
                    <p className="text-sm text-white/80">Always available</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg smooth-transition"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user'
                          ? 'bg-luxury-charcoal'
                          : 'bg-luxury-silver-light'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-luxury-charcoal" />
                      )}
                    </div>
                    <div
                      className={`max-w-[70%] p-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-luxury-charcoal text-white'
                          : 'bg-luxury-silver-light text-luxury-charcoal'
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-luxury-silver-light flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-luxury-charcoal" />
                    </div>
                    <div className="bg-luxury-silver-light p-4 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-luxury-silver rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-luxury-silver rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-luxury-silver rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-luxury-silver-light p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about our packages..."
                    className="flex-1 px-4 py-2 border border-luxury-silver-light rounded-lg focus:outline-none focus:border-luxury-silver"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="px-6 py-2 bg-luxury-charcoal text-white rounded-lg font-semibold smooth-transition hover:bg-luxury-silver-dark disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="w-full bg-white border-2 border-luxury-silver rounded-2xl p-8 luxury-shadow smooth-transition hover:scale-105 hover:border-luxury-charcoal"
            >
              <div className="flex items-center justify-center gap-4">
                <MessageCircle className="w-12 h-12 text-luxury-charcoal" />
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-luxury-charcoal mb-2">
                    Try Our AI Assistant
                  </h3>
                  <p className="text-luxury-silver-dark">
                    Click to ask questions about our services
                  </p>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
