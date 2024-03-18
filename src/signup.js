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
    if (!validateEmail(email)) {
      console.log("error: The email is not in the correct format.");
      continue;
    }
    break;
  }

  while (true) {
    password = prompt("Please enter your password: ");
    if (!validatePassword(password)) {
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

// VALIDATION

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
}

function validatePassword(password) {
  return (
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password) &&
    password.length >= 8
  );
}

module.exports={signup:run};