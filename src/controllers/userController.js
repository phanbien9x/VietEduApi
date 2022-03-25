const User = require('../models/user.js');
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tutorials.',
      });
    else res.send(data);
  });
};
