import React from 'react';
import { Shield, ArrowUp, Mail, Linkedin, Github, Download } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                {PORTFOLIO_DATA.profile.name}
                <span className="text-blue-400 font-mono text-sm ml-1">.portfolio</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Final-Year B.E. Computer Science Engineering student specialized in Cybersecurity. Dedicated to defensive system architecture, penetration testing, and accessible web experiences.
            </p>
            <div className="text-xs text-slate-500 font-medium">
              KSR Institute For Engineering and Technology • Anna University
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Quick Navigation
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="#hero" className="hover:text-white transition-colors">Home</a>
              <a href="#about" className="hover:text-white transition-colors">About Deepak</a>
              <a href="#skills" className="hover:text-white transition-colors">Skills &amp; Tools</a>
              <a href="#experience" className="hover:text-white transition-colors">Internships</a>
              <a href="#certifications" className="hover:text-white transition-colors">Certifications</a>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Direct Channels
            </div>
            <div className="space-y-2 text-xs">
              <a 
                href={`mailto:${PORTFOLIO_DATA.profile.email}`} 
                className="flex items-center gap-2 hover:text-white transition-colors text-slate-300"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">{PORTFOLIO_DATA.profile.email}</span>
              </a>
              <a 
                href={PORTFOLIO_DATA.profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors text-slate-300"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>LinkedIn Profile ↗</span>
              </a>
              <a 
                href={PORTFOLIO_DATA.profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors text-slate-300"
              >
                <Github className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>GitHub Repositories ↗</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {PORTFOLIO_DATA.profile.fullName}. Built with React, TypeScript &amp; Tailwind CSS.
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/Deepak_portfolio_live.zip"
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors font-semibold"
              title="Download complete portfolio folder package as ZIP"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Download Portfolio Package (.zip)</span>
            </a>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors font-semibold"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
