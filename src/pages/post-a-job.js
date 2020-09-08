/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import classnames from 'classnames';
import PostListing from '../components/post-listing/post-listing';
import { graphql } from 'gatsby';
import pageviews from '../images/2019-october-pageviews.png';

import styles from './post-a-job.module.scss';
import moment from 'moment';
import JobListing from '../components/job-listing/job-listing';
import Checkout from '../components/checkout/checkout';
import Editor from '../components/editor/editor';
import SEO from '../components/seo';
import { useNewsletterCount } from '../useNewsletterCount';

class PostAJob extends React.Component {
  constructor() {
    super();
    this.state = {
      cost: 29,
      preview: false,
      form: {
        title: '',
        company: '',
        url: '',
        teaser: '',
        salary: '',
        content: '',
        name: '',
        email: '',
        featured: false
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handlePromotionChange = this.handlePromotionChange.bind(this);
    this.togglePreview = this.togglePreview.bind(this);
    this.checkFormValidity = this.checkFormValidity.bind(this);

    this.form = React.createRef();
  }

  togglePreview() {
    this.setState(({ preview: prevPreview }) => ({
      preview: !prevPreview
    }));
  }

  handleChange(e) {
    const field = e.currentTarget.id;
    const value = e.currentTarget.value;
    this.setState(({ form: prevForm }) => ({
      form: {
        ...prevForm,
        [field]: value
      }
    }));
  }

  handlePromotionChange(e) {
    const field = e.currentTarget.id;
    const checked = e.currentTarget.checked;
    const value = Number(e.currentTarget.value);
    const priceChange = checked ? value : value * -1;

    this.setState(({ form: prevForm, cost: prevCost }) => ({
      form: {
        ...prevForm,
        [field]: checked
      },
      cost: prevCost + priceChange
    }));
  }

  checkFormValidity() {
    const isValid = this.form.current.checkValidity();
    return isValid;
  }

  canDisplayPreview() {
    const {
      form: { title, company, teaser, content }
    } = this.state;

    if (title && company && teaser && content) {
      return true;
    }

    return false;
  }

  handlePriceChange(e) {
    const value = e.currentTarget.value;
    this.setState((prevState) => {
      const featured = prevState.form.featured;
      const cost = featured ? Number(value) + 50 : Number(value);
      return {
        cost
      };
    });
  }

  handleContentChange(value) {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        content: value
      }
    }));
  }

  render() {
    const { preview, form } = this.state;
    const { data } = this.props;
    const subscribers = useNewsletterCount()

    return (
      <>
        <SEO
          title="Hire Remote Front End Developers | Front End Remote Jobs"
          description="Get your job listing in front of thousands of front end developers every month. Post a job on Front end remote jobs."
          image="https://frontendremotejobs.com/og_image/post-a-job.png"
        />
        <div className={styles.container}>
          <h1>Post a job on Front End Remote Jobs</h1>
          <p>
            Front end remote jobs reaches the <strong>2800+</strong> of the{' '}
            <em>best</em> front end web developers looking for remote work.
          </p>
          <p>
            We target a pretty specific niche - only front end devs and only
            remote jobs - to make sure that the site can provide super value to
            both devs and hiring companies.
          </p>
          <p>
            We get thousands pageviews a month,{' '}
            <strong>2800+ unique visitors</strong>, and each listing is sent to
            our weekly newsletter as well ({subscribers} subscribers and growing!).
          </p>
          <figure>
            <img src={pageviews} alt="8276 pageviews in October 2019" />
            <figcaption>Monthly pageviews thru October 2019</figcaption>
          </figure>
          <p>
            <strong>
              Job listings last for 30 days, and start at $29!
            </strong>
          </p>
          <p>
            To get started, fill out the form below, preview your listing, and
            submit! Most job listings are live within 24 hours.
          </p>
          <form ref={this.form} className={styles.postJobForm} method="POST" name="job-purchase" data-netlify="true">
            <fieldset className={styles.fieldset}>
              <legend>🛠 Job Information </legend>
              <div className={styles.titleSection}>
                <div>
                  <label className={styles.label} htmlFor="title">
                    Job Title
                  </label>
                  <input
                    className={styles.input}
                    onChange={this.handleChange}
                    type="text"
                    name="title"
                    id="title"
                    required
                    data-hj-whitelist
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="company">
                    Company Name
                  </label>
                  <input
                    className={styles.input}
                    onChange={this.handleChange}
                    type="text"
                    name="company"
                    id="company"
                    required
                    data-hj-whitelist
                  />
                </div>
              </div>

              <div>
                <label className={styles.label} htmlFor="url">
                  Application URL
                </label>
                <span className={styles.helpText}>
                  This can be a link to your job application or a mailto link.
                </span>
                <input
                  className={styles.input}
                  onChange={this.handleChange}
                  type="text"
                  name="url"
                  id="url"
                  required
                  data-hj-whitelist
                />
              </div>
              <div>
                <label className={styles.label} htmlFor="teaser">
                  Teaser
                </label>
                <span className={styles.helpText}>
                  This appears on the home page and in search results. Make it
                  catchy!
                </span>
                <textarea
                  onChange={this.handleChange}
                  required
                  name="teaser"
                  id="teaser"
                  rows="2"
                  data-hj-whitelist
                />
              </div>
              <input type="hidden" name="form-name" value="Post a Job" />

              {/* <div>
                <label className={styles.label} htmlFor="salary">
                  Salary Info
                </label>
                <input
                  className={styles.input}
                  onChange={this.handleChange}
                  type="text"
                  name="salary"
                  id="salary"
                />
              </div> */}
              <div>
                <label className={styles.label} htmlFor="content">
                  Content
                </label>
                <span className={styles.helpText}>
                  The main content of your listing. Be sure to include any
                  specific instructions on how to apply.
                </span>
                <Editor
                  handleChange={this.handleContentChange}
                  value={this.state.form.content}
                />
              </div>
            </fieldset>
            {/* <fieldset className={styles.fieldset}>
              <legend>👋 Your contact info</legend>
              <div className={styles.titleSection}>
                <div>
                  <label className={styles.label} htmlFor="name">
                    Your name
                  </label>
                  <input
                    onChange={this.handleChange}
                    className={styles.input}
                    type="text"
                    id="name"
                    name="name"
                    required
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="email">
                    Your email address
                  </label>
                  <input
                    onChange={this.handleChange}
                    className={styles.input}
                    type="email"
                    name="email"
                    id="email"
                    required
                  />
                </div>
              </div>
            </fieldset> */}
            <fieldset className={styles.fieldset}>
              <legend> 📣 Promotion</legend>
              <div
                className={classnames(styles.promotionCheckboxGroup, {
                  [styles.promotionSelected]: this.state.form.featured
                })}
              >
                <label className={styles.label} htmlFor="featured">
                  <input
                    className={styles.input}
                    type="checkbox"
                    name="featured"
                    id="featured"
                    aria-describedby="featured-post-desc"
                    onChange={this.handlePromotionChange}
                    value={99}
                    data-hj-whitelist
                  />
                  ✨Featured Post ✨(adds $99)
                </label>
                <div>
                  <ul>
                    <li>📌 pinned to the top of the homepage</li>
                    <li>📝 displayed next to blog posts</li>
                    <li>
                      ✉️ featured at the top of the newsletter for 4 weeks
                    </li>
                  </ul>
                </div>
              </div>
            </fieldset>
            <fieldset className={styles.fieldset}>
              <legend>💸 Payment</legend>
              {/* <div>
                <label className={styles.label} htmlFor="price">
                  Pay what you want pricing!!
                </label>
                <span className={styles.helpText}>
                  From now until the end of the year all job listings are pay
                  what you want!
                </span>
                <div className={styles.paymentField}>
                  <span>$</span>
                  <input
                    className={styles.input}
                    required
                    min="1"
                    defaultValue={this.state.cost}
                    onChange={this.handlePriceChange}
                    type="number"
                    name="price"
                    id="price"
                    data-hj-whitelist
                  />
                </div>
              </div> */}
              <Checkout
                isValid={this.checkFormValidity}
                form={this.form}
                formValues={this.state.form}
                amount={this.state.cost * 100}
                buttonText={`Pay $${this.state.cost} and Submit`}
                data={data}
              />
            </fieldset>
            <div className={styles.actions}>
              {this.canDisplayPreview() && (
                <button
                  className={styles.textButton}
                  onClick={this.togglePreview}
                  type="button"
                >
                  {preview ? 'Close preview' : 'Preview Listing'}
                </button>
              )}
            </div>
          </form>
          {preview && (
            <div className={styles.preview}>
              <h2>Homepage preview: </h2>
              <br />
              <PostListing
                post={{
                  title: form.title,
                  path: form.url,
                  company: form.company,
                  snippet: form.teaser,
                  date: moment().fromNow(),
                  slug: '#',
                  featured: form.featured
                }}
              />
              <hr />
              <br />
              <h2>Job Listing Preview: </h2>
              <br />
              <JobListing
                title={form.title}
                excerpt={form.teaser}
                content={form.content}
                company={form.company}
                url={form.url}
              />
              <br />
              <hr />
              <br />
              <button
                className={styles.textButton}
                onClick={this.togglePreview}
              >
                {preview ? 'Close preview' : 'Preview Listing'}
              </button>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default PostAJob;

export const query = graphql`
  query PostJobQuery {
    site {
      siteMetadata {
        purchaseEndpoint
        stripePublishableKey
      }
    }
  }
`;
