const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  // SELECT ALL USERS 
  let sql = "SELECT * FROM users JOIN usersAddress ON usersAddress.user_id = users.id JOIN usersContact ON usersContact.user_id = users.id"
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let sql = 'SELECT * FROM users WHERE users.id = ?;'
  // WHAT GOES IN THE BRACKETS
  const id = req.params.id;
  sql = mysql.format(sql, [id])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME 
  let sql = "INSERT INTO users (first_name, last_name) VALUES (?, ?)"
  // WHAT GOES IN THE BRACKETS
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  sql = mysql.format(sql, [first_name, last_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let updatedUser = req.body;
  const id = req.params.id;
  let sql = 'UDPATE users SET first_name =? , last_name = ? WHERE id =?'
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [updatedUser.first_name, updatedUser.last_name, id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  const first_name = req.body.first_name;
  let sql = "DELETE FROM users WHERE first_name = ? "
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [first_name])

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