# gatsby-plugin-performance-metrics

> A [Gatsby](https://github.com/gatsbyjs/gatsby) plugin to measure First (Contentful) Paint (FP/FCP) and First Input Delay (FID)

## Install

`npm install --save gatsby-plugin-performance-metrics`

## How to use

Edit `gatsby-config.js`

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-performance-metrics`,
      options: {
        //firstPaint: false,
        //firstContentfulPaint: true,
        //firstInputDelay: true,
        //useLogging: true,
        //useGoogleAnalytics: false
      }
    }
  ]
};
```
