CREATE TABLE IF NOT EXISTS Feedback (
    Feedback_ID INT AUTO_INCREMENT PRIMARY KEY,
    Challenge_ID INT NOT NULL,
    feedback_text TEXT,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Challenge_ID) REFERENCES Challenges(Challenge_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
