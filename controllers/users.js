const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  //SELECT ALL USERS
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
  // INSERT INTO USERS FIRST AND LAST NAME 
  let sql = "insert into users (first_name, last_name) values (?, ?);"
  sql += "set @id = last_insert_id();"
  sql += "insert into usersAddress (user_id, address, city, county, state, zip) values (@id, ?, ?, ?, ?, ?);"
  sql += "insert into usersContact (user_id, phone1, phone2, email) values (@id, ?, ?, ?)"


  // WHAT GOES IN THE BRACKETS
  let replacements = [newUser.first_name, newUser.last_name, newUser.address, newUser.city, newUser.county, newUser.state, newUser.zip, newUser.phone1, newUser.phone2, newUser.email]
  sql = mysql.format(sql, replacements)

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json(results);
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