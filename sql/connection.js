const mysql = require('mysql')

class Connection {
  constructor() {
    if (!this.pool) {
      console.log('creating connection...')
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: '35.226.80.232',
        user: 'root',
        password: 'JOHNfam2013@!',
        database: 'admin'
      })

      return this.pool
    }
    return this.pool
  }
}

const instance = new Connection()

module.exports = instance;