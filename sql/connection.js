const mysql = require("mysql");

class Connection {
	constructor() {
		if (!this.pool) {
			console.log("creating connection...");
			this.pool = mysql.createPool({
				connectionLimit: 100,
				host: "104.198.67.226",
				user: "root",
				password: "Bigcode01",
				database: "Admin"
			});

			return this.pool;
		}

		return this.pool;
	}
}

const instance = new Connection();

module.exports = instance;
