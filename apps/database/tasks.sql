CREATE TABLE tasks (
    id VARCHAR(36) PRIMARY KEY UNIQUE NOT NULL,
    name VARCHAR(100) UNIQUE,
    learning_topic_id VARCHAR(36) NOT NULL,
    quality_id VARCHAR(36) NOT NULL,
    position VARCHAR(87),
    is_removed BOOLEAN DEFAULT 0,
    FOREIGN KEY (learning_topic_id) REFERENCES learning_topics(id),
    FOREIGN KEY (quality_id) REFERENCES quality(id)
);