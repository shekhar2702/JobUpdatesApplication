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
      // cc: 'somyashekharraj5549@gmail.com',
      subject: "New Job Alerts.",
    });

    console.log("Job update sent successfully to the user!!");
  } catch (err) {
    console.error(err);
  }
}
module.exports = {
  sendJobUpdatesViaEmail,
};
