CREATE TABLE students_balance_transaction (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    student_id VARCHAR(36) NOT NULL,
    attendance_id VARCHAR(36),
    payment_id VARCHAR(36),
    type ENUM("REPLENISHMENT", "WRITE-OFF") NOT NULL,
    sum INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (attendance_id) REFERENCES attendance(id),
    FOREIGN KEY (payment_id) REFERENCES payments(id)
);