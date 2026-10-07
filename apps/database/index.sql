-- TABLES
CREATE TABLE levels (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    hours_required INTEGER NOT NULL,
    description TEXT
);

CREATE TABLE students_groups (
    id VARCHAR(36) PRIMARY KEY UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL DEFAULT "Группа",
    description TEXT,
    color VARCHAR(6),
    is_deleted BOOLEAN DEFAULT 0
);

CREATE TABLE settings (
    id VARCHAR(36) PRIMARY KEY NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL DEFAULT "Клуб",
    logo VARCHAR(200),
    vk_link VARCHAR(100),
    email VARCHAR(50),
    phone VARCHAR(12),
    legal_name VARCHAR(200),
    itin VARCHAR(12),
    ukassa_id VARCHAR(10),
    ukassa_api_key VARCHAR(100)
);

CREATE TABLE payments (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    status ENUM("pending", "waiting_for_capture", "succeeded", "canceled"),
    amount_value VARCHAR(50),
    amount_currency VARCHAR(5) DEFAULT "RUB",
    description TEXT,
    recipient_account_id VARCHAR(50) NOT NULL,
    recipient_gateway_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    confirmation_type VARCHAR(30) NOT NULL,
    confirmation_token VARCHAR(100) NOT NULL,
    test BOOLEAN DEFAULT 1,
    paid BOOLEAN DEFAULT 0,
    refundable BOOLEAN DEFAULT 0,
    metadata TEXT
);

CREATE TABLE quality (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    label VARCHAR(50) NOT NULL,
    label_for VARCHAR(50) NOT NULL,
    light_color VARCHAR(9) NOT NULL,
    dark_color VARCHAR(9) NOT NULL
);

CREATE TABLE learning_topics (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    level_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (level_id) REFERENCES levels(id)
);

CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role ENUM("admin", "coach", "student", "parent")
);

CREATE TABLE user_payments (
    user_id VARCHAR(36) NOT NULL,
    payment_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (payment_id) REFERENCES payments(id)
);

CREATE TABLE user_balance (
    user_id VARCHAR(36) UNIQUE NOT NULL,
    balance DECIMAL NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tasks (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    name VARCHAR(100) UNIQUE,
    learning_topic_id VARCHAR(36) NOT NULL,
    quality_id VARCHAR(36) NOT NULL,
    is_removed BOOLEAN DEFAULT 0,
    FOREIGN KEY (learning_topic_id) REFERENCES learning_topics(id),
    FOREIGN KEY (quality_id) REFERENCES quality(id)
);

CREATE TABLE coaches (
    id VARCHAR(36) PRIMARY KEY UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date VARCHAR(50),
    avatar VARCHAR(200),
    phone VARCHAR(20),
    email VARCHAR(100),
    fshr_id int(11) DEFAULT NULL,
    fide_id int(11) DEFAULT NULL,
    join_date DATE DEFAULT (curdate()),
    biography TEXT,
    is_fired BOOLEAN DEFAULT 0,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE students (
    id VARCHAR(36) PRIMARY KEY UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date VARCHAR(50),
    avatar VARCHAR(200),
    level_id VARCHAR(36) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    fshr_id int(11) DEFAULT NULL,
    fide_id int(11) DEFAULT NULL,
    join_date DATE DEFAULT (curdate()),
    notes TEXT,
    paid_lessons INTEGER DEFAULT 0,
    is_excluded BOOLEAN DEFAULT 0,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (level_id) REFERENCES levels(id)
);

CREATE TABLE user_groups (
    student_id VARCHAR(36) NOT NULL,
    students_group_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (student_id, students_group_id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (students_group_id) REFERENCES students_groups(id)
);

CREATE TABLE chess_openings (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    name VARCHAR(100)
);

CREATE TABLE chess_games ( 
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    white_player VARCHAR(100) NOT NULL, 
    black_player VARCHAR(100) NOT NULL, 
    year VARCHAR(50) NOT NULL, 
    chess_opening_id VARCHAR(36) NOT NULL, 
    FOREIGN KEY (chess_opening_id) REFERENCES chess_openings(id)
);

CREATE TABLE attendance (
    id VARCHAR(36) PRIMARY KEY UNIQUE NOT NULL,

    student_id VARCHAR(36) NULL,
    students_group_id VARCHAR(36) NULL,

    learning_topic_id VARCHAR(36),
    coach_id VARCHAR(36) NOT NULL,
    preset_id VARCHAR(36),
    is_online BOOLEAN DEFAULT 0,
    meet_link VARCHAR(200) DEFAULT NULL,
    is_freeze BOOLEAN DEFAULT 0,
    is_deleted BOOLEAN DEFAULT 0,
    type ENUM("REGULAR", "TRIAL", "GROUP") DEFAULT "REGULAR",
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    quality_id VARCHAR(36) DEFAULT NULL,

    FOREIGN KEY (learning_topic_id) REFERENCES learning_topics(id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (students_group_id) REFERENCES students_groups(id),
    FOREIGN KEY (coach_id) REFERENCES users(id),
    FOREIGN KEY (quality_id) REFERENCES quality(id),
    FOREIGN KEY (preset_id) REFERENCES attendance_preset(id),

    -- Ограничения
    CONSTRAINT chk_attendance_type_requirements CHECK (
        (type IN ('REGULAR', 'TRIAL') AND student_id IS NOT NULL AND students_group_id IS NULL) OR
        (type = 'GROUP' AND student_id IS NULL AND students_group_id IS NOT NULL)
    )
);

CREATE TABLE attendance_preset (
    id VARCHAR(36) PRIMARY KEY UNIQUE NOT NULL,

    student_id VARCHAR(36) NULL,
    students_group_id VARCHAR(36) NULL,

    type ENUM("REGULAR", "GROUP") DEFAULT "REGULAR",
    start_time_local TIME NOT NULL,
    end_time_local TIME NOT NULL,
    timezone VARCHAR(50) NOT NULL,
    excluded_dates JSON NOT NULL DEFAULT (JSON_ARRAY()),

    -- Дата окончания ряда
    end_date TIMESTAMP NOT NULL,

    --Формат rrule
    rrule VARCHAR(500) NOT NULL,

    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (students_group_id) REFERENCES students_groups(id),

    -- Ограничения
    CONSTRAINT chk_attendance_preset_type_requirements CHECK (
        (type = 'REGULAR' AND student_id IS NOT NULL AND students_group_id IS NULL) OR
        (type = 'GROUP' AND student_id IS NULL AND students_group_id IS NOT NULL)
    )
);

CREATE TABLE students_attended (
    student_id VARCHAR(36) NOT NULL,
    attendance_id VARCHAR(36) NOT NULL,
    attended BOOLEAN DEFAULT 0,
    PRIMARY KEY (student_id, attendance_id),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (attendance_id) REFERENCES attendance(id) ON DELETE CASCADE
);

CREATE TABLE attendance_main_tasks (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    attendance_id VARCHAR(36) NOT NULL,
    task_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (attendance_id) REFERENCES attendance(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id)
);

CREATE TABLE attendance_additional_tasks (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    attendance_id VARCHAR(36) NOT NULL,
    task_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (attendance_id) REFERENCES attendance(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id)
);

CREATE TABLE homeworks (
    id VARCHAR(36) PRIMARY KEY,
    attendance_id VARCHAR(36) NOT NULL,
    name TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
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

-- VIEWS
CREATE VIEW quality_view (id, name, label, labelFor, lightColor, darkColor) AS SELECT id, name, label, label_for, light_color, dark_color
FROM quality;

--
CREATE VIEW settings_view (id, name, logo, vkLink, email, phone, legalName, itin, ukassaId, ukassaApiKey) 
AS SELECT id, name, logo, vk_link, email, phone, legal_name, itin, ukassa_id, ukassa_api_key
FROM settings;

--
CREATE VIEW coach_view (id, firstName, lastName, birthDate, avatar, fshrId, fideId, phone, email, biography, joinDate, isFired) AS 
SELECT c.id, c.first_name, c.last_name, c.birth_date, c.avatar,
    c.fshr_id, c.fide_id, c.phone, c.email, c.biography, c.join_date, c.is_fired

FROM coaches c

ORDER BY last_name;

--
CREATE VIEW level_view (id, name, description, hoursRequired) AS SELECT id, name, description, hours_required
FROM levels;

--
CREATE VIEW learning_topic_view (id, name, description, level) AS SELECT lt.id, lt.name, lt.description,
JSON_OBJECT("id", lv.id, "name", lv.name, "hoursRequired", lv.hoursRequired, "description", lv.description) as level
FROM learning_topics lt
LEFT JOIN level_view lv ON lt.level_id = lv.id;

--
CREATE VIEW student_view (id, firstName, lastName, birthDate, level, fshrId, fideId, phone, email, joinDate, notes, paidLessons, isExcluded, balance) AS 
SELECT s.id, s.first_name, s.last_name, s.birth_date, 
    JSON_OBJECT("id", lv.id, "name", lv.name, "hoursRequired", lv.hoursRequired, "description", lv.description) as level,
    s.fshr_id, s.fide_id, s.phone, s.email, s.join_date as joinDate, s.notes, s.paid_lessons, s.is_excluded, ub.balance as balance

FROM students s
LEFT JOIN level_view lv ON s.level_id = lv.id
LEFT JOIN user_balance ub ON s.id = ub.user_id

ORDER BY last_name;

--
CREATE VIEW task_view AS 
SELECT t.id, t.name, t.position,
    JSON_OBJECT("id", ltv.id, "name", ltv.name, "description", ltv.description, "level", ltv.level) as learningTopic,    
    JSON_OBJECT("id", q.id, "name", q.name, "label", q.label, "labelFor", q.labelFor, "lightColor", q.lightColor, "darkColor", q.darkColor) as quality  
FROM tasks t

LEFT JOIN quality_view q ON q.id = t.quality_id
LEFT JOIN learning_topic_view ltv ON ltv.id = t.learning_topic_id
WHERE t.is_removed = 0;

CREATE VIEW user_payments_view AS SELECT 
JSON_OBJECT("id", sv.id, "firstName", sv.firstName, "lastName", sv.lastName) as user,
JSON_OBJECT("id", p.id, "amountValue", p.amount_value, "createdAt", p.created_at, "status", p.status) as payment
FROM user_payments up

LEFT JOIN student_view sv ON up.user_id = sv.id
LEFT JOIN payments p ON up.payment_id = p.id;

--
CREATE VIEW chess_game_view (id, whitePlayer, blackPlayer, year, chessOpening) AS 
    SELECT cg.id, cg.white_player, cg.black_player, cg.year, 
    JSON_OBJECT("id", co.id, "name", co.name) as chessOpening
FROM chess_games cg
LEFT JOIN chess_openings co ON cg.chess_opening_id = co.id;

--
CREATE VIEW students_group_view (id, name, description, color, students) 
AS SELECT 
    sg.id,
    sg.name,
    sg.description,
    sg.color,
    COALESCE(
        JSON_ARRAYAGG(
            DISTINCT JSON_OBJECT(
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
GROUP BY sg.id, sg.name, sg.description, sg.color;

--
CREATE VIEW students_attended_view (attendanceId, student, attended) 
AS SELECT 
    sa.attendance_id,
    JSON_OBJECT("id", sv.id, "firstName", sv.firstName, "lastName", sv.lastName),
    sa.attended
FROM students_attended sa

LEFT JOIN student_view sv ON sa.student_id = sv.id;

--
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

--
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

--
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

--
CREATE VIEW attendance_preset_view AS 
SELECT ap.id, ap.start_time_local AS startTimeLocal, ap.end_time_local AS endTimeLocal, 
    ap.timezone, ap.type, ap.rrule, ap.end_date AS endDate, ap.excluded_dates AS excludedDates,
    NULLIF(
        JSON_OBJECT("id", s.id, "firstName", s.firstName, "lastName", s.lastName),
        JSON_OBJECT("id", NULL, "firstName", NULL, "lastName", NULL)
    ) as `student`,
    NULLIF(
        JSON_OBJECT("id", sgv.id, "name", sgv.name, "description", sgv.description, "color", sgv.color, "students", sgv.students),
        JSON_OBJECT("id", NULL, "name", NULL, "description", NULL, "color", NULL, "students", NULL)
    ) as `group`

FROM attendance_preset ap      

LEFT JOIN student_view s ON s.id = ap.student_id 
LEFT JOIN students_group_view sgv ON sgv.id = ap.students_group_id;

--
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

-- FUNCTIONS 

-- Получение задач по их теме
DELIMITER //
CREATE FUNCTION get_tasks_by_learning_topic_id(learning_topic_id VARCHAR(36))
RETURNS JSON
DETERMINISTIC
BEGIN
    DECLARE result JSON;
    
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            "id", t.id, 
            "name", t.name, 
            "learningTopic", JSON_OBJECT("id", ltv.id, "name", ltv.name, "description", ltv.description, "level", ltv.level),
            "quality", JSON_OBJECT("id", q.id, "name", q.name, "label", q.label, "lightColor", q.lightColor, "darkColor", q.darkColor)
            )
        ) INTO result    
    FROM tasks t

    LEFT JOIN quality_view q ON q.id = t.quality_id
    LEFT JOIN learning_topic_view ltv ON ltv.id = t.learning_topic_id
    WHERE t.learning_topic_id = learning_topic_id;
    
    RETURN result;
END //
DELIMITER ;

-- Получение партий по дебюту
DELIMITER //
CREATE FUNCTION get_chess_games_by_chess_opening_id(chess_opening_id VARCHAR(36))
RETURNS JSON
DETERMINISTIC
BEGIN
    DECLARE result JSON;
    
    SELECT JSON_ARRAYAGG(JSON_OBJECT("id", cg.id, "whitePlayer", cg.white_player, "blackPlayer", cg.black_player, "year", cg.year, "chessOpening", JSON_OBJECT("id", co.id, "name", co.name))) INTO result    
    FROM chess_games cg

    LEFT JOIN chess_openings co ON co.id = cg.chess_opening_id
    WHERE cg.chess_opening_id = chess_opening_id;
    
    RETURN result;
END //
DELIMITER ;

-- Дефолтные данные для инициализации
INSERT INTO users (id, username, password, role) VALUES ("fe7902bd-f18f-44a7-945d-33cbecb76dde", "admin", "12345678", "admin");
INSERT INTO settings (id, name) VALUES ("7f1e8db1-5537-458d-846a-4fbdb7b4024f", "Ваш шахматный клуб");