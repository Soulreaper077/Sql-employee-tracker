const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Soulreaper23',
    database: 'employeesDB'
});

module.exports = db; 