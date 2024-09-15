function showWarning() {
    document.body.innerHTML = `
      <div style="background-color: #FFEBEE; padding: 20px; text-align: center; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <img src="${chrome.runtime.getURL('warning-icon.png')}" alt="Warning" style="width: 100px; height: 100px; margin-bottom: 20px;">
        <h1 style="color: #D32F2F; font-size: 24px; margin-bottom: 10px;">Warning: Potential Phishing Site Detected</h1>
        <p style="color: #424242; font-size: 16px;">This website has been flagged as potentially dangerous. Please proceed with caution or navigate away from this page.</p>
      </div>
    `;
  }
  
// injectedScript.js
// Use the extension ID directly in this script
const myExtId = chrome.runtime.id; // Get the extension ID

// Now you can send a message to the background script
chrome.runtime.sendMessage(myExtId, { action: 'showWarning' }, response => {
    showWarning()
});