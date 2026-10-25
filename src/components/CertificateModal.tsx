import React from 'react';
import { X, ExternalLink, CheckCircle2, Award, Calendar, FileText, Download } from 'lucide-react';
import { Certificate } from '../data/portfolioData';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  if (!certificate) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Modal Dialog Container */}
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50/80">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div className="truncate">
              <h3 id="cert-modal-title" className="text-sm sm:text-base font-bold text-slate-900 truncate">
                {certificate.title}
              </h3>
              <div className="text-xs text-slate-500 font-medium">
                {certificate.issuer}
              </div>
            </div>
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
          
          {/* Certificate Image Frame */}
          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner flex items-center justify-center">
            <img
              src={certificate.image}
              alt={certificate.title}
              className="w-full max-h-[460px] object-contain"
            />
          </div>

          {/* Details & Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <span className="text-slate-400 block font-medium">Issuing Body</span>
              <span className="font-semibold text-slate-900">{certificate.issuer}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Issue Date</span>
              <span className="font-mono font-semibold text-slate-900">{certificate.date}</span>
            </div>
            {certificate.credentialId && (
              <div className="sm:col-span-2">
                <span className="text-slate-400 block font-medium">Credential / Verification ID</span>
                <span className="font-mono text-blue-700 font-semibold break-all">{certificate.credentialId}</span>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Credential Overview
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {certificate.summary}
            </p>
          </div>

          {/* Core Competencies Verified */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Verified Competencies &amp; Skills
            </h4>
            <ul className="space-y-1.5">
              {certificate.competencies.map((comp, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{comp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            {certificate.tags.map((tag, i) => (
              <span key={i} className="text-[11px] font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                {tag}
              </span>
            ))}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Official Institutional Document</span>
          </div>

          <div className="flex items-center gap-2">
            {certificate.pdf && (
              <a
                href={certificate.pdf}
                target="_blank"
                rel="noreferrer"
                download
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 font-semibold text-slate-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
            )}
            <a
              href={certificate.image}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-xs"
            >
              <span>Open Full File</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
