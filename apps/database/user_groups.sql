CREATE TABLE user_groups (
    student_id VARCHAR(36) NOT NULL,
    students_group_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (student_id, students_group_id),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (students_group_id) REFERENCES students_groups(id) ON DELETE CASCADE
);