const mysql = require('mysql2');

// create pool or connection

exports.pool = mysql.createPool(
    {
        host:     '127.0.0.1',
        user:     'root',
        password: '******',
        database: 'sql-primer'  // <== name of schema
    }).promise()