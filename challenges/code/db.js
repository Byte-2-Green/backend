import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'mysql-server-challenges',
  user: 'user',
  password: 'userpassword',
  database: 'challenges_db'
});

db.connect((err) => {
  if (err) {
    console.error('Could not connect to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL');
});

export default db;
