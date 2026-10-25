import React, { useState } from 'react';
import { Award, CheckCircle, ExternalLink, Eye, ShieldAlert, Sparkles, Filter } from 'lucide-react';
import { PORTFOLIO_DATA, Certificate } from '../data/portfolioData';

interface CertificationsProps {
  onSelectCertificate: (cert: Certificate) => void;
}

export const Certifications: React.FC<CertificationsProps> = ({ onSelectCertificate }) => {
  const [filter, setFilter] = useState<'all' | 'security' | 'hackathon' | 'design'>('all');

  const filteredCerts = PORTFOLIO_DATA.certifications.filter((cert) => {
    if (filter === 'all') return true;
    if (filter === 'security') {
      return cert.tags.some(t => t.toLowerCase().includes('red') || t.toLowerCase().includes('ctf') || t.toLowerCase().includes('security'));
    }
    if (filter === 'hackathon') {
      return cert.badgeType === 'award' || cert.tags.some(t => t.toLowerCase().includes('hackathon'));
    }
    if (filter === 'design') {
      return cert.tags.some(t => t.toLowerCase().includes('design') || t.toLowerCase().includes('cloud') || t.toLowerCase().includes('ai'));
    }
    return true;
  });

  return (
    <section id="certifications" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
              Credentials &amp; Honors
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Verified <span className="text-blue-600">Certifications</span> &amp; Achievements
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Authentic industry certifications and honors in offensive security, red teaming, hackathon innovation, UI/UX design, and generative AI. Click any credential to preview in full resolution.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-fit self-start md:self-auto border border-slate-200/80">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({PORTFOLIO_DATA.certifications.length})
            </button>
            <button
              onClick={() => setFilter('security')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'security'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Security &amp; CTF
            </button>
            <button
              onClick={() => setFilter('hackathon')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'hackathon'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hackathons
            </button>
            <button
              onClick={() => setFilter('design')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'design'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Design &amp; AI
            </button>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCerts.map((cert) => {
            const isAward = cert.badgeType === 'award';
            const isCRTA = cert.id === 'cert-crta';

            return (
              <div
                key={cert.id}
                className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden hover:border-slate-300"
              >
                <div>
                  {/* Thumbnail Container with click-to-preview overlay */}
                  <div 
                    onClick={() => onSelectCertificate(cert)}
                    className="relative aspect-16/10 bg-slate-100 overflow-hidden cursor-pointer border-b border-slate-100"
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-103"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 text-slate-900 text-xs font-semibold shadow-md">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Certificate</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    
                    {/* Badge & Date */}
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-semibold inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${
                        isCRTA ? 'bg-red-50 text-red-700 border border-red-200' :
                        isAward ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        <CheckCircle className="w-3 h-3" />
                        <span>{cert.badge}</span>
                      </span>
                      <span className="font-mono text-slate-400 font-medium">
                        {cert.date}
                      </span>
                    </div>

                    {/* Title & Issuer */}
                    <div>
                      <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                        {cert.title}
                      </h3>
                      <div className="text-xs font-semibold text-slate-500 mt-1">
                        {cert.issuer}
                      </div>
                      {cert.credentialId && (
                        <div className="text-[11px] font-mono text-slate-400 mt-0.5 truncate">
                          ID: {cert.credentialId}
                        </div>
                      )}
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {cert.summary}
                    </p>

                    {/* Competency bullets */}
                    <ul className="space-y-1.5 pt-1">
                      {cert.competencies.slice(0, 2).map((comp, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <span className="text-blue-500 font-bold">›</span>
                          <span className="line-clamp-1">{comp}</span>
                        </li>
                      ))}
                    </ul>

                  </div>
                </div>

                {/* Footer action row */}
                <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectCertificate(cert)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                  >
                    <span>View Full Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {cert.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Note on Verification */}
        <div className="mt-12 p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              All certificates and workshop participation records are authentic and backed by registered institutional verification hashes.
            </span>
          </div>
          <a
            href={PORTFOLIO_DATA.profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap"
          >
            Verify on LinkedIn Profile ↗
          </a>
        </div>

      </div>
    </section>
  );
};
