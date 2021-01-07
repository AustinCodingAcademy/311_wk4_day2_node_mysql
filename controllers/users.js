const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM users JOIN usersAddress on users.id=usersAddress.user_id JOIN usersContact on users.id=usersContact.user_id", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let sql = "SELECT * FROM users WHERE id=?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [req.params.id])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  let newUser = req.body
  let newID = 0
  // INSERT INTO USERS FIRST AND LAST NAME 
  let sql = "INSERT INTO users (first_name, last_name) VALUES (?, ?)"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [newUser.first_name, newUser.last_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    newID = results.insertId
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  let updateUser = req.body
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = "UPDATE users SET first_name=?, last_name=? WHERE id=? "
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [updateUser.first_name, updateUser.last_name, req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = "DELETE FROM users WHERE first_name=?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [req.params.first_name])

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