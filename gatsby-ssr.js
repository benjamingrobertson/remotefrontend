import React from 'react';
import Layout from './src/components/layout/layout';

/* eslint-disable */

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

export const onRenderBody = ({ pathname, setPostBodyComponents }, options) => {
  if (pathname.includes('post-a-job')) {
    const id = 359108;
    const sv = 6;
    console.log('Adding smallchat and hotjar');
    return setPostBodyComponents([
      <script
        key="smallchat"
        src="https://embed.small.chat/TNFEUQAFKGNMTA93NZ.js"
        async
      />,
      // Add hotjar only on post a job.
      [React.createElement('script', {
        key: 'hotjar',
        dangerouslySetInnerHTML: {
          __html: "\n              (function(h,o,t,j,a,r){\n                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};\n                  h._hjSettings={hjid:" + id + ",hjsv:" + sv + "};\n                  a=o.getElementsByTagName('head')[0];\n                  r=o.createElement('script');r.async=1;\n                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;\n                  a.appendChild(r);\n              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')\n          "
        }
      })]
    ]);
  }
};
