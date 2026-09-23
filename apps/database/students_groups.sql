CREATE TABLE students_groups (
    id VARCHAR(36) PRIMARY KEY UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL DEFAULT 'Группа',
    description TEXT,
    color VARCHAR(6),
    is_deleted BOOLEAN DEFAULT 0
);