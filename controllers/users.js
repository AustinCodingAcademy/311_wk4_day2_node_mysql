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
  //Jon-Woo helped on this one
  let sql = "select * from users where id = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [req.params.id])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
 // INSERT INTO USERS FIRST AND LAST NAME 
 let sql = "INSERT INTO USERS SET "
  // WHAT GOES IN THE BRACKETS
  //sql = mysql.format(sql, [req.body.first_name, req.body.last_name])
  /*pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });*/
    pool.query('INSERT INTO users SET ?', {first_name:`${req.body.first_name}`, last_name: `${req.body.last_name}`}, (err,
      results) => {
        if(err) return handleSQLError(res, err)
        return res.json({ newId: results.insertId});
      })
}

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = `UPDATE ?? SET first_name = ?, last_name = ? WHERE id = ${req.params.id}`
  //let sql = `UPDATE USERS SET first_name = '${req.body.first_name}', last_name = '${req.body.last_name}' WHERE id = ${req.params.id}`
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', req.body.first_name, req.body.last_name])
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json(results);
    //used put request, then get request to see updated user
  })
}

const deleteUserByFirstName = (req, res) => {
  let sql = "DELETE FROM users WHERE first_name = ?"
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