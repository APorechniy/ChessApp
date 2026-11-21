CREATE VIEW attendance_additional_tasks_view AS
SELECT 
    aat.attendance_id,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            "id", tv.id, 
            "name", tv.name, 
            "learningTopic", tv.learningTopic, 
            "quality", tv.quality
        )
    ) as additional_tasks
FROM attendance_additional_tasks aat
LEFT JOIN task_view tv ON tv.id = aat.task_id
GROUP BY aat.attendance_id;