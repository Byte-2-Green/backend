CREATE DATABASE IF NOT EXISTS challenges_db;

USE challenges_db;

CREATE TABLE IF NOT EXISTS Notifications (
   Notification_ID INT PRIMARY KEY AUTO_INCREMENT, -- Primary Key
    Title VARCHAR(255) NOT NULL,                     -- Notification title
    Description TEXT,                                -- Notification description
    Challenge_ID INT,                                -- Foreign key referencing Challenges
    FOREIGN KEY (Challenge_ID) REFERENCES Challenges(Challenge_ID)
        ON DELETE CASCADE                            -- Deletes notification if related challenge is deleted
        ON UPDATE CASCADE                            -- Updates foreign key if challenge ID changes
);