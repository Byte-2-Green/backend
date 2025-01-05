CREATE DATABASE IF NOT EXISTS gallery_db;

USE gallery_db;

CREATE TABLE IF NOT EXISTS Art (
    art_id INT AUTO_INCREMENT PRIMARY KEY,
    gallery_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (gallery_id) REFERENCES Gallery(gallery_id),
    FOREIGN KEY (user_id) REFERENCES Gallery(user_id),
    image_url VARCHAR(500) NOT NULL,
    placeholder_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);