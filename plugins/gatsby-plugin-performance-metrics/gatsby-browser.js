import createOptions from './create-options';

export const onInitialClientRender = async (_, pluginOptions) => {
  const { firstInputDelay, useLogging, useGoogleAnalytics } = createOptions(
    pluginOptions
  );

  if (firstInputDelay && window.perfMetrics) {
    window.perfMetrics.onFirstInputDelay((delay, event) => {
      if (useLogging) {
        console.group('first-input-delay');
        console.log('First Input Delay:', Math.round(delay));
        console.log('Event details', event);
        console.groupEnd();
      }
      if (useGoogleAnalytics && window.gtag) {
        /* eslint-disable camelcase */
        window.gtag('event', 'Performance Metrics', {
          event_category: 'Performance Metrics',
          event_action: 'first-input-delay',
          event_label: event.type,
          event_value: Math.round(delay),
          nonInteraction: true
        });
        /* eslint-enable camelcase */
      }
    });
  }
};