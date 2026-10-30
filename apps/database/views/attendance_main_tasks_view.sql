CREATE VIEW attendance_main_tasks_view AS
SELECT 
    amt.attendance_id,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            "id", tv.id, 
            "name", tv.name, 
            "learningTopic", tv.learningTopic, 
            "quality", tv.quality
        )
    ) as main_tasks
FROM attendance_main_tasks amt
LEFT JOIN task_view tv ON tv.id = amt.task_id
GROUP BY amt.attendance_id;