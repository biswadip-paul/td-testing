# TR Legal Testing Site - Personalization & Data Sendability Testing

A comprehensive testing environment for Treasure Data personalization API and real-time data tracking, styled after the Thomson Reuters Legal website.

## 🎯 Purpose

This testing site allows you to:
- Test Treasure Data JS SDK integration and data sendability
- Monitor personalization API requests and responses in real-time
- Track Adobe Analytics integration
- Debug API calls with a comprehensive debug panel

## 📁 Files Overview

```
realtime_testing/
├── index.html                      # Main website (TR Legal clone)
├── styles.css                      # Professional legal-themed styling
├── mock-td-sdk.js                  # Real Treasure Data JS SDK loader
├── mock-adobe-analytics.js         # Mock Adobe Analytics for testing
├── personalization-test.js         # Enhanced personalization script with debugging
├── debug-ui.js                     # Debug panel controller
└── README.md                       # This file
```

## 🚀 Setup Instructions

### 1. Configure Treasure Data

Edit **`mock-td-sdk.js`** and update the configuration:

```javascript
window.td_instance = new Treasure({
    database: 'your_database_name',    // Replace with your TD database
    writeKey: 'your_write_only_key'    // Replace with your TD write key
});
```

### 2. Launch the Website

Open `index.html` in your browser:
- **Option 1:** Double-click `index.html`
- **Option 2:** Use a local server (recommended):
  ```bash
  # Using Python 3
  python3 -m http.server 8000

  # Using Node.js (if you have http-server)
  npx http-server
  ```
  Then visit: `http://localhost:8000`

### 3. Open Debug Panel

Click the **"Show Debug Panel"** button in the bottom-right corner to access:
- SDK status monitoring
- Request payload inspection
- API response viewing
- Adobe Analytics tag tracking
- Console log capture

## 🔍 Features

### Real-Time Debugging

The debug panel displays:

1. **SDK Status**
   - Treasure Data SDK load status
   - Adobe Analytics load status

2. **Request Payload**
   - All data being sent to the personalization API
   - TD tracking fields
   - ECID from Adobe

3. **API Response**
   - Response status code
   - Response time
   - Full response data

4. **Adobe Tags**
   - Tags fired with personalization data
   - Tag types and parameters

5. **Console Logs**
   - Captured console messages
   - Color-coded by severity (info, success, error, warning)

### Manual Testing

Click **"Trigger Test Call"** in the debug panel to manually fire a personalization API call.

## 🔧 How It Works

### Script Loading Order

1. **`mock-td-sdk.js`** - Loads real TD SDK from CDN and initializes `td_instance`
2. **`mock-adobe-analytics.js`** - Creates mock Adobe Analytics `s` object
3. **`personalization-test.js`** - Waits for both SDKs, makes API call, fires Adobe tags
4. **`debug-ui.js`** - Monitors all events and updates debug panel

### Personalization Flow

```
Page Load
    ↓
Load TD SDK & Adobe Analytics
    ↓
Wait for both SDKs to be ready
    ↓
Build request payload with:
  - TD tracking data
  - Adobe ECID
    ↓
POST to personalization API
    ↓
Receive personalization response
    ↓
Fire Adobe Analytics tags with context
    ↓
Display all data in debug panel
```

## 📊 API Endpoint

The personalization API call is made to:
```
POST https://us01.p13n.in.treasuredata.com/public/src_js_sdk/tr_web_pageviews_rt2
```

**Headers:**
- `Content-Type: application/vnd.treasuredata.v1+json`
- `WP13n-Token: 11521/1/5156c1fdefe24737b23ee39824523625`

## 🎨 Website Features

The testing site includes:
- **Header** with navigation and CTAs
- **Hero Section** with primary messaging
- **Products Section** showcasing legal solutions
- **Insights Section** with article cards
- **CTA Section** for conversion
- **Footer** with links

All sections are styled professionally to match enterprise legal sites.

## 🐛 Debugging Tips

### If TD SDK doesn't load:
1. Check browser console for errors
2. Verify your write key is correct
3. Check network tab for blocked requests
4. Ensure you're not blocking third-party scripts

### If personalization API fails:
1. Open debug panel to see exact error
2. Check request payload format
3. Verify API token is valid
4. Check CORS settings in browser

### If Adobe tags don't fire:
1. Check if Adobe Analytics mock loaded
2. Verify `s` object exists in console
3. Check Adobe tags section in debug panel

## 📝 Customization

### Change Personalization Endpoint

Edit **`personalization-test.js`**:
```javascript
fetch('YOUR_API_ENDPOINT_HERE', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/vnd.treasuredata.v1+json',
        'WP13n-Token': 'YOUR_TOKEN_HERE'
    },
    // ...
});
```

### Add Custom Tracking Fields

Edit the request payload in **`personalization-test.js`**:
```javascript
const requestPayload = {
    // ... existing fields
    custom_field: 'your_value'
};
```

## 🔐 Security Notes

- Never commit real API keys to version control
- Use write-only keys for client-side tracking
- Consider environment variables for production

## 📦 Browser Compatibility

Tested in:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Support

For issues or questions:
1. Check the browser console for errors
2. Review the debug panel logs
3. Verify SDK configuration

## 📄 License

This is a testing environment. Use responsibly and follow your organization's data policies.

---

**Built for testing Treasure Data personalization and real-time tracking capabilities.**