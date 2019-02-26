const server = require('@app/server');

const log4js = require('@nelreina/node-log4js');

const logger = log4js('app');

server.start(logger);
