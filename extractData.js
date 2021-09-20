let cheerio = require("cheerio");
let { sendJobUpdatesViaEmail } = require("./sendJobUpdatesViaEmail");
//This file is basically used to get the job details i.e the company,job profile,job location and apply link.
function extractData(body, email) {
  let $ = cheerio.load(body);
  let allJobs = $(".item-details .entry-title");
  let jobsObject = [];
  for (let i = 0; i < allJobs.length; i++) {
    let titleElement = $(allJobs[i]).find("a");
    let applyLink = $(titleElement).attr("href");
    let titleName = $(titleElement).attr("title");
    let companyName = titleName.split("|")[0].trim();
    let jobRole = titleName.split("|")[1].trim();
    let jobLocation =
      titleName.split("|")[2] != undefined
        ? titleName.split("|")[2].trim()
        : "India";
    jobsObject.push({
      company: companyName,
      role: jobRole,
      location: jobLocation,
      link: applyLink,
    });
  }
  sendJobUpdatesViaEmail(jobsObject, email);
}
module.exports = {
  extractData,
};
