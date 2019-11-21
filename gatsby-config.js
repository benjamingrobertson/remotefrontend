/* eslint-disable strict */
require('dotenv').config({
  path: '.env'
});

const proxy = require('http-proxy-middleware');

module.exports = {
  siteMetadata: {
    title: 'Front End Remote Jobs',
    siteUrl: 'https://frontendremotejobs.com',
    description: 'Fully remote jobs for front end developers.',
    purchaseEndpoint: process.env.JOB_FORM_ENDPOINT,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  },
  developMiddleware: (app) => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': ''
        }
      })
    );
  },
  plugins: [
    'gatsby-plugin-stripe-checkout',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-advanced-sitemap',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: process.env.SRC_URL,
        protocol: 'http',
        hostingWPCOM: false,
        useACF: true,
        auth: {
          // If auth.user and auth.pass are filled, then the source plugin will
          // be allowed to access endpoints that are protected with .htaccess.
          htaccess_user: process.env.auth_user,
          htaccess_pass: process.env.auth_pw
        },
        // Set verboseOutput to true to display a verbose output on
        // `npm run develop` or `npm run build`
        // It can help you debug specific API Endpoints problems.
        verboseOutput: false,
        // Set how many pages are retrieved per API request.
        perPage: 100,
        // Set how many simultaneous requests are sent at once.
        concurrentRequests: 10,
        // Exclude specific routes using glob parameters
        // See: https://github.com/isaacs/minimatch
        // Example:  `["/*/*/comments", "/yoast/**"]` will exclude routes ending in `comments` and
        // all routes that begin with `yoast` from fetch.
        includedRoutes: [
          '**/posts',
          '**/pages',
          '**/users',
          '**/acf',
          '**/jobs',
          '**/technology',
          '**/experience',
          '**/taxonomies'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['UA-43172667-7'],
        gtagConfig: {
          anonymize_ip: true
        },
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true
        }
      }
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allWordpressWpJobs } }) => {
              return allWordpressWpJobs.edges.map((edge) => {
                return Object.assign({}, edge.node, {
                  title: `${edge.node.title} at ${edge.node.acf.company}`,
                  description: edge.node.excerpt,
                  url: `${site.siteMetadata.siteUrl}/jobs/${edge.node.slug}`,
                  guid: edge.node.id,
                  date: edge.node.date,
                  custom_elements: [{ 'content:encoded': edge.node.content }]
                });
              });
            },
            query: `
              {
                allWordpressWpJobs(
                  sort: { order: DESC, fields: [date] },
                  filter: { status: { eq: "publish" } }
                ) {
                  edges {
                    node {
                      id
                      excerpt
                      content
                      title
                      date(formatString: "MMMM DD, YYYY hh:mm a")
                      slug
                      acf {
                        company
                      }
                    }
                  }
                }
              }
            `,
            output: '/jobs.xml',
            title: 'Job Listings at Front End Remote Jobs'
          },
          {
            serialize: ({ query: { site, allWordpressPost } }) => {
              return allWordpressPost.edges.map((edge) => {
                return Object.assign({}, edge.node, {
                  title: `${edge.node.title}`,
                  description: edge.node.excerpt,
                  url: `${site.siteMetadata.siteUrl}/articles/${edge.node.slug}`,
                  guid: edge.node.id,
                  date: edge.node.date,
                  custom_elements: [{ 'content:encoded': edge.node.content }]
                });
              });
            },
            query: `
            {
              allWordpressPost(
                sort: { fields: date, order: DESC }
                filter: { status: { eq: "publish" } }
              ) {
                edges {
                  node {
                    id
                    excerpt
                    content
                    date(formatString: "MMMM DD, YYYY hh:mm a")
                    title
                    slug
                  }
                }
              }
              site {
                siteMetadata {
                  title
                  description
                  siteUrl
                  site_url: siteUrl
                }
              }
            }
            `,
            output: '/articles.xml',
            title: 'Articles at Front End Remote Jobs'
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Front End Remote Jobs',
        short_name: 'FE Jobs',
        start_url: '/?utm_source=home-screen',
        background_color: '#fffff8',
        theme_color: '#00645d',
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: 'standalone',
        icon: 'src/images/hammer-wrench.png', // This path is relative to the root of the site.
        include_favicon: true // Include favicon
      }
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-env-variables',
      options: {
        whitelist: ['DEPLOY_PRIME_URL']
      }
    }
  ]
};
