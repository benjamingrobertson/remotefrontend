import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../../components/seo';
import PostListing from '../../components/post-listing/post-listing';
import moment from 'moment';
import styles from './experience.module.scss';

const Experience = ({ data }) => {
  const mostRecent = data.jobs.nodes[0];
  const companies = data.jobs.nodes.map((job) => job.acf.company).slice(0, 3);

  return (
    <>
      <SEO
        title={`${
          data.term.name
        } Remote Front End Developer Jobs | Front End Remote Jobs`}
        description={`${data.jobs.nodes.length} ${
          data.term.name
        } remote front end developer jobs at companies like ${companies.join(
          ', '
        )}, last posted ${moment(mostRecent.posted).fromNow()}.`}
        image={`https://frontendremotejobs.com/og_image/${data.term.slug}.png`}
      />
      <h1 className={styles.title}>
        {data.term.name} Remote Front End Developer Jobs
      </h1>
      <p className={styles.description}>
        {data.jobs.nodes.length} <strong>{data.term.name.toLowerCase()}</strong>{' '}
        remote front end developer jobs. Companies like{' '}
        <strong>{companies.join(', ')}</strong> are hiring {data.term.name}{' '}
        remote front end developers, last posted{' '}
        {moment(mostRecent.posted).fromNow()}.
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

Experience.propTypes = {};

export default Experience;

export const query = graphql`
  query ExpQuery($id: Int!) {
    jobs: allWordpressWpJobs(filter: { experience: { eq: $id } }) {
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
    term: wordpressWpExperience(wordpress_id: { eq: $id }) {
      name
      id
      path
      slug
      wordpress_id
    }
  }
`;
