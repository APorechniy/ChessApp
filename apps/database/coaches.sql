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