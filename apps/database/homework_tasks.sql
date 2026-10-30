CREATE TABLE homework_tasks (
    id VARCHAR(36) PRIMARY KEY,
    order_index INTEGER NOT NULL,
    homework_id VARCHAR(36) NOT NULL,
    task_id VARCHAR(36) NOT NULL,
    UNIQUE (id, homework_id),
    CONSTRAINT uq_homework_task UNIQUE (homework_id, task_id),
    FOREIGN KEY (homework_id) REFERENCES homeworks(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE RESTRICT ON UPDATE CASCADE
);