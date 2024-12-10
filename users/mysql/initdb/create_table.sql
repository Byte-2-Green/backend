CREATE DATABASE IF NOT EXISTS educational_db;

USE educational_db;

CREATE TABLE IF NOT EXISTS Food_for_Thought (
  FfT_ID INT AUTO_INCREMENT PRIMARY KEY,
  Title VARCHAR(255) NOT NULL,
  Description TEXT NOT NULL,
  Category VARCHAR(100) NOT NULL,
  Icon TEXT NOT NULL
);

