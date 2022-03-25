module.exports = (app) => {
  const route = require('../controllers/loginController.js');
  var router = require('express').Router();

  router.post('/login', route.login);

  app.use('/api', router);
};
