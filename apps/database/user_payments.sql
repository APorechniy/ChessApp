CREATE TABLE user_payments (
    user_id VARCHAR(36) NOT NULL,
    payment_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (payment_id) REFERENCES payments(id)
);