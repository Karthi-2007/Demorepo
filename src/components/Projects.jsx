import React from 'react';
import { Sparkles, Github, ExternalLink, CheckCircle2 } from 'lucide-react';
import { smartLabProject } from '../data/portfolioData';

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-slate-50 border-b border-slate-200">
      <div className="site-container space-y-10">
        
        {/* Section Title */}
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-accentOrange font-extrabold">
            Featured Application
          </span>
          <h2 className="section-title font-extrabold text-textPrimary tracking-tight mt-1">
            Primary Portfolio Project
          </h2>
          <div className="w-12 h-1 bg-accentOrange rounded-full mt-3" />
        </div>

        {/* SmartLab AI Large Showcase Card */}
        <div className="light-card p-6 sm:p-8 lg:p-10 bg-white border border-slate-200 space-y-8 shadow-card">
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="badge-orange-light text-xs mb-1">
                PRIMARY FEATURED PROJECT
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-textPrimary tracking-tight mt-1">
                {smartLabProject.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-textSecondary mt-0.5 font-semibold">
                {smartLabProject.subtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT: Project Mockup */}
            <div className="lg:col-span-6 space-y-2">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video shadow-md">
                <img
                  src={smartLabProject.mainImage}
                  alt={smartLabProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[11px] font-mono text-textSecondary text-center">
                SmartLab AI Overview Dashboard Mockup
              </p>
            </div>

            {/* RIGHT: Project Information */}
            <div className="lg:col-span-6 space-y-5">
              <p className="text-sm sm:text-base text-textSecondary leading-relaxed">
                {smartLabProject.description}
              </p>

              {/* Technologies */}
              <div>
                <span className="text-xs font-mono text-textSecondary block mb-2 font-bold uppercase">
                  Technologies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {smartLabProject.technologies.map((tech, idx) => (
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
                  {smartLabProject.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accentOrange shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* GitHub Link */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {smartLabProject.githubUrl && (
                  <a
                    href={smartLabProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-orange text-xs py-2.5 px-4"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub Repository</span>
                  </a>
                )}

                {smartLabProject.liveDemoUrl && (
                  <a
                    href={smartLabProject.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-light text-xs py-2.5 px-4"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
