/**
 * Google Sheets API Service for Deepak's Portfolio Contact Inquiries
 */

const STORAGE_KEY_SPREADSHEET_ID = 'deepak_portfolio_sheet_id';

export interface SheetInquiry {
  timestamp: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  rowNumber: number;
}

export interface SheetInfo {
  spreadsheetId: string;
  spreadsheetUrl: string;
  title: string;
  rowCount: number;
}

/**
 * Retrieves the stored Spreadsheet ID from localStorage if exists
 */
export const getStoredSpreadsheetId = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEY_SPREADSHEET_ID);
  } catch {
    return null;
  }
};

/**
 * Stores Spreadsheet ID to localStorage
 */
export const setStoredSpreadsheetId = (id: string | null) => {
  try {
    if (id) {
      localStorage.setItem(STORAGE_KEY_SPREADSHEET_ID, id);
    } else {
      localStorage.removeItem(STORAGE_KEY_SPREADSHEET_ID);
    }
  } catch (e) {
    console.warn('Could not save spreadsheet ID to localStorage', e);
  }
};

/**
 * Finds existing portfolio spreadsheet or creates a new one in the user's Google Drive
 */
export const findOrCreatePortfolioSheet = async (accessToken: string): Promise<SheetInfo> => {
  const existingId = getStoredSpreadsheetId();

  if (existingId) {
    try {
      const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${existingId}?fields=spreadsheetId,properties.title,sheets.properties`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (res.ok) {
        const data = await res.json();
        return {
          spreadsheetId: data.spreadsheetId,
          spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}/edit`,
          title: data.properties?.title || 'Deepak Portfolio Contact Inquiries',
          rowCount: 0
        };
      }
    } catch (e) {
      console.warn('Stored spreadsheet not accessible, will create a fresh one', e);
    }
  }

  // Create new spreadsheet
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: 'Deepak Portfolio Contact Inquiries',
      },
      sheets: [
        {
          properties: {
            title: 'Inquiries',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
        },
      ],
    }),
  });

  if (!createRes.ok) {
    const errorText = await createRes.text();
    throw new Error(`Failed to create Google Sheet: ${errorText}`);
  }

  const createdData = await createRes.json();
  const spreadsheetId = createdData.spreadsheetId;

  // Add formatted header row
  const headerRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Inquiries!A1:F1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [
          ['Timestamp', 'Name', 'Email', 'Subject', 'Message', 'Status'],
        ],
      }),
    }
  );

  if (!headerRes.ok) {
    console.warn('Header row creation warning:', await headerRes.text());
  }

  // Format header row style with bold font and background color
  try {
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: createdData.sheets?.[0]?.properties?.sheetId || 0,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: 6,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.14, green: 0.38, blue: 0.92 }, // Royal Blue
                  textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
                },
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat)',
            },
          },
          {
            autoResizeDimensions: {
              dimensions: {
                sheetId: createdData.sheets?.[0]?.properties?.sheetId || 0,
                dimension: 'COLUMNS',
                startIndex: 0,
                endIndex: 6,
              },
            },
          },
        ],
      }),
    });
  } catch (err) {
    console.warn('Formatting header batchUpdate warning:', err);
  }

  setStoredSpreadsheetId(spreadsheetId);

  return {
    spreadsheetId,
    spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
    title: 'Deepak Portfolio Contact Inquiries',
    rowCount: 0
  };
};

/**
 * Appends a new contact form submission into the Google Sheet
 */
export const appendContactInquiry = async (
  accessToken: string,
  spreadsheetId: string,
  inquiry: { name: string; email: string; subject: string; message: string }
): Promise<boolean> => {
  const timestamp = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  });

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Inquiries!A:F:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [
          [
            timestamp,
            inquiry.name,
            inquiry.email,
            inquiry.subject || 'Portfolio Inquiry',
            inquiry.message,
            'New Inquiry',
          ],
        ],
      }),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Google Sheets append failed: ${errorBody}`);
  }

  return true;
};

/**
 * Fetches existing inquiry rows from the Google Sheet
 */
export const fetchSheetInquiries = async (
  accessToken: string,
  spreadsheetId: string
): Promise<SheetInquiry[]> => {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Inquiries!A2:F100`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  const rows: any[][] = data.values || [];

  return rows.map((row, idx) => ({
    rowNumber: idx + 2,
    timestamp: row[0] || 'Unknown date',
    name: row[1] || 'Anonymous',
    email: row[2] || '',
    subject: row[3] || 'No subject',
    message: row[4] || '',
    status: row[5] || 'Received',
  })).reverse(); // Most recent first
};
