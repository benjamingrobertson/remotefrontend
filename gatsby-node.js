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
                title
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
                title
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
              name
            }
          }
          experience: allWordpressWpExperience {
            nodes {
              slug
              wordpress_id
              name
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

      const expNodes = result.data.experience.nodes.map(({ name, slug }) => ({
        title: `${name} Remote Front End Developer Jobs`,
        slug
      }));
      const techNodes = result.data.technology.nodes.map(({ name, slug }) => ({
        title: `Remote ${name} Developer Jobs`,
        slug
      }));
      const landingNodes = techNodes.concat(expNodes);
      await screenshot(landingNodes, 'landing');

      const postTemplate = path.resolve('./src/templates/post/post.js');

      const jobs = result.data.jobs.edges.map(({ node }) => ({
        title: node.title,
        slug: node.slug,
        company: node.acf.company
      }));
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

      const otherPages = [
        {
          title: 'Front End Remote Jobs',
          slug: 'home'
        },
        {
          title: 'Post a Job | Pay what you want!',
          slug: 'post-a-job'
        },
        {
          title: 'Articles',
          slug: 'articles'
        }
      ];

      const articles = result.data.posts.edges.map(({ node }) => ({
        title: node.title,
        slug: node.slug
      }));

      const pages = result.data.pages.edges
        .map(({ node }) => ({
          title: node.title,
          slug: node.slug
        }))
        .concat(articles)
        .concat(otherPages);

      await screenshot(pages, 'pages');

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
