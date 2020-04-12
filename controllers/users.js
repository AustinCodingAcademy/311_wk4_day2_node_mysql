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

  // get the id from the request
  let id = req.params.id;
  // setup a query
  let sql = "SELECT * FROM ?? WHERE ?? = ?";

  // define the replacements for the ??s in the query
  const replacements = [
  `users`,
  `id`,
   id
  ];

  // add the replacements to the query
  sql = mysql.format(sql, replacements)

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  // get first and last name from params
  let firstName = req.body.first_name;
  let lastName = req.body.last_name;
  // INSERT INTO USERS FIRST AND LAST NAME 
  let sql = "INSERT INTO ?? (??,??) VALUES (?,?)";

  const replacements = [
    `users`,
    `first_name`,
    `last_name`,
    firstName,
    lastName
  ]

  sql = mysql.format(sql, replacements)

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  // store the parameters from the req and the body
  let updateID = req.params.id;
  let newFirstName = req.body.first_name;
  let newLastName  = req.body.last_name;
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?"

  // set the values for the template sql
  const replacements = [
    `users`,
    `first_name`,
     newFirstName,
    `last_name`,
    newLastName,
    `id`,
    updateID
  ]
  
  // apply the values to the template
  sql = mysql.format(sql, replacements)

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {

  let deleteName = req.params.first_name;

  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = "DELETE FROM ?? WHERE ?? = ?";

  const replacements = [
    `users`,
    `first_name`,
    deleteName
  ]
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