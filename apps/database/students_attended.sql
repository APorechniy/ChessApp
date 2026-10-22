CREATE TABLE students_attended (
    student_id VARCHAR(36) NOT NULL,
    attendance_id VARCHAR(36) NOT NULL,
    attended BOOLEAN DEFAULT 0,
    PRIMARY KEY (student_id, attendance_id),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (attendance_id) REFERENCES attendance(id) ON DELETE CASCADE
);