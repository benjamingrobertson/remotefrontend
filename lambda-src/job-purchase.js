require('dotenv').config();
const insane = require('insane');
// https://macarthur.me/posts/building-a-lambda-function-with-netlify/
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Change to only allow requests from frontendremotejobs.com
const headers = {
  'Access-Control-Allow-Origin': process.env.URL,
  'Access-Control-Allow-Headers': 'Content-Type'
};

exports.handler = function(event, context, callback) {
  // If it's not a POST or there is no body, abort.
  if (event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode: 403,
      headers,
      body: 'Access denied.'
    });

    return;
  }

  // Parse the body contents into an object.
  const data = JSON.parse(event.body);
  const form = data.form;

  console.log({ form });

  // Make sure we have all required data. Otherwise, escape.
  if (!data.token || !data.amount || !data.idempotency_key) {
    callback(null, {
      statusCode: 422,
      headers,
      body: JSON.stringify({ status: 'missing-information' })
    });

    return;
  }

  let status;
  let statusCode = 200;

  (async () => {
    const charge = await stripe.charges.create(
      {
        amount: data.amount,
        currency: 'usd',
        source: data.token,
        receipt_email: data.email
      },
      (err, charge) => {
        if (err !== null) {
          statusCode = (err && err.statusCode) || 422;
          status = err.message;
          console.log({ charge });
        } else {
          status =
            charge === null || charge.status !== 'active'
              ? 'failed'
              : charge.status;
        }

        callback(null, {
          statusCode,
          headers,
          body: JSON.stringify({ status })
        });
      }
    );

    const site = await require('wpapi')
      .discover(`https://${process.env.SRC_URL}`)
      .then((site) =>
        site.auth({
          username: process.env.auth_user,
          password: process.env.auth_pw
        })
      )
      .then((site) => {
        // TODO: Check if post exists before creating a new one.
        site
          .jobs()
          .create({
            title: form.title,
            content: insane(form.content),
            excerpt: form.teaser,
            fields: {
              apply_url: form.url,
              company: form.company,
              featured: form.featured // this isn't working
            }
          })
          .then((response) => {
            console.log(response && response.id);
          })
          .catch((err) => {
            console.log({ err });
          });
      })
      .catch((err) => {
        console.log({ err });
      });

    return;
  })();
};
