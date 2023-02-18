const { Sequelize } = require('sequelize');

var dbConfig = null;
if (process.env.env_config == "local") {
  dbConfig = {
    "host": "54.251.141.238",
    "port": "3306",
    "db": "vfans",
    "user": "root",
    "password": "ca12a819376bf135e7f884d37de19ec141af25be"
  }
}
if (process.env.env_config == "dev") {
  dbConfig = {
    "host": "54.251.141.238",
    "port": "3306",
    "db": "vfans",
    "user": "root",
    "password": "ca12a819376bf135e7f884d37de19ec141af25be"
  }
}
if (process.env.env_config == "test") {
  dbConfig = {
    "host": "54.251.141.238",
    "port": "3306",
    "db": "vfans",
    "user": "root",
    "password": "ca12a819376bf135e7f884d37de19ec141af25be"
  }
}


const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: "mysql",
  pool: {
    max: 20,
    min: 5,
    idle: 0,
    acquire: 3000,
  },
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
