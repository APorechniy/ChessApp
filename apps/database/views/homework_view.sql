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