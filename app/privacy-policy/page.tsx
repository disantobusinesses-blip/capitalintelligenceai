'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <main className="min-h-[100dvh] bg-[#F8F7F4] pt-[74px]">
      {/* Header */}
      <div>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#1A1A1A] hover:text-[#6B6560] smooth-transition mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A]">
            Privacy Policy
          </h1>
          <p className="text-[#6B6560] mt-2">
            Last updated: February 17, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            1. Introduction
          </h2>
          <p className="text-[#1A1A1A] leading-relaxed mb-4">
            Capital Intelligence Group (ABN: 38 693 023 371), trading as Intelligent Systems, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
          <p className="text-[#1A1A1A] leading-relaxed">
            By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            2. Information We Collect
          </h2>
          <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
            2.1 Personal Information
          </h3>
          <p className="text-[#1A1A1A] leading-relaxed mb-4">
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc pl-6 text-[#1A1A1A] space-y-2 mb-4">
            <li>Register for our services or create an account</li>
            <li>Submit inquiries or requests through our website</li>
            <li>Subscribe to our newsletter or marketing communications</li>
            <li>Participate in surveys or feedback forms</li>
            <li>Upload brand assets, logos, or other materials</li>
          </ul>
          <p className="text-[#1A1A1A] leading-relaxed mb-4">
            This information may include: name, email address, phone number, business name, payment information, and any other information you choose to provide.
          </p>

          <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
            2.2 Automatically Collected Information
          </h3>
          <p className="text-[#1A1A1A] leading-relaxed mb-4">
            When you access our website, we may automatically collect certain information, including:
          </p>
          <ul className="list-disc pl-6 text-[#1A1A1A] space-y-2">
            <li>IP address and device information</li>
            <li>Browser type and operating system</li>
            <li>Referring URLs and pages visited</li>
            <li>Date and time of access</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            3. How We Use Your Information
          </h2>
          <p className="text-[#1A1A1A] leading-relaxed mb-4">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc pl-6 text-[#1A1A1A] space-y-2">
            <li>To provide, maintain, and improve our services</li>
            <li>To process your transactions and manage your subscriptions</li>
            <li>To communicate with you about our services, updates, and promotional offers</li>
            <li>To respond to your inquiries and provide customer support</li>
            <li>To personalise your experience and deliver relevant content</li>
            <li>To analyse usage patterns and optimise our website performance</li>
            <li>To detect, prevent, and address technical issues or security vulnerabilities</li>
            <li>To comply with legal obligations and enforce our terms and conditions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            4. Data Storage and Hosting
          </h2>
          <p className="text-[#1A1A1A] leading-relaxed mb-4">
            Your data is stored securely using industry-standard hosting services. We implement appropriate technical and organisational measures to protect your information against unauthorised access, alteration, disclosure, or destruction.
          </p>
          <p className="text-[#1A1A1A] leading-relaxed">
            Website files, brand assets, and customer data are hosted on secure servers with regular backups. We use encryption for data transmission and storage where appropriate.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            5. AI Integrations and Data Processing
          </h2>
          <p className="text-[#1A1A1A] leading-relaxed mb-4">
            Our services may include AI-powered features and integrations. When you interact with these features:
          </p>
          <ul className="list-disc pl-6 text-[#1A1A1A] space-y-2 mb-4">
            <li>Your queries and interactions may be processed by AI systems</li>
            <li>Data is used solely to provide the requested service and improve functionality</li>
            <li>We do not sell or share your data with third-party AI providers for their own purposes</li>
            <li>AI-generated content recommendations are based on your specific inputs and preferences</li>
          </ul>
          <p className="text-[#1A1A1A] leading-relaxed">
            You have the right to opt out of AI-powered features at any time by contacting our support team.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            6. Information Sharing and Disclosure
          </h2>
          <p className="text-[#1A1A1A] leading-relaxed mb-4">
            We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
          </p>
          <ul className="list-disc pl-6 text-[#1A1A1A] space-y-2">
            <li><strong>Service Providers:</strong> With trusted third-party vendors who assist us in operating our website and providing services (e.g., payment processors, hosting providers)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, property, or safety</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            <li><strong>With Your Consent:</strong> When you explicitly authorise us to share your information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            7. Cookies and Tracking Technologies
          </h2>
          <p className="text-[#1A1A1A] leading-relaxed mb-4">
            We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device that help us:
          </p>
          <ul className="list-disc pl-6 text-[#1A1A1A] space-y-2 mb-4">
            <li>Remember your preferences and settings</li>
            <li>Understand how you use our website</li>
            <li>Improve our services and user experience</li>
            <li>Provide personalised content and recommendations</li>
          </ul>
          <p className="text-[#1A1A1A] leading-relaxed">
            You can control cookie preferences through your browser settings. However, disabling cookies may limit certain features of our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            8. Your Rights and Choices
          </h2>
          <p className="text-[#1A1A1A] leading-relaxed mb-4">
            You have the following rights regarding your personal information:
          </p>
          <ul className="list-disc pl-6 text-[#1A1A1A] space-y-2">
            <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
            <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
            <li><strong>Data Portability:</strong> Request a copy of your data in a structured, machine-readable format</li>
            <li><strong>Objection:</strong> Object to certain processing activities</li>
          </ul>
          <p className="text-[#1A1A1A] leading-relaxed mt-4">
            To exercise these rights, please contact us using the information provided at the end of this policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            9. Data Retention
          </h2>
          <p className="text-[#1A1A1A] leading-relaxed">
            We retain your personal information for as long as necessary to fulfil the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymise it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            10. Security
          </h2>
          <p className="text-[#1A1A1A] leading-relaxed">
            We implement reasonable security measures to protect your information from unauthorised access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            11. Third-Party Links
          </h2>
          <p className="text-[#1A1A1A] leading-relaxed">
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party websites you visit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            12. Children's Privacy
          </h2>
          <p className="text-[#1A1A1A] leading-relaxed">
            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete such information promptly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            13. Changes to This Privacy Policy
          </h2>
          <p className="text-[#1A1A1A] leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            14. Contact Us
          </h2>
          <p className="text-[#1A1A1A] leading-relaxed mb-4">
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="bg-white/80 backdrop-blur-sm rounded-[6px] p-6 border border-[#E8E4DF]">
            <p className="text-[#1A1A1A] font-semibold mb-2">Capital Intelligence Group</p>
            <p className="text-[#1A1A1A]">Trading as: Intelligent Systems</p>
            <p className="text-[#1A1A1A]">ABN: 38 693 023 371</p>
          </div>
        </section>
      </div>
    </main>
  )
}
