const fs = require('fs');
const path = require('path');
const { mssqlConnSync } = require('@nelreina/node-sequelize');

const sequelize = mssqlConnSync();

const db = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf('.') !== 0 && file !== 'index.js';
  })
  .forEach(function(file) {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

(async () => {
  // await sequelize.sync({ force: true });
  try {
    await sequelize.sync({});
  } catch (error) {
    console.error('db-models/src/index:', error.message);
  }
})();

db.sequelize = sequelize;

module.exports = db;
