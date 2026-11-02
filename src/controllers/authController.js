'use strict';

const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const SECRET = process.env.JWT_SECRET || 'dev-secret';

exports.SECRET = SECRET;

exports.signIn = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'username and password are required' });
  }

  const user = userModel.findByUsername(username);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ uuid: user.uuid, username: user.username }, SECRET, { expiresIn: '1h' });
  return res.json({ token });
};
