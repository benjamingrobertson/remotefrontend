import React from 'react';
import PropTypes from 'prop-types';
import EmailPopup from './email-popup';
import useWindowWidth from '../../useWindowWidth';

const ExitIntent = () => {
  const width = useWindowWidth();

  if (width >= 1024) {
    document.addEventListener('mouseout', (e) => {
      if (e.toElement === null && e.relatedTarget === null) {
        return <EmailPopup />;
      }
    });
  }

  setTimeout(() => <EmailPopup />, 60000);
};

ExitIntent.propTypes = {};

export default ExitIntent;
