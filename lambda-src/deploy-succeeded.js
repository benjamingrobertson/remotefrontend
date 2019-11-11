const request = require('request');

exports.handler = function(event, context, callback) {
  request(
    'http://www.google.com/ping?sitemap=https://frontendremotejobs.com',
    function(err, res, body) {
      console.log(body);
    }
  );
};
