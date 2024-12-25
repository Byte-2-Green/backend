import db from '../db.js';

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

// Update weekly statistics
export const updateWeeklyStatistics = (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT c.C02_emission, ac.accepted_at
    FROM challenges_db.AcceptedChallenges ac
    JOIN challenges_db.Challenges c ON ac.Challenge_ID = c.Challenge_ID
    WHERE ac.User_ID = ? AND ac.accepted_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching weekly data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const totalCO2 = results.reduce((sum, challenge) => sum + challenge.C02_emission, 0);
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const endOfWeek = new Date();
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const insertQuery = `
      INSERT INTO WeeklyStatistics (User_ID, Week_Start, Week_End, Total_CO2)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE Total_CO2 = VALUES(Total_CO2)
    `;
    db.query(insertQuery, [userId, startOfWeek, endOfWeek, totalCO2], (insertErr) => {
      if (insertErr) {
        console.error('Error inserting weekly statistics:', insertErr);
        return res.status(500).json({ error: 'Failed to save weekly statistics' });
      }
      res.status(200).json({ message: 'Weekly statistics updated successfully!' });
    });
  });
};

// Update yearly statistics
export const updateYearlyStatistics = (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT SUM(Total_CO2) AS Total_CO2, YEAR(Week_Start) AS Year, MONTH(Week_Start) AS Month
    FROM WeeklyStatistics
    WHERE User_ID = ?
    GROUP BY YEAR(Week_Start), MONTH(Week_Start)
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching yearly data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    results.forEach((row) => {
      const insertQuery = `
        INSERT INTO YearlyStatistics (User_ID, Year, Month, Total_CO2)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE Total_CO2 = VALUES(Total_CO2)
      `;
      db.query(insertQuery, [userId, row.Year, row.Month, row.Total_CO2], (insertErr) => {
        if (insertErr) {
          console.error('Error inserting yearly statistics:', insertErr);
          return res.status(500).json({ error: 'Failed to save yearly statistics' });
        }
      });
    });
    res.status(200).json({ message: 'Yearly statistics updated successfully!' });
  });
};
