import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'mysql-server-users',  // Docker where MySQL is running 
  user: 'user',       // MySQL user
  password: 'userpassword', // MySQL password
  database: 'users_db'  // Database name
});

db.connect((err) => {
  if (err) {
    console.error('Could not connect to MySQL:', err);
    process.exit(1); // Exit the app if DB connection fails
  }
  console.log('Connected to MySQL');
});

export default db;
