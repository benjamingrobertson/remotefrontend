import React from 'react';
import { graphql } from 'gatsby';
import moment from 'moment';

import JobListing from '../../components/job-listing/job-listing';

const Post = ({ data }) => {
  const post = data.wordpressWpJobs;
  const validThrough = moment(post.rawDate)
    .add(1, 'months')
    .format('YYYY-MM-DD');

  return (
    <JobListing
      title={post.title}
      excerpt={post.excerpt}
      content={post.content}
      company={post.acf.company}
      url={post.acf.apply_url}
      datePosted={post.datePosted}
      validThrough={validThrough}
      inUSA={post.acf.inUSA}
      slug={post.slug}
    />
  );
};

export default Post;

export const query = graphql`
  query PostsQuery($id: String!) {
    wordpressWpJobs(id: { eq: $id }) {
      title
      excerpt
      datePosted: date(formatString: "YYYY-MM-DD")
      rawDate: date
      slug
      acf {
        company
        apply_url
        inUSA: in_usa
      }
      content
    }
  }
`;
