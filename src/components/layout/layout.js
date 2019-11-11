import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Header from '../header/header';
import Footer from '../footer/footer';
import PageTransition from '../transition/transition';

import '../../utilities/fonts/_fonts.scss';
import '../../global.scss';
import styles from './layout.module.scss';
import Banner from '../banner/banner';

const Layout = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: 'Fully remote jobs for front end developers.'
            }
          ]}
        >
          <html lang="en-US" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <PageTransition location={location}>
          <div className={styles.container}>{children}</div>
          <Banner location={location} />
          <Footer />
        </PageTransition>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
