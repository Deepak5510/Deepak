import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  RefreshCw, 
  Table, 
  Mail, 
  CheckCircle2, 
  Calendar, 
  User, 
  FileSpreadsheet, 
  LogOut,
  Sparkles
} from 'lucide-react';
import { SheetInfo, SheetInquiry, fetchSheetInquiries } from '../services/googleSheets';
import { logout } from '../services/auth';
import { User as FirebaseUser } from 'firebase/auth';

interface SheetLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  sheetInfo: SheetInfo | null;
  accessToken: string | null;
  user: FirebaseUser | null;
  onRefreshSheet: () => void;
}

export const SheetLedgerModal: React.FC<SheetLedgerModalProps> = ({
  isOpen,
  onClose,
  sheetInfo,
  accessToken,
  user,
  onRefreshSheet,
}) => {
  const [inquiries, setInquiries] = useState<SheetInquiry[]>([]);
  const [loading, setLoading] = useState(false);

  const loadInquiries = async () => {
    if (!accessToken || !sheetInfo?.spreadsheetId) return;
    setLoading(true);
    try {
      const data = await fetchSheetInquiries(accessToken, sheetInfo.spreadsheetId);
      setInquiries(data);
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && accessToken && sheetInfo) {
      loadInquiries();
    }
  }, [isOpen, accessToken, sheetInfo?.spreadsheetId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Modal Dialog Container */}
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-modal-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50/80">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div className="truncate">
              <h3 id="sheet-modal-title" className="text-sm sm:text-base font-bold text-slate-900 truncate">
                {sheetInfo?.title || 'Google Sheet Contact Ledger'}
              </h3>
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <span>Connected as {user?.email || 'Google User'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {sheetInfo?.spreadsheetUrl && (
              <a
                href={sheetInfo.spreadsheetUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <span>Open in Google Sheets</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Summary Banner */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Live Synchronization Status
              </div>
              <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Google Sheets API Live Connection Active</span>
              </div>
              <p className="text-xs text-slate-500">
                All form submissions are appended in real-time to your spreadsheet in Google Drive.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={loadInquiries}
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-50 transition-colors shadow-2xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              
              {sheetInfo?.spreadsheetUrl && (
                <a
                  href={sheetInfo.spreadsheetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="sm:hidden inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Sheet</span>
                </a>
              )}
            </div>
          </div>

          {/* Inquiries Table or Empty State */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Table className="w-3.5 h-3.5 text-blue-600" />
                <span>Recorded Submissions ({inquiries.length})</span>
              </h4>
              <span className="text-xs text-slate-400 font-mono">
                Tab: Inquiries!A:F
              </span>
            </div>

            {loading ? (
              <div className="p-12 text-center text-xs text-slate-500 space-y-2 bg-slate-50 rounded-xl border border-slate-200">
                <RefreshCw className="w-6 h-6 text-blue-600 animate-spin mx-auto" />
                <div>Loading inquiries from Google Sheets...</div>
              </div>
            ) : inquiries.length === 0 ? (
              <div className="p-10 text-center text-xs text-slate-500 space-y-2 bg-slate-50 rounded-xl border border-slate-200">
                <FileSpreadsheet className="w-8 h-8 text-slate-300 mx-auto" />
                <div className="font-semibold text-slate-700">No submissions recorded yet</div>
                <p className="max-w-xs mx-auto">
                  When visitors submit your portfolio contact form, their name, email, subject, and message will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                <div className="overflow-x-auto max-h-80">
                  <table className="w-full text-left text-xs text-slate-700 border-collapse">
                    <thead className="bg-slate-100/90 text-slate-700 font-bold sticky top-0 border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3.5">Timestamp</th>
                        <th className="py-2.5 px-3.5">Name</th>
                        <th className="py-2.5 px-3.5">Email</th>
                        <th className="py-2.5 px-3.5">Subject</th>
                        <th className="py-2.5 px-3.5">Message</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {inquiries.map((inq, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-2.5 px-3.5 font-mono text-slate-500 whitespace-nowrap">
                            {inq.timestamp}
                          </td>
                          <td className="py-2.5 px-3.5 font-semibold text-slate-900 whitespace-nowrap">
                            {inq.name}
                          </td>
                          <td className="py-2.5 px-3.5 text-blue-600 whitespace-nowrap">
                            <a href={`mailto:${inq.email}`} className="hover:underline">
                              {inq.email}
                            </a>
                          </td>
                          <td className="py-2.5 px-3.5 text-slate-800 font-medium whitespace-nowrap">
                            {inq.subject}
                          </td>
                          <td className="py-2.5 px-3.5 text-slate-600 max-w-xs truncate" title={inq.message}>
                            {inq.message}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={async () => {
                await logout();
                onClose();
              }}
              className="text-xs text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Disconnect Google Account</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
