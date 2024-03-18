const http=require('node:http');
const fs=require('node:fs');

const signin=require('./signin.js');
const signup=require('./signup.js');

const server=http.createServer((request,response)=>{
  let htmlFile=fs.readFileSync('./index.html','utf8');

  if (request.url.includes('/api/signin')){
    response.write(`
      <head><title>Sign In</title></head>
	  <body><h1>Sign In</h1></body>`);
	signin();
  } else{
	  if (request.url.includes('/api/signup')){
		response.write(`
          <head><title>Sign Up</title></head>
	      <body><h1>Sign Up</h1></body>`);
		signup();
	  } else{
	    const error={
		  status:-1,
		  error:"unauthorized request"
	    };
	    response.writeHead(401, {
        'Content-Type': 'application/json'
        });
	    response.write(JSON.stringify(error));
      }
  }
  response.write(htmlFile);
  response.end();
});

server.listen(1536);
