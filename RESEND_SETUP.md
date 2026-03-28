# Resend Email Integration Setup

This guide will help you set up the Resend email integration for the contact form.

## Prerequisites

1. A Resend account (sign up at https://resend.com)
2. A verified domain in Resend (required for sending emails)

## Setup Instructions

### 1. Get Your Resend API Key

1. Go to https://resend.com and sign in to your account
2. Navigate to **API Keys** in the dashboard
3. Click **Create API Key**
4. Give it a name (e.g., "Capital Intelligence AI Production")
5. Copy the API key (it starts with `re_`)

⚠️ **Important**: Save this key immediately - you won't be able to see it again!

### 2. Verify Your Domain

Before you can send emails, you need to verify a domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `intelligentaisystem.com`)
4. Follow the instructions to add DNS records to your domain
5. Wait for verification (usually takes a few minutes)

### 3. Configure Environment Variables

#### For Local Development:

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your values:
   ```bash
   RESEND_API_KEY=re_your_actual_api_key_here
   EMAIL_FROM=onboarding@yourdomain.com
   EMAIL_TO=sales@intelligentaisystem.com
   ```

   Replace:
   - `re_your_actual_api_key_here` with your actual Resend API key
   - `yourdomain.com` with your verified domain
   - `sales@intelligentaisystem.com` with the email where you want to receive form submissions

#### For Production (Vercel):

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add the following variables:
   - `RESEND_API_KEY`: Your Resend API key
   - `EMAIL_FROM`: The email address to send from (must be from verified domain)
   - `EMAIL_TO`: The email address to receive form submissions

4. Redeploy your application for changes to take effect

## Testing

### Test Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to http://localhost:3000
3. Fill out and submit the contact form
4. Check your email inbox (EMAIL_TO address) for the submission

### Common Issues

**Problem**: "Email will not be sent" message in console

**Solution**: Make sure your `.env.local` file has the correct `RESEND_API_KEY`

---

**Problem**: Email not received

**Solutions**:
1. Check that your domain is verified in Resend
2. Verify `EMAIL_FROM` uses your verified domain
3. Check spam folder
4. Review Resend dashboard logs for any errors

---

**Problem**: "Failed to send email" error

**Solution**: Check the server logs for specific Resend API errors. Common issues:
- Invalid API key
- Unverified sender domain
- Rate limits exceeded

## Email Template

The form submissions are sent as HTML emails with:
- Service details (Landing Page or Full Package)
- Monthly plan selection
- AI automation requests (if applicable)
- Business information
- Design preferences
- Requested features
- Contact information

## Security Notes

- ✅ `.env.local` is already in `.gitignore` and won't be committed
- ✅ Never commit your API key to the repository
- ✅ Use different API keys for development and production
- ✅ Rotate API keys periodically for security

## Support

- Resend Documentation: https://resend.com/docs
- Resend API Reference: https://resend.com/docs/api-reference
- Support: Contact Resend support through their dashboard

## What Happens Without API Key?

If `RESEND_API_KEY` is not configured:
- The form will still work and show success to users
- Form data will be logged to console instead of sending email
- A warning message will appear in server logs
- This allows testing the form functionality without email service

## Cost

Resend offers:
- **Free tier**: 100 emails/day, 3,000 emails/month
- **Pro tier**: Starting at $20/month for higher volumes

For most small businesses, the free tier is sufficient.
