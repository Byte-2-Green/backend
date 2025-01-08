import db from '../db.js';

/**
 * Get all Challenges
 */
export async function test(req, res) {
  const query = 'SELECT * FROM Challenges';
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
  const user_id = 1; // Default user_id for testing; replace with session user ID later

  if (!id) {
    return res.status(400).json({ error: 'Challenge ID is required.' });
  }

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
    const insertQuery =
      'INSERT INTO DeniedChallenges (user_id, Challenge_ID) VALUES (?, ?)';
    db.query(insertQuery, [user_id, id], (insertErr) => {
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
      SELECT DeniedChallenges.Challenge_ID, Challenges.Title, Challenges.Description, DeniedChallenges.denied_at
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

/**
 * Accept a challenge
 */
export async function acceptChallenge(req, res) {
  const { id } = req.params;
  const user_id = 1; // Default user_id for testing

  if (!id) {
    return res.status(400).json({ error: 'Challenge ID is required.' });
  }

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
     * Insert the challenge into the AcceptedChallenges table
     */
    const insertQuery =
      'INSERT INTO AcceptedChallenges (user_id, Challenge_ID) VALUES (?, ?)';
    db.query(insertQuery, [user_id, id], (insertErr) => {
      if (insertErr) {
        console.error('Error accepting challenge:', insertErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(201).json({ message: 'Challenge accepted successfully.' });
    });
  });
}


/**
 * Get the AcceptedChallenges
 * TODO: logic for getting accepted challenges is wrong
 */
export async function getAcceptedChallenges(req, res) {
  const query = `
      SELECT AcceptedChallenges.Challenge_ID, Challenges.Title, Challenges.Description, AcceptedChallenges.accepted_at
      FROM AcceptedChallenges
      JOIN Challenges ON AcceptedChallenges.Challenge_ID = Challenges.Challenge_ID
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching accepted challenges:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
}

// Get all notifications 
export async function getNotifications(req, res) {
  const query = 'SELECT * FROM Notifications';
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
  const query = 'SELECT * FROM Notifications WHERE id = ?';
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
  const query = 'INSERT INTO Notifications SET ?';
  db.query(query, req.body, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ id: results.insertId });
  });
}

//save feedback function
export async function saveFeedback(req, res) {

  const { Challenge_ID, feedback_text, rating } = req.query;
  if (!Challenge_ID || !rating) {
    return res.status(400).json({ error: 'Challenge_ID and rating are required.' });
  }

  const checkQuery = 'SELECT * FROM Challenges WHERE Challenge_ID = ?';
  db.query(checkQuery, [Challenge_ID], (checkErr, checkResults) => {
    if (checkErr) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (checkResults.length === 0) {
      return res.status(404).json({ error: 'Challenge not found.' });
    }

    const insertQuery = 'INSERT INTO Feedback (Challenge_ID, feedback_text, rating) VALUES (?, ?, ?)';
    db.query(insertQuery, [Challenge_ID, feedback_text, rating], (insertErr, insertResults) => {
      if (insertErr) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.status(201).json({
        message: 'Feedback saved!.',
        Feedback_ID: insertResults.insertId
      });
    });
  });
}