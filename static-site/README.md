# Arkaa Scapes - Static Website

Premium eco-luxury home construction website. **100% static - no build required!**

## 📁 Files

```
/static-site/
├── index.html    ← Main website (just upload this!)
├── styles.css    ← All styling
└── script.js     ← Interactivity (menu, FAQs, form)
```

## 🚀 Deploy to GitHub Pages

1. **Create a new repository** on GitHub
2. **Upload the 3 files** from `/static-site/` folder
3. Go to **Settings → Pages**
4. Set Source: **Deploy from a branch**
5. Branch: **main**, Folder: **/ (root)**
6. Click **Save**
7. Your site is live at `https://username.github.io/repo-name/`

## ⚙️ Configuration (Before Deploying)

Edit `script.js` and update these lines at the top:

```javascript
const GOOGLE_SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
const WHATSAPP_NUMBER = '919999999999'; // Your WhatsApp number
```

Also update in `index.html`:
- Search for `+91 XXXXX XXXXX` and replace with your phone
- Search for `info@arkaascapes.com` and replace with your email
- Search for `919999999999` in the WhatsApp link and update

## 📊 Google Sheets Setup

1. Create a Google Sheet with columns: `Timestamp | Name | Email | Phone | Budget | Package | Message`
2. Go to **Extensions → Apps Script**
3. Paste this code:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.timestamp,
    data.name,
    data.email,
    data.phone,
    data.budget,
    data.package_interest,
    data.message
  ]);
  return ContentService.createTextOutput(JSON.stringify({status:'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. **Deploy → New deployment → Web app**
5. Execute as: **Me** | Who has access: **Anyone**
6. Copy the URL and paste in `script.js`

## 🌐 Other Hosting Options

### GoDaddy
1. Log into GoDaddy
2. Go to File Manager
3. Upload all 3 files to `public_html` folder
4. Done!

### Netlify
1. Drag & drop the `static-site` folder to netlify.com/drop
2. Get instant URL!

### Any Web Host
Just upload `index.html`, `styles.css`, and `script.js` to your hosting root folder.

## ✨ Features

- ✅ Fully responsive (mobile-friendly)
- ✅ Animated hero section
- ✅ Service cards
- ✅ Package comparison (Terra, Solara, Aether)
- ✅ Process timeline
- ✅ FAQ accordion
- ✅ Contact form → Google Sheets
- ✅ WhatsApp integration
- ✅ Smooth scrolling
- ✅ No dependencies, no build step

---

© 2026 Arkaa Scapes
