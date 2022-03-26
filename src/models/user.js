import md5 from 'md5';
import connection from './db.js';
import { PASSWORD_DUMMY_STRING } from '../config/db.config.js';

class User {
  constructor(user) {
    this.username = user.username;
    this.password = user.password;
    this.access_token = user.access_token;
  }
}
export function create(newUser, result) {
  connection.query('INSERT INTO user SET ?', newUser, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('created user: ', { id: res.id, ...newUser });
    result(null, { id: res.id, ...newUser });
  });
}
export function getAll(result) {
  console.log(result);
  let querystr = 'SELECT * FROM user';
  connection.query(querystr, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log('users: ', res);
    result(null, res);
  });
}
export function findById(id, result) {
  console.log(id);
  connection.query(`SELECT * FROM user WHERE id = ${id}`, (err, res) => {
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
}
export function updateById(id, user, result) {
  connection.query('UPDATE user SET username = ?, password = ?, access_token = ? WHERE id = ?', [user.username, user.password, user.access_token, id], (err, res) => {
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
}
export function remove(id, result) {
  connection.query('DELETE FROM user WHERE id = ?', id, (err, res) => {
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
}

export function login(userInfo, result) {
  connection.query('SELECT * FROM user WHERE (username = ? AND password = ?) OR access_token = ?', [userInfo.username, md5(`${PASSWORD_DUMMY_STRING}${userInfo.password}`), userInfo.access_token], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('User login: ', res[0]);
      if (userInfo.access_token == null) {
        userInfo.password = md5(`${PASSWORD_DUMMY_STRING}${userInfo.password}`);
        userInfo.access_token = md5(`${new Date().getTime()}${userInfo.username}`);
        updateById(res[0].id, userInfo, () => {});
      }
      result(null, { access_token: userInfo.access_token });
      return;
    }
    result({ kind: 'not_found' }, null);
  });
}

export default User;
