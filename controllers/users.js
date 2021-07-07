const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getAllUsers = (req, res) => {
	// select all users
	let sql = "SELECT ??, ?? FROM ??";
	let replacements = ["first_name", "last_name", "users"];
	sql = mysql.format(sql, replacements);

	pool.query("SELECT * FROM users", (err, rows) => {
		if (err) return handleSQLError(res, err);
		return res.json(rows);
	});
};

const getUserById = (req, res) => {
	// selecting a specific user created dymanically with ?? & ? placeholders
	let sql = "SELECT ??, ?? FROM ?? WHERE ?? = ?";
	// values for place holder req.params or req.body specified
	let replacements = ["first_name", "last_name", "users", "id", req.params.id];
	sql = mysql.format(sql, replacements);

	pool.query(sql, (err, rows) => {
		if (err) return handleSQLError(res, err);
		return res.json(rows);
	});
};

const createUser = (req, res) => {
	// creates a new user
	let sql = "INSERT INTO ?? (??, ??) VALUES (?,?)";
	let replacements = [
		"users",
		"first_name",
		"last_name",
		req.params.first_name,
		req.params.last_name
	];

	sql = mysql.format(sql, replacements);

	pool.query(sql, (err, results) => {
		if (err) return handleSQLError(res, err);
		return res.json({ newId: results.insertId });
	});
};

const updateUserById = (req, res) => {
	// update first & last name by user Id
	let sql = "UPDATE ?? SET ??=?, ??=? WHERE ?? = ?";
	let replacements = [
		"users",
		"first_name",
		req.body.first_name,
		"last_name",
		req.body.last_name,
		"id",
		req.params.id
	];

	sql = mysql.format(sql, replacements);
	console.log(sql);

	pool.query(sql, (err, results) => {
		if (err) return handleSQLError(res, err);
		return res.json(`User updated`).status(204);
	});
};

const deleteUserByFirstName = (req, res) => {
	// Delete users with specific first name
	let sql = "DELETE FROM ?? WHERE ?? = ?";
	let replacements = ["users", "first_name", req.param.first_name];
	sql = mysql.format(sql, replacements);

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
