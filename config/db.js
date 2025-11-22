import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '0000',
  port: 3400,
  database: 'reactClass',
});

export default pool;
