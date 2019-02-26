require('dotenv').config();
const express = require('@nelreina/node-express');
const http = require('http');
const routes = require('./routes');
const app = express();
const PORT = process.env.SERVER_PORT;
const start = logger => {
  routes(app, logger);

  const server = http.createServer(app);
  server.listen(PORT, () => logger.info(`API is running on port: ${PORT}`));
};

module.exports = {
  start
};
