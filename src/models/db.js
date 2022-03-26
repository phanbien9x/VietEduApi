import { createConnection } from 'mysql';
import { HOST, USER, PASSWORD, DB, PORT } from '../config/db.config.js';

var connection = createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DB,
  port: PORT,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected!!!');
});

export default connection;
