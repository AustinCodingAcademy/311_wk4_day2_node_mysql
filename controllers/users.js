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
  let sql = 'SELECT ??, ??, ?? FROM ?? WHERE ?? = ?'
  const replacements = ['id', 'first_name', 'last_name', 'users', 'id', req.params.id]
  // let sql = `SELECT * FROM users WHERE id = ${req.params.id}`
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, replacements)

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  let sql = 'INSERT INTO users (first_name, last_name) VALUES (?, ?)'
  let replacements = [req.body.first_name, req.body.last_name]
  
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, replacements)

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
// UPDATE Customers
// SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
// WHERE CustomerID = 1;

  let sql = 'UPDATE users SET first_name = ?, last_name = ? WHERE ?? = ?'
  let replacements = [req.body.first_name, req.body.last_name, 'id', req.params.id]
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, replacements)

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(200).json("success");
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = 'DELETE FROM users WHERE ?? = ?'
  let replacements = ['first_name', req.params.first_name]

  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, replacements)

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