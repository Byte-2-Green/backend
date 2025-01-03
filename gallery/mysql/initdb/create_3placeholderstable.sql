CREATE DATABASE IF NOT EXISTS gallery_db;

USE gallery_db;

CREATE TABLE Placeholders (
    Placeholder_id SERIAL PRIMARY KEY,
    Art_id INT REFERENCES art(id) ON DELETE CASCADE,
    Placeholder_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);