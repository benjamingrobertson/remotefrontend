import React from 'react';
import styles from './banner.module.scss';
import classnames from 'classnames';
import useWindowWidth from '../../useWindowWidth';

const Banner = ({ location }) => {
  const windowWidth = useWindowWidth();
  const classes = classnames(styles.banner, {
    [styles.sticky]:
      windowWidth < 550 && !location.pathname.includes('/post-a-job')
  });

  return (
    <div className={classes}>
      <a href="/post-a-job">Post a Job: Pay what you want!</a>
    </div>
  );
};

export default Banner;
