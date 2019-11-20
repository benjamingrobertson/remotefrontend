import React from 'react';
import striptags from 'striptags';
import PropTypes from 'prop-types';
import styles from './post-listing.module.scss';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import { Link } from 'gatsby';
import classname from 'classnames';
import { useTech } from '../../useTech';
import { useExperience } from '../../useExp';
import { isUnder30DaysOld } from '../job-listing/job-listing';

const title = (title, company) => (
  <h2>
    {title} <span className={styles.at}>at</span> {company}
  </h2>
);

const TagLinks = ({ tags }) =>
  tags.map((tag) => {
    const tax = tag.taxonomy.slug;
    let slug = `/remote-${tag.slug}-developer-jobs`;
    if (tax === 'experience') {
      slug = `/${tag.slug}-remote-front-end-developer-jobs`;
    }

    return (
      <Link className={styles.tag} to={slug}>
        {tag.name}
      </Link>
    );
  });

const PostListing = ({ post, rawDate }) => {
  const tech = useTech();
  const exp = useExperience();
  let tags;

  if (post.experience) {
    tags = [];

    post.experience.forEach((id) => {
      const tag = exp.find((term) => term.wordpress_id === id);
      tags.push(tag);
    });
  }

  if (post.technology) {
    if (!Array.isArray(tags)) {
      tags = [];
    }
    post.technology.forEach((id) => {
      const tag = tech.find((term) => term.wordpress_id === id);
      tags.push(tag);
    });
  }

  const showApplyURL = isUnder30DaysOld(rawDate);

  return (
    <article
      aria-label={`${post.title} at ${post.company}`}
      className={classname({
        [styles.posting]: true,
        [styles.featuredPost]: post.featured
      })}
      key={post.date + post.title}
    >
      <div className={styles.top}>
        {title(post.title, post.company)}
        {post.featured ? (
          <Link to={`/jobs/${post.slug}`} className={styles.featured}>
            Featured Job!
          </Link>
        ) : (
          <p className={styles.date}>{post.date}</p>
        )}
      </div>
      {tags && (
        <div className={styles.tags}>
          <TagLinks tags={tags} />
        </div>
      )}

      {post.snippet && (
        <div className={styles.snippet}>
          <p dangerouslySetInnerHTML={{ __html: striptags(post.snippet) }} />
        </div>
      )}
      <div className={styles.cta}>
        {showApplyURL && (
          <OutboundLink className={styles.apply} href={post.path}>
            Apply Now
          </OutboundLink>
        )}
        <Link to={`/jobs/${post.slug}`}>Full Description</Link>
      </div>
    </article>
  );
};

PostListing.propTypes = {
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

export default PostListing;
