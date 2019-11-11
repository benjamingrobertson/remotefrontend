const { readFileSync } = require('fs');

const bold = readFileSync(
  `${__dirname}/fonts/opensanscondensed-bold-webfont.woff2`
).toString('base64');

const lora = readFileSync(
  `${__dirname}/fonts/lora-italic-webfont.woff2`
).toString('base64');

function getCss(fontSize) {
  let background = '#fffff8';
  let foreground = 'black';

  return `
    @font-face {
      font-family: 'Open Sans';
      font-style:  normal;
      font-weight: normal;
      src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }
    @font-face {
      font-family: 'Lora';
      font-style:  italic;
      font-weight: 700;
      src: url(data:font/woff2;charset=utf-8;base64,${lora}) format('woff2');
    }
    .lora {
      font-family: Lora;
      font-style: italic;
      font-size: 0.64em;
    }
    .job {
      font-family: Open Sans;
      line-height: 1.2;
      text-transform: uppercase;
    }
    html,
    body {
      margin: 0;
      padding: 0;
    }
    .bodywrapper {
      border: 10px solid #00645d;
      background: ${background};
      height: 580px;
      width: 1180px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    p {
      margin: 0;
      font-weight: bold;
    }
    .heading {
      font-size: ${sanitizeHtml(fontSize)};
      font-style: normal;
      color: ${foreground};
      line-height: 1.2;
      width: 75vw;
      padding-left: 1rem;
      padding-top: 1rem
    }
    .footer {
      max-width: 100%;
      font-size: 1.8rem;
      padding-left: 1rem;
      padding-bottom: 1rem;
    }
    `;
}

module.exports = function getHtml(parsedReq) {
  const { title, company, fontSize } = parsedReq;
  let text = `<span class="job">${title}</span>`;

  if (company) {
    text = `<span class="job">${title}</span> <span class="lora">at</span> <span class="job">${company}</span>`;
  }

  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(fontSize)}
    </style>
    <body>
      <div class="bodywrapper">
        <div class="heading">
          ${text}
        </div>
        <div class="footer">
          <div class="job">frontendremotejobs.com</div>
          <div class="job">@remotefrontend</div>
        </div>
      </div>
    </body>
</html>`;
};

const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;'
};

function sanitizeHtml(html) {
  return String(html).replace(/[&<>"'\/]/g, (key) => entityMap[key]);
}
