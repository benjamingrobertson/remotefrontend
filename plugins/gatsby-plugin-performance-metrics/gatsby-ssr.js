import React from 'react';
import Terser from 'terser';

import createOptions from './create-options';

export const onRenderBody = (
  { setHeadComponents, reporter },
  pluginOptions
) => {
  const {
    firstPaint,
    firstContentfulPaint,
    firstInputDelay,
    useLogging,
    useGoogleAnalytics
  } = createOptions(pluginOptions);

  if (firstPaint || firstContentfulPaint) {
    const result = Terser.minify(`
        if (${firstInputDelay}) {
            // https://github.com/GoogleChromeLabs/first-input-delay
            !function(n,e){var t,o,i,c=[],f={passive:!0,capture:!0},r=new Date,a="pointerup",u="pointercancel";function p(n,c){t||(t=c,o=n,i=new Date,w(e),s())}function s(){o>=0&&o<i-r&&(c.forEach(function(n){n(o,t)}),c=[])}function l(t){if(t.cancelable){var o=(t.timeStamp>1e12?new Date:performance.now())-t.timeStamp;"pointerdown"==t.type?function(t,o){function i(){p(t,o),r()}function c(){r()}function r(){e(a,i,f),e(u,c,f)}n(a,i,f),n(u,c,f)}(o,t):p(o,t)}}function w(n){["click","mousedown","keydown","touchstart","pointerdown"].forEach(function(e){n(e,l,f)})}w(n),self.perfMetrics=self.perfMetrics||{},self.perfMetrics.onFirstInputDelay=function(n){c.push(n),s()}}(addEventListener,removeEventListener);
        }

        if (${firstPaint} || ${firstContentfulPaint}) {
            var sendMetric = function sendMetric(entry) {
                var metricName = entry.name;

                if (metricName === 'first-paint' && !${firstPaint} ||
                    metricName === 'first-contentful-paint' && !${firstContentfulPaint}) {
                    return;
                }

                var time = Math.round(entry.startTime + entry.duration);

                if (${useLogging}) {
                    console.group(metricName);
                    console.log('Time:', time);
                    console.groupEnd();
                }

                if (${useGoogleAnalytics} && window.gtag) {
                    window.gtag('event', 'Performance Metrics', {
                        event_category: 'Performance Metrics',
                        event_action: metricName,
                        event_value: time,
                        nonInteraction: true
                    });
                 }
            };

            var entryTypes = [];

            if (window['PerformancePaintTiming']) {
                entryTypes.push('paint');
            }

            if (entryTypes.length > 0) {
                var observer = new PerformanceObserver(function (list) {
                    list.getEntries().forEach(sendMetric);
                    observer.disconnect();
                });
                observer.observe({  entryTypes: entryTypes });
            }
         }
    `);

    if (result.error) {
      reporter.error(result.error);
    }

    setHeadComponents([
      <script
        key={`PerformanceMetrics`}
        dangerouslySetInnerHTML={{
          __html: result.code
        }}
      />
    ]);
  }
};

/* Move PerformanceObservers to the top of the head section

 Important: you must ensure your PerformanceObserver is registered in the <head>
 of your document before any stylesheets, so it runs before FP / FCP happens.
 This will no longer be necessary once Level 2 of the Performance Observer spec is
 implemented, as it introduces a buffered flag that allows you to access performance
 entries queued prior to the PerformanceObserver being created.*/
export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents
}) => {
  const headComponents = getHeadComponents();
  headComponents.sort((x, y) => {
    if (x && x.key === `PerformanceMetrics`) {
      return -1;
    } else if (y && y.key === `PerformanceMetrics`) {
      return 1;
    }
    return 0;
  });
  replaceHeadComponents(headComponents);
};