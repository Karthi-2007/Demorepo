import React from 'react';
import { Code2, Server, Layout, Database, Wrench, Cpu, CheckCircle2 } from 'lucide-react';
import { techSkills } from '../data/portfolioData';

const primaryTechnologies = [
  { name: "Java", role: "Core Programming", icon: Code2, highlight: true },
  { name: "Spring Boot", role: "Backend Development", icon: Server, highlight: true },
  { name: "React.js", role: "Frontend Development", icon: Layout, highlight: false },
  { name: "MySQL", role: "Database Management", icon: Database, highlight: false },
];

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-white border-b border-slate-200">
      <div className="site-container space-y-10">
        
        {/* Section Header */}
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-accentOrange font-extrabold">
            Core Competencies
          </span>
          <h2 className="section-title font-extrabold text-textPrimary tracking-tight mt-1">
            Technical Expertise
          </h2>
          <p className="text-sm text-textSecondary mt-1">
            Technologies and tools I use to build practical software.
          </p>
          <div className="w-12 h-1 bg-accentOrange rounded-full mt-3" />
        </div>

        {/* PRIMARY STACK PROMINENT CARD */}
        <div className="light-card p-6 sm:p-8 bg-white border border-slate-200 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono uppercase font-bold text-accentOrange">
                Primary Core Stack
              </span>
              <h3 className="text-xl font-extrabold text-textPrimary mt-0.5">
                Main Development Technologies
              </h3>
            </div>
            <span className="badge-orange-light text-xs font-mono">
              Hands-On Production Focus
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {primaryTechnologies.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-5 rounded-xl border flex flex-col justify-between transition-all ${
                    item.highlight
                      ? 'bg-orange-50/40 border-orange-200 hover:border-orange-400'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2.5 rounded-lg ${
                      item.highlight ? 'bg-orange-500 text-white' : 'bg-slate-900 text-white'
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-textPrimary">{item.name}</h4>
                      <span className="text-xs font-mono text-textSecondary">{item.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 font-semibold pt-2 border-t border-slate-200/60">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Primary Competency</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* OTHER SKILLS COMPACT GROUPS */}
        <div className="space-y-6 pt-2">
          <h3 className="text-lg font-extrabold text-textPrimary">
            Detailed Technical Categorization
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {techSkills.map((group, idx) => (
              <div key={idx} className="light-card p-5 space-y-3 bg-white">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="text-xs font-mono font-extrabold uppercase tracking-wider text-textPrimary">
                    {group.category}
                  </h4>
                  <span className="text-[11px] font-mono text-textSecondary font-semibold">
                    {group.items.length} Skills
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {group.items.map((item, itemIdx) => (
                    <span
                      key={itemIdx}
                      className="px-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-xs font-semibold text-textPrimary hover:border-accentOrange transition-colors"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
