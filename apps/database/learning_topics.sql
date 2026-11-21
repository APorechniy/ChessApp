CREATE TABLE learning_topics (
    id VARCHAR(36) PRIMARY KEY UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    level_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (level_id) REFERENCES levels(id)
);