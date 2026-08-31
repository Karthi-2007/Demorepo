import React from 'react';
import { Github, ExternalLink, ShieldAlert, Layers } from 'lucide-react';

export default function ProjectCard({ project }) {
  const { title, subtitle, description, technologies, githubUrl, liveDemoUrl, image, isPlaceholder } = project;

  return (
    <div className={`glass-card rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between ${
      isPlaceholder ? 'border-dashed border-slate-700/80 bg-slate-950/40' : ''
    }`}>
      <div>
        {/* Project Thumbnail Image or Placeholder Banner */}
        {image ? (
          <div className="relative aspect-video overflow-hidden border-b border-slate-800 bg-slate-950">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-transparent opacity-60" />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-950 border-b border-slate-800 p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span>{isPlaceholder ? 'FUTURE PROJECT SLOT' : 'PROJECT'}</span>
              <Layers className="w-4 h-4 text-orange-500/50" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-200 line-clamp-1">{title}</h4>
              <p className="text-xs text-orange-400 font-mono mt-1">{subtitle}</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs font-mono text-orange-400 mt-1 font-medium">
                {subtitle}
              </p>
            )}
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {technologies && technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 text-slate-300 border border-slate-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-6 pt-0 border-t border-slate-800/40 mt-4 flex items-center justify-between gap-3">
        {githubUrl ? (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs py-2 px-3 flex-1"
          >
            <Github className="w-4 h-4 text-slate-300" />
            <span>GitHub Repository</span>
          </a>
        ) : (
          <button
            disabled
            className="px-3 py-2 rounded-lg bg-slate-900 text-slate-500 border border-slate-800 text-xs font-mono flex-1 cursor-not-allowed flex items-center justify-center gap-1.5"
          >
            <Github className="w-4 h-4 opacity-50" />
            <span>Repo Unavailable</span>
          </button>
        )}

        {liveDemoUrl ? (
          <a
            href={liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs py-2 px-3 flex-1"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <button
            disabled
            title="Live demo URL not configured yet"
            className="px-3 py-2 rounded-lg bg-slate-900/60 text-slate-500 border border-slate-800/80 text-xs font-mono flex-1 cursor-not-allowed flex items-center justify-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 opacity-40" />
            <span>Demo Unavailable</span>
          </button>
        )}
      </div>
    </div>
  );
}
