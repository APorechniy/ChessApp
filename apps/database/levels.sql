CREATE TABLE levels (
    id VARCHAR(36) PRIMARY KEY UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    hours_required INTEGER NOT NULL,
    description TEXT
);