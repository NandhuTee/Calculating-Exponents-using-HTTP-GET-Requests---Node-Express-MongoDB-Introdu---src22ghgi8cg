const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
    });

    req.on('end', () => {
      try {
        const { num1, num2 } = JSON.parse(body);

        // Check if num1 is a positive integer and num2 is a non-negative integer
        if (num1 > 0 && num2 >= 0 && Number.isInteger(num1) && Number.isInteger(num2)) {
          const result = Math.pow(num1, num2);
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(`The result is ${result}`);
        } else {
          // If num1 is not a positive integer or num2 is negative
          if (num1 <= 0) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('The operation cannot be performed');
          } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid input');
          }
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON format');
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

module.exports = server;
