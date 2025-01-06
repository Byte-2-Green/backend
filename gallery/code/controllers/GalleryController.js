import db from '../db.js';  // Import the MySQL connection
import axios from 'axios';

//Add a new art and put it in the first free placeholder of the user
export async function addNewArt(req, res) {
  const { galleryId, userId } = req.params;

  const getUnlockedFramesQuery = `SELECT unlocked_frames FROM Gallery WHERE gallery_id = ?`;

  db.query(getUnlockedFramesQuery, [galleryId], (err, result) => {
    if (err) {
      console.error('Error fetching unlocked frames:', err);
      return res.status(500).json({ message: 'Error fetching unlocked frames.' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Gallery not found.' });
    }

    const unlockedFrames = result[0].unlocked_frames;

    const getUsedPlaceholdersQuery = `SELECT placeholder_id FROM Art WHERE gallery_id = ? AND user_id = ?`;

    db.query(getUsedPlaceholdersQuery, [galleryId, userId], (err, usedPlaceholders) => {
      if (err) {
        console.error('Error fetching used placeholders:', err);
        return res.status(500).json({ message: 'Error checking used placeholders.' });
      }

      const usedPlaceholderIds = usedPlaceholders.map((art) => art.placeholder_id);
      let availablePlaceholder = null;

      for (let i = 1; i <= unlockedFrames; i++) {
        if (!usedPlaceholderIds.includes(i)) {
          availablePlaceholder = i;
          break;
        }
      }

      if (!availablePlaceholder) {
        return res.status(400).json({ message: 'No available placeholders in the gallery.' });
      }

      // Create a new image name (gallery01.jpg, gallery02.jpg, etc.)
      const imageName = `gallery${String(availablePlaceholder).padStart(2, '0')}.jpg`;
      const imageUrl = `/images/${imageName}`;

      const insertArtQuery = `
        INSERT INTO Art (gallery_id, user_id, image_url, placeholder_id)
        VALUES (?, ?, ?, ?)
      `;

      db.query(insertArtQuery, [galleryId, userId, imageUrl, availablePlaceholder], (err, result) => {
        if (err) {
          console.error('Error inserting new art:', err);
          return res.status(500).json({ message: 'Error saving new art.' });
        }

        res.status(200).json({
          message: 'Art added successfully',
          art_id: result.insertId,
          image_url: imageUrl,
        });
      });
    });
  });
};

//Get all art by a user
export async function getArtByUser(req, res) {
  try {
    const userId = req.params.id;

    // Fetch user data from the microservice
    const userResponse = await axios.get(`http://host.docker.internal:3013/user/${userId}`);
    if (userResponse.status !== 200) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Query the database for art related to this user
    const query = 'SELECT * FROM Art WHERE user_id = ?';
    console.log(`Executing query with userId: ${userId}`);
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching art by user:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      console.log(results);
      res.status(200).json(results);
    });

  } catch (error) {
    console.error('Error calling user microservice:', error);
    return res.status(500).json({ error: 'Failed to fetch user data', details: error.message});
  }
}

// Get all galleries
export async function getAllGalleries(req, res) {
  const query = 'SELECT * FROM Gallery';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching galleries:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
};

// Get all placeholders
export async function getAllPlaceholders(req, res) {
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
export async function getGallery(req, res) {
  const galleryId = req.params.id;
  const query = 'SELECT * FROM Gallery WHERE gallery_id = ?';

  db.query(query, [galleryId], async (err, results) => {
    if (err) {
      console.error('Error fetching gallery:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Gallery not found' });
    }

    // Declare userResponse outside the try block
    let userResponse = null;

    try {
      // Fetch additional user data
      const userId = results[0].user_id;
      userResponse = await axios.get(`http://host.docker.internal:3013/user/${userId}`);

      if (userResponse.status !== 200) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Append user data to gallery response
      const galleryWithUser = {
        ...results[0],
        user: userResponse.data,
      };

      res.status(200).json(galleryWithUser);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      return res.status(500).json({
        error: 'Failed to fetch user data',
        details: error.message,
        userResponse: userResponse ? userResponse.data : null,
      });
    }
  });
}

// Get a specific piece of art by id
export async function getArt(req, res) {
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
export async function getPlaceholder(req, res) {
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
export async function updateArt(req, res) {
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
export async function deleteArt(req, res) {
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