let emailProcessed = false;
let observer;

function scrapeEmailDetails() {
  const subjectElement = document.querySelector('.hP');
  const senderElement = document.querySelector('.go');
  const emailBodyElement = document.querySelector('.ii.gt');
  
  if (!subjectElement || !senderElement || !emailBodyElement) {
    console.error('Required elements are not available on the page.');
    return;
  }

  const subject = subjectElement.innerText;
  const senderEmail = senderElement.innerText;
  const emailContent = emailBodyElement.innerText;

  fetch('https://snet-ext-backend.vercel.app/check-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      subject: subject,
      sender: senderEmail,
      body: emailContent
    })
  })
  .then(response => response.json())
  .then(data => {
    displayBadgeFlair(data);
    // Stop the observer after processing the email
    if (observer) {
      observer.disconnect();
    }
  })
  .catch(err => console.error('Error:', err));
}

function displayBadgeFlair(data) {
  const subjectElement = document.querySelector('.hP');
  
  if (!subjectElement) {
    console.error('Subject element not found for displaying badge.');
    return;
  }

  const existingBadge = document.querySelector('.email-check-badge');
  if (existingBadge) existingBadge.remove();

  const badgeContainer = document.createElement('div');
  badgeContainer.style.display = 'inline-flex';
  badgeContainer.style.alignItems = 'center';
  badgeContainer.style.marginRight = '10px';
  badgeContainer.classList.add('email-check-badge');
  badgeContainer.style.borderRadius = '2px';
  badgeContainer.style.padding = '2px 8px';
  badgeContainer.style.backgroundColor = data.color;


  const badge = document.createElement('span');
  badge.innerText = data.status;
  badge.style.backgroundColor = data.color;
  badge.style.color = '#fff';
  badge.style.borderRadius = '2px';
  badge.style.fontSize = '12px';
  badge.style.fontWeight = 'bold';
  badge.style.textTransform = 'uppercase';

  const infoIcon = document.createElement('span');
  infoIcon.innerHTML = '&#9432;'; 
  infoIcon.style.marginLeft = '5px';
  infoIcon.style.cursor = 'pointer';
  infoIcon.style.color = '#fff';
  infoIcon.style.fontSize = '14px';

  const tooltip = document.createElement('div');
  tooltip.innerText = data.reason;
  tooltip.style.position = 'absolute';
  tooltip.style.backgroundColor = '#f9f9f9';
  tooltip.style.color = '#333';
  tooltip.style.padding = '10px';
  tooltip.style.borderRadius = '4px';
  tooltip.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
  tooltip.style.display = 'none';
  tooltip.style.zIndex = '1000';
  tooltip.style.maxWidth = '200px';
  tooltip.style.fontSize = '12px';

  infoIcon.appendChild(tooltip);

  infoIcon.addEventListener('mouseenter', () => {
    tooltip.style.display = 'block';
  });

  infoIcon.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });

  badgeContainer.appendChild(badge);
  badgeContainer.appendChild(infoIcon);

  subjectElement.parentNode.insertBefore(badgeContainer, subjectElement);

  emailProcessed = true;
}

function initializeObserver() {
  observer = new MutationObserver((mutations) => {
    if (!emailProcessed || !document.querySelector('.email-check-badge')) {
      let emailOpen = false;

      mutations.forEach(mutation => {
        if (document.querySelector('.hP')) {
          emailOpen = true;
        }
      });

      if (emailOpen) {
        observer.disconnect();
        scrapeEmailDetails();
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

initializeObserver();

window.addEventListener('popstate', function () {
  emailProcessed = false;
  initializeObserver();
});