import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#a78bfa] to-[#7c3aed] flex items-center justify-center text-white font-bold text-sm">
                C
              </div>
              <span className="text-lg font-semibold">
                Capital Intelligence Group
              </span>
            </div>
            <p className="text-[#a1a1aa] text-sm max-w-md leading-relaxed">
              Premium web development studio crafting high-end, AI-integrated
              digital experiences that convert and scale your business.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white/80">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/projects", label: "Projects" },
                { href: "/features", label: "Features" },
                { href: "/intake", label: "Get Started" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#a1a1aa] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white/80">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-[#a1a1aa]">
              <li>hello@capitalintelligence.com.au</li>
              <li>Melbourne, Australia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#a1a1aa]">
            &copy; {new Date().getFullYear()} Capital Intelligence Group. All
            rights reserved.
          </p>
          <p className="text-xs text-[#a1a1aa]/50">
            Designed &amp; built with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
