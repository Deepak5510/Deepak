import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, GraduationCap, ChevronRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
            Work Experience
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Industry <span className="text-blue-600">Internships</span> &amp; Background
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Practical professional exposure applying UI/UX research, component design systems, and defensive cybersecurity assessments within established organizations.
          </p>
        </div>

        {/* 2-Column Grid: Internships on Left, Education on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Internships Column */}
          <div className="lg:col-span-8 space-y-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span>Practical Industry Internships</span>
            </h3>

            <div className="space-y-6">
              {PORTFOLIO_DATA.experiences.map((exp) => {
                const isUI = exp.category === 'uiux';

                return (
                  <div
                    key={exp.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-xs hover:shadow-md transition-all space-y-5"
                  >
                    {/* Header info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                            isUI 
                              ? 'bg-purple-50 text-purple-700 border border-purple-200/60' 
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                          }`}>
                            {exp.categoryLabel}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">Verified Experience</span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mt-1.5">
                          {exp.role}
                        </h4>
                        <div className="text-sm font-semibold text-blue-700">
                          {exp.company}
                        </div>
                      </div>

                      <div className="sm:text-right text-xs text-slate-500 font-medium space-y-1">
                        <div className="flex items-center sm:justify-end gap-1.5 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center sm:justify-end gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Responsibilities list */}
                    <div>
                      <div className="text-xs font-bold text-slate-700 mb-2.5">
                        Key Deliverables &amp; Contributions:
                      </div>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                            <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies used */}
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-400 mr-1.5">Tools:</span>
                      {exp.technologies.map((tech, i) => (
                        <span 
                          key={i}
                          className="text-xs font-mono px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Education & Academic Rigor Column */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Academic Foundation</span>
            </h3>

            {/* University Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>

              <div>
                <span className="text-xs font-bold text-blue-600 font-mono uppercase tracking-wide">
                  2022 - 2026 (Final Year)
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-1">
                  B.E. Computer Science Engineering
                </h4>
                <div className="text-xs font-semibold text-emerald-700 mt-0.5">
                  Specialized in Cybersecurity
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  KSR Institute For Engineering and Technology (KSRIET)
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Affiliated to Anna University, Chennai
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-2">
                <div className="font-semibold text-slate-800">Core Coursework Covered:</div>
                <ul className="space-y-1 list-disc list-inside text-slate-600">
                  <li>Network Security &amp; Cryptography</li>
                  <li>Ethical Hacking &amp; Penetration Testing</li>
                  <li>Data Structures &amp; Algorithms</li>
                  <li>Web Technology &amp; Database Systems</li>
                  <li>Operating Systems &amp; Linux Administration</li>
                  <li>Information Security &amp; Risk Management</li>
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-600 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Consistent academic track record with intensive project-based lab performance in offensive and defensive security.
                </span>
              </div>
            </div>

            {/* Work Ethic Promise */}
            <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-xs space-y-3">
              <h4 className="text-base font-bold">
                Why Work With Deepak?
              </h4>
              <p className="text-xs text-blue-100 leading-relaxed">
                "I bring a proactive mindset, deep curiosity, and a relentless commitment to finishing what I start. Whether auditing an existing codebase for security gaps or architecting an interactive front-end from Figma, I treat every project with precision."
              </p>
              <div className="pt-2 border-t border-blue-500/50 flex items-center justify-between text-xs text-blue-200">
                <span>Available for Full-Time Roles</span>
                <a href="#contact" className="font-bold underline text-white hover:text-blue-100">Contact ↗</a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
