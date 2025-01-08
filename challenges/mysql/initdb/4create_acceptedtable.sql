USE challenges_db;

CREATE TABLE IF NOT EXISTS AcceptedChallenges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    Challenge_ID INT NOT NULL,
    accepted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    photo VARCHAR(2083) NULL,
    FOREIGN KEY (Challenge_ID) REFERENCES Challenges(Challenge_ID)
);