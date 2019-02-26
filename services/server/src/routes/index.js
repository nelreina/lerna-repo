const fs = require('fs');
const path = require('path');

module.exports = (app, logger) => {
  logger.trace('Importing routes...');
  fs.readdirSync(__dirname)
    .filter(function(file) {
      return file.indexOf('.') !== 0 && file !== 'index.js';
    })
    .forEach(function(file) {
      const routepath = file.replace('.js', '');
      logger.trace(routepath);
      app.use(`/api/${routepath}`, require(path.join(__dirname, file)));
    });
};
