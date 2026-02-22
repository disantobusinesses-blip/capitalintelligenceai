'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="bg-tech-black/80 backdrop-blur-sm border-b border-tech-baby-blue/20">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-tech-baby-blue hover:text-tech-baby-blue-light smooth-transition mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-tech-white">
            Terms &amp; Conditions
          </h1>
          <p className="text-tech-platinum mt-2">
            Last updated: February 17, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-tech-white mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-tech-white leading-relaxed mb-4">
            These Terms and Conditions ("Terms") govern your access to and use of the services provided by Capital Intelligence Group (ABN: 38 693 023 371), trading as Intelligent Systems ("we," "us," or "our"). By accessing or using our website and services, you agree to be bound by these Terms.
          </p>
          <p className="text-tech-white leading-relaxed">
            If you do not agree to these Terms, you must not access or use our services. We reserve the right to modify these Terms at any time, and your continued use of our services constitutes acceptance of any changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-tech-white mb-4">
            2. Service Description
          </h2>
          <p className="text-tech-white leading-relaxed mb-4">
            Intelligent Systems provides intelligent system integration services for businesses, including but not limited to:
          </p>
          <ul className="list-disc pl-6 text-tech-white space-y-2">
            <li>Website design, development, and maintenance</li>
            <li>AI-powered business solutions and integrations</li>
            <li>Digital optimization and revenue enhancement services</li>
            <li>Ongoing technical support and strategic consulting</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-tech-white mb-4">
            3. Monthly Subscription Plans
          </h2>
          
          <h3 className="text-xl font-semibold text-tech-white mb-3">
            3.1 Plan Options
          </h3>
          <p className="text-tech-white leading-relaxed mb-4">
            We offer three monthly subscription plans:
          </p>
          <ul className="list-disc pl-6 text-tech-white space-y-2 mb-4">
            <li><strong>Website Care:</strong> $169 AUD per month</li>
            <li><strong>Revenue Optimisation:</strong> $279 AUD per month</li>
            <li><strong>Done-For-You Digital Team:</strong> $449 AUD per month</li>
          </ul>

          <h3 className="text-xl font-semibold text-tech-white mb-3">
            3.2 Billing Terms
          </h3>
          <p className="text-tech-white leading-relaxed mb-4">
            All prices are in Australian Dollars (AUD) and exclude GST unless otherwise stated. Subscription fees are billed monthly in advance on the anniversary date of your subscription. Payment must be made via the payment method you provide during registration.
          </p>
          <p className="text-tech-white leading-relaxed">
            We reserve the right to change our pricing with 30 days' written notice. Price changes will not affect your current billing cycle but will apply to subsequent billing periods.
          </p>

          <h3 className="text-xl font-semibold text-tech-white mb-3">
            3.3 Automatic Renewal
          </h3>
          <p className="text-tech-white leading-relaxed">
            Your subscription will automatically renew each month unless you cancel prior to the renewal date. By subscribing, you authorize us to charge your payment method on a recurring monthly basis.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-tech-white mb-4">
            4. Cancellation and Refunds
          </h2>
          
          <h3 className="text-xl font-semibold text-tech-white mb-3">
            4.1 Cancellation Policy
          </h3>
          <p className="text-tech-white leading-relaxed mb-4">
            You may cancel your subscription at any time by providing written notice via email or through your account dashboard. Cancellations must be submitted at least 7 days before your next billing date to avoid being charged for the following month.
          </p>
          <p className="text-tech-white leading-relaxed mb-4">
            Upon cancellation, you will retain access to your plan's features until the end of your current billing period. No refunds will be issued for partial months or unused services.
          </p>

          <h3 className="text-xl font-semibold text-tech-white mb-3">
            4.2 Refund Policy
          </h3>
          <p className="text-tech-white leading-relaxed mb-4">
            Subscription fees are non-refundable except as required by Australian Consumer Law. If you are not satisfied with our services, please contact us within 7 days of your initial purchase to discuss your concerns. We will work with you to resolve any issues.
          </p>
          <p className="text-tech-white leading-relaxed">
            We reserve the right to issue refunds at our sole discretion on a case-by-case basis.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-tech-white mb-4">
            5. User Obligations
          </h2>
          <p className="text-tech-white leading-relaxed mb-4">
            As a user of our services, you agree to:
          </p>
          <ul className="list-disc pl-6 text-tech-white space-y-2">
            <li>Provide accurate and complete information during registration and onboarding</li>
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
            <li>Use our services only for lawful purposes and in compliance with all applicable laws</li>
            <li>Not interfere with or disrupt the integrity or performance of our services</li>
            <li>Not attempt to gain unauthorized access to our systems or networks</li>
            <li>Provide necessary brand assets, content, and approvals in a timely manner</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-tech-white mb-4">
            6. Intellectual Property Rights
          </h2>
          
          <h3 className="text-xl font-semibold text-tech-white mb-3">
            6.1 Our Intellectual Property
          </h3>
          <p className="text-tech-white leading-relaxed mb-4">
            All content, features, and functionality of our website and services, including but not limited to text, graphics, logos, icons, images, software, and design, are the exclusive property of Capital Intelligence Group or its licensors and are protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p className="text-tech-white leading-relaxed mb-4">
            You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any of our content without our express written permission.
          </p>

          <h3 className="text-xl font-semibold text-tech-white mb-3">
            6.2 Client-Provided Content
          </h3>
          <p className="text-tech-white leading-relaxed mb-4">
            You retain ownership of all content, materials, and intellectual property you provide to us (including logos, brand assets, text, and images). By providing these materials, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display your content solely for the purpose of providing our services.
          </p>
          <p className="text-tech-white leading-relaxed">
            You represent and warrant that you have all necessary rights to the content you provide and that your content does not infringe on the intellectual property rights of any third party.
          </p>

          <h3 className="text-xl font-semibold text-tech-white mb-3">
            6.3 Work Product Ownership
          </h3>
          <p className="text-tech-white leading-relaxed">
            Upon full payment of all applicable fees, you will own the final deliverables created specifically for you (such as your custom website). However, we retain ownership of any pre-existing materials, templates, tools, and methodologies used in creating your deliverables.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-tech-white mb-4">
            7. Limitation of Liability
          </h2>
          <p className="text-tech-white leading-relaxed mb-4">
            To the fullest extent permitted by law, Capital Intelligence Group and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 text-tech-white space-y-2 mb-4">
            <li>Your access to or use of (or inability to access or use) our services</li>
            <li>Any conduct or content of any third party on our services</li>
            <li>Unauthorized access to or alteration of your transmissions or content</li>
            <li>Statements or conduct of any third party on our services</li>
          </ul>
          <p className="text-tech-white leading-relaxed">
            Our total liability to you for all claims arising from or related to our services shall not exceed the amount you paid to us in the 12 months preceding the claim.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-tech-white mb-4">
            8. Warranties and Disclaimers
          </h2>
          <p className="text-tech-white leading-relaxed mb-4">
            Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that:
          </p>
          <ul className="list-disc pl-6 text-tech-white space-y-2 mb-4">
            <li>Our services will meet your specific requirements</li>
            <li>Our services will be uninterrupted, timely, secure, or error-free</li>
            <li>The results obtained from using our services will be accurate or reliable</li>
            <li>Any errors in our services will be corrected</li>
          </ul>
          <p className="text-tech-white leading-relaxed">
            Nothing in these Terms excludes any consumer guarantees under the Australian Consumer Law that cannot be lawfully excluded.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-tech-white mb-4">
            9. Indemnification
          </h2>
          <p className="text-tech-white leading-relaxed">
            You agree to defend, indemnify, and hold harmless Capital Intelligence Group and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or in any way connected with your access to or use of our services, your violation of these Terms, or your infringement of any third-party rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-tech-white mb-4">
            10. Third-Party Services and Integrations
          </h2>
          <p className="text-tech-white leading-relaxed mb-4">
            Our services may integrate with or rely on third-party services, platforms, or APIs (including AI systems). We are not responsible for the availability, functionality, or security of these third-party services. Your use of third-party services is governed by their respective terms and conditions.
          </p>
          <p className="text-tech-white leading-relaxed">
            We make no warranties or representations regarding the performance or reliability of third-party integrations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-tech-white mb-4">
            11. Confidentiality
          </h2>
          <p className="text-tech-white leading-relaxed">
            Both parties agree to maintain the confidentiality of any proprietary or confidential information disclosed during the provision of services. This obligation survives the termination of your subscription and continues for a period of 3 years.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-tech-white mb-4">
            12. Force Majeure
          </h2>
          <p className="text-tech-white leading-relaxed">
            We shall not be liable for any failure or delay in performing our obligations due to circumstances beyond our reasonable control, including but not limited to acts of God, natural disasters, pandemics, government actions, terrorism, labor disputes, or failures of third-party service providers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-tech-white mb-4">
            13. Termination
          </h2>
          <p className="text-tech-white leading-relaxed mb-4">
            We reserve the right to suspend or terminate your access to our services at any time, with or without cause, and with or without notice, if we believe you have violated these Terms or for any other reason we deem necessary.
          </p>
          <p className="text-tech-white leading-relaxed">
            Upon termination, your right to use our services will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, including intellectual property rights, warranty disclaimers, and limitations of liability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-tech-white mb-4">
            14. Governing Law and Dispute Resolution
          </h2>
          <p className="text-tech-white leading-relaxed mb-4">
            These Terms are governed by the laws of Australia. Any disputes arising from or relating to these Terms or our services shall be subject to the exclusive jurisdiction of the courts of Australia.
          </p>
          <p className="text-tech-white leading-relaxed">
            Before initiating any formal legal proceedings, both parties agree to attempt to resolve disputes through good faith negotiations for a period of 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-tech-white mb-4">
            15. Severability
          </h2>
          <p className="text-tech-white leading-relaxed">
            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. The invalid or unenforceable provision shall be replaced with a valid provision that most closely reflects the intent of the original provision.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-tech-white mb-4">
            16. Entire Agreement
          </h2>
          <p className="text-tech-white leading-relaxed">
            These Terms, together with our Privacy Policy, constitute the entire agreement between you and Capital Intelligence Group regarding your use of our services and supersede all prior agreements and understandings, whether written or oral.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-tech-white mb-4">
            17. Contact Information
          </h2>
          <p className="text-tech-white leading-relaxed mb-4">
            If you have any questions about these Terms and Conditions, please contact us:
          </p>
          <div className="bg-tech-gray/80 backdrop-blur-sm rounded-lg p-6 border border-tech-baby-blue/20">
            <p className="text-tech-white font-semibold mb-2">Capital Intelligence Group</p>
            <p className="text-tech-white">Trading as: Intelligent Systems</p>
            <p className="text-tech-white">ABN: 38 693 023 371</p>
          </div>
        </section>
      </div>
    </main>
  )
}
