CREATE VIEW students_group_view (id, name, description, color, students) 
AS SELECT 
    sg.id,
    sg.name,
    sg.description,
    sg.color,
    COALESCE(
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', sv.id,
                'firstName', sv.firstName,
                'lastName', sv.lastName
            )
        ),
        JSON_ARRAY()
    ) as students
FROM students_groups sg

LEFT JOIN user_groups ug ON sg.id = ug.students_group_id
LEFT JOIN student_view sv ON ug.student_id = sv.id

WHERE sg.is_deleted = 0

GROUP BY sg.id, sg.name, sg.description, sg.color;