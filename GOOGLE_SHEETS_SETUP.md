# Google Sheets Setup for Arkaa Scapes Contact Form

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "Arkaa Scapes Enquiries"
4. In Row 1, add these column headers:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Phone`
   - E1: `Budget`
   - F1: `Package`
   - G1: `Message`

## Step 2: Add Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code and paste this:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Append row with form data
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.budget || '',
      data.package_interest || '',
      data.message || ''
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Arkaa Scapes Form Handler is running!')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

3. Click **Save** (Ctrl+S or Cmd+S)
4. Name the project "Arkaa Scapes Form Handler"

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" → Choose **Web app**
3. Configure:
   - **Description**: "Contact Form Handler"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. Click **Deploy**
5. Click **Authorize access** and follow the prompts
   - Choose your Google account
   - Click "Advanced" → "Go to Arkaa Scapes Form Handler (unsafe)"
   - Click "Allow"
6. **Copy the Web App URL** - it looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

## Step 4: Update Your Website

Open `/app/frontend/src/components/Contact.jsx` and replace:

```javascript
const GOOGLE_SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```

With your actual URL:

```javascript
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
```

Also update the WhatsApp number:

```javascript
const WHATSAPP_NUMBER = '91XXXXXXXXXX'; // Your actual number
```

## Step 5: Test

1. Submit a test enquiry on your website
2. Check your Google Sheet - the data should appear in a new row!

---

## Troubleshooting

**Form submits but no data in sheet?**
- Make sure you deployed as "Anyone" can access
- Check the Apps Script execution log: Extensions → Apps Script → Executions

**Getting CORS errors?**
- The code uses `mode: 'no-cors'` which should handle this
- Make sure your Web App URL is correct

**Need to update the script?**
- Go to Extensions → Apps Script
- Make changes
- Deploy → Manage deployments → Edit → Version: New version → Deploy

---

## Prompt for Gemini in Google Sheets (Alternative)

If you prefer using Gemini in Sheets, you can ask:

> "Create a Google Apps Script that receives POST requests with JSON data containing name, email, phone, budget, package_interest, message, and timestamp fields, and appends them as rows to the active sheet. Include doPost and doGet functions, with proper error handling and CORS support for web forms."
