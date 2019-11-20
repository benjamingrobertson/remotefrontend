import React from 'react';
import { storiesOf } from '@storybook/react';
import NewsletterSignup from './newsletter-signup';

storiesOf('Newsletter Signup', module).add('default', () => (
    <NewsletterSignup />
  )
);