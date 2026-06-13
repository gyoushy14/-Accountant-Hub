import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-container px-4 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white text-sm font-bold">
                A
              </div>
              <span className="text-lg font-bold font-heading">
                Accountant<span className="text-brand-jade">HUB</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Connecting businesses with top financial professionals. Find the perfect accountant for your needs.
            </p>
            {/* Social Icons */}
            <div className="mt-4 flex gap-3">
              {["twitter", "linkedin", "facebook"].map((s) => (
                <Link key={s} href="/" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-colors">
                  <span className="text-xs font-bold uppercase">{s[0]}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Find Talent */}
          <div>
            <h4 className="text-sm font-semibold">Find Talent</h4>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors">Browse Jobs</Link></li>
              <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/accountants" className="hover:text-white transition-colors">Top Accountants</Link></li>
            </ul>
          </div>

          {/* Find Work */}
          <div>
            <h4 className="text-sm font-semibold">Find Work</h4>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-white/60">
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/success-stories" className="hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-white/60">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} AccountantHUB. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-white/40">
            <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
