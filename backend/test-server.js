const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'OK', message: 'Server is running (minimal)' }));
});

server.listen(3000, () => {
  console.log('Minimal test server running on port 3000');
});
