const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST'&& req.url === '/') {
    let body = '';

    // Read the request body
    req.on('data',chunk =>{
      body += chunk;
    });

    req.on('end', () =>{
      try {
        // Parse the JSON data from the request body
        const requestData = JSON.parse(body);
        
        // Extract num1 and num2 from the request data
        const num1 = requestData.num1;
        const num2 = requestData.num2;

        // Validate inputs
        if (!Number.isInteger(num1)|| !Number.isInteger(num2)) {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.end('Both num1 and num2 must be integers.');
          return;
        }

        if (num1 <= 0) {
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.end('The operation cannot be performed.');
          return;
        }

        if (num2 < 0) {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.end('num2 must be a non-negative integer.');
          return;        }

        // Calculate the power
        const result = num1 ** num2;

        // Return the result
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`The result is ${result}`);
      } catch (error) {
        // Handle any parsing errors
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Invalid request format. Please provide valid JSON data.');
      }
    });
  }
  
  
  else {
    // If the request method is not POST or the route is not "/"
    res.writeHead(405, {'Content-Type': 'text/plain'});
    res.end('Method Not Allowed');
  }
});

module.exports = server;
