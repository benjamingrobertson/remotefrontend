/* eslint-disable */
const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const slash = require('slash');
const screenshot = require('./plugins/og-image-generator/image-generator');

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    // ==== POSTS (WORDPRESS NATIVE AND ACF) ====
    graphql(
      `
        {
          jobs: allWordpressWpJobs(
            sort: { fields: date, order: DESC }
            filter: { status: { eq: "publish" } }
          ) {
            edges {
              node {
                date
                id
                slug
                status
                title
                acf {
                  company
                }
              }
            }
          }

          pages: allWordpressPage(
            sort: { fields: date, order: DESC }
            filter: { status: { eq: "publish" } }
          ) {
            edges {
              node {
                id
                slug
                status
                template
              }
            }
          }
          posts: allWordpressPost(
            sort: { fields: date, order: DESC }
            filter: { status: { eq: "publish" } }
          ) {
            edges {
              node {
                id
                slug
                status
                template
              }
            }
          }
          technology: allWordpressWpTechnology {
            nodes {
              slug
              wordpress_id
            }
          }
          experience: allWordpressWpExperience {
            nodes {
              slug
              wordpress_id
            }
          }
        }
      `
    ).then(async (result) => {
      if (result.errors) {
        console.log(result.errors);
        reject(result.errors);
      }

      result.data.technology.nodes.forEach((node) => {
        createPage({
          path: `/remote-${node.slug}-developer-jobs`,
          component: slash(path.resolve('./src/templates/tech/tech.js')),
          context: {
            id: node.wordpress_id
          }
        });
      });
      result.data.experience.nodes.forEach((node) => {
        createPage({
          path: `/${node.slug}-remote-front-end-developer-jobs`,
          component: slash(
            path.resolve('./src/templates/experience/experience.js')
          ),
          context: {
            id: node.wordpress_id
          }
        });
      });

      const postTemplate = path.resolve('./src/templates/post/post.js');

      const jobs = result.data.jobs.edges
        // .filter(({ node }) => {
        //   const thirtyDaysAgo = new Date(
        //     new Date().setDate(new Date().getDate() - 30)
        //   );
        //   // Only show dates from 30 days ago and up.
        //   return new Date(node.date) > thirtyDaysAgo;
        // })
        .map(({ node }) => ({
          title: node.title,
          slug: node.slug,
          company: node.acf.company
        }));
      console.log(`Found ${jobs.length} jobs to generate images for.`);
      await screenshot(jobs, 'job');
      _.each(result.data.jobs.edges, (edge) => {
        createPage({
          path: `/jobs/${edge.node.slug}`,
          component: slash(postTemplate),
          context: {
            id: edge.node.id
          }
        });
      });

      // Create Page pages.
      const pageTemplate = path.resolve('./src/templates/page.js');
      _.each(result.data.pages.edges, (edge) => {
        createPage({
          path: `/${edge.node.slug}/`,
          component: slash(pageTemplate),
          context: {
            id: edge.node.id
          }
        });
      });

      // Create Page pages.
      const articleTemplate = path.resolve(
        './src/templates/article/article.js'
      );

      _.each(result.data.posts.edges, (edge) => {
        createPage({
          path: `/articles/${edge.node.slug}/`,
          component: slash(articleTemplate),
          context: {
            id: edge.node.id
          }
        });
      });
      resolve();
    });
  });
  // ==== END POSTS ====
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-quill/,
            use: loaders.null()
          }
        ]
      }
    });
  }
};
