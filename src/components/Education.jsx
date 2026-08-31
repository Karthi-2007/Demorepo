import React from 'react';
import { GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { educationList } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="section-padding bg-slate-50 border-b border-slate-200">
      <div className="site-container space-y-10">
        
        {/* Section Title */}
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-accentOrange font-extrabold">
            Academic Timeline
          </span>
          <h2 className="section-title font-extrabold text-textPrimary tracking-tight mt-1">
            Education
          </h2>
          <div className="w-12 h-1 bg-accentOrange rounded-full mt-3" />
        </div>

        {/* Education Timeline Cards */}
        <div className="space-y-6">
          {educationList.map((edu, idx) => (
            <div key={idx} className="light-card p-6 sm:p-8 space-y-4 bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-orange-50 text-accentOrange border border-orange-100 shrink-0 mt-1 sm:mt-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-textPrimary">{edu.institution}</h3>
                    <p className="text-sm font-semibold text-accentOrange font-mono mt-0.5">{edu.degree}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-textSecondary sm:text-right">
                  <span className="flex items-center gap-1.5 font-bold text-textPrimary">
                    <Calendar className="w-3.5 h-3.5 text-accentOrange" />
                    <span>{edu.duration}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-textSecondary" />
                    <span>{edu.location}</span>
                  </span>
                </div>
              </div>

              {/* Highlights List */}
              {edu.highlights && edu.highlights.length > 0 && (
                <div className="space-y-2 pt-1">
                  {edu.highlights.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center gap-2 text-xs text-textSecondary font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accentOrange shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
