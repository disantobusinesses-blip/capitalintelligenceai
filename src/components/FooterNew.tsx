import Link from "next/link";

export default function FooterNew() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-silver to-silver-dark flex items-center justify-center text-white font-bold text-lg">
                IS
              </div>
              <span className="text-lg font-bold text-foreground">
                Intelligent Systems
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed mb-4">
              We integrate intelligent systems into businesses to streamline
              operations and increase efficiency. Systems That Think. Businesses
              That Scale.
            </p>
            <p className="text-xs text-muted-foreground">
              ABN: 38 693 023 371
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "#packages", label: "Pricing" },
                { href: "#projects", label: "Projects" },
                { href: "#ai-demo", label: "AI Demo" },
                { href: "/intake", label: "Get Started" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
            <div className="mt-6 text-sm text-muted-foreground">
              <p>Melbourne, Australia</p>
              <p>hello@intelligentsystems.com.au</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Intelligent Systems - Capital
            Intelligence Group. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/80">
            Designed with intelligence &amp; precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
