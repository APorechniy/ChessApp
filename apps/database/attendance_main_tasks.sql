CREATE TABLE attendance_main_tasks (
    id VARCHAR(36) PRIMARY KEY UNIQUE NOT NULL,
    attendance_id VARCHAR(36) NOT NULL,
    task_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (attendance_id) REFERENCES attendance(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id),
);