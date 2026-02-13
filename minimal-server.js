// minimal-server.js - runs without npm install
const http = require('http');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, 'backend', '.env') });

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      message: 'DocNo backend is running (minimal mode without DB)'
    }));
  } else {
    res.writeHead(200);
    res.end(JSON.stringify({ 
      message: 'DocNo API (minimal mode)',
      endpoints: { health: '/health' }
    }));
  }
});

server.listen(PORT, () => {
  console.log(`Minimal DocNo server running on port ${PORT}`);
  console.log(`Try: curl http://localhost:${PORT}/health`);
});

server.on('error', (err) => {
  console.error('Server error:', err.message);
  process.exit(1);
});
