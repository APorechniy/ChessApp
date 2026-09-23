DROP VIEW attendance_base_view;

CREATE VIEW attendance_base_view AS 
SELECT a.id, a.start_date AS startDate, a.end_date AS endDate, 
    a.is_online AS isOnline, a.meet_link as meetLink, a.is_freeze as isFreeze, 
    a.type, a.is_deleted as isDeleted, a.preset_id AS presetId,
    JSON_OBJECT("id", ltv.id, "name", ltv.name, "description", ltv.description, "level", ltv.level) as learningTopic,  
    NULLIF(
        JSON_OBJECT("id", s.id, "firstName", s.firstName, "lastName", s.lastName),
        JSON_OBJECT("id", NULL, "firstName", NULL, "lastName", NULL)
    ) as `student`,
    NULLIF(
        JSON_OBJECT("id", sgv.id, "name", sgv.name, "description", sgv.description, "color", sgv.color, "students", sgv.students),
        JSON_OBJECT("id", NULL, "name", NULL, "description", NULL, "color", NULL, "students", NULL)
    ) as `group`,  
    JSON_OBJECT("id", cv.id, "firstName", cv.firstName, "lastName", cv.lastName) as coach,
    JSON_OBJECT("id", q.id, "name", q.name, "label", q.label, "lightColor", q.lightColor, "darkColor", q.darkColor) as quality,

    (
        SELECT main_tasks
        FROM attendance_main_tasks_view amtv
        WHERE amtv.attendance_id = a.id
    ) AS tasks,
    
    (
        SELECT additional_tasks
        FROM attendance_additional_tasks_view aatv
        WHERE aatv.attendance_id = a.id
    ) AS additionalTasks
FROM attendance a      

LEFT JOIN student_view s ON s.id = a.student_id 
LEFT JOIN students_group_view sgv ON sgv.id = a.students_group_id    
LEFT JOIN coach_view cv ON cv.id = a.coach_id     
LEFT JOIN learning_topic_view ltv ON ltv.id = a.learning_topic_id
LEFT JOIN quality_view q ON q.id = a.quality_id

WHERE a.is_deleted=0;

----

ALTER TABLE attendance DROP COLUMN homework_done;

---

CREATE TABLE homeworks (
    id VARCHAR(36) PRIMARY KEY,
    attendance_id VARCHAR(36) NOT NULL,
    name TEXT NOT NULL,
    expired_at TIMESTAMP NOT NULL,
    FOREIGN KEY (attendance_id) REFERENCES attendance(id) ON DELETE CASCADE ON UPDATE CASCADE
);

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