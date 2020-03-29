// ACA Node + MySQL Practice
// Connections File
const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')


// Get All Users
const getAllUsers = (req, res) => {
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

// Get Single User WHERE ID = <REQ PARAMS ID>
const getUserById = (req, res) => {
  const userId = req.params.id;

  let sql = `SELECT ??, ??, ?? FROM ?? WHERE ?? = ? `
  sql = mysql.format(sql, ['id','first_name', 'last_name', 'users', 'id', userId])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}


// Create User  
// INSERT INTO USERS FIRST AND LAST NAME 
// let sql = `INSERT INTO users (first_name, last_name) values ('${firstName}', '${lastName}')`;
const createUser = (req, res) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  console.log("FirstName:", firstName);
  console.log("LastName:", lastName);

  let sql = `INSERT INTO ?? (??, ??) values (?, ?)`
  sql = mysql.format(sql, ['users', 'first_name', 'last_name', firstName, lastName]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}


// Update User
// UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
const updateUserById = (req, res) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const userId = req.params.id;
  
  let sql = `UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?;`
  sql = mysql.format(sql, ["users", "first_name", firstName, "last_name", lastName, "id", userId ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}


// Delete User
// DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
const deleteUserByFirstName = (req, res) => {
  const firstName = req.params.first_name;
  console.log(firstName);

  let sql = `DELETE FROM ?? WHERE ?? = ?;`
  sql = mysql.format(sql, ["users", "first_name", firstName])

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