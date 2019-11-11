import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

export const useExperience = () => {
  const { exp } = useStaticQuery(graphql`
    query useExp {
      exp: allWordpressWpExperience {
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

  return exp.nodes;
};
