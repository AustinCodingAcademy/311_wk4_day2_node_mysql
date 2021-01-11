const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  pool.query("SELECT * FROM users INNER JOIN usersaddress ON usersaddress.user_id = users.id INNER JOIN userscontact ON userscontact.user_id = users.id", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  let id = req.params.id
  let sql = `SELECT * FROM users INNER JOIN usersaddress ON usersaddress.user_id = users.id INNER JOIN userscontact ON userscontact.user_id = users.id WHERE users.id = ?`
  sql = mysql.format(sql, [])

  pool.query(sql,[id], (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  let newUser = req.body
  let replacements = [newUser.first_name, newUser.last_name, newUser.address, newUser.city, newUser.county, newUser.state, newUser.zip, newUser.phone1, newUser.phone2, newUser.email]
  let sql = 'INSERT INTO users (first_name, last_name) VALUES (?, ?);'
  let firstName = req.body.first_name
  let userId = `SELECT id FROM users WHERE first_name=${firstName}`
  //CANNOT GET THIS TO WORK. MYSQL does not enjoy backticks
  sql += `INSERT INTO usersAddress (user_id, address, city, county, state, zip) VALUES ((${userId}), ??, ??, ??, ??, ??);`
  sql  += `INSERT INTO userscontact(user_id, phone1, phone2, email) VALUES ((${userId}, ??, ??, ??)`
  sql = mysql.format(sql,[])
  pool.query(sql, replacements, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  let id = req.params.id
  let newUser = req.body
  let replacements = [newUser.first_name, newUser.last_name, id]
  let sql = `UPDATE users SET first_name = ?, last_name = ? WHERE id = ?`
  sql = mysql.format(sql, [])

  pool.query(sql, replacements,(err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  let id = req.params.first_name
  let sql = "DELETE FROM users WHERE first_name = ?"
  sql = mysql.format(sql, [])

  pool.query(sql, id, (err, results) => {
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