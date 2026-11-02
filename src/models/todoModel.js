const { randomUUID } = require('node:crypto');

const todos = [];

const create = ({ title, description = '', category = 'general', ownerUuid }) => {
  const todo = {
    uuid: randomUUID(),
    title,
    description,
    category,
    ownerUuid,
    createdAt: new Date().toISOString(),
  };
  todos.push(todo);
  return todo;
};

const findAll = ({ search, category } = {}) =>
  todos.filter(
    (t) =>
      (!category || t.category.toLowerCase() === category.toLowerCase()) &&
      (!search || `${t.title} ${t.description}`.toLowerCase().includes(search.toLowerCase()))
  );

const findByUuid = (uuid) => todos.find((t) => t.uuid === uuid);

const update = (todo, changes) => {
  for (const [key, value] of Object.entries(changes)) {
    if (value !== undefined) todo[key] = value;
  }
  return todo;
};

const remove = (uuid) => {
  const i = todos.findIndex((t) => t.uuid === uuid);
  if (i !== -1) todos.splice(i, 1);
};

module.exports = { create, findAll, findByUuid, update, remove };
