import db from '../db.js';  // Import the MySQL connection

// Get all Food for Thought
export async function responseFoodForThought(req, res) {
  const query = `SELECT * FROM challenges`;  // SQL query to fetch all records
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
}

// Add a new Food for Thought
export async function updateFoodForThought(req, res) {
  // Get data from the request body or query parameters
  let { id, thought, category } = req.body;  // Assuming the data is sent in the body
  
  // Check if required fields are provided
  if (!id || !thought || !category) {
    return res.status(400).json({ error: 'Missing required fields: id, thought, category' });
  }

  // Insert new food for thought into the database
  const query = 'INSERT INTO challenges (FfT_ID, Title, Description, Category) VALUES (?, ?, ?, ?)';
  
  db.query(query, [id, thought, category, time], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({
      message: `Food for Thought added successfully!`,
      insertedId: results.insertId,  // Returning the ID of the newly inserted record
    });
  });
}

// Get a specific Food for Thought by ID
export async function responseByIdFoodForThought(req, res) {
  let id = req.params.id;
  const query = 'SELECT * FROM challenges WHERE FfT_ID = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Food for thought not found' });
    }
    res.status(200).json(results[0]);  // Return the first (and only) result
  });
}

// Get Food for Thought by category
export async function responseByCategoryExample(req, res) {
  let category = req.params.category;
  const query = 'SELECT * FROM challenges WHERE Category = ?';
  
  db.query(query, [category], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'No food for thought found in this category' });
    }
    res.status(200).json(results);  // Return filtered results
  });
}
