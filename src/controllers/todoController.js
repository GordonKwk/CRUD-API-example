'use strict';

const todoModel = require('../models/todoModel');

// Finds the todo and checks the logged-in user owns it.
// Sends the error response itself and returns null when the check fails.
const getOwnedTodo = (req, res) => {
  const todo = todoModel.findByUuid(req.params.uuid);

  if (!todo) {
    res.status(404).json({ message: 'Todo not found' });
    return null;
  }
  if (todo.ownerUuid !== req.user.uuid) {
    res.status(403).json({ message: 'Only the owner can change this todo' });
    return null;
  }
  return todo;
};

exports.listAllTodos = (req, res) => {
  const { search, category } = req.query;
  return res.json(todoModel.findAll({ search, category }));
};

exports.readTodo = (req, res) => {
  const todo = todoModel.findByUuid(req.params.uuid);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  return res.json(todo);
};

exports.createTodo = (req, res) => {
  const { title, description, category } = req.body;

  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'title is required' });
  }

  const todo = todoModel.create({
    title: title.trim(),
    description,
    category,
    ownerUuid: req.user.uuid,
  });
  return res.status(201).json(todo);
};

exports.updateTodo = (req, res) => {
  const todo = getOwnedTodo(req, res);
  if (!todo) return;

  const { title, description, category } = req.body;
  if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
    return res.status(400).json({ message: 'title must be a non-empty string' });
  }

  return res.json(todoModel.update(todo, { title, description, category }));
};

exports.deleteTodo = (req, res) => {
  const todo = getOwnedTodo(req, res);
  if (!todo) return;

  todoModel.remove(todo.uuid);
  return res.status(204).end();
};
