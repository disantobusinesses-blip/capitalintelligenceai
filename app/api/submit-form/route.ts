import { NextRequest, NextResponse } from 'next/server'

interface FormData {
  service: string | null
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

export async function POST(request: NextRequest) {
  try {
    const formData: FormData = await request.json()

    const webhookUrl = process.env.N8N_WEBHOOK_URL
    if (!webhookUrl) {
      console.error('N8N_WEBHOOK_URL is not configured')
      return NextResponse.json(
        { success: false, message: 'Server configuration error. Please try again later.' },
        { status: 500 }
      )
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)

    let webhookResponse: Response
    try {
      webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      })
    } catch (fetchError) {
      console.error('n8n webhook network error:', fetchError)
      return NextResponse.json(
        { success: false, message: 'Unable to reach the server. Please try again later.' },
        { status: 502 }
      )
    } finally {
      clearTimeout(timeout)
    }

    if (!webhookResponse.ok) {
      const errorBody = await webhookResponse.text().catch(() => '')
      console.error('n8n webhook error:', webhookResponse.status, webhookResponse.statusText, errorBody)
      return NextResponse.json(
        { success: false, message: 'Failed to submit form. Please try again or contact us directly.' },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully. We will contact you within 24 hours.',
    })
  } catch (error) {
    console.error('Error processing form submission:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to process form submission' },
      { status: 500 }
    )
  }
}
