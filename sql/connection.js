const mysql = require('mysql')

class Connection {
  constructor() {
    if (!this.pool) {
      console.log('creating connection...')
      this.pool = mysql.createPool({
       connectionLimit: 1000,
        host: '34.122.49.254',
        user: 'root',
        password:'12345',
        database: 'testDemo',
        port: '3306',
  
      })
   
      return this.pool
    }

    return this.pool
  }
}

const instance = new Connection()

module.exports = instance;