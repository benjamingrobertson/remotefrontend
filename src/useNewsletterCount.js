import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

export const useNewsletterCount = () => {
  const { site } = useStaticQuery(graphql`
    query useNewsletterCount {
      site {
        siteMetadata {
          newsletterCount
        }
      }
    }
  `);

  return site.siteMetadata.newsletterCount;
};
