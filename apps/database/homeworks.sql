CREATE TABLE homeworks (
    id VARCHAR(36) PRIMARY KEY,
    attendance_id VARCHAR(36) NOT NULL,
    name TEXT NOT NULL,
    expired_at TIMESTAMP NOT NULL,
    FOREIGN KEY (attendance_id) REFERENCES attendance(id) ON DELETE CASCADE ON UPDATE CASCADE
);