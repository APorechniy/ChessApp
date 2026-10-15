CREATE OR REPLACE VIEW student_statistic AS
WITH 
-- 1. Считаем ОБЩЕЕ количество тем для каждого уровня (level_id)
level_topics_total AS (
    SELECT 
        level_id,
        COUNT(id) AS total_level_topics
    FROM learning_topics
    GROUP BY level_id
),

-- 2. Все занятия студента (для расчета посещаемости и активных дней)
student_lessons AS (
    SELECT 
        COALESCE(sa.student_id, a.student_id) AS student_id,
        a.id AS attendance_id,
        a.learning_topic_id,
        a.start_date,
        MAX(CASE WHEN sa.attended = 1 THEN 1 ELSE 0 END) AS is_visited
    FROM attendance a
    LEFT JOIN students_attended sa ON a.id = sa.attendance_id
    WHERE a.is_deleted = 0
    GROUP BY COALESCE(sa.student_id, a.student_id), a.id, a.learning_topic_id, a.start_date
),

-- 3. Массив уникальных дней занятий за последний месяц [1, 5, 8]
active_days_monthly AS (
    SELECT DISTINCT
        student_id,
        DAY(start_date) AS day_num
    FROM student_lessons
    WHERE is_visited = 1 
      AND start_date >= NOW() - INTERVAL 1 MONTH
    ORDER BY day_num ASC
),
active_days_array AS (
    SELECT 
        student_id,
        JSON_ARRAYAGG(day_num) AS active_days_json
    FROM active_days_monthly
    GROUP BY student_id
),

-- 4. Все уникальные задачи из посещенных занятий
all_attendance_tasks AS (
    SELECT amt.attendance_id, amt.task_id 
    FROM attendance_main_tasks amt
    JOIN tasks t ON amt.task_id = t.id WHERE t.is_removed = 0
    UNION
    SELECT aat.attendance_id, aat.task_id 
    FROM attendance_additional_tasks aat
    JOIN tasks t ON aat.task_id = t.id WHERE t.is_removed = 0
),
student_tasks AS (
    SELECT 
        sl.student_id,
        COUNT(DISTINCT at.task_id) AS tasks_solved_count
    FROM student_lessons sl
    JOIN all_attendance_tasks at ON sl.attendance_id = at.attendance_id
    WHERE sl.is_visited = 1
    GROUP BY sl.student_id
)

-- 5. Итоговый выбор с формированием JSON-объектов
SELECT 
    s.id AS studentId,

    -- 1) Массив номеров дней занятий за последний месяц: [1, 5, 8]
    COALESCE(ada.active_days_json, JSON_ARRAY()) AS activeDaysLastMonth,

    -- 2) Объект Занятий: {"visited": посещенные, "total": всего назначенных этому студенту}
    JSON_OBJECT(
        'visited', COUNT(DISTINCT CASE WHEN sl.is_visited = 1 THEN sl.attendance_id END),
        'total', COUNT(DISTINCT sl.attendance_id)
    ) AS lessons,

    -- 3) Объект Тем: 
    --    learned = пройдено уникальных тем на посещенных уроках
    --    total = всего тем в таблице learning_topics для level_id данного студента
    JSON_OBJECT(
        'learned', COUNT(DISTINCT CASE WHEN sl.is_visited = 1 THEN sl.learning_topic_id END),
        'total', COALESCE(ltt.total_level_topics, 0)
    ) AS topics,

    -- 4) Количество решенных уникальных задач
    COALESCE(st.tasks_solved_count, 0) AS tasksSolvedCount

FROM students s
-- Привязываем темы напрямую по уровням (students.level_id = learning_topics.level_id)
LEFT JOIN level_topics_total ltt ON s.level_id = ltt.level_id
LEFT JOIN student_lessons sl ON s.id = sl.student_id
LEFT JOIN active_days_array ada ON s.id = ada.student_id
LEFT JOIN student_tasks st ON s.id = st.student_id

GROUP BY 
    s.id, 
    ltt.total_level_topics,
    ada.active_days_json, 
    st.tasks_solved_count;