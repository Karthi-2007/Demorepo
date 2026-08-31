import React from 'react';
import { GraduationCap, CheckCircle2 } from 'lucide-react';
import { personalInfo, aboutHighlights } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="section-padding bg-slate-50 border-b border-slate-200">
      <div className="site-container space-y-10">
        
        {/* Section Title */}
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-accentOrange font-extrabold">
            About Me
          </span>
          <h2 className="section-title font-extrabold text-textPrimary tracking-tight mt-1">
            Building practical software with Java & Full Stack technologies.
          </h2>
          <div className="w-12 h-1 bg-accentOrange rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Professional Intro */}
          <div className="lg:col-span-6 space-y-4">
            <div className="light-card p-6 sm:p-8 space-y-4 bg-white">
              <h3 className="text-lg font-extrabold text-textPrimary flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-accentOrange" />
                <span>B.Tech Information Technology Student</span>
              </h3>
              
              <p className="text-base text-textSecondary leading-relaxed">
                {personalInfo.aboutShort}
              </p>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2 text-xs font-mono text-textSecondary">
                <span className="flex items-center gap-1.5 font-semibold text-textPrimary">
                  <CheckCircle2 className="w-4 h-4 text-accentOrange" />
                  <span>Karpagam College of Engineering</span>
                </span>
                <span>•</span>
                <span>Coimbatore, Tamil Nadu</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Quick Facts Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aboutHighlights.map((item, idx) => (
              <div key={idx} className="light-card p-5 space-y-1 bg-white">
                <span className="text-[11px] font-mono text-accentOrange uppercase font-bold block">
                  {item.label}
                </span>
                <h4 className="text-base font-extrabold text-textPrimary">
                  {item.title}
                </h4>
                <p className="text-xs text-textSecondary font-mono">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
