import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const SEO = ({
  description,
  lang = 'en-US',
  title,
  schema,
  image = false,
  canonical
}) => {
  const metaDescription =
    description || 'Fully remote jobs for front end developers.';

  const meta = [
    {
      name: 'description',
      content: metaDescription
    },
    {
      property: 'og:title',
      content: title
    },
    {
      property: 'og:description',
      content: metaDescription
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: title
    },
    {
      name: 'twitter:description',
      content: metaDescription
    },
    {
      name: 'twitter:site',
      content: '@remotefrontend'
    }
  ];

  if (image) {
    meta.push({
      property: 'og:image',
      content: image
    });
  }

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      meta={meta}
    >
      {canonical && <link rel="canonical" href={canonical} />}
      {schema && <script type="application/ld+json">{schema}</script>}
    </Helmet>
  );
};

SEO.propTypes = {};

export default SEO;
