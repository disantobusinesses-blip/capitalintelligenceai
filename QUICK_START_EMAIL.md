# Quick Start: Resend Email Setup

## TL;DR - What You Need to Do

### If You Want Emails to Work:

1. **Sign up for Resend** (5 minutes)
   - Go to https://resend.com
   - Create free account (100 emails/day free)

2. **Get API Key** (1 minute)
   - Dashboard → API Keys → Create API Key
   - Copy the key (starts with `re_`)

3. **Add to Environment** (1 minute)
   
   **For Local Testing:**
   ```bash
   # Edit .env.local file:
   RESEND_API_KEY=re_paste_your_key_here
   ```
   
   **For Production (Vercel):**
   - Vercel Dashboard → Settings → Environment Variables
   - Add `RESEND_API_KEY` with your key value

4. **Verify Domain** (5 minutes + DNS propagation time)
   - Resend Dashboard → Domains → Add Domain
   - Add DNS records as instructed
   - Wait for verification

That's it! 🎉

---

## Do You Need to Share Your API Key with Me?

**Short Answer: No, you don't need to share it!**

### Here's Why:

1. **Security**: API keys should never be shared or committed to repositories
2. **Control**: You should manage your own API keys
3. **Already Integrated**: The code is ready - just add your key to environment variables

### How It Works:

- ✅ Code is already integrated with Resend
- ✅ Just add your API key to `.env.local` file (locally) or Vercel (production)
- ✅ The form will automatically start sending emails
- ✅ No code changes needed by you

---

## What If You Don't Set It Up?

**The form still works perfectly!**

- ✅ Users can submit forms
- ✅ They see success messages
- ✅ Form data is logged to console
- ✅ No errors or crashes
- ⚠️ Just no actual emails sent

This is perfect for testing and development.

---

## Cost

**Resend Free Tier:**
- 100 emails per day
- 3,000 emails per month
- **Cost: $0/month**

For most small businesses, this is more than enough!

---

## Questions?

**Q: Can you set up the API key for me?**
A: It's better if you do it yourself for security reasons. Follow the steps in RESEND_SETUP.md - it's very simple!

**Q: What if I already have SendGrid/Mailgun/etc?**
A: The code can be adapted for other services, but Resend is recommended for Next.js (simpler, cleaner API).

**Q: Do I need to verify a domain?**
A: Yes, but Resend makes it easy. You just need to add a few DNS records.

**Q: What email will forms be sent to?**
A: Currently set to `sales@intelligentaisystem.com`. You can change this in `.env.local` with `EMAIL_TO=your@email.com`

---

## Full Documentation

See [RESEND_SETUP.md](RESEND_SETUP.md) for complete, detailed instructions with screenshots and troubleshooting.
