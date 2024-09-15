const warningHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Website Blocked - Phishing Warning</title>
    <style>
        body, html {
            height: 100%;
            width:100%;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            background-color: #1a1a1a;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            z-index: 99999999;
            position: abosolute;
        }
        .container {
            max-width: 600px;
            padding: 2rem;
        }
        .warning-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
        }
        h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
            font-weight: 300;
        }
        p {
            font-size: 1rem;
            margin-bottom: 1rem;
            opacity: 0.8;
            line-height: 1.5;
        }
        .blocked {
            color: #ff4d4d;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="warning-icon">🚫</div>
        <h1>Website Blocked</h1>
        <p>This website has been <span class="blocked">blocked</span> due to a detected phishing scam.</p>
        <p>Phishing scams attempt to steal your personal information. For your safety, access to this site has been restricted.</p>
    </div>
</body>
</html>`;

// Inject the HTML
document.body.innerHTML= warningHtml