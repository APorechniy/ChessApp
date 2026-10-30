CREATE TABLE quality (
    id VARCHAR(36) PRIMARY KEY NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    label VARCHAR(50) NOT NULL,
    label_for VARCHAR(50) NOT NULL,
    light_color VARCHAR(9) NOT NULL,
    dark_color VARCHAR(9) NOT NULL
);