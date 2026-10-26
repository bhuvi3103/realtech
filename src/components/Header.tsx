import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface HeaderProps {
  onDiscussClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onDiscussClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'services', 'portfolio', 'process', 'pricing', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1728]/95 backdrop-blur-md shadow-lg border-b border-[#1E334D]/80 py-3.5'
          : 'bg-[#0B1728] py-5 border-b border-[#1E334D]/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-[#39C6B0] rounded-lg p-1"
            aria-label="RealTech Home"
          >
            {/* Geometric R Mark Logo */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#102A43] to-[#0B1728] border border-[#39C6B0]/50 flex items-center justify-center shadow-md group-hover:border-[#39C6B0] transition-colors">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-[#39C6B0]"
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
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#39C6B0] animate-pulse"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                Real<span className="text-[#39C6B0]">Tech</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#60758B] font-medium hidden sm:block">
                Puducherry, India
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main navigation">
            {siteConfig.navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'text-[#39C6B0] bg-[#39C6B0]/10 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-[#102A43]/60'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-4">
            <button
              onClick={onDiscussClick}
              className="inline-flex items-center space-x-2 bg-[#39C6B0] hover:bg-[#2bb39e] text-[#0B1728] font-semibold text-sm px-5 py-2.5 rounded-lg shadow-sm hover:shadow-glow-teal transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#39C6B0] focus:ring-offset-2 focus:ring-offset-[#0B1728]"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#39C6B0] rounded-lg"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 pb-6 border-t border-[#1E334D] bg-[#0B1728] animate-fade-in">
            <div className="flex flex-col space-y-1">
              {siteConfig.navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`px-4 py-2.5 text-base font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'text-[#39C6B0] bg-[#39C6B0]/10 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-[#102A43]'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-4 px-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onDiscussClick();
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-[#39C6B0] hover:bg-[#2bb39e] text-[#0B1728] font-semibold py-3 px-4 rounded-lg shadow-md transition-all active:scale-[0.98]"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="pt-3 px-4 flex items-center gap-2 text-xs text-[#60758B]">
                <ShieldCheck className="w-4 h-4 text-[#39C6B0]" />
                <span>Puducherry, India • Honest scope & upfront pricing</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
