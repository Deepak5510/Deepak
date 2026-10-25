import React from 'react';
import { ShieldCheck, Code2, Sparkles, BookOpen, UserCheck, HeartHandshake } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
            About Deepak
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineering with a <span className="text-blue-600">Security-First</span> Mindset
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            A curious student developer and security practitioner dedicated to building software that is functionally reliable, securely architected, and intuitive to use.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Narrative Card */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-200/90 shadow-xs space-y-6">
            
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/60 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hardworking, Dedicated &amp; Continuous Learner</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
              Connecting defensive cybersecurity, modern web engineering, and human-centered design.
            </h3>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              As a final-year <strong className="text-slate-900 font-semibold">B.E. Computer Science Engineering student specializing in Cybersecurity</strong> at KSR Institute For Engineering and Technology (KSRIET), I approach software with a strong work ethic, meticulous dedication, and genuine curiosity. While many developers consider security after building an app, my training drives me to build with threat models, input validation, and defensive principles from day one.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              During my internships at <strong className="text-slate-900 font-semibold">Stack Queue</strong> (UI/UX Design) and <strong className="text-slate-900 font-semibold">Xplore IT Corp</strong> (Cybersecurity), I gained hands-on experience designing production component libraries, conducting vulnerability scans, and collaborating with cross-functional engineers. I take pride in being a dependable, hardworking team player who sees complex challenges through to completion.
            </p>

            {/* Personal Passions & Hobbies (Cricket, Jogging, Research) */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Personal Passions &amp; Athletic Discipline
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PORTFOLIO_DATA.personalInterests.slice(0, 2).map((interest) => (
                  <div key={interest.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl" role="img" aria-label={interest.title}>{interest.icon}</span>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{interest.title}</div>
                        <div className="text-xs text-blue-600 font-medium">{interest.tagline}</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {interest.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Specs Table */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex flex-col">
                <span className="text-slate-400 font-medium">Institution</span>
                <span className="font-semibold text-slate-800">KSRIET, Anna University Affiliate</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 font-medium">Core Focus</span>
                <span className="font-semibold text-slate-800">PenTesting, Full-Stack, UI/UX</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 font-medium">Primary Email</span>
                <span className="font-semibold text-blue-600">deepaksanjay948@gmail.com</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 font-medium">Availability</span>
                <span className="font-semibold text-emerald-600">Open for Full-Time &amp; Internships</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3 Core Pillars */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3 hover:border-emerald-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  1. Cybersecurity &amp; Auditing
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Methodical ethical hacking, penetration testing, OWASP Top 10 web vulnerabilities, network packet analysis with Wireshark, system hardening, and CVSS score documentation.
                </p>
              </div>
              <div className="text-xs font-mono text-emerald-700 font-semibold pt-1">
                Certified Red Team Analyst (CRTA)
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3 hover:border-blue-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-blue-700 flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  2. Full-Stack Web Development
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Building accessible, high-performance web applications using modern JavaScript/TypeScript, React, semantic HTML5, clean CSS/Tailwind, and robust RESTful API integration.
                </p>
              </div>
              <div className="text-xs font-mono text-blue-700 font-semibold pt-1">
                Security-by-Design Architecture
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3 hover:border-purple-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-100/80 text-purple-700 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  3. UI/UX Design &amp; Prototyping
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  User research, low and high-fidelity wireframing in Figma, reusable component tokens, user journey mapping, and reducing cognitive friction for real humans.
                </p>
              </div>
              <div className="text-xs font-mono text-purple-700 font-semibold pt-1">
                Stack Queue Design System Experience
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
