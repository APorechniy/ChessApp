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