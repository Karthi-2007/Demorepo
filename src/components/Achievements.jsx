import React from 'react';
import { Trophy, Code2, Users, Layers } from 'lucide-react';
import { experienceList, achievementData } from '../data/portfolioData';

export default function Achievements() {
  return (
    <section id="achievements" className="section-padding bg-white border-b border-slate-200">
      <div className="site-container space-y-10">
        
        {/* Section Title */}
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-accentOrange font-extrabold">
            Practical Experience
          </span>
          <h2 className="section-title font-extrabold text-textPrimary tracking-tight mt-1">
            Projects & Experience
          </h2>
          <div className="w-12 h-1 bg-accentOrange rounded-full mt-3" />
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {experienceList.map((exp, idx) => (
            <div key={idx} className="light-card p-6 flex flex-col justify-between space-y-4 bg-white">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="badge-orange-light text-xs font-bold font-mono">
                    {exp.organization}
                  </span>
                  <span className="text-xs font-mono text-textSecondary font-semibold">
                    {exp.year}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-textPrimary">
                  {exp.title}
                </h3>

                <ul className="space-y-2 text-xs text-textSecondary pt-1 leading-relaxed">
                  {exp.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="text-accentOrange font-bold mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
