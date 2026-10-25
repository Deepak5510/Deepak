import React from 'react';
import { X, ExternalLink, Github, Cpu, Shield, CheckCircle2, Layers, Lock } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Modal Dialog Container */}
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50/80">
          <div className="min-w-0">
            <span className="text-[11px] font-bold font-mono text-blue-600 uppercase tracking-wider block">
              Technical Specification
            </span>
            <h3 id="project-modal-title" className="text-base sm:text-lg font-bold text-slate-900 truncate">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Subtitle & Category */}
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {project.categoryLabel} Domain
            </div>
            <p className="text-sm font-medium text-slate-800">
              {project.subtitle}
            </p>
          </div>

          {/* Full Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Project Overview
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Metric Highlight Box */}
          <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/60 flex items-center gap-3">
            <Cpu className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <div className="text-[11px] font-bold text-blue-900 uppercase tracking-wide">
                Measured Performance Metric
              </div>
              <div className="text-xs font-mono font-semibold text-blue-800 mt-0.5">
                {project.metrics}
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Key Engineering Accomplishments
            </h4>
            <ul className="space-y-2">
              {project.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture Breakdown if available */}
          {project.architecture && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Architectural Components</span>
              </h4>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-1.5">
                {project.architecture.map((arch, i) => (
                  <div key={i} className="text-xs font-mono text-slate-700 flex items-start gap-2">
                    <span className="text-blue-500 font-bold">#</span>
                    <span>{arch}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security & Threat Mitigation if available */}
          {project.securityConsiderations && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>Security &amp; Defensive Controls</span>
              </h4>
              <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-200/60 space-y-1.5">
                {project.securityConsiderations.map((sec, i) => (
                  <div key={i} className="text-xs text-emerald-950 flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{sec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technology Stack Tags */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">
              Technologies &amp; Libraries
            </h4>
            <div className="flex flex-wrap items-center gap-1.5">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4 text-xs">
          <div className="text-slate-500 text-xs">
            Open Source &amp; Student Project
          </div>

          <div className="flex items-center gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 font-semibold text-slate-700 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Inspect Code</span>
            </a>
            {project.demo && project.demo !== '#' && (
              <a
                href={project.demo}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-xs"
              >
                <span>Live View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
