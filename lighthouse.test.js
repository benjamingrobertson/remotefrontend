const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const Table = require('cli-table');

let table = new Table();

const output = (scores) => {
  Object.keys(scores).forEach((category) => {
    table.push([category, scores[category] * 100]);
  });
  return table.toString();
};

const launchChromeAndRunLighthouse = (url, opts = {}, config = null) => {
  return chromeLauncher
    .launch({ chromeFlags: opts.chromeFlags })
    .then((chrome) => {
      opts.port = chrome.port;
      return lighthouse(url, opts, config).then((results) => {
        return chrome.kill().then(() => results);
      });
    });
};

test(
  'performance audit',
  async () => {
    const { lhr } = await launchChromeAndRunLighthouse('http://localhost:9000');

    const scores = Object.keys(lhr.categories).reduce((merged, category) => {
      merged[category] = lhr.categories[category].score;
      return merged;
    }, {});

    console.log(output(scores));

    const threshold = 0.85;

    expect(scores.performance).toBeGreaterThanOrEqual(threshold);
    expect(scores.accessibility).toBeGreaterThanOrEqual(threshold);
    expect(scores['best-practices']).toBeGreaterThanOrEqual(threshold);
    expect(scores.seo).toBeGreaterThanOrEqual(threshold);
  },
  10000
);
