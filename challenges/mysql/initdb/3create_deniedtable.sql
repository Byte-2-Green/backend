USE challenges_db;

CREATE TABLE IF NOT EXISTS DeniedChallenges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    Challenge_ID INT NOT NULL,
    denied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Challenge_ID) REFERENCES Challenges(Challenge_ID)
);