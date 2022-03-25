const sql = require('./db.js');
const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.access_token = user.access_token;
};
User.getAll = (result) => {
  let query = 'SELECT * FROM user';
  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log('users: ', res);
    result(null, res);
  });
};
module.exports = User;