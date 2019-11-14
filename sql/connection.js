const mysql = require('mysql')

class Connection {
  constructor() {
    if (!this.pool) {
      console.log('creating connection...')
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: '35.238.27.129',
        user: 'root',
        password: 'first-instance',
        database: 'admin',
        port: 3306
      })

      return this.pool
    }

    return this.pool
  }
}

const instance = new Connection()

module.exports = instance;