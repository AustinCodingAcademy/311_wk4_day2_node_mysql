const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  console.log("FIRE");
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getUserById = (req, res) => {
  console.log(req.params.id)
  // SELECT USERS WHERE ID = <REQ PARAMS ID>

  let sql = "SELECT * FROM ?? WHERE ?? = ?";
  // WHAT GOES IN THE BRACKETS
  const replacements = ["users", "id", req.params.id]
  sql = mysql.format(sql, replacements);


  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const createUser = (req, res) => {

  console.log(`We're trying to add user ${req.body.first_name} ${req.body.last_name}.`)
  // INSERT INTO USERS FIRST AND LAST NAME
  let sql = "INSERT INTO users (first_name, last_name) VALUES (?, ?)";
  // WHAT GOES IN THE BRACKETS
  const replacements = [req.body.first_name, req.body.last_name]
  sql = mysql.format(sql, replacements);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ newId: results.insertId });
  });
};

const updateUserById = (req, res) => {
  const body = req.body;
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  // ?? - this is anything coming from mysql
  // ? - anything from express
  let sql = `UPDATE ?? SET ? WHERE ?? =  ?`;
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["users", body, "id", req.params.id]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json(results);
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
  deleteUserByFirstName,
};
