const md5 = require('md5');
const sql = require('./db.js');
const dbConfig = require('../config/db.config.js');

const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.access_token = user.access_token;
};
User.create = (newUser, result) => {
  sql.query('INSERT INTO user SET ?', newUser, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('created user: ', { id: res.id, ...newUser });
    result(null, { id: res.id, ...newUser });
  });
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
User.findById = (id, result) => {
  console.log(id);
  sql.query(`SELECT * FROM user WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('found user: ', res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: 'not_found' }, null);
  });
};
User.updateById = (id, user, result) => {
  sql.query('UPDATE user SET username = ?, password = ?, access_token = ? WHERE id = ?', [user.username, user.password, user.access_token, id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('updated user: ', { id: id, ...user });
    result(null, { id: id, ...user });
  });
};
User.remove = (id, result) => {
  sql.query('DELETE FROM user WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted User with id: ', id);
    result(null, res);
  });
};

User.login = (userInfo, result) => {
  sql.query('SELECT * FROM user WHERE (username = ? AND password = ?) OR access_token = ?', [userInfo.username, md5(`${dbConfig.PASSWORD_DUMMY_STRING}${userInfo.password}`), userInfo.access_token], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('User login: ', res[0]);
      if (userInfo.access_token == null) {
        userInfo.password = md5(`${dbConfig.PASSWORD_DUMMY_STRING}${userInfo.password}`);
        userInfo.access_token = md5(`${new Date().getTime()}${userInfo.username}`);
        User.updateById(res[0].id, userInfo, () => {});
      }
      result(null, { access_token: userInfo.access_token });
      return;
    }
    result({ kind: 'not_found' }, null);
  });
};

module.exports = User;
