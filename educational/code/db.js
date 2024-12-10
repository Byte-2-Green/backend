import mysql from 'mysql2';

const db = mysql.createConnection({
  host: process.env.EDUCATIONAL_DB_HOST || 'localhost',
  user: process.env.EDUCATIONAL_DB_USER || 'user',
  password: process.env.EDUCATIONAL_DB_PASSWORD || 'userpassword',
  database: process.env.EDUCATIONAL_DB_NAME || 'educational_db',
  port: process.env.EDUCATIONAL_DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.error('Could not connect to MySQL:', err);
    process.exit(1); // Exit the app if DB connection fails
  }
  console.log('Connected to MySQL');
});

export default db;
