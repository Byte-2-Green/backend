CREATE DATABASE IF NOT EXISTS challenges_db;

USE challenges_db;

CREATE TABLE IF NOT EXISTS Notifications (
   Notification_ID INT PRIMARY KEY AUTO_INCREMENT, -- Primary Key
    Title VARCHAR(255) NOT NULL,                     -- Notification title
    Description TEXT                                 -- Notification description
);