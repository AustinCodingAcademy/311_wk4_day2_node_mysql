const mysql = require("mysql");

class Connection {
  constructor() {
    if (!this.pool) {
      console.log("creating connection...");
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: "den1.mysql5.gear.host",
        user: "firstinstance",
        password: "Rh1iB5?0e2-l",
        database: "firstinstance",
        debug: false,
      });

      return this.pool;
    }

    return this.pool;
  }
}

const instance = new Connection();

module.exports = instance;
