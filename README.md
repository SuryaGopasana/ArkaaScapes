# Arkaa Scapes - Eco-Luxury Construction Website

Premium eco-luxury home construction website for Arkaa Scapes, Bangalore.

## 🌐 Live Site

Visit the live website: [Your GitHub Pages URL]

## 📁 Project Structure

```
/docs              # Static website files (for GitHub Pages)
  ├── index.html   # Entry point
  ├── static/      # CSS, JS, and assets
  └── ...

/frontend          # React source code
  ├── src/
  │   ├── components/
  │   └── pages/
  └── package.json
```

## 🚀 Deployment to GitHub Pages

### Option 1: Using /docs folder (Recommended)

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main** (or master)
   - Folder: **/docs**
4. Click **Save**
5. Your site will be live at `https://[username].github.io/[repo-name]/`

### Option 2: Using gh-pages branch

```bash
# Install gh-pages
cd frontend
yarn add --dev gh-pages

# Add to package.json scripts:
# "predeploy": "yarn build",
# "deploy": "gh-pages -d build"

# Deploy
yarn deploy
```

## 📝 Configuration Required

### 1. Google Sheets Integration

Edit `/docs/static/js/main.*.js` or rebuild from source:

In `/frontend/src/components/Contact.jsx`, update:
```javascript
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
const WHATSAPP_NUMBER = '91XXXXXXXXXX';
```

Then rebuild: `cd frontend && yarn build && cp -r build/* ../docs/`

### 2. WhatsApp Number

Update the WhatsApp number in the same Contact.jsx file.

## 🛠️ Development

```bash
cd frontend
yarn install
yarn start
```

## 📦 Build for Production

```bash
cd frontend
yarn build
cp -r build/* ../docs/
```

## 🎨 Features

- ✅ Responsive design (mobile-friendly)
- ✅ Animated hero section
- ✅ Service showcase
- ✅ Package comparison (Terra, Solara, Aether)
- ✅ Process timeline
- ✅ FAQ accordion
- ✅ Contact form → Google Sheets
- ✅ WhatsApp integration

## 📄 License

© 2026 Arkaa Scapes. All rights reserved.
