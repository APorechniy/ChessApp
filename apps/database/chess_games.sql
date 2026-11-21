CREATE TABLE chess_games ( 
    id VARCHAR(36) PRIMARY KEY UNIQUE NOT NULL,
    white_player VARCHAR(100) NOT NULL, 
    black_player VARCHAR(100) NOT NULL, 
    year VARCHAR(50) NOT NULL, 
    chess_opening_id VARCHAR(36) NOT NULL, 
    FOREIGN KEY (chess_opening_id) REFERENCES chess_openings(id)
);