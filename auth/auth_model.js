const db = require('../database/dbConfig');

module.exports = {
  getUsers,
  add,
  findBy
};


function getUsers() {
  return db('users')
  // .innerJoin("departments as d", "d.id", "=", "u.department_id")
  // .innerJoin("positions as p", "p.id", "=", "u.position_id")
  // // .groupBy('u.department_id')
  // // .having('u.department_id', "=", "u.position_id")
  // .select('d.department_name', 'p.position_name', 'u.username');
}

function add(newUser) {
  return db("users")
  .insert(newUser);
}

function findBy(filter) {
  return db("users")
  .where(filter)
}