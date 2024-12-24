import db from '../db.js';  // Import the MySQL connection

// Get a user by ID
export const getUserById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM Users WHERE User_id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(result);
  });
};

// Add a new user
export const addUser = (req, res) => {
  const { full_name, username, email, password_hash } = req.body;
  db.query(
    'INSERT INTO Users (Full_name, Username, Email, Password_hash) VALUES (?, ?, ?, ?)',
    [full_name, username, email, password_hash],
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error executing query');
        return;
      }
      res.status(201).json({ message: 'User added successfully', userId: result.insertId });
    }
  );
};

// Update a user
export const updateUser = (req, res) => {
  const id = req.params.id;
  const { full_name, username, email, password_hash } = req.body;
  db.query(
    'UPDATE Users SET Full_name = ?, Username = ?, Email = ?, Password_hash = ? WHERE User_id = ?',
    [full_name, username, email, password_hash, id],
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error executing query');
        return;
      }
      res.json({ message: 'User updated successfully' });
    }
  );
};

// Delete a user
export const deleteUser = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Users WHERE User_id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json({ message: 'User deleted successfully' });
  });
};

//Get all statistics
export const getAllStatistics = (req, res) => {
  db.query('SELECT * FROM Statistics', (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(result);
  });
}

// Get statistics by ID
export const getStatsById = (req, res) => {
  const statId = req.params.statId;
  db.query('SELECT * FROM Statistics WHERE Stat_ID = ?', [statId], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(result);
  });
}

// Get statistics by user ID
export const getStatsByUserId = (req, res) => {
  const userId = req.params.userId;
  db.query(
    'SELECT * FROM Statistics WHERE User_ID = ?',
    [userId],
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error executing query');
        return;
      }
      res.json(result);
    }
  );
};

// Add new statistics
export const addStatistics = (req, res) => {
  const { stat_name, stat_value, user_id } = req.body;
  db.query(
    'INSERT INTO Statistics (Stat_name, Stat_value, User_ID) VALUES (?, ?, ?)',
    [stat_name, stat_value, user_id],
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error executing query');
        return;
      }
      res.status(201).json({ message: 'Statistics added successfully', statId: result.insertId });
    }
  );
};

// Update statistics
export const updateStatistics = (req, res) => {
  const statId = req.params.statId;
  const { stat_name, stat_value } = req.body;
  db.query(
    'UPDATE Statistics SET Stat_name = ?, Stat_value = ? WHERE Stat_ID = ?',
    [stat_name, stat_value, statId],
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error executing query');
        return;
      }
      res.json({ message: 'Statistics updated successfully' });
    }
  );
};

// Delete statistics
export const deleteStatistics = (req, res) => {
  const statId = req.params.statId;
  db.query('DELETE FROM Statistics WHERE Stat_ID = ?', [statId], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.json({ message: 'Statistics deleted successfully' });
  });
};

// Connecting the statistics with the challenges and updating the table
export const updateStatisticsFromChallenges = (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT c.Title, c.C02_emission
    FROM challenges_db.AcceptedChallenges ac
    JOIN challenges_db.Challenges c ON ac.Challenge_ID = c.Challenge_ID
    WHERE ac.id IN (
      SELECT id
      FROM challenges_db.AcceptedChallenges
    )
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching accepted challenges:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    let totalCO2Saved = results.reduce((sum, challenge) => sum + challenge.C02_emission, 0);

    const updateQuery = `
      INSERT INTO users_db.Statistics (Stat_name, Stat_value, User_ID)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE Stat_value = Stat_value + VALUES(Stat_value)
    `;
    db.query(updateQuery, ['CO2 Saved', totalCO2Saved, userId], (updateErr) => {
      if (updateErr) {
        console.error('Error updating statistics:', updateErr);
        return res.status(500).json({ error: 'Error updating statistics' });
      }

      res.status(200).json({ message: 'Statistics updated successfully!' });
    });
  });
};
