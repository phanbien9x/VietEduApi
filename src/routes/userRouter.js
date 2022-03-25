module.exports = (app) => {
  const route = require('../controllers/userController.js');
  var router = require('express').Router();

  router.get('/', route.findAll);
  router.post('/', route.create);
  router.get('/:id', route.findOne);
  router.put('/:id', route.update);
  router.delete('/:id', route.delete);

  app.use('/api/user', router);
};
