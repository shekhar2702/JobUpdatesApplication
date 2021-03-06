require("dotenv").config();
let { SMTPClient } = require("emailjs");
//This function is used to send all the latest job openings to the registered user.
async function sendJobUpdatesViaEmail(jobsObject, email) {
  const client = new SMTPClient({
    user: process.env.EMAIL,
    password: process.env.PASSWORD,
    host: "smtp.gmail.com",
    ssl: true,
  });

  let messageBody = "";
  for (let i = 0; i < jobsObject.length; i++) {
    messageBody += `
      company -> ${jobsObject[i].company} \n 
      Role-> ${jobsObject[i].role} \n
      Job Location-> ${jobsObject[i].location} \n
      Apply Link-> ${jobsObject[i].link} \n`;
  }
  try {
    const message = await client.sendAsync({
      text: messageBody,
      from: "somyashekharraj5549@gmail.com",
      to: email,
      subject: "New Job Alerts.",
    });
    //job alerts output on console.
    console.log(messageBody)
    //once job alerts sent to the registered email id.
    console.log("Job update sent successfully to the user!!Please check your mail.");
  } catch (err) {
    console.error(err);
  }
}
module.exports = {
  sendJobUpdatesViaEmail,
};
