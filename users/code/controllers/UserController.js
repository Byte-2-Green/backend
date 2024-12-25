import db from '../db.js';

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
