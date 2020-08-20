import React from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';

import styles from './nav.module.scss';

const Links = [
  {
    title: 'Jobs',
    path: '/'
  },
  {
    title: 'Articles',
    path: '/articles'
  },
  {
    title: 'About',
    path: '/about'
  },
  {
    title: 'Post a Job!',
    path: '/post-a-job',
    featured: true
  }
];

const Nav = () => (
  <nav>
    <ul className={styles.list}>
      {Links.map((link) => (
        <li key={link.path} className={styles.navItem}>
          <Link
            className={classnames(styles.link, {
              [styles.featured]: link.featured
            })}
            to={link.path}
            activeClassName={styles.active}
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;
