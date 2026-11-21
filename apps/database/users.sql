CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role ENUM("admin", "coach", "student", "parent")
);