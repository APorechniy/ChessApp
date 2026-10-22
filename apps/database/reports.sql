-- Пока не используется
-- Файлы отчетов будут хранится в S3, в таблице будет только ссылка
CREATE TABLE reports (
    id VARCHAR(36) PRIMARY KEY UNIQUE NOT NULL,
    student_id VARCHAR(36) NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    content LONGTEXT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id)
);