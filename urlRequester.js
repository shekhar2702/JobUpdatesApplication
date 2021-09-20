let request = require("request");
let URL = "https://fresheropenings.com/";
let { extractData } = require("./extractData");
// Making a request to the jobs portal to get list of all available jobs.
function urlRequester(email) {
  request(URL, function (err, response, body) {
    if (err) console.error(err);
    else if (response.statusCode == 404) console.log("Can't access the site");
    else {
      extractData(body,email);
    }
  });
}
module.exports = { urlRequester };
