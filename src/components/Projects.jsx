import React from 'react';
import { Sparkles, Github, ExternalLink, CheckCircle2 } from 'lucide-react';
import { smartLabProject } from '../data/portfolioData';

export default function Projects() {
  const technologies = smartLabProject?.technologies || smartLabProject?.techStack || [];
  const features = smartLabProject?.features || [];

  return (
    <section id="projects" className="section-padding bg-slate-50 border-b border-slate-200">
      <div className="site-container space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-accentOrange font-extrabold">
              Featured Software Application
            </span>
            <h2 className="section-title font-extrabold text-textPrimary tracking-tight mt-1">
              Featured Full Stack Project
            </h2>
            <p className="text-sm text-textSecondary mt-1 max-w-2xl">
              End-to-end full stack equipment booking and automated maintenance management system built with Spring Boot, React, and MySQL.
            </p>
            <div className="w-12 h-1 bg-accentOrange rounded-full mt-3" />
          </div>

          <a
            href={smartLabProject?.githubUrl || "https://github.com/Karthi-2007"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary-light self-start md:self-auto text-xs py-2 px-3"
          >
            <Github className="w-4 h-4 text-textPrimary" />
            <span>Explore All Repositories</span>
          </a>
        </div>

        {/* Featured Project Banner / Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Column: Mockup Image / Visual */}
          <div className="lg:col-span-5 bg-slate-100 p-6 sm:p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-200 relative">
            <span className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full shadow-sm">
              {smartLabProject?.badge || "Featured Project"}
            </span>

            <img
              src={smartLabProject?.mainImage}
              alt={smartLabProject?.title}
              className="w-full max-w-md h-auto rounded-xl shadow-md border border-slate-200 object-cover transform hover:scale-[1.02] transition-transform duration-300"
            />
          </div>

          {/* Right Column: Details & Tech Stack */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-accentOrange bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                  {smartLabProject?.category}
                </span>
                <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold">
                  ✓ {smartLabProject?.status}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-textPrimary tracking-tight">
                {smartLabProject?.title}
              </h3>

              <p className="text-xs sm:text-sm text-textSecondary leading-relaxed">
                {smartLabProject?.fullDescription || smartLabProject?.shortDescription}
              </p>

              {/* Technologies */}
              <div>
                <span className="text-xs font-mono text-textSecondary block mb-2 font-bold uppercase">
                  Technologies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag-light">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features List */}
              <div>
                <span className="text-xs font-mono text-textSecondary block mb-2 font-bold uppercase">
                  Key Capabilities:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-textPrimary font-medium">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accentOrange shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <a
                href={smartLabProject?.githubUrl || "https://github.com/Karthi-2007"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-orange text-xs py-2 px-4"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
              </a>

              {smartLabProject?.liveDemoUrl && (
                <a
                  href={smartLabProject.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-light text-xs py-2 px-4"
                >
                  <ExternalLink className="w-4 h-4 text-accentOrange" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
