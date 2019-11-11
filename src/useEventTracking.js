import React, { useEffect } from 'react';

export const useEventTracking = ({ category = '', action = '' }) => {
  useEffect(() => {
    if (typeof window !== undefined) {
      /* eslint-disable camelcase */
      window.gtag('event', category, {
        event_category: category,
        event_action: action,
        event_label: window.location.pathname
      });
      /* eslint-enable camelcase */
    }
  });
};
