const defaultOptions = {
  firstPaint: false,
  firstContentfulPaint: true,
  firstInputDelay: true,
  useLogging: true,
  useGoogleAnalytics: false
};

export default function createOptions(pluginOptions) {
  return {
    ...defaultOptions,
    ...pluginOptions
  };
}