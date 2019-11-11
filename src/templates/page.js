import React from 'react';
import Helmet from 'react-helmet';
import striptags from 'striptags';
import { graphql } from 'gatsby';

import styles from './page.module.scss';
import CallToAction from '../components/call-to-action/call-to-action';

const Page = ({ data, location }) => {
  const post = data.wordpressPage;

  // Strip html from excerpts.
  const description = striptags(post.excerpt);

  return (
    <>
      <Helmet
        title={`${post.title} | Front End Remote Jobs`}
        meta={[{ name: 'description', content: description }]}
      />
      <article className={styles.container}>
        <div className={styles.content}>
          <h1
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        <CallToAction />
      </article>
    </>
  );
};

export default Page;

export const query = graphql`
  query PageQuery($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      excerpt
      content
    }
  }
`;
