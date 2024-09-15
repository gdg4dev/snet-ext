chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
      fetch(`https://snet-ext-backend.vercel.app/check-url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: tab.url })
      })
      .then(response => response.json())
      .then(data => {
        if (data.isPossiblySpam) {
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
          });
        }
      })
      .catch(err => console.error("Error fetching the API:", err));
    }
  });
  
  chrome.runtime.onInstalled.addListener(() => {
    console.log('Gmail Email Checker Installed!');
  });
  