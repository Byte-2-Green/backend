import db from '../db.js';  // Import the MySQL connection
const axios = require('axios');

export async function getArtByUser (req, res) {
    try {
      // Assuming you have the user microservice's URL
      const userId = req.params.id;
      const userResponse = await axios.get(`http://localhost:3013/users/${userId}`);
      
      if (userResponse.status !== 200) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Proceed with fetching the art data using the retrieved user_id
      const query = 'SELECT * FROM Art WHERE user_id = ?';  // SQL query to fetch art by user
      db.query(query, [userId], (err, results) => {
        if (err) {
          console.error('Error fetching art by user:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
      });
      
    } catch (error) {
      console.error('Error calling user microservice:', error);
      return res.status(500).json({ error: 'Failed to fetch user data' });
    }
  };

// Get all galleries
export async function getAllGalleries (req, res) {
    const query = 'SELECT * FROM Gallery';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching galleries:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json(results);
    });
  };
  
  // Get all art by a specific user
export async function getArtByUser (req, res) {
    const userId = req.params.id;
    const query = 'SELECT * FROM Art WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching art by user:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json(results);
    });
  };
  
  // Get all placeholders
export async function getAllPlaceholders (req, res) {
    const query = 'SELECT * FROM Placeholders';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching placeholders:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json(results);
    });
  };
  
  // Get a specific gallery by id
  export async function getGallery (req, res) {
    const galleryId = req.params.id;
    const query = 'SELECT * FROM Gallery WHERE gallery_id = ?';  // SQL query to fetch a gallery by id
    db.query(query, [galleryId], async (err, results) => {
      if (err) {
        console.error('Error fetching gallery:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Gallery not found' });
      }
  
      try {
        // Assuming gallery includes a `user_id`, fetch additional user data from the user microservice
        const userId = results[0].user_id;  // Get user_id from gallery data
        const userResponse = await axios.get(`http://localhost:3013/users/${userId}`);
  
        if (userResponse.status !== 200) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        // Append user data to gallery response
        const galleryWithUser = {
          ...results[0],
          user: userResponse.data,  // Add user data to the gallery response
        };
        
        res.status(200).json(galleryWithUser);
      } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({ error: 'Failed to fetch user data' });
      }
    });
  };
  
  // Get a specific piece of art by id
  export async function getArt (req, res) {
    const artId = req.params.id;
    const query = 'SELECT * FROM Art WHERE art_id = ?';
    db.query(query, [artId], (err, results) => {
      if (err) {
        console.error('Error fetching art:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Art not found' });
      }
      res.status(200).json(results[0]);
    });
  };
  
  // Get a specific placeholder by id
  export async function getPlaceholder (req, res) {
    const placeholderId = req.params.id;
    const query = 'SELECT * FROM Placeholders WHERE placeholder_id = ?';
    db.query(query, [placeholderId], (err, results) => {
      if (err) {
        console.error('Error fetching placeholder:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Placeholder not found' });
      }
      res.status(200).json(results[0]);
    });
  };
  
  // Update art by id
  export async function updateArt (req, res) {
    const artId = req.params.id;
    const { imageUrl, userId, galleryId, placeholderId } = req.body;
    const query = 'UPDATE Art SET image_url = ?, user_id = ?, gallery_id = ?, placeholder_id = ? WHERE art_id = ?';
    db.query(query, [imageUrl, userId, galleryId, placeholderId, artId], (err, results) => {
      if (err) {
        console.error('Error updating art:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Art not found' });
      }
      res.status(200).json({ message: 'Art updated successfully' });
    });
  };
  
  // Delete art by id
export async function deleteArt (req, res) {
    const artId = req.params.id;
    const query = 'DELETE FROM Art WHERE art_id = ?';
    db.query(query, [artId], (err, results) => {
      if (err) {
        console.error('Error deleting art:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Art not found' });
      }
      res.status(200).json({ message: 'Art deleted successfully' });
    });
  };