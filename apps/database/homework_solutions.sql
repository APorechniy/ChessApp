CREATE TABLE homework_solutions (
    id VARCHAR(36) PRIMARY KEY,
    student_id VARCHAR(36) NOT NULL,
    homework_id VARCHAR(36) NOT NULL,
    status ENUM('new','in_progress','solved','checked') NOT NULL DEFAULT 'new',
    started_at TIMESTAMP,
    finished_at TIMESTAMP,
    UNIQUE (id, homework_id),
    CONSTRAINT uq_solution_homework_student UNIQUE (homework_id, student_id),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (homework_id) REFERENCES homeworks(id) ON DELETE CASCADE ON UPDATE CASCADE
);