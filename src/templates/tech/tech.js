import React from 'react';
import SEO from '../../components/seo';
import { graphql } from 'gatsby';
import PostListing from '../../components/post-listing/post-listing';
import moment from 'moment';
import styles from './tech.module.scss';

const Tech = ({ data }) => {
  const mostRecent = data.jobs.nodes[0];
  const companies = data.jobs.nodes.map((job) => job.acf.company).slice(0, 3);
  return (
    <>
      <SEO
        title={`Remote ${
          data.term.name
        } Developer Jobs | Front End Remote Jobs`}
        description={`${data.jobs.nodes.length} remote ${
          data.term.name
        } jobs. Companies like ${companies.join(', ')} are hiring remote ${
          data.term.name
        } developers, last posted ${moment(mostRecent.posted).fromNow()}`}
        image={`https://frontendremotejobs.com/og_image/${data.term.slug}.png`}
      />
      <h1 className={styles.title}>Remote {data.term.name} Developer Jobs</h1>
      <p className={styles.description}>
        {data.jobs.nodes.length} remote {data.term.name} developer jobs.
        Companies like <strong>{companies.join(', ')}</strong> are hiring remote{' '}
        {data.term.name} developers, last posted{' '}
        {moment(mostRecent.posted).fromNow()}
      </p>
      <section className={styles.jobs}>
        {data.jobs.nodes.map((job) => (
          <PostListing
            key={job.id}
            rawDate={job.posted}
            post={{
              title: job.title,
              path: job.acf.apply_url,
              company: job.acf.company,
              snippet: job.excerpt,
              date: moment(job.posted).fromNow(),
              slug: job.slug,
              technology: job.technology,
              experience: job.experience
            }}
          />
        ))}
      </section>
    </>
  );
};

Tech.propTypes = {};

export default Tech;

export const query = graphql`
  query TechQuery($id: Int!) {
    jobs: allWordpressWpJobs(filter: { technology: { eq: $id } }) {
      nodes {
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
    term: wordpressWpTechnology(wordpress_id: { eq: $id }) {
      name
      id
      path
      slug
      wordpress_id
    }
  }
`;
