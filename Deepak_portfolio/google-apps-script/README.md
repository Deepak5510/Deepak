# Google Apps Script Setup Guide for Deepak's Portfolio Contact Form

This guide will show you how to deploy the backend script in **2 minutes** so all contact form submissions from your portfolio go directly into a Google Sheet and forward an instant alert to your email (**deepaksanjay948@gmail.com**).

---

## Quick Setup Steps (Takes ~2 minutes)

### Step 1: Open Google Sheets
1. Go to [Google Sheets](https://sheets.new) to create a new spreadsheet.
2. Name the sheet: **"Deepak Portfolio Submissions"**.

### Step 2: Open the Apps Script Editor
1. In the Google Sheets menu, click **Extensions** > **Apps Script**.
2. A new code editor tab will open.
3. Delete any default code in `Code.gs`.
4. Copy all the contents from [`Code.gs`](Code.gs) in this repository and paste it into the editor.

### Step 3: Deploy as a Web App
1. At the top right of the Apps Script window, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon (`⚙ Select type`) next to "Select type" and choose **Web app**.
3. Fill in the deployment configuration:
   - **Description:** `Deepak Portfolio Contact Endpoint`
   - **Execute as:** `Me (your Google account)`
   - **Who has access:** `Anyone` *(Crucial: This allows your website visitors to send you a message without logging in!)*
4. Click **Deploy**.
5. Google will ask you to **Authorize access**:
   - Click *Authorize access*.
   - Choose your Google account (`deepaksanjay948@gmail.com`).
   - If you see "Google hasn't verified this app", click **Advanced** (bottom left), then click **Go to Deepak Portfolio Contact Endpoint (unsafe)**.
   - Click **Allow**.

### Step 4: Copy Your Web App URL
1. Once deployed, you will see a dialog with your **Web app URL** (looks like `https://script.google.com/macros/s/AKfycbx.../exec`).
2. Copy this URL.

### Step 5: Update Your Portfolio
Open `js/config.js` in your portfolio project and paste the URL into `GOOGLE_APPS_SCRIPT_URL`:

```javascript
export const CONFIG = {
  // Replace with your copied deployment URL:
  GOOGLE_APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbx.../exec",
  // ...
};
```

That's it! Every message submitted on your website will now:
- Automatically log the date, name, email, subject, and message into your Google Sheet.
- Send a beautifully formatted email notification directly to `deepaksanjay948@gmail.com`.

---

## Testing Without Deployment First (Demo Mode)
If you haven't deployed your Google Apps Script yet:
- The website includes a built-in **Simulation Fallback Mode**. If the default URL is not yet connected or if testing locally, the website provides a realistic preview, notifies you, and shows you this setup guide via the info button next to the contact form!
- You can also test your live endpoint directly in the website using the in-page **"Configure Endpoint"** modal.
