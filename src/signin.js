const fcn = require("./functions.js");
const prompt = require("prompt-sync")({ sigint: true });

run();

function run() {
  while (true) {
    const userInfo = getUserInfo();
    if (fcn.loginUser(userInfo)) {
      break;
    }
    console.log("Incorrect login info. Please try again or sign up.");
  }
  console.log("Login successful!");
}

function getUserInfo() {
  const email = prompt("Please enter your email: ");
  const password = prompt("Please enter your password: ");
  return {
    email: email,
    password: password,
  };
}
