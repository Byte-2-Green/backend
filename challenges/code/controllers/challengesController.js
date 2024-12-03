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

// Get all notifications 
export async function getNotifications(req, res) {
  const query = 'SELECT * FROM Notifications';  // SQL query to fetch all records
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
}

// Get a notification by ID
export async function getNotificationById(req, res) {
  const query = 'SELECT * FROM Notifications WHERE id = ?';  // SQL query to fetch a record by
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
}

// Create a new notification
export async function createNotification(req, res) {
  const query = 'INSERT INTO Notifications SET ?';  // SQL query to insert a new record
  db.query(query, req.body, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ id: results.insertId });
  });
}

// Get a notification by Challenge_ID
export async function getNotificationByChallengeId(req, res) {
  const query = 'SELECT * FROM Notifications WHERE Challenge_ID = ?';  // SQL query to fetch a record by
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
}
