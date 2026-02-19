import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

type ServiceType = 'landing-page' | 'full-package'

interface FormData {
  service: ServiceType | null
  businessName: string
  industry: string
  description: string
  designStyle: string
  colorPreference: string
  features: string[]
  monthlyPlan: string
  aiAutomationRequest: string
  contactName: string
  contactEmail: string
  contactPhone: string
  hasLogo: boolean
  additionalNotes: string
}

// Lazy initialization of Resend client
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return null
  }
  return new Resend(apiKey)
}

export async function POST(request: NextRequest) {
  try {
    const formData: FormData = await request.json()

    // Format the email content
    const emailContent = formatEmailContent(formData)
    const emailSubject = `New ${formData.service === 'landing-page' ? 'Landing Page' : 'Full Package'} Inquiry - ${formData.businessName}`

    // Check if Resend is configured
    const resend = getResendClient()
    
    if (!resend) {
      console.warn('RESEND_API_KEY not configured. Email will not be sent.')
      console.log('Form submission received:', {
        to: process.env.EMAIL_TO || 'sales@intelligentaisystem.com',
        from: formData.contactEmail,
        businessName: formData.businessName,
        service: formData.service,
        monthlyPlan: formData.monthlyPlan,
      })
      
      return NextResponse.json({ 
        success: true, 
        message: 'Form submitted successfully (email disabled - no API key)' 
      })
    }

    // Send email using Resend
    try {
      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'onboarding@intelligentaisystem.com',
        to: process.env.EMAIL_TO || 'sales@intelligentaisystem.com',
        subject: emailSubject,
        html: emailContent,
        replyTo: formData.contactEmail,
      })

      if (error) {
        console.error('Resend API error:', error)
        return NextResponse.json(
          { success: false, message: 'Failed to send email. Please try again or contact us directly.' },
          { status: 500 }
        )
      }

      console.log('Email sent successfully:', {
        emailId: data?.id,
        to: process.env.EMAIL_TO,
        from: formData.contactEmail,
        businessName: formData.businessName,
      })

      return NextResponse.json({ 
        success: true, 
        message: 'Form submitted successfully. We will contact you within 24 hours.' 
      })
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      return NextResponse.json(
        { success: false, message: 'Failed to send email. Please try again or contact us directly at sales@intelligentaisystem.com' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error processing form submission:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to process form submission' },
      { status: 500 }
    )
  }
}

function formatEmailContent(formData: FormData): string {
  const {
    service,
    businessName,
    industry,
    description,
    designStyle,
    colorPreference,
    features,
    monthlyPlan,
    aiAutomationRequest,
    contactName,
    contactEmail,
    contactPhone,
    hasLogo,
    additionalNotes,
  } = formData

  const serviceName = service === 'landing-page' ? 'Landing Page' : 'Website + Full Package'
  const planName = monthlyPlan === 'care' ? 'Website Care ($99 AUD/mo)' : 'AI Systems Integration (Custom)'

  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 0 0 8px 8px;
          }
          .section {
            margin-bottom: 20px;
          }
          .section-title {
            font-weight: bold;
            color: #667eea;
            margin-bottom: 8px;
            font-size: 16px;
          }
          .info-row {
            margin: 5px 0;
          }
          .label {
            font-weight: 600;
            display: inline-block;
            width: 180px;
          }
          .features-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          .feature-tag {
            background: #667eea;
            color: white;
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 14px;
          }
          .ai-request {
            background: #fff;
            padding: 15px;
            border-left: 4px solid #667eea;
            margin-top: 10px;
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">New Service Inquiry</h1>
            <p style="margin: 5px 0 0 0;">From: ${businessName}</p>
          </div>
          <div class="content">
            <div class="section">
              <div class="section-title">Service Details</div>
              <div class="info-row"><span class="label">Service Type:</span> ${serviceName}</div>
              <div class="info-row"><span class="label">Monthly Plan:</span> ${planName}</div>
            </div>

            ${monthlyPlan === 'ai-integration' && aiAutomationRequest ? `
            <div class="section">
              <div class="section-title">AI Automation Request</div>
              <div class="ai-request">${aiAutomationRequest}</div>
            </div>
            ` : ''}

            <div class="section">
              <div class="section-title">Business Information</div>
              <div class="info-row"><span class="label">Business Name:</span> ${businessName}</div>
              <div class="info-row"><span class="label">Industry:</span> ${industry}</div>
              ${description ? `<div class="info-row"><span class="label">Description:</span> ${description}</div>` : ''}
              <div class="info-row"><span class="label">Has Logo/Brand Assets:</span> ${hasLogo ? 'Yes' : 'No'}</div>
            </div>

            <div class="section">
              <div class="section-title">Design Preferences</div>
              <div class="info-row"><span class="label">Design Style:</span> ${designStyle || 'Not specified'}</div>
              <div class="info-row"><span class="label">Color Preference:</span> ${colorPreference || 'Not specified'}</div>
            </div>

            ${features.length > 0 ? `
            <div class="section">
              <div class="section-title">Requested Features</div>
              <div class="features-list">
                ${features.map((f: string) => `<span class="feature-tag">${f}</span>`).join('')}
              </div>
            </div>
            ` : ''}

            <div class="section">
              <div class="section-title">Contact Information</div>
              <div class="info-row"><span class="label">Name:</span> ${contactName}</div>
              <div class="info-row"><span class="label">Email:</span> <a href="mailto:${contactEmail}">${contactEmail}</a></div>
              ${contactPhone ? `<div class="info-row"><span class="label">Phone:</span> ${contactPhone}</div>` : ''}
            </div>

            ${additionalNotes ? `
            <div class="section">
              <div class="section-title">Additional Notes</div>
              <div style="background: #fff; padding: 15px; border-radius: 4px;">${additionalNotes}</div>
            </div>
            ` : ''}
          </div>
        </div>
      </body>
    </html>
  `
}
