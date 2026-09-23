CREATE TABLE attendance (
    id VARCHAR(36) PRIMARY KEY UNIQUE NOT NULL,

    student_id VARCHAR(36) NULL,
    students_group_id VARCHAR(36) NULL,

    learning_topic_id VARCHAR(36),
    coach_id VARCHAR(36) NOT NULL,
    preset_id VARCHAR(36),
    homework_done BOOLEAN DEFAULT 0,
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