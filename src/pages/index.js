import React from 'react';
import { graphql } from 'gatsby';
import moment from 'moment';

import PostListing from '../components/post-listing/post-listing';
import SEO from '../components/seo';

const Index = ({ data, location }) => {
  const jobs = data.allWordpressWpJobs.edges.filter(({ node }) => {
    const thirtyDaysAgo = new Date(
      new Date().setDate(new Date().getDate() - 30)
    );
    // Only show dates from 30 days ago and up.
    return new Date(node.date) > thirtyDaysAgo;
  });

  const regularJobs = jobs.filter(({ node }) => !node.acf.featured);

  const featuredJobs = jobs.filter(({ node }) => node.acf.featured);

  return (
    <div>
      <SEO
        title="Front End Remote Jobs"
        image="https://frontendremotejobs.com/og_image/home.png"
      />
      <div>
        {featuredJobs.map(({ node }) => (
          <PostListing
            key={node.id}
            rawDate={node.posted}
            post={{
              title: node.title,
              path: node.acf.apply_url,
              company: node.acf.company,
              snippet: node.excerpt,
              date: moment(node.posted).fromNow(),
              slug: node.slug,
              featured: true
            }}
          />
        ))}
        {regularJobs.map(({ node }) => (
          <PostListing
            key={node.id}
            rawDate={node.posted}
            post={{
              title: node.title,
              path: node.acf.apply_url,
              company: node.acf.company,
              snippet: node.excerpt,
              date: moment(node.posted).fromNow(),
              slug: node.slug,
              experience: node.experience,
              technology: node.technology
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;

export const query = graphql`
  query JobsQuery {
    allWordpressWpJobs(sort: { fields: date, order: DESC }) {
      edges {
        node {
          id
          title
          excerpt
          slug
          posted: date
          date
          technology
          experience
          acf {
            apply_url
            company
            featured
          }
        }
      }
    }
  }
`;
