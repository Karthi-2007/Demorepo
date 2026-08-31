import React, { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'DSA', href: '#dsa' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm py-3'
          : 'bg-white/70 backdrop-blur-sm border-b border-slate-200/60 py-4'
      }`}
    >
      <div className="site-container flex items-center justify-between">
        
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center space-x-2 text-textPrimary hover:text-accentOrange transition-colors"
        >
          <span className="w-8 h-8 rounded-lg bg-slate-900 text-white font-mono font-bold flex items-center justify-center text-xs">
            KS
          </span>
          <span className="font-extrabold text-base tracking-tight hidden sm:inline-block">
            {personalInfo.name}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-textSecondary">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="hover:text-accentOrange transition-colors py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Download Resume Button & Mobile Toggle */}
        <div className="flex items-center space-x-3">
          <a
            href={personalInfo.resumePath}
            download="Karthikeyan_S_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-orange text-xs py-2 px-3.5 font-bold"
            title="Download Official Resume PDF"
          >
            <span>Resume</span>
            <Download className="w-3.5 h-3.5" />
          </a>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 py-4 px-6 space-y-3 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-3 text-sm font-semibold text-textPrimary">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="hover:text-accentOrange py-1 border-b border-slate-100 last:border-none"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
