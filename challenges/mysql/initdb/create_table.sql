CREATE DATABASE IF NOT EXISTS challenges_db;

USE challenges_db;

CREATE TABLE IF NOT EXISTS Challenges (
  Challenge_ID INT AUTO_INCREMENT PRIMARY KEY,
  Title VARCHAR(255) NOT NULL,
  Description TEXT NOT NULL,
  Category VARCHAR(100) NOT NULL
);

