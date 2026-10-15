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