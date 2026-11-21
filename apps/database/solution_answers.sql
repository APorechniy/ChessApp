CREATE TABLE solution_answers (
    id VARCHAR(36) PRIMARY KEY,
    homework_id VARCHAR(36) NOT NULL,
    homework_solution_id VARCHAR(36) NOT NULL,
    homework_task_id VARCHAR(36) NOT NULL,
    answer_text TEXT,
    started_at TIMESTAMP,
    submitted_at TIMESTAMP,
    checked_at TIMESTAMP,
    status ENUM('not_solved','check','error','almost','success') NOT NULL DEFAULT 'not_solved',
    coach_comment TEXT,
    CONSTRAINT uq_answer_solution_task UNIQUE (homework_solution_id, homework_task_id),
    FOREIGN KEY (homework_solution_id, homework_id) REFERENCES homework_solutions(id, homework_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (homework_task_id, homework_id) REFERENCES homework_tasks(id, homework_id) ON DELETE CASCADE ON UPDATE CASCADE
);