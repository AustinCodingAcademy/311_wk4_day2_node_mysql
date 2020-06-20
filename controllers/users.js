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
  let sql = "SELECT * FROM users WHERE id = ?"
  let id = parseInt(req.params.id)
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [id])
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  req.body = {
    first_name : 'Michael',
    last_name: "Matteis"
  }
  console.log(req.body)
  // INSERT INTO USERS FIRST AND LAST NAME 
  let sql = "INSERT INTO users (first_name, last_name) VALUE (? , ?)"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [req.body.first_name , req.body.last_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  req.body = {
    first_name: 'Bogus',
    last_name: "user"
  }
  let id = parseInt(req.params.id)
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = "UPDATE users SET first_name = ?, last_name =? WHERE id = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [req.body.first_name , req.body.last_name, id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  let firstName = req.params.first_name
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = "DELETE FROM users WHERE first_name = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [firstName])

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