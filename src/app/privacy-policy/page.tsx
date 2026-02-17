import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Intelligent Systems",
  description: "Privacy policy for Intelligent Systems website services",
};

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              1. Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Intelligent Systems (ABN: 38 693 023 371), trading as part of
              Capital Intelligence Group, is committed to protecting your privacy
              and personal information. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you use
              our website development and intelligent systems integration services.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By using our services, you consent to the data practices described
              in this policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              2. Information We Collect
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              2.1 Personal Information
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide to
              us when you:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Register for our services</li>
              <li>Fill out inquiry or contact forms</li>
              <li>Subscribe to our mailing list</li>
              <li>Interact with our AI chatbot</li>
              <li>Upload brand assets or content</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This information may include:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Name and business name</li>
              <li>Email address and phone number</li>
              <li>Business address</li>
              <li>Payment and billing information</li>
              <li>Logo and brand assets</li>
              <li>Website content and materials</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
              2.2 Automatically Collected Information
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you visit our website, we automatically collect certain
              information about your device, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>IP address and location data</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Click patterns and navigation behavior</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide, operate, and maintain our services</li>
              <li>
                Develop, build, and deliver your website and intelligent systems
              </li>
              <li>Process your transactions and manage subscriptions</li>
              <li>Send administrative information and service updates</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our website and service offerings</li>
              <li>Analyze usage patterns and optimize user experience</li>
              <li>
                Send marketing communications (with your consent where required)
              </li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              4. AI Integration and Data Processing
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our services include AI-powered features such as chatbots, content
              generation, and intelligent system integrations. When you interact
              with these AI systems:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Your queries and conversations may be processed and stored</li>
              <li>
                Data may be sent to third-party AI service providers (such as
                OpenAI, Anthropic, or similar services)
              </li>
              <li>
                AI systems learn from interactions to improve service quality
              </li>
              <li>
                We implement safeguards to protect sensitive information in AI
                interactions
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              We do not use your personal information to train AI models that
              benefit other customers without your explicit consent.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              5. Information Sharing and Disclosure
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                <strong>Service Providers:</strong> Third-party vendors who
                perform services on our behalf (hosting, payment processing,
                analytics, AI services)
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with any
                merger, sale, or transfer of our business
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to
                protect our rights and safety
              </li>
              <li>
                <strong>With Your Consent:</strong> When you explicitly authorize
                us to share your information
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              6. Data Hosting and Storage
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your data is hosted on secure servers provided by reputable hosting
              services. We implement industry-standard security measures including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Encrypted data storage</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
              <li>Regular backups and disaster recovery procedures</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              However, no method of transmission over the internet is 100% secure,
              and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              7. Your Rights and Choices
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Access and review your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to processing of your information</li>
              <li>Request data portability</li>
              <li>Lodge a complaint with a data protection authority</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise these rights, please contact us at
              privacy@intelligentsystems.com.au
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              8. Cookies and Tracking Technologies
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your
              experience. Cookies are small data files stored on your device. You
              can control cookie preferences through your browser settings.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies for: authentication, preferences, analytics, and
              advertising purposes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              9. Data Retention
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information for as long as necessary to
              fulfill the purposes outlined in this Privacy Policy, unless a longer
              retention period is required by law. When we no longer need your
              information, we will securely delete or anonymize it.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              10. Children's Privacy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not directed to individuals under 18 years of age.
              We do not knowingly collect personal information from children. If we
              become aware that we have collected information from a child without
              parental consent, we will take steps to delete that information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              11. International Data Transfers
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information may be transferred to and processed in countries
              other than your country of residence. These countries may have
              different data protection laws. We ensure appropriate safeguards are
              in place to protect your information in accordance with this Privacy
              Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              12. Changes to This Privacy Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify
              you of any material changes by posting the new Privacy Policy on this
              page and updating the "Last updated" date. Your continued use of our
              services after such modifications constitutes your acknowledgment and
              acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              13. Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have questions or concerns about this Privacy Policy or our
              data practices, please contact us:
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
                Email: privacy@intelligentsystems.com.au
              </p>
              <p className="text-muted-foreground text-sm">
                Address: Melbourne, Australia
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              14. Australian Privacy Principles
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We comply with the Australian Privacy Principles (APPs) contained in
              the Privacy Act 1988 (Cth). This includes principles relating to the
              collection, use, disclosure, storage, security, access, and
              correction of personal information. For more information about
              privacy in Australia, visit the Office of the Australian Information
              Commissioner (OAIC) at www.oaic.gov.au
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
