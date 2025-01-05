CREATE DATABASE IF NOT EXISTS gallery_db;

USE gallery_db;

CREATE TABLE IF NOT EXISTS Placeholders (
    placeholder_id INT AUTO_INCREMENT PRIMARY KEY,
    position_style VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);