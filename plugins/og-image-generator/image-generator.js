const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

/* eslint-disable no-console */
/**
 *
 * @param {*} filePath
 */
function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

/**
 *
 * @param {*} posts
 */
async function screenshot(posts, type) {
  console.log(`Found ${posts.length} ${type} pages to generate images for.`);
  const headless = true; // for debug
  const browser = await puppeteer.launch({ headless });
  const page = await browser.newPage();
  page.setViewport({ width: 1200, height: 628 });
  const getHtml = require('./image');
  console.log('taking screenshots...');

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const titleLength =
      type === 'job'
        ? post.title.length + post.company.length
        : post.title.length;
    const fontSize =
      Math.min(20, Math.max(7, Math.floor(100 / titleLength))) + 'vw';
    const html = getHtml({
      fileType: 'jpg',
      title: post.title,
      company: post.company || false,
      fontSize
    });

    await page.setContent(html);
    const filePath = path.resolve(`static/og_image/${post.slug}.png`);
    ensureDirectoryExistence(filePath);
    await page.screenshot({ path: filePath });
  }
  if (headless) {
    await browser.close();
  }
  console.log(`success Finished taking ${posts.length} ${type} screenshots.`);
}

module.exports = screenshot;
