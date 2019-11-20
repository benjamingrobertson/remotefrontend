import React from 'react';
import { storiesOf } from '@storybook/react';
import EmailPopup from './email-popup';

storiesOf('Email Popup', module).add('default', () => (
  <EmailPopup open />
));
