const prompt = require("prompt-sync")({ sigint: true });
const lineByLine = require("n-readlines");

const CRED_FILE = "./data/credentials.csv";

run();

function run() {
  while (true) {
    const userInfo = getUserInfo();
    if (loginUser(userInfo)) {
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

function loginUser(userInfo) {
  const liner = new lineByLine(CRED_FILE);
  let line;

  while ((line = liner.next())) {
    lineInfo = line.toString("ascii").split(",");
    if (userInfo.email === lineInfo[0] && userInfo.password === lineInfo[1]) {
      return true;
    }
  }
  return false;
}
