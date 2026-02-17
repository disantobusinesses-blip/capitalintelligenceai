/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Intelligent Systems",
  description: "Terms and conditions for Intelligent Systems website services",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
          Terms &amp; Conditions
        </h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              These Terms and Conditions ("Terms") constitute a legally binding
              agreement between you ("Client," "you," or "your") and Intelligent
              Systems (ABN: 38 693 023 371), trading as part of Capital
              Intelligence Group ("we," "us," or "our"), concerning your access to
              and use of our website development and intelligent systems
              integration services.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By engaging our services, you acknowledge that you have read,
              understood, and agree to be bound by these Terms. If you do not agree
              to these Terms, you must not use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              2. Services Description
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Intelligent Systems provides:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Website design, development, and maintenance</li>
              <li>Intelligent systems integration for business operations</li>
              <li>AI-powered features and chatbot implementation</li>
              <li>Monthly subscription-based support and optimization plans</li>
              <li>Digital strategy and consulting services</li>
              <li>Content management and updates</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Specific services are detailed in your selected monthly plan and any
              additional agreements or proposals.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              3. Monthly Subscription Plans
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              3.1 Plan Types
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We offer three monthly subscription plans:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                <strong>Website Care ($169/month):</strong> Essential maintenance
                and updates
              </li>
              <li>
                <strong>Revenue Optimisation ($279/month):</strong> Growth-focused
                improvements and analytics
              </li>
              <li>
                <strong>Done-For-You Digital Team ($449/month):</strong> Complete
                digital management
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              3.2 Billing
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All subscription plans are billed monthly in advance. Payment is due
              on the first day of each billing period. We accept payment via credit
              card, debit card, or direct bank transfer as agreed upon.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Prices are in Australian Dollars (AUD) unless otherwise specified and
              include GST where applicable.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              3.3 Automatic Renewal
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Your subscription will automatically renew each month unless you
              cancel before the next billing period. You authorize us to charge
              your payment method for recurring monthly fees.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              4. Cancellation and Refund Policy
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              4.1 Cancellation
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You may cancel your subscription at any time by providing written
              notice at least 7 days before your next billing date. Cancellation
              will take effect at the end of the current billing period.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To cancel, email us at support@intelligentsystems.com.au with your
              account details and cancellation request.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              4.2 Refunds
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Monthly subscription fees are non-refundable once the billing period
              has commenced. If you cancel mid-month, you will retain access to
              services until the end of your paid period.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For initial website development projects, refund eligibility will be
              outlined in your specific project agreement.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              4.3 Our Right to Suspend or Terminate
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to suspend or terminate your subscription if:
              payment is not received within 7 days of the due date; you breach
              these Terms; or we discontinue the service (with 30 days' notice).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              5. Client Responsibilities
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              As a client, you agree to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                Provide accurate and complete information, including business
                details, brand assets, and content
              </li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>
                Ensure all content you provide does not infringe on third-party
                intellectual property rights
              </li>
              <li>
                Comply with all applicable laws and regulations in your use of our
                services
              </li>
              <li>Respond to our requests for information in a timely manner</li>
              <li>Make timely payments for services rendered</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              6. Intellectual Property Rights
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              6.1 Client Content
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You retain all rights to content, materials, and intellectual
              property you provide to us ("Client Content"). By providing Client
              Content, you grant us a non-exclusive, worldwide license to use,
              modify, and display this content solely for the purpose of delivering
              our services.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              6.2 Our Intellectual Property
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We retain all rights to our proprietary systems, code frameworks,
              methodologies, and tools used in service delivery. The website and
              systems we create for you are licensed to you for use, but we retain
              ownership of underlying frameworks and reusable components.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              6.3 Final Deliverables
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Upon full payment for initial development work, you receive ownership
              of the custom design elements, content, and configurations specific
              to your website. You receive a license to use the technical
              infrastructure for as long as you maintain an active subscription.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              7. Warranties and Disclaimers
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              7.1 Service Warranties
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We warrant that:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>
                Services will be performed with reasonable skill and care in
                accordance with industry standards
              </li>
              <li>
                We will make reasonable efforts to ensure website functionality and
                uptime
              </li>
              <li>We will address bugs and issues in a timely manner</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              7.2 Disclaimers
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              EXCEPT AS EXPRESSLY PROVIDED, OUR SERVICES ARE PROVIDED "AS IS"
              WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
              LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We do not warrant that:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Services will be uninterrupted or error-free</li>
              <li>
                Your website will achieve specific search engine rankings or
                traffic levels
              </li>
              <li>
                AI-powered features will produce specific results or outcomes
              </li>
              <li>Third-party integrations will function without interruption</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              8. Limitation of Liability
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL
              INTELLIGENT SYSTEMS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE,
              DATA, OR BUSINESS OPPORTUNITIES ARISING OUT OF OR RELATED TO THESE
              TERMS OR OUR SERVICES.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM OR RELATED TO OUR
              SERVICES SHALL NOT EXCEED THE TOTAL AMOUNT PAID BY YOU TO US IN THE
              SIX (6) MONTHS PRECEDING THE CLAIM.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Some jurisdictions do not allow the exclusion or limitation of
              certain damages. In such jurisdictions, our liability will be limited
              to the maximum extent permitted by law.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              9. Indemnification
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to indemnify, defend, and hold harmless Intelligent Systems
              and its officers, directors, employees, and agents from any claims,
              damages, losses, liabilities, and expenses (including legal fees)
              arising from: (a) your breach of these Terms; (b) your use of our
              services; (c) Client Content you provide; or (d) your violation of
              any law or third-party rights.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              10. AI Services and Third-Party Integrations
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our intelligent systems may integrate with third-party AI services
              and platforms. You acknowledge that:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                Third-party services are subject to their own terms and privacy
                policies
              </li>
              <li>
                We are not responsible for the performance or availability of
                third-party services
              </li>
              <li>AI outputs may require human review and verification</li>
              <li>
                AI systems may occasionally produce inaccurate or unexpected
                results
              </li>
              <li>
                You are responsible for reviewing and approving AI-generated
                content before publication
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              11. Confidentiality
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Both parties agree to maintain the confidentiality of any proprietary
              or confidential information disclosed during the course of our
              business relationship. This obligation continues for three (3) years
              after termination of services.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Confidential information does not include information that: (a) is or
              becomes publicly available without breach of this agreement; (b) is
              rightfully received from a third party; or (c) is required to be
              disclosed by law.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              12. Force Majeure
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Neither party shall be liable for any failure or delay in performance
              due to circumstances beyond their reasonable control, including but
              not limited to acts of God, war, terrorism, pandemic, internet
              service failures, or power outages.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              13. Modification of Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We reserve the right to modify these Terms at any time. We will
              provide notice of material changes by email or through our website at
              least 30 days before the changes take effect.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Your continued use of our services after changes become effective
              constitutes acceptance of the modified Terms. If you do not agree to
              the changes, you may cancel your subscription.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              14. Governing Law and Dispute Resolution
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              14.1 Governing Law
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              These Terms are governed by the laws of Victoria, Australia. You
              agree to submit to the exclusive jurisdiction of the courts of
              Victoria for resolution of any disputes.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              14.2 Dispute Resolution
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In the event of a dispute, both parties agree to first attempt to
              resolve the matter through good-faith negotiation. If negotiation
              fails, the parties may pursue mediation before initiating legal
              proceedings.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              15. General Provisions
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              15.1 Entire Agreement
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              These Terms, together with any proposal, agreement, or other
              documents referenced herein, constitute the entire agreement between
              you and Intelligent Systems regarding our services.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              15.2 Severability
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If any provision of these Terms is found to be unenforceable or
              invalid, that provision will be limited or eliminated to the minimum
              extent necessary, and the remaining provisions will remain in full
              force and effect.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              15.3 Waiver
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              No waiver of any term or condition shall be deemed a further or
              continuing waiver of such term or any other term.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              15.4 Assignment
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              You may not assign or transfer these Terms or your subscription
              without our prior written consent. We may assign these Terms without
              restriction.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              16. Contact Information
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For questions about these Terms, please contact us:
            </p>
            <div className="bg-muted p-6 rounded-xl">
              <p className="text-foreground font-semibold mb-2">
                Intelligent Systems
              </p>
              <p className="text-muted-foreground text-sm">
                Capital Intelligence Group
              </p>
              <p className="text-muted-foreground text-sm">
                ABN: 38 693 023 371
              </p>
              <p className="text-muted-foreground text-sm mt-3">
                Email: legal@intelligentsystems.com.au
              </p>
              <p className="text-muted-foreground text-sm">
                Support: support@intelligentsystems.com.au
              </p>
              <p className="text-muted-foreground text-sm">
                Address: Melbourne, Australia
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              17. Acceptance
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              BY USING OUR SERVICES OR CHECKING THE "I AGREE" BOX DURING
              REGISTRATION, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND
              AGREE TO BE BOUND BY THESE TERMS AND CONDITIONS.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
