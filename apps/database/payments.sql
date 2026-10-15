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
)