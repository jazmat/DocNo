const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200);
  res.end(JSON.stringify({ status: 'OK', timestamp: new Date().toISOString() }));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
