'use strict';

const authController = require('../controllers/authController');

module.exports = (app) => {
  app.route('/auth/login').post(authController.signIn);
};
