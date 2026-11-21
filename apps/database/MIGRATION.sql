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
    attendance_id VARCHAR(36) DEFAULT NULL,
    name TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    FOREIGN KEY (attendance_id) REFERENCES attendance(id) ON DELETE SET NULL ON UPDATE CASCADE
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

CREATE OR REPLACE VIEW homework_view AS
SELECT
    h.id                                        AS id,
    h.name                                      AS name,
    h.expires_at                                AS expiresAt,
    h.attendance_id                             AS attendanceId,
    COALESCE(
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id',         t.id,
                'name',      t.name,
                'position',   t.position,
                'orderIndex', ht.order_index
            )
        ),
        JSON_ARRAY()
    )                                           AS tasks
FROM homeworks h
LEFT JOIN homework_tasks ht ON ht.homework_id = h.id
LEFT JOIN task_view     t  ON t.id = ht.task_id
GROUP BY h.id, h.name, h.expires_at, h.attendance_id;


---
CREATE OR REPLACE VIEW homework_solution_view (
    id, 
    student, 
    homework, 
    status, 
    startedAt, 
    finishedAt
) AS
SELECT 
    hs.id,
    CASE 
        WHEN sv.id IS NULL THEN NULL
        ELSE JSON_OBJECT(
            'id', sv.id,
            'firstName', sv.firstName,
            'lastName', sv.lastName,
            'birthDate', sv.birthDate,
            'level', sv.level,
            'fshrId', sv.fshrId,
            'fideId', sv.fideId,
            'phone', sv.phone,
            'email', sv.email,
            'joinDate', sv.joinDate,
            'notes', sv.notes,
            'paidLessons', sv.paidLessons,
            'isExcluded', sv.isExcluded,
            'balance', sv.balance
        )
    END AS student,

    CASE 
        WHEN hw.id IS NULL THEN NULL
        ELSE JSON_OBJECT(
            'id', hw.id,
            'name', hw.name,
            'expiresAt', hw.expiresAt,
            'attendanceId', hw.attendanceId,
            'tasks', CAST(hw.tasks AS JSON)
        )
    END AS homework,

    hs.status,
    hs.started_at AS startedAt,
    hs.finished_at AS finishedAt

FROM homework_solutions hs
LEFT JOIN student_view sv ON hs.student_id = sv.id
LEFT JOIN homework_view hw ON hs.homework_id = hw.id;

---
CREATE OR REPLACE VIEW homework_tasks_view AS
SELECT
    ht.id                                        AS id,
    ht.order_index                               AS orderIndex,
    ht.homework_id                               AS homeworkId,
    JSON_OBJECT(
        'id',         tv.id,
        'name',      tv.name,
        'position',   tv.position,
        'learningTopic', tv.learningTopic
    ) as task
FROM homework_tasks ht
LEFT JOIN task_view tv ON tv.id = ht.task_id 
ORDER BY ht.order_index;

---
CREATE OR REPLACE VIEW solution_answer_view AS
SELECT
    sa.id                                        AS id,
    sa.homework_id                               AS homeworkId,
    sa.homework_solution_id                      AS homeworkSolutionId,
    JSON_OBJECT(
        'id',         htv.id,
        'orderIndex', htv.orderIndex,
        'task',       htv.task
    )                                           AS homeworkTask,
    sa.answer_text                              AS answerText,
    sa.started_at                               AS startedAt,
    sa.submitted_at                             AS submittedAt,
    sa.checked_at                               AS checkedAt,
    sa.status,
    sa.coach_comment                            AS coachComment
FROM solution_answers sa
LEFT JOIN homework_tasks_view htv ON htv.id = sa.homework_task_id;