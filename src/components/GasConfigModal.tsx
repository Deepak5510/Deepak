import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Settings, Copy, Check, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GOOGLE_APPS_SCRIPT_CONFIG } from '../config';

interface GasConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GasConfigModal: React.FC<GasConfigModalProps> = ({ isOpen, onClose }) => {
  const [url, setUrl] = useState(GOOGLE_APPS_SCRIPT_CONFIG.WEB_APP_URL);
  const [saved, setSaved] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem('deepak_portfolio_gas_url') || GOOGLE_APPS_SCRIPT_CONFIG.WEB_APP_URL;
      setUrl(stored);
      setSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      localStorage.setItem('deepak_portfolio_gas_url', url.trim());
    } else {
      localStorage.removeItem('deepak_portfolio_gas_url');
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const gasScriptCode = `/**
 * DEEPAK PORTFOLIO - GOOGLE APPS SCRIPT BACKEND
 * Target: deepaksanjay948@gmail.com
 */
var CONFIG = {
  NOTIFICATION_EMAIL: "deepaksanjay948@gmail.com",
  SHEET_NAME: "Portfolio Inquiries",
  EMAIL_SUBJECT_PREFIX: "[Portfolio Inquiry] New message from "
};

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
  } catch (error) {
    return createJsonResponse({ status: "error", message: "Server busy." }, 429);
  }

  try {
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    var name = sanitizeInput(data.name || "Anonymous");
    var email = sanitizeInput(data.email || "No Email Provided");
    var subject = sanitizeInput(data.subject || "Portfolio Inquiry");
    var message = sanitizeInput(data.message || "");
    var formattedDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");

    if (!message || message.trim().length === 0) {
      return createJsonResponse({ status: "error", message: "Empty message." }, 400);
    }

    // 1. Append to Google Sheet
    var sheet = getOrCreateSheet();
    sheet.appendRow([formattedDate, name, email, subject, message, data.clientIp || "Web Client"]);

    // 2. Send instant email notification to Deepak
    sendEmailNotification(name, email, subject, message, formattedDate);

    return createJsonResponse({
      status: "success",
      message: "Thank you, " + name + "! Your message was received.",
      timestamp: formattedDate
    }, 200);
  } catch (err) {
    return createJsonResponse({ status: "error", message: err.toString() }, 500);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return createJsonResponse({
    status: "active",
    name: "Deepak Portfolio Contact Endpoint",
    owner: "deepaksanjay948@gmail.com",
    timestamp: new Date().toISOString()
  }, 200);
}

function getOrCreateSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    var files = DriveApp.getFilesByName("Deepak Portfolio Inquiries");
    if (files.hasNext()) {
      spreadsheet = SpreadsheetApp.open(files.next());
    } else {
      spreadsheet = SpreadsheetApp.create("Deepak Portfolio Inquiries");
    }
  }

  var sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
    sheet.appendRow(["Timestamp", "Sender Name", "Sender Email", "Subject", "Message", "Source"]);
    var header = sheet.getRange(1, 1, 1, 6);
    header.setBackground("#0f172a");
    header.setFontColor("#38bdf8");
    header.setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function sendEmailNotification(name, email, subject, message, date) {
  try {
    var emailSubject = CONFIG.EMAIL_SUBJECT_PREFIX + name + " - " + subject;
    var htmlBody = "<div style='font-family: Arial, sans-serif; padding: 20px; background: #0f172a; color: #fff; border-radius: 8px;'>"
      + "<h2 style='color: #38bdf8; margin-top: 0;'>⚡ New Message from " + name + "</h2>"
      + "<p><strong>Email:</strong> <a href='mailto:" + email + "' style='color: #38bdf8;'>" + email + "</a></p>"
      + "<p><strong>Subject:</strong> " + subject + "</p>"
      + "<p><strong>Date:</strong> " + date + "</p>"
      + "<div style='background: #1e293b; padding: 15px; border-left: 4px solid #10b981; border-radius: 4px; margin-top: 15px;'>"
      + "<p style='margin: 0; white-space: pre-wrap;'>" + message + "</p>"
      + "</div>"
      + "<div style='margin-top: 20px;'>"
      + "<a href='mailto:" + email + "?subject=Re: " + encodeURIComponent(subject) + "' style='background: #2563eb; color: #fff; padding: 10px 18px; text-decoration: none; border-radius: 6px; font-weight: bold;'>Reply Directly</a>"
      + "</div></div>";

    MailApp.sendEmail({
      to: CONFIG.NOTIFICATION_EMAIL,
      replyTo: email,
      subject: emailSubject,
      htmlBody: htmlBody
    });
  } catch (err) {
    Logger.log("Email error: " + err);
  }
}

function createJsonResponse(data, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

function sanitizeInput(str) {
  if (typeof str !== "string") return "";
  return str.replace(/[<>]/g, "");
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(gasScriptCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Modal Dialog Container */}
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gas-modal-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 id="gas-modal-title" className="text-sm sm:text-base font-bold text-slate-900">
                Google Sheets &amp; Apps Script Web App Code
              </h3>
              <div className="text-xs text-slate-500">
                Pre-configured for {PORTFOLIO_DATA.profile.email}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700">
          
          <div className="p-3.5 bg-blue-50/80 rounded-xl border border-blue-200/70 text-xs text-blue-900 space-y-1">
            <span className="font-bold block">How to connect in 2 minutes:</span>
            <p>
              1. Open your Google Sheet &rarr; Click <strong>Extensions &gt; Apps Script</strong>.
              <br />
              2. Paste the code below &rarr; Click <strong>Deploy &gt; New deployment &gt; Web app</strong>.
              <br />
              3. Set <em>Who has access: Anyone</em> &rarr; Copy the Web App URL &rarr; Paste it below!
            </p>
          </div>

          {/* Form to set custom endpoint */}
          <form onSubmit={handleSave} className="space-y-3">
            <label htmlFor="gas-endpoint-url" className="text-xs font-bold text-slate-800 block">
              Paste Your Deployed Google Apps Script Web App URL
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="gas-endpoint-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors shrink-0"
              >
                Save &amp; Activate
              </button>
            </div>
            {saved && (
              <div className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Saved and active! Submissions will now route through this endpoint.</span>
              </div>
            )}
          </form>

          {/* Code.gs script snippet */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Code.gs Script to Copy:</span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 inline-flex items-center gap-1.5 font-semibold text-xs border border-blue-200 transition-colors"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy Code.gs'}</span>
              </button>
            </div>
            <pre className="p-4 bg-slate-950 text-slate-200 rounded-xl text-[11px] font-mono overflow-x-auto max-h-56 border border-slate-800">
              {gasScriptCode}
            </pre>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Target Email: {PORTFOLIO_DATA.profile.email}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
