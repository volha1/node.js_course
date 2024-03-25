const { v4: uuidv4 } = require('uuid');
let users = require('../models/users.db');

function getAll() {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
}

function getById(id) {
  return new Promise((resolve, reject) => {
    const usersFound = users.filter((user) => user.id === id);
    resolve(usersFound.length === 0 ? null : usersFound[0]);
  });
}

function create(user) {
  return new Promise((resolve, reject) => {
    const newUser = { id: uuidv4(), ...user };
    users.push(newUser);
    resolve(newUser);
  });
}

function update(id, user) {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((user) => (user.id = id));
    users[index] = user;
    resolve(users[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    users = users.filter((user) => user.id !== id);
    resolve();
  });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
