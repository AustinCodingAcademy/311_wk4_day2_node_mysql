const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  const userId = req.params.id;
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let sql = `SELECT ??, ?? FROM ?? WHERE ?? = ?`;
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['first_name', 'last_name', 'users', 'id', userId]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  // INSERT INTO USERS FIRST AND LAST NAME 
  let sql = "INSERT INTO ?? (??, ??) VALUE (?, ?)";
  // let sql = `INSERT INTO users (first_name, last_name) VALUES ('${firstName}', '${lastName}')`
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', 'last_name', firstName, lastName])
  
  console.log(firstName);
  console.log(lastName);
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  let userId = req.params.id;
  let firstName = req.body.first_name;
  let lastName = req.body.last_name;
  console.log(firstName);
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = `UPDATE ?? SET ??=?, ??=? WHERE ??=?`
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', firstName, 'last_name', lastName, 'id', userId])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  let firstName = req.params.first_name;
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = "DELETE FROM ?? WHERE ?? = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', firstName])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName
}