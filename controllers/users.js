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
  let sql = "SELECT ?? FROM ?? WHERE ?? = ?"
  let input = ["*", "users", "id", `${req.params.id}`]
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, input)
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME 
  //insert into users (first_name, last_name)Values (${req.body.first_name, ${req.body.last_name})

  let sql = "INSERT INTO ?? (??,??) VALUES (?,?)"
  let input = ["users", "first_name", "last_name", `${req.body.first_name}`, `${req.body.last_name}`]
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, input)

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["users", "first_name", req.body.first_name, "last_name", req.body.last_name, "id", req.params.id])
  

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    // return res.status(204).json();
    return res.json({ "first_name": results.first_name});
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = "DELETE FROM ?? WHERE ?? = ?"
  let input = ["users", "first_name", `${req.params.first_name}`]
  console.log(req.params)
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, input)
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