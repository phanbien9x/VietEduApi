import md5 from 'md5';
import User, { create, getAll, findById, updateById, remove } from '../models/user.js';
import { PASSWORD_DUMMY_STRING } from '../config/db.config.js';

export function createUser(req, res) {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);
  let newUser = new User({
    username: req.body.username,
    password: md5(`${PASSWORD_DUMMY_STRING}${req.body.password}`),
  });
  create(newUser, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    else res.send(data);
  });
}

export function getAllUser(req, res) {
  console.log(res);
  getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Users.',
      });
    else res.send(data);
  });
}

export function findUserById(req, res) {
  findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving User with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
}

export function updateUserById(req, res) {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  console.log(req.body);

  updateById(req.params.id, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating User with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
}

export function removeUser(req, res) {
  remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete User with id ' + req.params.id,
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
}
