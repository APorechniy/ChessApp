ALTER TABLE tasks ADD COLUMN description TEXT;

DROP VIEW task_view;
DROP VIEW attendance_additional_tasks_view;
DROP VIEW attendance_main_tasks_view;
DROP VIEW homework_view;
DROP VIEW homework_tasks_view;

CREATE VIEW attendance_additional_tasks_view AS
SELECT 
    aat.attendance_id,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            "id", tv.id, 
            "name", tv.name, 
            "description", tv.description,
            "learningTopic", tv.learningTopic, 
            "quality", tv.quality
        )
    ) as additional_tasks
FROM attendance_additional_tasks aat
LEFT JOIN task_view tv ON tv.id = aat.task_id
GROUP BY aat.attendance_id;

CREATE VIEW attendance_main_tasks_view AS
SELECT 
    amt.attendance_id,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            "id", tv.id, 
            "name", tv.name, 
            "description", tv.description,
            "learningTopic", tv.learningTopic, 
            "quality", tv.quality
        )
    ) as main_tasks
FROM attendance_main_tasks amt
LEFT JOIN task_view tv ON tv.id = amt.task_id
GROUP BY amt.attendance_id;

CREATE OR REPLACE VIEW homework_tasks_view AS
SELECT
    ht.id                                        AS id,
    ht.order_index                               AS orderIndex,
    ht.homework_id                               AS homeworkId,
    JSON_OBJECT(
        'id',         tv.id,
        'name',      tv.name,
        'description', tv.description,
        'position',   tv.position,
        'learningTopic', tv.learningTopic
    ) as task
FROM homework_tasks ht
LEFT JOIN task_view tv ON tv.id = ht.task_id 
ORDER BY ht.order_index;

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
                'description', t.description,
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

CREATE VIEW task_view AS 
SELECT t.id, t.name, t.description, t.position,
    JSON_OBJECT("id", ltv.id, "name", ltv.name, "description", ltv.description, "level", ltv.level) as learningTopic,    
    JSON_OBJECT("id", q.id, "name", q.name, "label", q.label, "labelFor", q.labelFor, "lightColor", q.lightColor, "darkColor", q.darkColor) as quality  
FROM tasks t

LEFT JOIN quality_view q ON q.id = t.quality_id
LEFT JOIN learning_topic_view ltv ON ltv.id = t.learning_topic_id
WHERE t.is_removed = 0;