const User = require('../models/user.js');

exports.login = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);
  let userInfo = new User({
    username: req.body.username,
    password: req.body.password,
    access_token: req.body.access_token,
  });
  User.login(userInfo, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Incorrect username or password.',
      });
    else res.send(data);
  });
};
