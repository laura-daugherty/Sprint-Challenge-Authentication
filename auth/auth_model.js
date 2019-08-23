const db = require('../database/dbConfig');

module.exports = {
  getUsers,
  add,
  findBy
};


function getUsers() {
  return db('users')
}

function add(newUser) {
  return db("users")
  .insert(newUser);
}

function findBy(filter) {
  return db("users")
  .where(filter)
}