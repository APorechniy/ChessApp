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