import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import LeetCodeIcon from './LeetCodeIcon';

export default function Hero() {
  const scrollToProjects = (e) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="pt-28 sm:pt-36 pb-12 border-b border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative">
      <div className="site-container">
        
        {/* Main 2-Column Hero Grid (60% Left, 40% Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT 60% - Main Information */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-accentOrange animate-pulse" />
              <span>OPEN TO INTERNSHIPS & ENTRY-LEVEL ROLES</span>
            </div>

            {/* Title & Role */}
            <div className="space-y-2">
              <span className="text-base sm:text-lg font-mono text-slate-600 font-semibold block">
                Hi, I'm
              </span>
              <h1 className="hero-title font-extrabold text-slate-900 tracking-tight">
                {personalInfo.name}
              </h1>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-700 font-mono mt-1">
                <span className="text-accentOrange font-extrabold">Java Developer</span> & Full Stack Developer
              </div>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-700 max-w-xl leading-relaxed">
              {personalInfo.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="btn-primary-orange text-sm py-3 px-5"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.resumePath}
                download="Karthikeyan_S_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-light text-sm py-3 px-5"
                title="Download Official Resume PDF"
              >
                <Download className="w-4 h-4 text-accentOrange" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Exactly 4 Identical Square Icon Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                title="GitHub: https://github.com/Karthi-2007"
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-accentOrange hover:border-accentOrange shadow-sm transition-all"
              >
                <Github className="w-6 h-6" />
              </a>

              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                title="LinkedIn: Karthikeyan S"
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-sky-600 hover:border-sky-500 shadow-sm transition-all"
              >
                <Linkedin className="w-6 h-6" />
              </a>

              <a
                href={personalInfo.socialLinks.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode Profile"
                title="LeetCode: https://leetcode.com/u/AfgkZ9Jo50/"
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-amber-600 hover:border-amber-500 shadow-sm transition-all"
              >
                <LeetCodeIcon className="w-6 h-6" />
              </a>

              <a
                href={`mailto:${personalInfo.socialLinks.email}`}
                aria-label="Send Email"
                title="Email: Karthikeyanrks2007@gmail.com"
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-accentOrange hover:border-accentOrange shadow-sm transition-all"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>

          </div>

          {/* RIGHT 40% - Clean Professional Photo Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[300px] sm:max-w-[320px]">
              <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-card bg-slate-900 aspect-[3/4]">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

        </div>

        {/* HERO TECHNOLOGY STRIP */}
        <div className="mt-12 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs font-mono text-slate-600 font-semibold">
          <span className="text-slate-900 font-extrabold uppercase tracking-wider text-[11px]">Core Tech:</span>
          <span>Java</span>
          <span>•</span>
          <span>Spring Boot</span>
          <span>•</span>
          <span>React.js</span>
          <span>•</span>
          <span>MySQL</span>
          <span>•</span>
          <span>REST API</span>
          <span>•</span>
          <span>DSA</span>
          <span>•</span>
          <span>Salesforce</span>
        </div>

      </div>
    </section>
  );
}
