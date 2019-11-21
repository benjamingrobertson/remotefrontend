import React, { useEffect, useState } from 'react';
import EmailPopup from './email-popup';
import useWindowWidth from '../../useWindowWidth';

const ExitIntent = () => {
  const width = useWindowWidth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleMouseOut = (e) => {
      if (e.toElement === null && e.relatedTarget === null) {
        setShowModal(true);
      }
    };

    if (width >= 1024) {
      document.addEventListener('mouseout', handleMouseOut);
    } else {
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          setShowModal(true);
        }
      }, 60000);
    }

    return () => {
      document.removeEventListener('mouseout', handleMouseOut);
    };
  });

  return showModal && <EmailPopup />;
};

ExitIntent.propTypes = {};

export default ExitIntent;
