module.exports = (app) => {
  const route = require('../controllers/userController.js');
  var router = require('express').Router();
  router.get("/", route.findAll);
  app.use('/api/user', router);
};
