import db from '../db.js';  // Import the MySQL connection

/**
 * Get all users
 */
export async function getAllUsers(req, res) {
  const query = 'SELECT * FROM Users'; 
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
}

/**
 * Get user by ID
 */
export async function getUserById(req, res) {
  const query = 'SELECT * FROM Users WHERE User_id = ?'; 
  const { id } = req.params;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(results[0]);
  });
}

/**
 * Update Total_Co2_saved for a user
 */
export async function updateTotalCo2(req, res) {
  const selectQuery = 'SELECT Total_Co2_saved FROM Users WHERE User_id = ?'; 
  const updateQuery = 'UPDATE Users SET Total_Co2_saved = ? WHERE User_id = ?'; 

  const { id } = req.params;
  const { co2ToAdd } = req.body;

  if (typeof co2ToAdd !== 'number' || co2ToAdd < 0) {
    return res.status(400).json({ error: 'Invalid CO2 value' });
  }

  db.query(selectQuery, [id], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newTotal = results[0].Total_Co2_saved + co2ToAdd;

    db.query(updateQuery, [newTotal, id], (updateErr) => {
      if (updateErr) {
        console.error('Error updating Total_Co2_saved:', updateErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.status(200).json({ message: 'Total CO2 saved updated successfully', newTotal });
    });
  });
}

/**
 * Create a new user
 */
export async function createUser(req, res) {
  const query = `
    INSERT INTO Users (Full_name, Username, Email, Password_hash)
    VALUES (?, ?, ?, ?)
  `; 
  const { fullName, username, email, passwordHash } = req.body;

  db.query(query, [fullName, username, email, passwordHash], (err) => {
    if (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(201).json({ message: 'User created successfully' });
  });
}