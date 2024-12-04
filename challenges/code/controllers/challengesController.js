import db from '../db.js';  // Import the MySQL connection

// Get all Challenges
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

/**
 * Deny a challenge
 */
export async function denyChallenge(req, res) {
  const { Challenge_ID } = req.body;

  // Validate input
  if (!Challenge_ID) {
    return res.status(400).json({ error: 'Challenge ID are required.' });
  }

  const query = 'INSERT INTO denied_challenges (Challenge_ID) VALUES (?, ?)';
  
  db.query(query, [Challenge_ID], (err, results) => {
    if (err) {
      console.error('Error denying challenge:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ message: 'Challenge denied successfully.' });
  });
}