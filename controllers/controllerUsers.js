const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
    pool.query("SELECT * FROM users", (err, rows) => {
        if (err) return handleSQLError(res, err);
        return res.json(rows);
    });
};

const getUserById = (req, res) => {
    let sql = `select ??, ?? from ?? where ??=${req.params.id}`;
    let replacements = ['first_name', 'last_name', 'users', 'id'];
    sql = mysql.format(sql, replacements);
    pool.query(sql, (err, rows) => {
        if (err) return handleSQLError(res, err)
        return res.json(rows);
    });
};

const createUser = (req, res) => {
    let sql = 'insert into users set ?'
    let postUser = req.body;
    sql = mysql.format(sql, postUser);
    pool.query(sql, (err, results) => {
        if (err) return handleSQLError(res, err);
        return res.json({ newId: results.insertId });
    });
};

const updateUserById = (req, res) => {
    let sql = `update users set ? where id=${req.params.id}`;
    let putUser = req.body;
    sql = mysql.format(sql, putUser);
    pool.query(sql, (err, results) => {
        if (err) return handleSQLError(res, err);
        return res.status(204).json();
    });
};

const deleteUserByFirstName = (req, res) => {
    let sql = `delete from ?? where ??='${req.params.first_name}'`;
    console.log(sql);
    let replacements = ['users', 'first_name'];
    sql = mysql.format(sql, replacements);

    pool.query(sql, (err, results) => {
        if (err) return handleSQLError(res, err)
        return res.json({ message: ` Deleted $ { results.affectedRows }  user(s)` });
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserByFirstName
};