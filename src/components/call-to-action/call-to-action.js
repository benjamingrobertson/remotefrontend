import React from 'react';
import { Link } from 'gatsby';

import styles from './call-to-action.module.scss';

const CallToAction = () => (
  <div className={styles.cta}>
    <h2>Looking for a new job?</h2>
    <p>
      <Link to="/">Front end remote jobs</Link> is a curated job board featuring
      fully remote front end jobs for front end developers. New jobs are added
      every week.
    </p>
    <Link className={styles.button} to="/">
      View all remote front end jobs =>
    </Link>
  </div>
);

export default CallToAction;
