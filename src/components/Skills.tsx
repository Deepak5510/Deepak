import React, { useState } from 'react';
import { Shield, Code, Palette, CheckCircle, Terminal, Layers } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');

  const domainIcons = {
    shield: Shield,
    code: Code,
    palette: Palette,
  };

  const filteredDomains = selectedDomain === 'all' 
    ? PORTFOLIO_DATA.skills.domains 
    : PORTFOLIO_DATA.skills.domains.filter(d => d.id === selectedDomain);

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
              Capabilities &amp; Stack
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Technical <span className="text-blue-600">Competencies</span>
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Practical competencies developed through engineering coursework, hands-on internships, specialized red teaming labs, and production-grade project builds.
            </p>
          </div>

          {/* Interactive Domain Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl w-fit self-start md:self-auto border border-slate-200/80">
            <button
              onClick={() => setSelectedDomain('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedDomain === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Domains
            </button>
            <button
              onClick={() => setSelectedDomain('cybersecurity')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedDomain === 'cybersecurity'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cybersecurity
            </button>
            <button
              onClick={() => setSelectedDomain('webdev')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedDomain === 'webdev'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Web Dev
            </button>
            <button
              onClick={() => setSelectedDomain('uiux')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedDomain === 'uiux'
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              UI/UX
            </button>
          </div>
        </div>

        {/* 3 Domain Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredDomains.map((domain) => {
            const IconComponent = domainIcons[domain.icon as keyof typeof domainIcons] || Shield;
            const isEmerald = domain.color === 'emerald';
            const isBlue = domain.color === 'blue';
            const isPurple = domain.color === 'purple';

            return (
              <div 
                key={domain.id}
                className="bg-slate-50/70 rounded-2xl border border-slate-200 p-7 flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow hover:bg-white"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isEmerald ? 'bg-emerald-100 text-emerald-700' :
                      isBlue ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                        {domain.title}
                      </h3>
                      <div className="text-xs text-slate-500 font-medium">
                        {domain.subtitle}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {domain.description}
                  </p>

                  {/* Skills List with Checkmark and unboxed clean text */}
                  <div className="space-y-2.5">
                    {domain.skills.map((skill, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                          isEmerald ? 'text-emerald-600' :
                          isBlue ? 'text-blue-600' :
                          'text-purple-600'
                        }`} />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/70 text-xs font-mono text-slate-500 flex items-center justify-between">
                  <span>{domain.skills.length} core competencies</span>
                  <span className="font-semibold text-slate-700">Production Ready</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tools & Environment Matrix Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900 text-white shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold font-mono tracking-wide text-slate-200">
                ACTIVE LAB ENVIRONMENT &amp; TOOLCHAIN
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Kali Linux • Windows Subsystem • Web Inspector • Burp Suite
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {PORTFOLIO_DATA.skills.tools.map((tool, idx) => (
              <div 
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-mono border border-slate-700/80 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>{tool.name}</span>
                <span className="text-slate-500 text-[10px]">({tool.category})</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
