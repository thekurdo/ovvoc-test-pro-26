const http = require('http');
const { Router } = require('./router');

function createApp() {
  const router = new Router();

  router.get('/health', (_req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }));
  });

  router.get('/api/items', (_req, res) => {
    const items = [
      { id: 1, name: 'Widget', price: 9.99 },
      { id: 2, name: 'Gadget', price: 24.99 },
      { id: 3, name: 'Doohickey', price: 14.99 },
    ];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ data: items, count: items.length }));
  });

  const server = http.createServer((req, res) => {
    router.handle(req, res);
  });

  return server;
}

module.exports = { createApp };
