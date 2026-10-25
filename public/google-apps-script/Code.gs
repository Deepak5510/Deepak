/**
 * =========================================================================
 * DEEPAK PORTFOLIO - CONTACT FORM BACKEND (Google Apps Script)
 * =========================================================================
 * 
 * This script accepts contact form submissions from Deepak's portfolio website,
 * saves each entry into a Google Sheet, and sends an instant email notification.
 * 
 * Target Email: deepaksanjay948@gmail.com
 * Form Fields: name, email, subject, message, timestamp
 * =========================================================================
 */

// Configuration
var CONFIG = {
  NOTIFICATION_EMAIL: "deepaksanjay948@gmail.com",
  SHEET_NAME: "Portfolio Inquiries",
  EMAIL_SUBJECT_PREFIX: "[Portfolio Inquiry] New message from "
};

/**
 * Handle HTTP POST requests from the website contact form
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  
  // Wait up to 30 seconds for concurrent requests
  try {
    lock.waitLock(30000);
  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: "Server is busy. Please try again in a few moments."
    }, 429);
  }

  try {
    var data = {};
    
    // Parse incoming data (handles raw JSON or standard form-urlencoded)
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    // Extract fields
    var name = sanitizeInput(data.name || "Anonymous");
    var email = sanitizeInput(data.email || "No Email Provided");
    var subject = sanitizeInput(data.subject || "Portfolio Inquiry");
    var message = sanitizeInput(data.message || "");
    var formattedDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");

    // Basic validation
    if (!message || message.trim().length === 0) {
      return createJsonResponse({
        status: "error",
        message: "Message content cannot be empty."
      }, 400);
    }

    // 1. Save submission to Google Sheet
    var sheet = getOrCreateSheet();
    sheet.appendRow([
      formattedDate,
      name,
      email,
      subject,
      message,
      data.clientIp || "Web Client"
    ]);

    // 2. Send instant Email Notification to Deepak
    sendEmailNotification(name, email, subject, message, formattedDate);

    // 3. Return success response
    return createJsonResponse({
      status: "success",
      message: "Thank you, " + name + "! Your message has been transmitted securely and Deepak will get back to you shortly.",
      timestamp: formattedDate
    }, 200);

  } catch (err) {
    Logger.log("Error in doPost: " + err.toString());
    return createJsonResponse({
      status: "error",
      message: "An internal error occurred: " + err.toString()
    }, 500);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Handle HTTP GET requests (used for API status health check)
 */
function doGet(e) {
  return createJsonResponse({
    status: "active",
    name: "Deepak Portfolio Contact Endpoint",
    owner: "Deepak (deepaksanjay948@gmail.com)",
    timestamp: new Date().toISOString()
  }, 200);
}

/**
 * Helper to get or create the spreadsheet tab with headers
 */
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
    
    // Add styled header row
    var headers = [
      "Timestamp",
      "Sender Name",
      "Sender Email",
      "Subject",
      "Message",
      "Source"
    ];
    sheet.appendRow(headers);
    
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#0f172a");
    headerRange.setFontColor("#38bdf8");
    headerRange.setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * Send an email notification to Deepak
 */
function sendEmailNotification(name, email, subject, message, date) {
  try {
    var emailSubject = CONFIG.EMAIL_SUBJECT_PREFIX + name + " - " + subject;
    
    var htmlBody = "" +
      "<div style='background-color: #0b0f19; color: #f1f5f9; padding: 24px; font-family: Arial, sans-serif; border-radius: 8px; border: 1px solid #1e293b; max-width: 600px;'>" +
        "<div style='border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 18px;'>" +
          "<h2 style='color: #38bdf8; margin: 0; font-size: 20px;'>⚡ New Portfolio Inquiry Received</h2>" +
          "<p style='color: #94a3b8; font-size: 13px; margin: 4px 0 0 0;'>Deepak's Cybersecurity & Full-Stack Portfolio</p>" +
        "</div>" +
        "<table style='width: 100%; border-collapse: collapse; margin-bottom: 18px; font-size: 14px;'>" +
          "<tr><td style='color: #10b981; width: 90px; padding: 6px 0; font-weight: bold;'>From:</td><td style='color: #ffffff;'>" + name + "</td></tr>" +
          "<tr><td style='color: #10b981; padding: 6px 0; font-weight: bold;'>Email:</td><td style='color: #38bdf8;'><a href='mailto:" + email + "' style='color: #38bdf8; text-decoration: none;'>" + email + "</a></td></tr>" +
          "<tr><td style='color: #10b981; padding: 6px 0; font-weight: bold;'>Subject:</td><td style='color: #ffffff;'>" + subject + "</td></tr>" +
          "<tr><td style='color: #10b981; padding: 6px 0; font-weight: bold;'>Date:</td><td style='color: #94a3b8;'>" + date + "</td></tr>" +
        "</table>" +
        "<div style='background-color: #131d31; border-left: 4px solid #10b981; padding: 14px; border-radius: 4px; margin-bottom: 18px;'>" +
          "<h4 style='margin: 0 0 8px 0; color: #e2e8f0; font-size: 14px;'>Message:</h4>" +
          "<p style='margin: 0; color: #cbd5e1; white-space: pre-wrap; font-size: 14px; line-height: 1.5;'>" + message + "</p>" +
        "</div>" +
        "<div style='text-align: center; margin-top: 20px;'>" +
          "<a href='mailto:" + email + "?subject=Re: " + encodeURIComponent(subject) + "' style='display: inline-block; background: #2563eb; color: #ffffff; padding: 10px 22px; text-decoration: none; font-weight: bold; border-radius: 6px; font-size: 14px;'>Reply to " + name + "</a>" +
        "</div>" +
      "</div>";

    MailApp.sendEmail({
      to: CONFIG.NOTIFICATION_EMAIL,
      replyTo: email,
      subject: emailSubject,
      htmlBody: htmlBody
    });
  } catch (mailErr) {
    Logger.log("Failed to send email notification: " + mailErr.toString());
  }
}

/**
 * Format JSON response with proper headers
 */
function createJsonResponse(data, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * Sanitize string inputs to prevent script injection
 */
function sanitizeInput(str) {
  if (typeof str !== "string") return "";
  return str.replace(/[<>]/g, "");
}
