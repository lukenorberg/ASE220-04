const fcn = require("./functions.js");
const prompt = require("prompt-sync")({ sigint: true });
const fs = require("node:fs");

const CRED_FILE = "./data/credentials.csv";

run();

function run() {
  const userInfo = getUserInfo();
  appendUser(userInfo);
}

function getUserInfo() {
  let email;
  let password;

  while (true) {
    email = prompt("Please enter your email: ");
    if (!fcn.validateEmail(email)) {
      console.log("error: The email is not in the correct format.");
      continue;
    }
    break;
  }

  while (true) {
    password = prompt("Please enter your password: ");
    if (!fcn.validatePassword(password)) {
      console.log("error: The password is not in the correct format.");
      continue;
    }
    break;
  }

  return {
    email: email,
    password: password,
  };
}

function appendUser(userInfo) {
  const csvLine = `${userInfo.email},${userInfo.password}\n`;
  fs.appendFile(CRED_FILE, csvLine, function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("User successfully created");
  });
}