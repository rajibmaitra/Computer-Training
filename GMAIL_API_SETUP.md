# 📧 Gmail API Setup Guide for GitHub Pages

This guide explains how to set up Gmail API integration for your static website on GitHub Pages. No server required!

---

## Option 1: Gmail API (Recommended for Production) ⭐

### Prerequisites
- Google Account (Gmail)
- Google Cloud Project

---

## Step 1: Create Google Cloud Project

1. Go to **Google Cloud Console**: https://console.cloud.google.com/
2. Click on the project dropdown (top-left)
3. Click **"NEW PROJECT"**
4. Enter project name: `Tech Training Center`
5. Click **CREATE**
6. Wait for the project to be created, then select it

---

## Step 2: Enable Gmail API

1. Go to **APIs & Services** > **Library**
2. Search for **"Gmail API"**
3. Click on **Gmail API**
4. Click the **ENABLE** button
5. You'll see "API enabled" message

---

## Step 3: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **+ CREATE CREDENTIALS**
3. Select **OAuth client ID**
4. You might be asked to configure OAuth consent screen first:
   - Click **Configure Consent Screen**
   - Select **External** as User Type
   - Click **CREATE**

### Configure OAuth Consent Screen
1. **App Name**: Technology Training Center for PwD
2. **User Support Email**: your-email@gmail.com
3. **Developer Contact**: your-email@gmail.com
4. Click **SAVE AND CONTINUE**

5. Add scopes:
   - Search for **Gmail** scopes
   - Select **https://www.googleapis.com/auth/gmail.send**
   - Click **UPDATE**
   - Continue through the rest

---

## Step 4: Create OAuth 2.0 Client ID

Back in **Credentials** page:

1. Click **+ CREATE CREDENTIALS** again
2. Select **OAuth client ID**
3. Choose **Web application**
4. Name it: `Tech Training Center Website`
5. Add **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   https://yourusername.github.io
   ```
6. Add **Authorized redirect URIs**:
   ```
   http://localhost:3000/callback
   https://yourusername.github.io/callback
   ```
7. Click **CREATE**
8. Copy the **Client ID** (you'll need this)

---

## Step 5: Get API Key

1. Go to **APIs & Services** > **Credentials**
2. Click **+ CREATE CREDENTIALS**
3. Select **API Key**
4. Copy the **API Key**

---

## Step 6: Update Configuration File

Open `gmail-config.js` in your project and update:

```javascript
const GMAIL_CONFIG = {
    CLIENT_ID: 'YOUR_COPIED_CLIENT_ID.apps.googleusercontent.com',
    API_KEY: 'YOUR_COPIED_API_KEY',
    SCOPES: 'https://www.googleapis.com/auth/gmail.send',
    ADMIN_EMAIL: 'your-email@gmail.com'  // Where form submissions go
};
```

**Replace:**
- `YOUR_COPIED_CLIENT_ID` - from Step 4
- `YOUR_COPIED_API_KEY` - from Step 5
- `your-email@gmail.com` - your Gmail address

### Example:
```javascript
const GMAIL_CONFIG = {
    CLIENT_ID: '123456789-abc123xyz.apps.googleusercontent.com',
    API_KEY: 'AIzaSyDx1234567890abcdefg',
    SCOPES: 'https://www.googleapis.com/auth/gmail.send',
    ADMIN_EMAIL: 'rajibmaitra@gmail.com'
};
```

---

## Step 7: Update Script.js

In `script.js`, update the admin email:

```javascript
function createEmailMessage(senderName, senderEmail, messageText) {
    const adminEmail = 'your-email@gmail.com'; // ← Update this
```

---

## Step 8: Test Locally

1. Open `index.html` in a browser (or use a local server)
2. Fill out the contact form
3. Click "Send Message"
4. A Google login popup will appear
5. Log in with your Gmail account
6. Grant permission
7. Message sends!

---

## Step 9: Deploy to GitHub Pages

1. Commit and push to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Your site will be live at: `https://yourusername.github.io/repository-name`

---

## Important Security Notes

⚠️ **Your credentials are visible in JavaScript** (because it's a static website)

To secure this in production:
- Use **API Key restrictions** in Google Cloud Console
- Restrict **Application restrictions** to HTTP referrers
- Only allow your GitHub Pages domain

### Set API Key Restrictions:

1. Go to **APIs & Services** > **Credentials**
2. Find your API Key, click the pencil to edit
3. Under **Application restrictions**:
   - Select **HTTP referrers**
   - Add: `https://yourusername.github.io/*`
4. Click **SAVE**

---

## Troubleshooting

### Issue: "gapi is not defined"
- Solution: Make sure `gmail-config.js` loads before `script.js`
- Check that Google API script tag is in `index.html`

### Issue: Login popup doesn't appear
- Solution: Check browser console (F12) for errors
- Verify CLIENT_ID and API_KEY are correct

### Issue: "Permission denied" error
- Solution: 
  - Make sure you granted permission
  - Verify Gmail API is enabled in Cloud Console
  - Check OAuth scopes include `gmail.send`

### Issue: Email not sending
- Solution:
  - Check browser console for detailed error
  - Verify authorized JavaScript origins match your domain
  - Try logging out and logging back in

---

## Alternative: Web3Forms (Easier, No Setup) 🚀

If Gmail API seems complex, try **Web3Forms** - completely free, no authentication needed!

### Simple 3-Step Setup:

1. Go to: https://web3forms.com/
2. Sign up (free)
3. Get your access key
4. Update `script.js`:

```javascript
async function sendViaWeb3Forms(name, email, message) {
    const form = new FormData();
    form.append("access_key", "YOUR_WEB3FORMS_KEY");
    form.append("from_name", name);
    form.append("email", email);
    form.append("message", message);
    form.append("redirect", window.location.href);
    
    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form
    });
    
    const data = await response.json();
    return data.success;
}
```

Then in the form handler, call `sendViaWeb3Forms(name, email, message)` instead of Gmail API.

This method requires NO authentication and works on GitHub Pages instantly!

---

## Quick Comparison

| Feature | Gmail API | Web3Forms |
|---------|-----------|-----------|
| Setup Time | 15-20 min | 2 min |
| Cost | Free | Free |
| Complexity | Moderate | Easy |
| Email Count | Unlimited | Limited |
| Authentication | Required | Not needed |
| GitHub Pages | ✅ Works | ✅ Works |

---

## Next Steps

1. Choose your email method (Gmail API or Web3Forms)
2. Complete the setup steps above
3. Test the form locally
4. Deploy to GitHub Pages
5. Done! 🎉

---

## Support

For issues with:
- **Gmail API**: Check Google Cloud Console documentation
- **Web3Forms**: Visit https://web3forms.com/help
- **GitHub Pages**: Check GitHub Pages documentation

---

## File Structure After Setup

```
Computer Training/
├── index.html
├── styles.css
├── script.js
├── gmail-config.js          ← Update this
├── package.json             ← No longer needed for static site
├── server.js                ← No longer needed
├── .env.example             ← Not used anymore
└── README.md
```

You can delete `package.json`, `server.js`, and `.env.example` as they're not needed for the Gmail API approach.
