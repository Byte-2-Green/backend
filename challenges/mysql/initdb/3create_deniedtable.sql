USE challenges_db;

CREATE TABLE IF NOT EXISTS DeniedChallenges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Challenge_ID INT NOT NULL,
    denied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Challenge_id) REFERENCES Challenges(Challenge_ID)
);