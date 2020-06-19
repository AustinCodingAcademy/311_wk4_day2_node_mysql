const mysql = require('mysql')

class Connection {
  constructor() {
    if (!this.pool) {
      console.log('creating connection...')
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: '34.70.106.43',
        user: 'root',
        password: 'Thrillh0!',
        database: 'admin',
      })

      return this.pool
    }

    return this.pool
  }
}

const instance = new Connection()

module.exports = instance;