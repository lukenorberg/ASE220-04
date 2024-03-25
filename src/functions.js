module.exports = {
  // SIGN-UP VALIDATION
  validateEmail: function(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  },

  validatePassword: function(password) {
    return (
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password) &&
      password.length >= 8
    );
  },

  // SIGN-IN VALIDATION

  loginUser: function(userInfo) {
    const lineByLine = require("n-readlines");
    const CRED_FILE = "./data/credentials.csv";
    const liner = new lineByLine(CRED_FILE);
    let line;

    while ((line = liner.next())) {
      lineInfo = line.toString("ascii").split(",");
      if (userInfo.email === lineInfo[0] && userInfo.password === lineInfo[1]) {
        return true;
      }
    }
    return false;
  },
};
