const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  let sql = "SELECT * FROM users";
  let sqlInput = ["*", "users"];
  sql = mysql.format(sql, sqlInput);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getUserById = (req, res) => {
  // SELECT USERS BY ID
  let sql = "SELECT ?? FROM ?? WHERE ?? = ?";
  let sqlInput = ["*", "users", "id", `${req.params.id}`];
  sql = mysql.format(sql, sqlInput);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const createUser = (req, res) => {
  // // INSERT INTO USERS FIRST AND LAST NAME
  // let sql = "INSERT INTO ?? (first_name, last_name) VALUES (??, ??)";
  // const replacements = ["users", "first_name", "last_name", `${req.body.first_name}`, `${req.body.last_name}`];
  // sql = mysql.format(sql, replacements);

  //THIS CODE WORKS BUT CANNOT CONVERT TO SQL VARIABLE
  // "INSERT INTO users (first_name, last_name) VALUES ('" + req.body.first_name + "', '" + req.body.last_name + "');"

  pool.query("INSERT INTO users (first_name, last_name) VALUES ('" + req.body.first_name + "', '" + req.body.last_name + "')", (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ newId: results.insertId });
  });
};

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = "";
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, []);

  pool.query("UPDATE users SET first_name = '" + req.body.first_name + "', '" + req.body.last_name + "' WHERE id = '" + req.body.id + '", (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.status(204).json();
  });
};

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = "";
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, []);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName
};
