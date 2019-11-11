import React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import striptags from 'striptags';

import styles from './job-listing.module.scss';
import CallToAction from '../call-to-action/call-to-action';
import SEO from '../seo';

export const isUnder30DaysOld = (date) => {
  const thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));

  // Only show dates from 30 days ago and up.
  return new Date(date) > thirtyDaysAgo;
};

const JobListing = ({
  title,
  excerpt,
  company,
  url,
  content,
  datePosted,
  validThrough,
  inUSA,
  slug
}) => {
  // Strip html from excerpts.
  const description = striptags(excerpt);
  const showApplyUrl = isUnder30DaysOld(datePosted);

  const postTitle = `${
    title
    // TODO: this should be css.
  } <span style="font-weight: normal;font-family: 'Lora', sans-serif; font-style: italic; text-transform: lowercase; font-size: 0.64em">at</span> ${company}`;

  const schemaContent = content.replace(/"/g, '\'');

  const schema = `{
    "@context" : "https://schema.org/",
    "@type" : "JobPosting",
    "title" : "${title}",
    "description" : "${schemaContent}",
    "datePosted" : "${datePosted}",
    "validThrough" : "${validThrough}",
    "employmentType" : "FULL_TIME",
    "hiringOrganization" : {
      "@type" : "Organization",
      "name" : "${company}"
    },
    "applicantLocationRequirements": {
      "@type": "Country",
      "name": "USA"
    },
    "jobLocationType": "TELECOMMUTE"
  }`;

  return (
    <>
      <SEO
        title={`${title} at ${company}`}
        description={description}
        schema={inUSA && schema}
        image={`https://frontendremotejobs.com/og_image/${slug}.png`}
      />
      <article className={styles.wrapper}>
        <h1
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: postTitle }}
        />
        {showApplyUrl ? (
          <div className={styles.cta} style={{ marginBottom: '-3em' }}>
            <OutboundLink href={url}>Apply Now 👉</OutboundLink>
          </div>
        ) : (
          <p>
            <strong>Note: </strong>
            <em>
              This posting is over 30 days old and may no longer be accepting
              applicants. Check out some more recent jobs instead!
            </em>
          </p>
        )}
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        {showApplyUrl ? (
          <div className={styles.cta}>
            <OutboundLink href={url}>Apply Now 👉</OutboundLink>
          </div>
        ) : (
          <>
            <h2>Want to apply?</h2>
            <p>
              <em>
                This posting is over 30 days old and may no longer be accepting
                applicants. Check out some more recent jobs instead!
              </em>
            </p>
            <div className={styles.cta}>
              <a href="/">Browse Recent Jobs 👉</a>
            </div>
          </>
        )}
        <CallToAction />
      </article>
    </>
  );
};

export default JobListing;
