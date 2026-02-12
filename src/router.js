class Router {
  constructor() {
    this.routes = new Map();
  }

  get(path, handler) {
    this.routes.set(`GET:${path}`, handler);
  }

  post(path, handler) {
    this.routes.set(`POST:${path}`, handler);
  }

  handle(req, res) {
    const key = `${req.method}:${req.url}`;
    const handler = this.routes.get(key);

    if (handler) {
      handler(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  }
}

module.exports = { Router };
