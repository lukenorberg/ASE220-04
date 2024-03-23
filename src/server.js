const http = require("node:http");
const fs = require("node:fs");

const fcn = require("./functions.js");

const server = http.createServer((request, response) => {
  console.log(request.url);
  let htmlFile = fs.readFileSync("./index.html", "utf8");
  if (request.url.includes("/api/signin/")) {
    let data = request.url.split("/");
    console.log(data);
    let userInfo = {
      email: data[3],
      password: data[4],
    };
    let login = fcn.loginUser(userInfo);
    if (!login) {
      response.write(`<h1>Incorrect credentials</h1>`);
    } else {
      response.write(`<h1>Successfully signed in</h1>`);
    }
  } else {
    if (request.url.includes("/api/signup/")) {
      let data = request.url.split("/");
      console.log(data);
      let email = fcn.validateEmail(data[3]);
      let pass = fcn.validatePassword(data[4]);
      if (!email || !pass) {
        response.write(
          `<h1>Email or password is not in the correct format</h1>`,
        );
      } else {
        response.write(`<h1>Successfully created account</h1>`);
      }
    } else {
      const error = {
        status: -1,
        error: "unauthorized request",
      };
      response.writeHead(401, {
        "Content-Type": "application/json",
      });
      response.write(JSON.stringify(error));
    }
  }
  response.write(htmlFile);
  response.end();
});

server.listen(1536);
