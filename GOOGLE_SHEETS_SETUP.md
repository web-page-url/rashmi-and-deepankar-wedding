# 📊 Google Sheets RSVP Integration Setup Guide

This guide will help you set up Google Sheets integration for your wedding RSVP form from scratch.

## 🎯 What We'll Accomplish
- ✅ Form submissions automatically saved to Google Sheets
- ✅ WhatsApp number collection instead of email
- ✅ Timestamp tracking for each submission
- ✅ Error handling and success notifications
- ✅ CORS-friendly FormData submission

---

## 📋 Step-by-Step Setup Instructions

### Step 1: Create a Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new blank spreadsheet
3. **IMPORTANT**: Name the first sheet tab "RSVP" (not "Sheet1")
4. Name the spreadsheet something like "Rashmi & Deepankar - RSVP Responses"
5. **Important**: Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)

```
Example URL: https://docs.google.com/spreadsheets/d/1ABC123DEF456/edit
Sheet ID: 1ABC123DEF456
```

---

### Step 2: Create Google Apps Script
1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any default code in the editor
3. Copy and paste the entire `google-apps-script.js` code
4. **Replace** `YOUR_GOOGLE_SHEET_ID_HERE` with your actual Sheet ID

```javascript
const SHEET_ID = '1ABC123DEF456'; // Replace with your actual Sheet ID
SHEET_ID = 1WRJU8ZfisTmJVROsyDcJQbT4N01Crgfs2kr51heNem8
```

---

### Step 3: Deploy the Script (CRITICAL - Do This!)
1. Click the **"Deploy"** button (blue button)
2. Select **"Manage deployments"**
3. **DELETE any existing deployments** (trash icon) - this is why it's not working!
4. Go back and click **"Deploy"** again
5. Select **"New deployment"**
6. Choose type: **"Web app"**
7. Configure:
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
8. Click **"Deploy"**
9. **Copy the NEW deployment URL** (it will look like: `https://script.google.com/macros/s/SCRIPT_ID/exec`)

**⚠️ IMPORTANT:** You MUST delete old deployments and create a fresh one!

---

### Step 4: Update Your React App
1. Open your `src/components/RSVP.tsx` file
2. Find the line: `const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
3. Replace it with your deployment URL:

```javascript
const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

---

### Step 5: Test the Integration
1. Deploy your website
2. Fill out the RSVP form
3. Check your Google Sheet - the data should appear automatically!

---

## 📊 Expected Google Sheet Format

Your sheet will automatically create these columns:
- **A**: Submission Time (when you received the response)
- **B**: Full Name
- **C**: WhatsApp Number
- **D**: Attendance (yes/no)
- **E**: Number of Guests
- **F**: Special Message
- **G**: Client Timestamp (when user submitted)

---

## 🛠️ Troubleshooting

### Issue: Getting redirected to `script.googleusercontent.com/macros/echo`
- **Cause**: Old/broken deployment
- **Solution**: Delete old deployments and create a new one (see Step 3)

### Issue: "Error processing RSVP: [TypeError: Cannot read properties of undefined (reading 'postData')]"
- **Solution**: This error is fixed in the updated code. The issue was with `no-cors` mode preventing the request body from being sent. We've switched to FormData submission which works properly with Google Apps Script.

### Issue: "Script Error" or no data appears
1. **Check your Sheet ID** is correct: `1WRJU8ZfisTmJVROsyDcJQbT4N01Crgfs2kr51heNem8`
2. **Verify sheet name** is "RSVP" (the script uses `getActiveSheet()`)
3. Make sure the script is deployed with "Anyone" access
4. Check the browser console for error messages
5. Verify your deployment URL is correct in the React app

### Issue: Data appears but in wrong sheet
- **Check**: The script uses `getActiveSheet()` which gets the first sheet
- **Fix**: Make sure your "RSVP" sheet is the first tab in your spreadsheet

### Issue: CORS errors
- This is normal with Google Apps Script when using FormData
- The form will still work correctly despite CORS warnings in the console

### Issue: Script deployment fails
1. Make sure you're the owner of the Google Sheet
2. Try creating a new Apps Script project
3. Check that your Google account has Apps Script enabled

---

## 🔒 Security Notes

- **Anyone can submit**: Since we set "Who has access: Anyone", anyone can potentially submit data
- **No spam protection**: Consider adding CAPTCHA if you receive spam
- **Data privacy**: WhatsApp numbers are sensitive data - inform users in your privacy policy

---

## 📈 Advanced Features (Optional)

### Add Email Notifications
```javascript
// Add this to your Apps Script to send email notifications
MailApp.sendEmail({
  to: "your-email@example.com",
  subject: "New RSVP: " + data.name,
  body: `New RSVP received:\n\n${JSON.stringify(data, null, 2)}`
});
```

### Add Data Validation
```javascript
// Add validation before saving
if (!data.name || !data.whatsapp) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'result': 'error',
      'message': 'Name and WhatsApp number are required'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## 🔍 DEBUGGING CHECKLIST (If Still Not Working)

### Step 1: Verify Sheet Setup
1. **Sheet URL**: `https://docs.google.com/spreadsheets/d/1WRJU8ZfisTmJVROsyDcJQbT4N01Crgfs2kr51heNem8/edit`
2. **First tab name**: Must be "RSVP" (rename from "Sheet1" if needed)
3. **Sheet ID**: `1WRJU8ZfisTmJVROsyDcJQbT4N01Crgfs2kr51heNem8`

### Step 2: Test Apps Script Directly
1. **In Apps Script editor**: **Run → testScript**
2. **Check execution logs** for errors
3. **Should see**: "Test result: {"result":"success","message":"RSVP submitted successfully!"}"

### Alternative: Test with Browser Console
1. **Open your website** in browser
2. **Open Developer Tools** (F12 → Console)
3. **Copy and paste** the `test-apps-script.js` code into console
4. **Run it** to test your deployment directly
5. **Check for success message** in console

### Step 3: Check Deployment
1. **Deploy → Manage deployments**
2. **Delete ALL old deployments**
3. **Create NEW deployment** (Web app, Execute: Me, Access: Anyone)
4. **Copy NEW URL** starting with `https://script.google.com/macros/s/...`

### Step 4: Update React App
1. Open `src/components/RSVP.tsx`
2. Update `scriptURL` with your NEW deployment URL
3. Example: `const scriptURL = 'https://script.google.com/macros/s/YOUR_NEW_ID/exec';`

### Step 5: Test End-to-End
1. **Submit RSVP** from your website
2. **Check browser console** for success messages
3. **Check Apps Script logs** for debug messages
4. **Check spreadsheet** for new data

### Step 6: Common Issues
- **Wrong Sheet ID**: Double-check the ID in Apps Script
- **Wrong Sheet Name**: Must be "RSVP" as first tab
- **Old Deployment URL**: Always use the latest deployment URL
- **Permissions**: Must be "Anyone" access
- **CORS**: Normal, doesn't affect functionality

## 🎉 You're Done!

Your wedding RSVP form now automatically saves responses to Google Sheets. Every submission will appear instantly in your spreadsheet with timestamps and all the details.

**Need help?** Check the troubleshooting section or reach out for assistance!

💕 Happy wedding planning! 🎊
