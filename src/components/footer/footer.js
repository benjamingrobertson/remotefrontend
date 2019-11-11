import React from 'react';
import { Link } from '@reach/router';
import Nav from '../nav/nav';
import { OutboundLink } from 'gatsby-plugin-google-gtag';

import styles from './footer.module.scss';

const Footer = () => (
  <footer className={styles.footer} aria-label="Footer">
    <Nav />
    <p>
      <Link to="/">Front end remote jobs</Link> is a curated job board featuring
      the best remote jobs for front end developers.
    </p>
    <p>
      Made with ❤ by{' '}
      <OutboundLink href="https://benrobertson.io">Ben Robertson</OutboundLink>
    </p>
  </footer>
);

export default Footer;
