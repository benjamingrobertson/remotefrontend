import React from 'react';
import striptags from 'striptags';
import styles from './featured-job.module.scss';
import { Link } from 'gatsby';

const FeaturedJob = ({ post }) => {
  const title = `${
    post.title
    // TODO: this should be css.
  } <span style="font-weight: normal;font-family: 'Lora', sans-serif; font-style: italic; text-transform: lowercase; font-size: 0.64em">at</span><br /> ${
    post.company
  }`;
  return (
    <div
      aria-label={`${post.title} at ${post.company}`}
      key={post.date + post.title}
    >
      <span className={styles.label}>Featured Job</span>
      <div>
        <h2 dangerouslySetInnerHTML={{ __html: title }} />
      </div>

      {post.snippet && (
        <div>
          <p dangerouslySetInnerHTML={{ __html: striptags(post.snippet) }} />
        </div>
      )}
      <div>
        <Link className={styles.link} to={`/jobs/${post.slug}`}>
          View Job =>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedJob;
