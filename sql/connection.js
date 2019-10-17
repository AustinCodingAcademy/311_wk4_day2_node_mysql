const mysql = require("mysql");

class Connection {
	constructor() {
		if (!this.pool) {
			console.log("creating connection...");
			this.pool = mysql.createPool({
				connectionLimit: 100,
				host: "35.184.52.40",
				user: "root",
				password: "password12345",
				database: "admin"
			});

			return this.pool;
		}

		return this.pool;
	}
}

const instance = new Connection();

module.exports = instance;
