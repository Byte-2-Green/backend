USE challenges_db;

CREATE TABLE IF NOT EXISTS AcceptedChallenges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Challenge_ID INT NOT NULL,
    denied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Challenge_ID) REFERENCES Challenges(Challenge_ID)
);