import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import Form from '../newsletter-signup/form';
import styles from './email-popup.module.scss';

Modal.setAppElement('#___gatsby');

const EmailPopup = () => {
  const [open, setOpen] = useState(true);

  return (
    <Modal
      isOpen={open}
      contentLabel="Example Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>
        Join <span className={styles.underline}>294</span> front end devs
        getting remote jobs delivered every Friday.
      </h2>
      <ul>
        <li>✨ New jobs every week</li>
        <li>🏖 Fully remote jobs</li>
        <li>👩‍💻 Only front end jobs</li>
        <li>🧼 0.3% unsubscribe rate</li>
      </ul>
      <Form className={styles.form} action="exit" />
      <button
        onClick={() => {
          setOpen(false);
        }}
      >
        Close
      </button>
    </Modal>
  );
};

EmailPopup.propTypes = {
  open: PropTypes.bool
};

export default EmailPopup;
