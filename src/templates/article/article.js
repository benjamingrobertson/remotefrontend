import React from 'react';
import Helmet from 'react-helmet';
import striptags from 'striptags';
import { graphql } from 'gatsby';
import FeaturedJob from '../../components/featured-job/featured-job';

import styles from './article.module.scss';
import CallToAction from '../../components/call-to-action/call-to-action';
import SEO from '../../components/seo';

class Article extends React.Component {
  constructor() {
    super();
    this.state = {
      featuredJob: false
    };
  }

  componentDidMount() {
    this.getRandomFeaturedJob();
  }

  getRandomFeaturedJob() {
    const featuredJobs = this.props.data.featuredJob.edges.filter(
      ({ node }) => node.acf.featured
    );

    const random = Math.floor(Math.random() * featuredJobs.length);

    let featuredJob = this.props.data.featuredJob.edges[0].node;
    if (featuredJobs.length > 0) {
      featuredJob =
        featuredJobs && featuredJobs[random] && featuredJobs[random].node;
    }

    this.setState({
      featuredJob
    });
  }

  extractHostname(url, tld) {
    let hostname;

    //find & remove protocol (http, ftp, etc.) and get hostname
    if (url.indexOf('://') > -1) {
      hostname = url.split('/')[2];
    } else {
      hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];

    //find & remove "?"
    hostname = hostname.split('?')[0];

    if (tld) {
      let hostnames = hostname.split('.');
      hostname =
        hostnames[hostnames.length - 2] + '.' + hostnames[hostnames.length - 1];
    }

    return hostname;
  }

  render() {
    const post = this.props.data.wordpressPost;
    // Strip html from excerpts.
    const description = striptags(post.excerpt);
    const { featuredJob } = this.state;
    const seo = post.yoast || {};
    const title = seo.title || post.title;
    const desc = seo.metadesc || description;

    return (
      <>
        <SEO
          title={`${title} | Front End Remote Jobs`}
          canonical={seo.canonical}
          description={desc}
          image={`https://frontendremotejobs.com/og_image/${post.slug}.png`}
        />
        <article className={styles.grid}>
          <div>
            <h1
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: post.title }}
            />
            <p className={styles.meta}>
              Published <i>{post.date}</i> by <b>{post.author.name}</b>
            </p>
            <div className={styles.content}>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              <p>
                <small>
                  <em>
                    This post originally appeared on{' '}
                    <a href={seo.canonical}>
                      {this.extractHostname(seo.canonical)}
                    </a>
                    .
                  </em>
                </small>
              </p>
            </div>
          </div>
          <aside className={styles.sidebar}>
            <div className={styles.featured}>
              {featuredJob && (
                <FeaturedJob
                  post={{
                    title: featuredJob.title,
                    path: featuredJob.acf.apply_url,
                    company: featuredJob.acf.company,
                    snippet: featuredJob.excerpt,
                    slug: featuredJob.slug
                  }}
                />
              )}
            </div>
          </aside>
          <CallToAction />
        </article>
      </>
    );
  }
}

export default Article;

export const query = graphql`
  query ArticlesQuery($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      excerpt
      content
      slug
      date(formatString: "MMMM D, Y")
      author {
        name
      }
      yoast {
        canonical
      }
    }
    featuredJob: allWordpressWpJobs(
      sort: { fields: date, order: DESC }
      filter: { status: { eq: "publish" } }
    ) {
      edges {
        node {
          id
          title
          excerpt
          slug
          status
          posted: date
          date
          acf {
            apply_url
            company
            featured
          }
        }
      }
    }
  }
`;
