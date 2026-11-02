'use strict';

const todoController = require('../controllers/todoController');
const { loginRequired } = require('../middleware/auth');

module.exports = (app) => {
  app.route('/todos')
    .get(todoController.listAllTodos)
    .post(loginRequired, todoController.createTodo);

  app.route('/todos/:uuid')
    .get(todoController.readTodo)
    .put(loginRequired, todoController.updateTodo)
    .delete(loginRequired, todoController.deleteTodo);
};
