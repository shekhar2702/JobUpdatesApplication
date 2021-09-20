let URL = "https://fresheropenings.com/";
let puppeteer = require("puppeteer");
const readline = require("readline");
let { urlRequester } = require("./urlRequester");
//creating input stream to get user email id as input from the console.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let email;
rl.question("Enter email to register for job updates:- ", function (answer) {
  email = answer;
  rl.close();
  urlRequester(email);
});
