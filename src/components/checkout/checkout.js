import React, { Component } from 'react';
import styles from './checkout.module.scss';
import uuid from 'uuid';

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      message: '',
      disabled: false,
      buttonText: ''
    };

    this.openStripeCheckout = this.openStripeCheckout.bind(this);
    this.handleCheckoutClick = this.handleCheckoutClick.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.getFormValues = this.getFormValues.bind(this);
  }

  componentDidMount() {
    this.setState({
      buttonText: this.props.buttonText
    });

    this.stripeHandler = window.StripeCheckout.configure({
      // You’ll need to add your own Stripe public key to the `checkout.js` file.
      // key: 'pk_test_STRIPE_PUBLISHABLE_KEY',
      key: this.props.data.site.siteMetadata.stripePublishableKey,
      closed: () => {
        this.setState({
          loading: false,
          buttonText: this.props.buttonText
        });
      }
    });
  }

  getFormValues() {
    const form = this.props.form.current;
    const values = {};
    for (let i = 0; i < form.elements.length; i++) {
      const element = form.elements[i];
      if (element.value) {
        values[element.name] = element.value;
      }
    }
    return values;
  }

  validateForm() {
    const form = this.props.form.current;
    const inputs = form.querySelectorAll('input, textarea');

    // Trigger validation on each form field.
    for (let i = 0; i < inputs.length; i++) {
      const element = inputs[i];
      const isValid = element.checkValidity();
      if (!isValid) {
        element.classList.add('error');
      } else {
        element.classList.remove('error');
      }
    }
  }

  handleCheckoutClick(e) {
    e.preventDefault();
    if (this.props.isValid()) {
      this.validateForm();
      this.setState({
        buttonText: 'Loading...',
        message: ''
      });
      this.openStripeCheckout(e);
    } else {
      this.setState({
        buttonText: this.props.buttonText,
        message:
          'The form has errors. Please make sure to fill in all required fields and try again.'
      });
      this.validateForm();
    }
  }

  openStripeCheckout(event) {
    this.setState({ loading: true, buttonText: 'Loading...' });
    this.stripeHandler.open({
      name: 'Front End Remote Jobs',
      amount: this.props.amount,
      description: 'Job listing',
      zipCode: true,
      token: (token) => {
        fetch(this.props.data.site.siteMetadata.purchaseEndpoint, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({
            token: token.id,
            amount: this.props.amount,
            idempotency_key: uuid(),
            email: token.email,
            form: this.props.formValues
          }),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        })
          .then((res) => {
            // console.log('Transaction processed successfully');
            console.log(res);

            if (res.status === 200) {
              if (typeof window !== undefined && window.gtag) {
                window.gtag('event', 'jobPost', {
                  event_category: 'jobPost',
                  event_action: 'success',
                  event_label: this.props.amount
                });
              }
              this.setState({
                disabled: true,
                message:
                  '✅ Success! Your job listing should be live within 24 hours.'
              });
            } else {
              // this.resetButton();
              this.setState({
                message:
                  'Uh oh, something went wrong 😬. Please try again, or send an email to ben@frontendremotejobs.com for support.'
              });
            }

            return res;
          })
          .catch((error) => {
            console.error('Error:', error);
            this.setState({
              message:
                'Uh oh, something went wrong. Please try again, or send an email to ben@frontendremotejobs.com for support.'
            });
          });
      }
    });
  }
  render() {
    const { buttonText } = this.props;
    const { loading, message, disabled } = this.state;
    return (
      <>
        <button
          onClick={this.handleCheckoutClick}
          type="submit"
          className={styles.submit}
          disabled={loading || disabled}
        >
          {buttonText}
        </button>
        {message && <p>{message}</p>}
      </>
    );
  }
}
