'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const pg = require('pg');
const db = {};

if (!config) {
  throw new Error(`Config not found for environment: ${env}`);
}

let sequelize;

  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: "postgres",
      port: config.port,
    },
    config
  );


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);

  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./users')(sequelize, Sequelize.DataTypes);
db.photo = require('./photo')(sequelize,Sequelize.DataTypes);
db.tags = require('./tags')(sequelize, Sequelize.DataTypes);
db.searchHistory = require('./searchHistory')(sequelize,Sequelize.DataTypes);


module.exports = db;
