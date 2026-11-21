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
    ukassa_api_key VARCHAR(100),
    ukassa_is_connected BOOLEAN DEFAULT 0
);