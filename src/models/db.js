const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

var connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected!!!');
});

module.exports = connection;
