import db from '../db.js';  // Import the MySQL connection

/**
 * Get all Challenges
 */
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
  const { id } = req.params;

  /**
 * Validate entrypoint
 */

  if (!id) {
    return res.status(400).json({ error: 'Challenge ID are required.' });
  }

  /**
 * Verify if the Id exists in the database
 */
  const checkQuery = 'SELECT * FROM Challenges WHERE Challenge_ID = ?';
  db.query(checkQuery, [id], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking challenge:', checkErr);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (checkResults.length === 0) {
      return res.status(404).json({ error: 'Challenge not found.' });
    }

/**
 * Insert the challenge into the DeniedChallenges table
 */
    const insertQuery = 'INSERT INTO DeniedChallenges (Challenge_ID) VALUES (?)';
    db.query(insertQuery, [id], (insertErr, insertResults) => {
      if (insertErr) {
        console.error('Error denying challenge:', insertErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(201).json({ message: 'Challenge denied successfully.' });
    });
  });
}

/**
 * Get the DeniedChallenges
 */
export async function getDeniedChallenges(req, res) {
  const query = `
      SELECT DeniedChallenges.Challenge_ID, Challenges.Title, Challenges.Description
      FROM DeniedChallenges
      JOIN Challenges ON DeniedChallenges.Challenge_ID = Challenges.Challenge_ID
  `;
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching denied challenges:', err);
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
