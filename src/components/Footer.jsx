import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white py-8 border-t border-slate-200">
      <div className="site-container flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-textSecondary">
        
        {/* Brand & Role */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center font-bold text-accentOrange text-xs shadow-sm">
            KS
          </div>
          <div>
            <span className="font-extrabold text-textPrimary">{personalInfo.name}</span>
            <span className="mx-2">•</span>
            <span>Java Developer • Full Stack Developer</span>
          </div>
        </div>

        {/* Verified Social Links */}
        <div className="flex items-center space-x-5">
          <a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-accentOrange transition-colors">GitHub</a>
          <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accentOrange transition-colors">LinkedIn</a>
          <a href={personalInfo.socialLinks.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-accentOrange transition-colors">LeetCode</a>
          <a href={`mailto:${personalInfo.socialLinks.email}`} className="hover:text-accentOrange transition-colors">Email</a>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1 hover:text-accentOrange transition-colors font-semibold"
          aria-label="Back to top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-accentOrange" />
        </button>

      </div>
    </footer>
  );
}
