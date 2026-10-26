import React from 'react';
import { MapPin, ArrowUp } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { ServiceId } from '../types';

interface FooterProps {
  onSelectService: (serviceId: ServiceId) => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectService, onOpenLegal }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0B1728] text-white border-t border-[#1E334D] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1E334D]">
          
          {/* Brand Info & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#102A43] to-[#0B1728] border border-[#39C6B0]/50 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-[#39C6B0]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 3h7a5 5 0 0 1 0 10H6V3z" />
                  <path d="M12 13l6 8" />
                  <circle cx="12" cy="8" r="1.5" fill="#39C6B0" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Real<span className="text-[#39C6B0]">Tech</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              {siteConfig.tagline}
            </p>
            <p className="text-xs text-[#60758B] max-w-sm leading-relaxed">
              {siteConfig.coreMessage}
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-[#39C6B0] shrink-0" />
              <span>{siteConfig.location}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#39C6B0]">
              Quick Links
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              {siteConfig.navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#39C6B0]">
              Our Services
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              {siteConfig.services.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => {
                      onSelectService(service.id);
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-slate-300 hover:text-[#39C6B0] transition-colors text-left"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <span className="text-[11px] text-[#60758B] block">
                Agreed specifications, milestone reviews, and honest support.
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#60758B]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>&copy; {currentYear} RealTech. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>Based in Puducherry, India</span>
          </div>

          {/* Legal Links (Modal Triggers) */}
          <div className="flex items-center space-x-5">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-slate-200 transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-slate-200 transition-colors underline-offset-4 hover:underline"
            >
              Terms and Conditions
            </button>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-[#132238] hover:bg-[#1E334D] text-slate-300 hover:text-white transition-colors flex items-center gap-1"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[11px]">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
