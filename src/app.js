const http = require('http');

const server = http.createServer((req, res) => 
  {
  // Check if the request is a POST request
  if (req.method === 'POST' && req.url === '/') {
    let body = '';

    // Read the incoming data from the request body
    req.on('data', chunk => 
      {
      body += chunk;
    });

    // Once all data has been read
    req.on('end', () => {
      try {
        // Parse the JSON data
        const requestData = JSON.parse(body);
        
        // Extract num1 and num2 from the parsed data
        const num1 = requestData.num1;
        const num2 = requestData.num2;

        // Validate num1 and num2
        if (!Number.isInteger(num1) || !Number.isInteger(num2))
        {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.end('Both num1 and num2 must be integers.');
          return;
        }

        // Check if num1 is zero or negative
        if (num1 <= 0) {
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.end('The operation cannot be performed.');
          return;
        }

        // Check if num2 is negative
        if (num2 < 0) 
        {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.end('num2 must be a non-negative integer.');
          return;
        }

        // Calculate num1 raised to the power of num2
        const result = Math.pow(num1, num2);

        // Send the calculated result as a response
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`The result is ${result}`);
      } catch (error) 
      {
        // If there is an error with parsing or processing the request
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Invalid request format. Please provide valid JSON data.');
      }
    });
  } 
  else 
  {
    // For non-POST requests or different routes, respond with 405 Method Not Allowed
    res.writeHead(405, {'Content-Type': 'text/plain'});
    res.end('Method Not Allowed');
  }
});

module.exports = server;
