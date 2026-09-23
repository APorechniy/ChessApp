-- Таблица баланса пользователей
CREATE TABLE user_balance (
    user_id VARCHAR(36) UNIQUE NOT NULL,
    balance DECIMAL NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);