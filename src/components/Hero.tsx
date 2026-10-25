import React, { useState, useEffect } from 'react';
import { Shield, ArrowRight, FileText, Mail, Linkedin, Github, Award, CheckCircle2, Terminal, Download } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PORTFOLIO_DATA.profile.roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-white">
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
              <span>{PORTFOLIO_DATA.profile.statusText}</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Hi, I'm <span className="text-blue-600">{PORTFOLIO_DATA.profile.name}</span>
            </h1>

            {/* Dynamic Role Line */}
            <div className="flex items-center gap-2.5 text-lg sm:text-xl font-medium text-slate-700 min-h-[32px]">
              <span className="text-slate-500">Specializing in</span>
              <span className="text-blue-700 font-semibold font-mono border-b-2 border-blue-600 pb-0.5 transition-all">
                {PORTFOLIO_DATA.profile.roles[roleIndex]}
              </span>
            </div>

            {/* Bio Prose */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Final-year Computer Science Engineering student specialized in <strong className="font-semibold text-slate-900">Cybersecurity</strong> at KSR Institute For Engineering and Technology. I combine methodical penetration testing, modern full-stack web development, and human-centered UI/UX design to engineer secure, accessible software.
            </p>

            {/* Clean Degree Details (Unboxed metadata with separators) */}
            <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-sm text-slate-600 border-l-2 border-blue-600 pl-3 py-1">
              <span className="font-semibold text-slate-900">{PORTFOLIO_DATA.profile.degree}</span>
              <span aria-hidden="true" className="text-slate-300">/</span>
              <span className="text-blue-600 font-medium">{PORTFOLIO_DATA.profile.specialization}</span>
              <span aria-hidden="true" className="text-slate-300">/</span>
              <span className="text-slate-500">{PORTFOLIO_DATA.profile.institution}</span>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all hover:shadow-md active:scale-95 whitespace-nowrap"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-all active:scale-95 whitespace-nowrap"
              >
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Experience &amp; Resume</span>
              </button>

              <a
                href="#certifications"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Verified Credentials</span>
              </a>

              <a
                href="/Deepak_portfolio_live.zip"
                download
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors whitespace-nowrap"
                title="Download complete standalone portfolio folder package as ZIP"
              >
                <Download className="w-3.5 h-3.5 text-blue-600" />
                <span>Download Package (.zip)</span>
              </a>
            </div>

            {/* Social & Contact Direct Links */}
            <div className="flex items-center gap-4 pt-2 text-sm text-slate-500">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Direct Links:</span>
              <a 
                href={PORTFOLIO_DATA.profile.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-blue-600 transition-colors flex items-center gap-1 font-medium"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <a 
                href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                className="hover:text-blue-600 transition-colors flex items-center gap-1 font-medium"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <a 
                href={PORTFOLIO_DATA.profile.github}
                target="_blank" 
                rel="noreferrer"
                className="hover:text-slate-900 transition-colors flex items-center gap-1 font-medium"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>

          </div>

          {/* Right Column: Visual Profile Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 text-center space-y-5 relative group hover:shadow-md transition-shadow">
              
              {/* Profile Image with subtle protective border */}
              <div className="relative mx-auto w-40 h-40 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200/80 shadow-xs">
                <img
                  src={PORTFOLIO_DATA.profile.avatar}
                  alt="Deepak - Final Year Engineering Student"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to avatar placeholder if image fails
                    (e.target as HTMLImageElement).src = '/assets/avatar-placeholder.svg';
                  }}
                />
              </div>

              {/* Title & Tagline */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {PORTFOLIO_DATA.profile.name}
                </h2>
                <p className="text-sm font-medium text-blue-600 mt-1">
                  {PORTFOLIO_DATA.profile.degree}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {PORTFOLIO_DATA.profile.specialization}
                </p>
              </div>

              {/* Core Strengths (Clean, unboxed metadata with separators) */}
              <div className="py-2 border-y border-slate-100 flex items-center justify-center gap-2 text-xs font-medium text-slate-600 flex-wrap">
                <span>Penetration Testing</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>Full-Stack Web</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>UI/UX Design</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>CRTA</span>
              </div>

              {/* Verified Status Banner */}
              <div className="bg-emerald-50/80 rounded-lg p-3 text-left flex items-start gap-2.5 border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900">
                  <span className="font-semibold block">Certified Red Team Analyst</span>
                  <span className="text-emerald-700">CyberWarfare Labs Verified ID: CRTA-69e4be...</span>
                </div>
              </div>

              {/* Quick Contact Line */}
              <div className="pt-1 flex items-center justify-center gap-3">
                <a
                  href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                  className="text-xs font-semibold text-slate-700 hover:text-blue-600 flex items-center gap-1.5 py-1 px-2.5 rounded-md hover:bg-slate-50 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  {PORTFOLIO_DATA.profile.email}
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Full-Width Row Below the Split: Key Metrics & Accomplishment Strip */}
        <div className="mt-16 pt-10 border-t border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {PORTFOLIO_DATA.profile.stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-800">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500">
                  {stat.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
