CREATE TABLE students (
    id VARCHAR(36) PRIMARY KEY UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date DATE,
    level_id VARCHAR(36) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    fshr_id int(11) DEFAULT NULL,
    fide_id int(11) DEFAULT NULL,
    join_date DATE DEFAULT (curdate()),
    notes TEXT,
    paid_lessons INTEGER DEFAULT 0,
    is_excluded BOOLEAN DEFAULT 0,
    FOREIGN KEY (level_id) REFERENCES levels(id)
);