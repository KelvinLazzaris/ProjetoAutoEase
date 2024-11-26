CREATE TABLE users_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId BIGINT UNSIGNED NOT NULL,
    medicines JSON NOT NULL,
    food TEXT,
    environmentalFactors JSON,
    hoursSlept FLOAT CHECK (hoursSlept BETWEEN 0 AND 24),
    physicalActivityHours FLOAT,
    additionalInfo TEXT,
    crisis BOOLEAN NOT NULL,
    crisisDuration INT,
    symptoms JSON,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);
