const mysql = require('mysql');

require('dotenv').config();
const host = process.env.HOST;
const userName = process.env.UNAME;
const password = process.env.PASSWORD;
const database = process.env.DB;


class Connection {
  constructor() {
    if (!this.pool) {
      console.log('creating connection...')
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: '35.224.39.61',
        user: 'root',
        password: 'Jahajazi2000-',
        database: 'admin'
      })

      return this.pool
    }

    return this.pool
  }
}

const instance = new Connection()

module.exports = instance;