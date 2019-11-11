import React from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import classnames from 'classnames';

import styles from './newsletter-signup.module.scss';

const url =
  'https://benjamingrobertson.us15.list-manage.com/subscribe/post?u=aafc0f8e65dbc564446043b15&amp;id=ee47f8c168';

const Form = ({ className, action }) => (
  <MailchimpSubscribe
    url={url}
    render={({ subscribe, status, message }) => (
      <CustomForm
        status={status}
        message={message}
        className={className}
        onValidated={(formData) => {
          if (typeof window !== undefined && window.gtag) {
            window.gtag('event', 'subscribe', {
              event_category: 'subscribe',
              event_action: action,
              event_label: window.location.pathname
            });
          }
          subscribe(formData);
        }}
      />
    )}
  />
);

Form.propTypes = {};

export default Form;

const CustomForm = ({ status, message, onValidated, className }) => {
  let email;
  const submit = () =>
    email &&
    email.value.indexOf('@') > -1 &&
    onValidated({
      EMAIL: email.value
    });

  return (
    <div
      className={classnames(styles.formContainer, { [className]: className })}
    >
      {status === 'sending' && <div style={{ color: 'blue' }}>sending...</div>}
      {status === 'error' && (
        <div
          style={{ color: 'red' }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === 'success' && (
        <div
          style={{ color: 'green' }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <input
        ref={(node) => (email = node)}
        type="email"
        placeholder="Your email"
      />
      <button onClick={submit}>Send me jobs!</button>
    </div>
  );
};
