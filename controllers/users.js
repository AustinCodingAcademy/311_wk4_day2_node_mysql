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
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  //let sql = 'SELECT FROM user WHERE id = ?'
  //let sql = 'SELECT ??, ?? FROM ?? WHERE ?? = ?'
const replacements = ['first_name', 'last_name', 'users', 'id', 1]
let sql = 'SELECT ??, ?? FROM ?? WHERE ?? = ?'
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, replacements)
  //sql = mysql.format(sql, [req.params.id])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows[0]);
  })
}

const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME 
  let sql = `INSERT INTO users WHERE first_name = ?, last_name = ?`
  // WHAT GOES IN THE BRACKETS
  sql = 'mysql.format(sql, req.params.${first_name[1], ${last_name[2]})'

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = "UPDATE users SET first_name = ?, last_name = ? WHERE id = ?"
  // WHAT GOES IN THE BRACKETS
  sql = `mysql.format(sql, ${first_name[1]}, ${last_name[2]})`

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = ""
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [])

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