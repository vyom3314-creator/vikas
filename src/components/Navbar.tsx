import React, { useState } from 'react';
import { Menu, X, Mail } from 'lucide-react';

interface NavbarProps {
  name: string;
  contactEmail?: string;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  name,
  contactEmail = 'vyom3314@gmail.com',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const displayBrand =
    !name.trim() || name.trim() === '[Your Name]' ? 'Vikas Kumar' : name.trim();

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050508]/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          className="font-display text-lg font-bold tracking-tight text-white hover:text-violet-300 smooth-gpu whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500 rounded-sm"
        >
          {displayBrand}
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-1 text-slate-300 hover:text-white border-b-2 border-transparent hover:border-violet-400 smooth-gpu whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500 rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action on desktop + mobile menu button on small viewports */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`mailto:${contactEmail}?subject=${encodeURIComponent(
              `Portfolio Inquiry for ${displayBrand}`
            )}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-sm shadow-purple-950/50 smooth-gpu whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
          >
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Contact Me</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 smooth-gpu focus-visible:outline-2 focus-visible:outline-violet-500"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-slate-800/80 bg-[#070913]/98 px-6 py-4 space-y-3"
        >
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleNavClick}
                  className="block py-2.5 px-3 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800/60 hover:text-white smooth-gpu"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
