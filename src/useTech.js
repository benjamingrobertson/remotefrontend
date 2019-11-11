import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

export const useTech = () => {
  const { tech } = useStaticQuery(graphql`
    query useTech {
      tech: allWordpressWpTechnology {
        nodes {
          wordpress_id
          slug
          name
          taxonomy {
            slug
          }
        }
      }
    }
  `);

  return tech.nodes;
};
