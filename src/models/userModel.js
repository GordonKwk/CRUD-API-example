const { randomUUID } = require('node:crypto');

const users = [
    { uuid: randomUUID(), username: 'user1', password: 'password1' },
    { uuid: randomUUID(), username: 'user2', password: 'password2' },
    { uuid: randomUUID(), username: 'user3', password: 'password3' },
    { uuid: randomUUID(), username: 'user4', password: 'password4' },
    { uuid: randomUUID(), username: 'user4', password: 'password4' }
];

const findByUsername = (username) => users.find((u) => u.username === username);

module.exports = { findByUsername };