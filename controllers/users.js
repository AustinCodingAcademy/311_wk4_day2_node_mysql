const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
     console.log ("Inside getAllUsers");
    let sql="SELECT * FROM users JOIN usersAddress on users.id = usersAddress.user_id JOIN usersContact on users.id = usersContact.user_id";
   //  
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let idValue=req.params.id;
  console.log(idValue);
  let sql = `SELECT * FROM users where id=?`;
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [idValue]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME 
  let sql = "INSERT INTO users (first_name,last_name) VALUES (?, ? )";

  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [req.body.first_name, req.body.last_name]);


  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  let idValue2=req.params.id;
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = `UPDATE users SET first_name=?, last_name=? WHERE id=?`;
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [req.body.first_name, req.body.last_name,idValue2]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let firstName=req.params.first_name;
  let sql = `DELETE FROM users WHERE first_name=?`;

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