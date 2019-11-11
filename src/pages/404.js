import React from 'react';
import CallToAction from '../components/call-to-action/call-to-action';

import styles from './articles.module.scss';

const NotFoundPage = () => (
  <div className={styles.container}>
    <h1>404</h1>
    <p>
      The page you were looking for doesn't exist--but that doesn't mean the job
      you were looking for doesn't exist!
    </p>
    <CallToAction />
  </div>
);

export default NotFoundPage;
