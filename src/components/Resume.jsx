import React from 'react';
import { Download, FileText, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Resume() {
  return (
    <section id="resume" className="section-padding bg-slate-50 border-b border-slate-200">
      <div className="site-container">
        <div className="light-card p-6 sm:p-8 md:p-10 bg-white border border-slate-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 rounded-2xl">
          
          {/* Left Content */}
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-accentOrange text-xs font-mono font-bold">
              <FileText className="w-3.5 h-3.5" />
              <span>OFFICIAL CURRICULUM VITAE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Ready for Developer Opportunities
            </h2>

            <p className="text-sm sm:text-base text-slate-700 font-medium max-w-xl leading-relaxed">
              Download my official resume detailing my Full Stack & Java background, B.Tech IT coursework at Karpagam College of Engineering, Salesforce specialization, LeetCode problem solving, and certifications.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs font-mono text-slate-600 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-slate-700">PDF Format</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-slate-700">Updated August 2026</span>
              </span>
            </div>
          </div>

          {/* Right Download Button */}
          <div className="shrink-0 w-full md:w-auto">
            <a
              href={personalInfo.resumePath}
              download="Karthikeyan_S_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-orange w-full md:w-auto py-3.5 px-6 text-sm font-extrabold text-white shadow-md hover:shadow-orange-500/20 justify-center"
            >
              <Download className="w-4.5 h-4.5 text-white" />
              <span className="text-white">Download Official Resume</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
