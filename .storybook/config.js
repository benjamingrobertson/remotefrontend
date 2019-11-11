import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import requireContext from 'require-context.macro';

// Load global styles.
import '../src/utilities/fonts/_fonts.scss';
import '../src/global.scss';

// automatically import all files ending in *.stories.js
const req = requireContext('../src', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from
// creating console errors you override it here
global.___loader = { enqueue: () => {}, hovering: () => {} };

// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = '';

// This is to utilized to override the window.___navigate method Gatsby defines
// and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = (pathname) => {
  action('NavigateTo:')(pathname);
};

// Enable additional information panel.
addDecorator(
  withInfo({
    header: false // Global configuration for the info addon across all of your stories.
  })
);

// Enable the accessibility panel.
addDecorator(withA11y);

configure(loadStories, module);

