import db from '../db.js';  // Import the MySQL connection

// Get all Food for Thought
export async function test(req, res) {
  const query = 'SELECT * FROM Challenges';  // SQL query to fetch all records
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
}
