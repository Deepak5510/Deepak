import React from 'react';
import { X, Printer, Download, Mail, Linkedin, MapPin, GraduationCap, Briefcase, Award, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Modal Dialog Container */}
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50/80">
          <div>
            <h3 id="resume-modal-title" className="text-base font-bold text-slate-900">
              Curriculum Vitae / Resume Summary
            </h3>
            <div className="text-xs text-slate-500">
              {PORTFOLIO_DATA.profile.name} • {PORTFOLIO_DATA.profile.degree}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Printable Body */}
        <div className="p-8 overflow-y-auto space-y-8 bg-white text-slate-800 text-xs sm:text-sm">
          
          {/* Resume Header */}
          <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {PORTFOLIO_DATA.profile.fullName}
              </h1>
              <p className="text-sm font-semibold text-blue-600 mt-1">
                {PORTFOLIO_DATA.profile.title}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {PORTFOLIO_DATA.profile.institution}
              </p>
            </div>

            <div className="text-xs space-y-1 sm:text-right text-slate-600">
              <div className="flex items-center sm:justify-end gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} className="text-blue-600 hover:underline">
                  {PORTFOLIO_DATA.profile.email}
                </a>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                <a href={PORTFOLIO_DATA.profile.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  linkedin.com/in/deepak-p-9034373a7
                </a>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Tamil Nadu, India</span>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1">
              Professional Profile
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {PORTFOLIO_DATA.profile.bio}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              <span>Education</span>
            </h2>
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-slate-900 text-sm">
                  {PORTFOLIO_DATA.profile.degree} (Specialized in Cybersecurity)
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  {PORTFOLIO_DATA.profile.institution} • {PORTFOLIO_DATA.profile.affiliation}
                </div>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-500 whitespace-nowrap">
                2022 - 2026 (Final Year)
              </span>
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span>Internship Experience</span>
            </h2>

            {PORTFOLIO_DATA.experiences.map((exp) => (
              <div key={exp.id} className="space-y-1.5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{exp.role}</span>
                    <span className="text-xs text-blue-700 font-semibold ml-2">@ {exp.company}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 whitespace-nowrap">{exp.period}</span>
                </div>
                <p className="text-xs text-slate-600">
                  {exp.description}
                </p>
                <ul className="space-y-1 text-xs text-slate-700 pl-4 list-disc">
                  {exp.responsibilities.slice(0, 3).map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Verified Certifications */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Certifications &amp; Honors</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {PORTFOLIO_DATA.certifications.map((cert) => (
                <div key={cert.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-900">{cert.title}</div>
                  <div className="text-[11px] text-slate-500">{cert.issuer} • {cert.date}</div>
                  {cert.credentialId && (
                    <div className="text-[10px] font-mono text-blue-600 truncate mt-0.5">ID: {cert.credentialId}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Summary */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1">
              Technical Competencies
            </h2>
            <div className="space-y-2 text-xs">
              <div>
                <strong className="text-slate-900">Cybersecurity:</strong>{' '}
                <span className="text-slate-700">Penetration Testing, Ethical Hacking, CRTA, OWASP Top 10, Kali Linux, Burp Suite, Wireshark, Metasploit, Cryptography.</span>
              </div>
              <div>
                <strong className="text-slate-900">Full-Stack Development:</strong>{' '}
                <span className="text-slate-700">TypeScript, JavaScript, React, HTML5/CSS3, Tailwind CSS, Python, REST APIs, Node.js, SQL.</span>
              </div>
              <div>
                <strong className="text-slate-900">UI/UX Design:</strong>{' '}
                <span className="text-slate-700">Figma, Design Systems, User Research, Wireframing, Auto-Layout, Usability Testing, WCAG AA.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Official Academic &amp; Technical Portfolio of Deepak
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
